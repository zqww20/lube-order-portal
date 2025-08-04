import React, { createContext, useContext, useReducer, ReactNode, useEffect } from 'react';
import { Product } from '@/data/products';
import { sapApiService } from '@/services/sapApi';
import { DataTransformService } from '@/services/dataTransform';
import { mockProducts } from '@/data/products';

export interface ProductState {
  products: Product[];
  isLoading: boolean;
  lastSync: string | null;
  useLocalData: boolean;
}

type ProductAction = 
  | { type: 'SET_PRODUCTS'; payload: Product[] }
  | { type: 'UPDATE_PRODUCT'; payload: Product }
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'SET_LAST_SYNC'; payload: string }
  | { type: 'TOGGLE_DATA_SOURCE' };

const initialState: ProductState = {
  products: mockProducts,
  isLoading: false,
  lastSync: null,
  useLocalData: true
};

const productReducer = (state: ProductState, action: ProductAction): ProductState => {
  switch (action.type) {
    case 'SET_PRODUCTS':
      return {
        ...state,
        products: action.payload,
        isLoading: false
      };
    case 'UPDATE_PRODUCT':
      return {
        ...state,
        products: state.products.map(product =>
          product.id === action.payload.id ? action.payload : product
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
    case 'TOGGLE_DATA_SOURCE':
      return {
        ...state,
        useLocalData: !state.useLocalData
      };
    default:
      return state;
  }
};

const ProductContext = createContext<{
  state: ProductState;
  dispatch: React.Dispatch<ProductAction>;
  syncProducts: () => Promise<void>;
  getProduct: (id: string) => Product | undefined;
  searchProducts: (query: string) => Product[];
  filterByCategory: (category: string) => Product[];
} | null>(null);

export const ProductProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(productReducer, initialState);

  useEffect(() => {
    // Try to sync with SAP on mount if connected
    if (sapApiService.isConnected() && !state.useLocalData) {
      syncProducts();
    }
  }, []);

  const syncProducts = async (): Promise<void> => {
    if (!sapApiService.isConnected()) {
      console.warn('SAP not connected, using local products');
      dispatch({ type: 'SET_PRODUCTS', payload: mockProducts });
      return;
    }

    dispatch({ type: 'SET_LOADING', payload: true });
    
    try {
      const sapProducts = await sapApiService.getProducts();
      
      if (sapProducts.length > 0) {
        const transformedProducts = sapProducts.map(sapProduct => 
          DataTransformService.sapProductToProduct(sapProduct)
        );
        
        dispatch({ type: 'SET_PRODUCTS', payload: transformedProducts });
        dispatch({ type: 'SET_LAST_SYNC', payload: new Date().toISOString() });
      } else {
        // Fallback to local data if SAP returns empty
        dispatch({ type: 'SET_PRODUCTS', payload: mockProducts });
      }
      
    } catch (error) {
      console.error('Failed to sync products from SAP:', error);
      // Fallback to local data on error
      dispatch({ type: 'SET_PRODUCTS', payload: mockProducts });
      dispatch({ type: 'SET_LOADING', payload: false });
    }
  };

  const getProduct = (id: string): Product | undefined => {
    return state.products.find(product => product.id === id || product.itemCode === id);
  };

  const searchProducts = (query: string): Product[] => {
    const lowercaseQuery = query.toLowerCase();
    return state.products.filter(product =>
      product.name.toLowerCase().includes(lowercaseQuery) ||
      product.itemCode.toLowerCase().includes(lowercaseQuery) ||
      product.category.toLowerCase().includes(lowercaseQuery)
    );
  };

  const filterByCategory = (category: string): Product[] => {
    if (category === 'All') return state.products;
    return state.products.filter(product => product.category === category);
  };

  return (
    <ProductContext.Provider value={{
      state,
      dispatch,
      syncProducts,
      getProduct,
      searchProducts,
      filterByCategory
    }}>
      {children}
    </ProductContext.Provider>
  );
};

export const useProduct = () => {
  const context = useContext(ProductContext);
  if (!context) {
    throw new Error('useProduct must be used within a ProductProvider');
  }
  return context;
};