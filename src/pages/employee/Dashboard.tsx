import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import DistributionMetrics from '@/components/employee/dashboard/DistributionMetrics';
import DistributionOperations from '@/components/employee/dashboard/DistributionOperations';
import QuickDistributionActions from '@/components/employee/dashboard/QuickDistributionActions';
import SupplyChainIntelligence from '@/components/employee/dashboard/SupplyChainIntelligence';
import PerformanceExtension from '@/components/employee/dashboard/PerformanceExtension';

import SAPConnectionStatus from '@/components/SAPConnectionStatus';
import RealTimeDataSync from '@/components/RealTimeDataSync';
import { 
  Calendar, 
  Filter, 
  RefreshCw,
  Settings
} from 'lucide-react';

const EmployeeDashboard = () => {
  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col space-y-4 md:flex-row md:items-center md:justify-between md:space-y-0">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Distribution Operations Center</h1>
          <p className="text-muted-foreground">
            Industrial lubricants & marine equipment distribution dashboard for Nova Scotia operations.
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="sm">
            <Calendar className="h-4 w-4 mr-2" />
            Last 30 days
          </Button>
          <Button variant="outline" size="sm">
            <Filter className="h-4 w-4 mr-2" />
            Filter
          </Button>
          <Button variant="outline" size="sm">
            <RefreshCw className="h-4 w-4 mr-2" />
            Refresh
          </Button>
          <Button variant="outline" size="sm">
            <Settings className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* System Status */}
      <div className="grid gap-4 md:grid-cols-2">
        <SAPConnectionStatus />
        <RealTimeDataSync />
      </div>

      {/* Main Dashboard Content */}
      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList>
          <TabsTrigger value="overview">Distribution Overview</TabsTrigger>
          <TabsTrigger value="supply-chain">Supply Chain Intel</TabsTrigger>
          <TabsTrigger value="actions">Quick Actions</TabsTrigger>
          <TabsTrigger value="performance">Performance</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          {/* Distribution Metrics */}
          <DistributionMetrics />

          {/* Operations Feed */}
          <div className="w-full">
            <DistributionOperations />
          </div>
        </TabsContent>

        <TabsContent value="supply-chain" className="space-y-6">
          <SupplyChainIntelligence />
        </TabsContent>

        <TabsContent value="actions" className="space-y-6">
          <QuickDistributionActions />
        </TabsContent>

        <TabsContent value="performance" className="space-y-6">
          <PerformanceExtension />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default EmployeeDashboard;