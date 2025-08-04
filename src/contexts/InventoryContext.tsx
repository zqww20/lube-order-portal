import React, { createContext, useContext, useReducer, ReactNode, useEffect } from 'react';
import { sapApiService, SAPInventory } from '@/services/sapApi';
import { DataTransformService } from '@/services/dataTransform';

export interface InventoryItem {
  itemCode: string;
  warehouseCode: string;
  available: number;
  committed: number;
  onOrder: number;
  status: 'in-stock' | 'low-stock' | 'out-of-stock';
  lastUpdated: string;
}

export interface InventoryState {
  inventory: InventoryItem[];
  isLoading: boolean;
  lastSync: string | null;
  autoSyncEnabled: boolean;
}

type InventoryAction = 
  | { type: 'SET_INVENTORY'; payload: InventoryItem[] }
  | { type: 'UPDATE_ITEM'; payload: InventoryItem }
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'SET_LAST_SYNC'; payload: string }
  | { type: 'TOGGLE_AUTO_SYNC' };

const initialState: InventoryState = {
  inventory: [],
  isLoading: false,
  lastSync: null,
  autoSyncEnabled: true
};

const inventoryReducer = (state: InventoryState, action: InventoryAction): InventoryState => {
  switch (action.type) {
    case 'SET_INVENTORY':
      return {
        ...state,
        inventory: action.payload,
        isLoading: false
      };
    case 'UPDATE_ITEM':
      return {
        ...state,
        inventory: state.inventory.map(item =>
          item.itemCode === action.payload.itemCode && 
          item.warehouseCode === action.payload.warehouseCode
            ? action.payload
            : item
        )
      };
    case 'SET_LOADING':
      return {
        ...state,
        isLoading: action.payload
      };
    case 'SET_LAST_SYNC':
      return {
        ...state,
        lastSync: action.payload
      };
    case 'TOGGLE_AUTO_SYNC':
      return {
        ...state,
        autoSyncEnabled: !state.autoSyncEnabled
      };
    default:
      return state;
  }
};

const InventoryContext = createContext<{
  state: InventoryState;
  dispatch: React.Dispatch<InventoryAction>;
  syncInventory: () => Promise<void>;
  getItemInventory: (itemCode: string) => InventoryItem[];
  getTotalAvailable: (itemCode: string) => number;
} | null>(null);

export const InventoryProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(inventoryReducer, initialState);

  useEffect(() => {
    // Auto-sync inventory on mount if enabled
    if (state.autoSyncEnabled && sapApiService.isConnected()) {
      syncInventory();
    }
  }, []);

  useEffect(() => {
    // Set up auto-sync interval if enabled
    if (state.autoSyncEnabled && sapApiService.isConnected()) {
      const interval = setInterval(() => {
        syncInventory();
      }, 300000); // Sync every 5 minutes

      return () => clearInterval(interval);
    }
  }, [state.autoSyncEnabled]);

  const syncInventory = async (): Promise<void> => {
    if (!sapApiService.isConnected()) {
      console.warn('SAP not connected, skipping inventory sync');
      return;
    }

    dispatch({ type: 'SET_LOADING', payload: true });
    
    try {
      const sapInventory = await sapApiService.getInventory();
      
      const transformedInventory: InventoryItem[] = sapInventory.map(item => {
        const status = DataTransformService.getInventoryStatus(item);
        return {
          itemCode: item.ItemCode,
          warehouseCode: item.WhsCode,
          available: status.available,
          committed: status.committed,
          onOrder: status.onOrder,
          status: status.status,
          lastUpdated: new Date().toISOString()
        };
      });

      dispatch({ type: 'SET_INVENTORY', payload: transformedInventory });
      dispatch({ type: 'SET_LAST_SYNC', payload: new Date().toISOString() });
      
    } catch (error) {
      console.error('Failed to sync inventory:', error);
      dispatch({ type: 'SET_LOADING', payload: false });
    }
  };

  const getItemInventory = (itemCode: string): InventoryItem[] => {
    return state.inventory.filter(item => item.itemCode === itemCode);
  };

  const getTotalAvailable = (itemCode: string): number => {
    return state.inventory
      .filter(item => item.itemCode === itemCode)
      .reduce((total, item) => total + item.available, 0);
  };

  return (
    <InventoryContext.Provider value={{
      state,
      dispatch,
      syncInventory,
      getItemInventory,
      getTotalAvailable
    }}>
      {children}
    </InventoryContext.Provider>
  );
};

export const useInventory = () => {
  const context = useContext(InventoryContext);
  if (!context) {
    throw new Error('useInventory must be used within an InventoryProvider');
  }
  return context;
};