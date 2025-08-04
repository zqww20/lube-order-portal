import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Activity, Clock, AlertCircle } from 'lucide-react';
import { useUser } from '@/contexts/UserContext';
import { useInventory } from '@/contexts/InventoryContext';
import { useProduct } from '@/contexts/ProductContext';

interface SyncOperation {
  type: 'products' | 'inventory' | 'quotes' | 'orders';
  status: 'pending' | 'syncing' | 'completed' | 'error';
  progress: number;
  lastUpdated: string;
}

const RealTimeDataSync = () => {
  const { state: userState, dispatch: userDispatch } = useUser();
  const { state: inventoryState, dispatch: inventoryDispatch } = useInventory();
  const { state: productState } = useProduct();
  
  const [syncOperations, setSyncOperations] = useState<SyncOperation[]>([
    { type: 'products', status: 'completed', progress: 100, lastUpdated: new Date().toISOString() },
    { type: 'inventory', status: 'completed', progress: 100, lastUpdated: new Date().toISOString() },
    { type: 'quotes', status: 'pending', progress: 0, lastUpdated: '' },
    { type: 'orders', status: 'pending', progress: 0, lastUpdated: '' }
  ]);

  useEffect(() => {
    // Simulate real-time data updates
    if (inventoryState.autoSyncEnabled) {
      const interval = setInterval(() => {
        // Simulate inventory updates
        setSyncOperations(prev => prev.map(op => 
          op.type === 'inventory' 
            ? { ...op, status: 'syncing', progress: Math.random() * 100, lastUpdated: new Date().toISOString() }
            : op
        ));
        
        setTimeout(() => {
          setSyncOperations(prev => prev.map(op => 
            op.type === 'inventory' && op.status === 'syncing'
              ? { ...op, status: 'completed', progress: 100 }
              : op
          ));
        }, 2000);
      }, 30000); // Every 30 seconds

      return () => clearInterval(interval);
    }
  }, [inventoryState.autoSyncEnabled]);

  const handleAutoSyncToggle = () => {
    inventoryDispatch({ type: 'TOGGLE_AUTO_SYNC' });
    userDispatch({ 
      type: 'UPDATE_PREFERENCES', 
      payload: { autoSync: !inventoryState.autoSyncEnabled }
    });
  };

  const getStatusBadge = (status: SyncOperation['status']) => {
    switch (status) {
      case 'completed':
        return <Badge variant="default" className="text-xs">Synced</Badge>;
      case 'syncing':
        return <Badge variant="secondary" className="text-xs">Syncing...</Badge>;
      case 'error':
        return <Badge variant="destructive" className="text-xs">Error</Badge>;
      default:
        return <Badge variant="outline" className="text-xs">Pending</Badge>;
    }
  };

  const getStatusIcon = (status: SyncOperation['status']) => {
    switch (status) {
      case 'completed':
        return <Activity className="h-3 w-3 text-green-500" />;
      case 'syncing':
        return <Clock className="h-3 w-3 text-blue-500 animate-pulse" />;
      case 'error':
        return <AlertCircle className="h-3 w-3 text-red-500" />;
      default:
        return <Clock className="h-3 w-3 text-gray-400" />;
    }
  };

  return (
    <Card className="w-full">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center justify-between text-sm">
          <span className="flex items-center gap-2">
            <Activity className="h-4 w-4" />
            Real-Time Sync
          </span>
          <div className="flex items-center space-x-2">
            <Label htmlFor="auto-sync" className="text-xs">Auto</Label>
            <Switch
              id="auto-sync"
              checked={inventoryState.autoSyncEnabled}
              onCheckedChange={handleAutoSyncToggle}
            />
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {syncOperations.map((operation) => (
          <div key={operation.type} className="space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                {getStatusIcon(operation.status)}
                <span className="text-sm capitalize">{operation.type}</span>
              </div>
              {getStatusBadge(operation.status)}
            </div>
            
            {operation.status === 'syncing' && (
              <Progress value={operation.progress} className="h-1" />
            )}
            
            <div className="text-xs text-muted-foreground">
              {operation.lastUpdated && (
                <>Last: {new Date(operation.lastUpdated).toLocaleTimeString()}</>
              )}
            </div>
          </div>
        ))}
        
        <div className="pt-2 border-t">
          <div className="flex items-center justify-between text-xs text-muted-foreground">
            <span>Connection Status:</span>
            <span className="capitalize">{userState.connectionStatus}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default RealTimeDataSync;