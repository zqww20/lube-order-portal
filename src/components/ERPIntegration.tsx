
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
  RefreshCw,
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
  sessionId?: string;
  companyDB: string;
  serverVersion: string;
}

interface SAPCredentials {
  username: string;
  password: string;
  companyDB: string;
  serverUrl: string;
}

const ERPIntegration = () => {
  const [erpStatus, setErpStatus] = useState<ERPStatus>({
    connected: true,
    lastSync: '2024-01-25 14:30:00',
    systemName: 'SAP Business One',
    version: '10.0',
    endpoint: 'https://your-sap-server:50000/b1s/v1',
    sessionId: 'B1SESSION-12345',
    companyDB: 'SBODEMO_US',
    serverVersion: '10.0.25.144'
  });
  
  const [sapCredentials, setSAPCredentials] = useState<SAPCredentials>({
    username: '',
    password: '',
    companyDB: 'SBODEMO_US',
    serverUrl: 'https://your-sap-server:50000'
  });
  
  const [apiKey, setApiKey] = useState('');
  const [webhookUrl, setWebhookUrl] = useState('');
  const [isConnecting, setIsConnecting] = useState(false);
  const [syncProgress, setSyncProgress] = useState(0);
  const { toast } = useToast();

  const connectToSAP = async () => {
    setIsConnecting(true);
    toast({
      title: "Connecting to SAP Business One",
      description: "Establishing connection with SAP B1 Service Layer...",
    });

    try {
      // Simulate SAP B1 login process
      const loginPayload = {
        CompanyDB: sapCredentials.companyDB,
        UserName: sapCredentials.username,
        Password: sapCredentials.password
      };

      // In real implementation, this would call SAP B1 Service Layer
      // POST /Login with the credentials
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const sessionId = `B1SESSION-${Math.random().toString(36).substr(2, 9)}`;
      
      setErpStatus(prev => ({
        ...prev,
        connected: true,
        sessionId: sessionId,
        endpoint: `${sapCredentials.serverUrl}/b1s/v1`,
        lastSync: new Date().toISOString().replace('T', ' ').substring(0, 19)
      }));

      toast({
        title: "Connected to SAP Business One",
        description: `Successfully authenticated with company database: ${sapCredentials.companyDB}`,
      });
    } catch (error) {
      toast({
        title: "Connection Failed",
        description: "Failed to connect to SAP Business One. Please check your credentials.",
        variant: "destructive"
      });
    } finally {
      setIsConnecting(false);
    }
  };

  const syncSAPData = async () => {
    setSyncProgress(0);
    toast({
      title: "Syncing SAP Business One Data",
      description: "Synchronizing Items, Business Partners, and Price Lists...",
    });

    // Simulate progressive sync
    const syncSteps = [
      { step: 'Items', progress: 25 },
      { step: 'Business Partners', progress: 50 },
      { step: 'Price Lists', progress: 75 },
      { step: 'Inventory', progress: 100 }
    ];

    for (const { step, progress } of syncSteps) {
      await new Promise(resolve => setTimeout(resolve, 1000));
      setSyncProgress(progress);
      
      toast({
        title: `Syncing ${step}`,
        description: `Processing ${step} from SAP Business One...`,
      });
    }
    
    setErpStatus(prev => ({
      ...prev,
      lastSync: new Date().toISOString().replace('T', ' ').substring(0, 19)
    }));
    
    toast({
      title: "SAP Sync Complete",
      description: "All business objects synchronized successfully.",
    });
    setSyncProgress(0);
  };

  const createSAPQuote = async (quoteData: any) => {
    toast({
      title: "Creating Quote in SAP",
      description: "Sending quote request to SAP Business One...",
    });

    // Simulate SAP B1 Quotation creation
    // POST /Quotations endpoint
    const sapQuotePayload = {
      CardCode: quoteData.customerCode,
      DocDate: new Date().toISOString().split('T')[0],
      DocumentLines: quoteData.items.map((item: any) => ({
        ItemCode: item.code,
        Quantity: item.quantity,
        UnitPrice: item.price
      })),
      Comments: quoteData.requirements
    };

    await new Promise(resolve => setTimeout(resolve, 1500));
    
    toast({
      title: "Quote Created Successfully",
      description: `SAP Quote #${Math.floor(Math.random() * 10000)} created for customer.`,
    });
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
        <h1 className="text-3xl font-bold text-bw-text">ERP Integration</h1>
        <p className="text-bw-text/70 mt-2">Manage your Enterprise Resource Planning system integration</p>
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
                <span className="text-sm text-gray-600">Company DB</span>
                <span className="text-sm font-medium">{erpStatus.companyDB}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Session ID</span>
                <span className="text-sm font-mono text-xs">{erpStatus.sessionId || 'Not connected'}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Server Version</span>
                <span className="text-sm font-medium">{erpStatus.serverVersion}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Last Sync</span>
                <span className="text-sm font-medium">{erpStatus.lastSync}</span>
              </div>
            </div>
            
            <div className="pt-4 space-y-2">
              <Button 
                onClick={connectToSAP} 
                variant="outline" 
                className="w-full"
                disabled={isConnecting}
              >
                <Settings className="h-4 w-4 mr-2" />
                {isConnecting ? 'Connecting...' : 'Connect to SAP B1'}
              </Button>
              <Button onClick={syncSAPData} className="w-full" disabled={!erpStatus.connected}>
                <RefreshCw className="h-4 w-4 mr-2" />
                Sync SAP Data {syncProgress > 0 && `(${syncProgress}%)`}
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
              <label className="text-sm font-medium">SAP Server URL</label>
              <Input 
                value={sapCredentials.serverUrl} 
                onChange={(e) => setSAPCredentials(prev => ({ ...prev, serverUrl: e.target.value }))}
                placeholder="https://your-sap-server:50000"
              />
            </div>
            
            <div>
              <label className="text-sm font-medium">Company Database</label>
              <Input 
                value={sapCredentials.companyDB}
                onChange={(e) => setSAPCredentials(prev => ({ ...prev, companyDB: e.target.value }))}
                placeholder="SBODEMO_US"
              />
            </div>
            
            <div>
              <label className="text-sm font-medium">SAP Username</label>
              <Input 
                value={sapCredentials.username}
                onChange={(e) => setSAPCredentials(prev => ({ ...prev, username: e.target.value }))}
                placeholder="SAP Business One username"
              />
            </div>
            
            <div>
              <label className="text-sm font-medium">SAP Password</label>
              <Input 
                type="password" 
                value={sapCredentials.password}
                onChange={(e) => setSAPCredentials(prev => ({ ...prev, password: e.target.value }))}
                placeholder="SAP Business One password"
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
              <p className="text-xs text-bw-text/50 mt-1">
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
                <h4 className="font-medium mb-3">SAP B1 Item Master Sync</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-bw-text/60">Item Code</span>
                    <span className="font-mono">ItemCode</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-bw-text/60">Item Name</span>
                    <span className="font-mono">ItemName</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-bw-text/60">Unit Price</span>
                    <span className="font-mono">PriceList.Price</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-bw-text/60">On Hand</span>
                    <span className="font-mono">ItemWarehouseInfoCollection.InStock</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-bw-text/60">Item Group</span>
                    <span className="font-mono">ItemsGroupCode</span>
                  </div>
                </div>
              </div>
              
              <div>
                <h4 className="font-medium mb-3">SAP B1 Quote Processing</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-bw-text/60">Quote Number</span>
                    <span className="font-mono">DocNum</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-bw-text/60">Customer Code</span>
                    <span className="font-mono">CardCode</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-bw-text/60">Valid Until</span>
                    <span className="font-mono">DocDueDate</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-bw-text/60">Document Lines</span>
                    <span className="font-mono">DocumentLines[]</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-bw-text/60">Remarks</span>
                    <span className="font-mono">Comments</span>
                  </div>
                </div>
              </div>
            </div>
            
            <Separator className="my-6" />
            
            <div>
              <h4 className="font-medium mb-3">SAP B1 Service Layer Endpoints</h4>
              <Textarea 
                placeholder={`{
  "Items": "/Items",
  "Quotations": "/Quotations", 
  "BusinessPartners": "/BusinessPartners",
  "PriceLists": "/PriceLists",
  "ItemWarehouseInfoCollection": "/ItemWarehouseInfoCollection"
}`}
                rows={6}
                className="font-mono text-xs"
              />
              <Button className="mt-2" variant="outline" onClick={() => createSAPQuote({})}>
                <Settings className="h-4 w-4 mr-2" />
                Test SAP Quote Creation
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
            <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
              <div className="text-center">
                <div className="text-2xl font-bold text-bw-accent">1,234</div>
                <div className="text-sm text-bw-text/60">SAP Quotations</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-status-success">567</div>
                <div className="text-sm text-bw-text/60">Items Synced</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-bw-primary">89</div>
                <div className="text-sm text-bw-text/60">Business Partners</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-status-warning">99.8%</div>
                <div className="text-sm text-bw-text/60">Sync Success Rate</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-status-error">1.2s</div>
                <div className="text-sm text-bw-text/60">SAP Response Time</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ERPIntegration;
