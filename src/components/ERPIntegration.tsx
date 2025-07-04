
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Textarea } from '@/components/ui/textarea';
import { 
  CheckCircle, 
  AlertCircle, 
  Settings, 
  Database, 
  Sync,
  FileText,
  TrendingUp 
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface ERPStatus {
  connected: boolean;
  lastSync: string;
  systemName: string;
  version: string;
  endpoint: string;
}

const ERPIntegration = () => {
  const [erpStatus, setErpStatus] = useState<ERPStatus>({
    connected: true,
    lastSync: '2024-01-25 14:30:00',
    systemName: 'SAP Business One',
    version: '10.0',
    endpoint: 'https://api.yourerp.com/v1'
  });
  
  const [apiKey, setApiKey] = useState('');
  const [webhookUrl, setWebhookUrl] = useState('');
  const { toast } = useToast();

  const testConnection = async () => {
    toast({
      title: "Testing Connection",
      description: "Connecting to ERP system...",
    });

    // Simulate API call
    setTimeout(() => {
      toast({
        title: "Connection Successful",
        description: "Successfully connected to your ERP system.",
      });
    }, 2000);
  };

  const syncData = async () => {
    toast({
      title: "Syncing Data",
      description: "Synchronizing product catalog and inventory...",
    });

    // Simulate sync process
    setTimeout(() => {
      setErpStatus(prev => ({
        ...prev,
        lastSync: new Date().toISOString().replace('T', ' ').substring(0, 19)
      }));
      
      toast({
        title: "Sync Complete",
        description: "Product catalog and inventory updated successfully.",
      });
    }, 3000);
  };

  const generateWebhook = () => {
    const newWebhookUrl = `https://your-portal.com/api/webhooks/erp/${Math.random().toString(36).substr(2, 9)}`;
    setWebhookUrl(newWebhookUrl);
    
    toast({
      title: "Webhook Generated",
      description: "New webhook URL created for real-time updates.",
    });
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">ERP Integration</h1>
        <p className="text-gray-600 mt-2">Manage your Enterprise Resource Planning system integration</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Connection Status */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Database className="h-5 w-5" />
              <span>Connection Status</span>
            </CardTitle>
            <CardDescription>
              Current status of your ERP system integration
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Status</span>
              <Badge variant={erpStatus.connected ? "default" : "destructive"}>
                {erpStatus.connected ? (
                  <><CheckCircle className="h-3 w-3 mr-1" /> Connected</>
                ) : (
                  <><AlertCircle className="h-3 w-3 mr-1" /> Disconnected</>
                )}
              </Badge>
            </div>
            
            <Separator />
            
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">System</span>
                <span className="text-sm font-medium">{erpStatus.systemName}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Version</span>
                <span className="text-sm font-medium">{erpStatus.version}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Last Sync</span>
                <span className="text-sm font-medium">{erpStatus.lastSync}</span>
              </div>
            </div>
            
            <div className="pt-4 space-y-2">
              <Button onClick={testConnection} variant="outline" className="w-full">
                <Settings className="h-4 w-4 mr-2" />
                Test Connection
              </Button>
              <Button onClick={syncData} className="w-full">
                <Sync className="h-4 w-4 mr-2" />
                Sync Now
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Configuration */}
        <Card>
          <CardHeader>
            <CardTitle>Configuration</CardTitle>
            <CardDescription>
              Configure your ERP system connection settings
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="text-sm font-medium">API Endpoint</label>
              <Input 
                value={erpStatus.endpoint} 
                onChange={(e) => setErpStatus(prev => ({ ...prev, endpoint: e.target.value }))}
                placeholder="https://api.yourerp.com/v1"
              />
            </div>
            
            <div>
              <label className="text-sm font-medium">API Key</label>
              <Input 
                type="password" 
                value={apiKey}
                onChange={(e) => setApiKey(e.target.value)}
                placeholder="Enter your ERP API key"
              />
            </div>
            
            <div>
              <label className="text-sm font-medium">Webhook URL</label>
              <div className="flex space-x-2">
                <Input 
                  value={webhookUrl} 
                  placeholder="Webhook URL for real-time updates"
                  readOnly
                />
                <Button onClick={generateWebhook} variant="outline">
                  Generate
                </Button>
              </div>
              <p className="text-xs text-gray-500 mt-1">
                Configure this webhook in your ERP system for real-time inventory updates
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Data Mapping */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <FileText className="h-5 w-5" />
              <span>Data Mapping</span>
            </CardTitle>
            <CardDescription>
              Configure how data flows between your portal and ERP system
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-medium mb-3">Product Synchronization</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Product Code</span>
                    <span className="font-mono">item_number</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Description</span>
                    <span className="font-mono">item_description</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Price</span>
                    <span className="font-mono">unit_price</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Stock Level</span>
                    <span className="font-mono">quantity_on_hand</span>
                  </div>
                </div>
              </div>
              
              <div>
                <h4 className="font-medium mb-3">Order Processing</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Order Number</span>
                    <span className="font-mono">sales_order_number</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Customer Code</span>
                    <span className="font-mono">customer_id</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Order Status</span>
                    <span className="font-mono">order_status</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Shipping Address</span>
                    <span className="font-mono">delivery_address</span>
                  </div>
                </div>
              </div>
            </div>
            
            <Separator className="my-6" />
            
            <div>
              <h4 className="font-medium mb-3">Custom Field Mapping</h4>
              <Textarea 
                placeholder="Configure additional field mappings in JSON format..."
                rows={4}
              />
              <Button className="mt-2" variant="outline">
                <Settings className="h-4 w-4 mr-2" />
                Save Mapping
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Integration Statistics */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <TrendingUp className="h-5 w-5" />
              <span>Integration Statistics</span>
            </CardTitle>
            <CardDescription>
              Monitor your ERP integration performance
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600">1,234</div>
                <div className="text-sm text-gray-600">Orders Processed</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">567</div>
                <div className="text-sm text-gray-600">Products Synced</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-600">99.8%</div>
                <div className="text-sm text-gray-600">Sync Success Rate</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-orange-600">2.3s</div>
                <div className="text-sm text-gray-600">Avg Response Time</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ERPIntegration;
