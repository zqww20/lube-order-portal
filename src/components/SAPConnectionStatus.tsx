import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { RefreshCw, Wifi, WifiOff, Database } from 'lucide-react';
import { sapApiService } from '@/services/sapApi';
import { useUser } from '@/contexts/UserContext';
import { useInventory } from '@/contexts/InventoryContext';
import { useProduct } from '@/contexts/ProductContext';

const SAPConnectionStatus = () => {
  const { state: userState, dispatch: userDispatch } = useUser();
  const { syncInventory } = useInventory();
  const { syncProducts } = useProduct();
  
  const isConnected = sapApiService.isConnected();
  const lastSync = localStorage.getItem('last_sap_sync');

  const handleManualSync = async () => {
    userDispatch({ type: 'SET_CONNECTION_STATUS', payload: 'syncing' });
    
    try {
      await Promise.all([
        syncProducts(),
        syncInventory()
      ]);
      
      localStorage.setItem('last_sap_sync', new Date().toISOString());
      userDispatch({ type: 'SET_CONNECTION_STATUS', payload: 'connected' });
    } catch (error) {
      console.error('Manual sync failed:', error);
      userDispatch({ type: 'SET_CONNECTION_STATUS', payload: 'disconnected' });
    }
  };

  const getConnectionBadge = () => {
    if (userState.connectionStatus === 'syncing') {
      return <Badge variant="secondary" className="flex items-center gap-1">
        <RefreshCw className="h-3 w-3 animate-spin" />
        Syncing
      </Badge>;
    }
    
    if (isConnected) {
      return <Badge variant="default" className="flex items-center gap-1">
        <Wifi className="h-3 w-3" />
        Connected
      </Badge>;
    }
    
    return <Badge variant="destructive" className="flex items-center gap-1">
      <WifiOff className="h-3 w-3" />
      Disconnected
    </Badge>;
  };

  return (
    <Card className="w-full">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center justify-between text-sm">
          <span className="flex items-center gap-2">
            <Database className="h-4 w-4" />
            SAP Business One
          </span>
          {getConnectionBadge()}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="flex items-center justify-between text-xs text-muted-foreground">
          <span>Last Sync:</span>
          <span>
            {lastSync 
              ? new Date(lastSync).toLocaleTimeString()
              : 'Never'
            }
          </span>
        </div>
        
        <Button 
          variant="outline" 
          size="sm" 
          onClick={handleManualSync}
          disabled={!isConnected || userState.connectionStatus === 'syncing'}
          className="w-full"
        >
          <RefreshCw className={`h-3 w-3 mr-2 ${
            userState.connectionStatus === 'syncing' ? 'animate-spin' : ''
          }`} />
          Sync Now
        </Button>
      </CardContent>
    </Card>
  );
};

export default SAPConnectionStatus;