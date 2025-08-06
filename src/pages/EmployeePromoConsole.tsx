import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import CostViewGrid from '@/components/EmployeePromoConsole/CostViewGrid';
import QuickSaleBuilder from '@/components/EmployeePromoConsole/QuickSaleBuilder';
import ActivePromosDashboard from '@/components/EmployeePromoConsole/ActivePromosDashboard';
import AnalyticsTab from '@/components/EmployeePromoConsole/AnalyticsTab';
import { Plus, Download, Filter } from 'lucide-react';

const EmployeePromoConsole = () => {
  // Mock data for cost view
  const costData = [
    {
      sku: 'NAV-001',
      productName: 'Marine GPS Navigator Pro',
      avgCost: 1250.00,
      stdPrice: 1875.00,
      marginPercent: 33.3,
      status: 'active' as const
    },
    {
      sku: 'RAD-002',
      productName: 'High-Frequency Radar System',
      avgCost: 2400.00,
      stdPrice: 3200.00,
      marginPercent: 25.0,
      status: 'low-stock' as const
    },
    {
      sku: 'COM-003',
      productName: 'VHF Communication Radio',
      avgCost: 180.00,
      stdPrice: 270.00,
      marginPercent: 33.3,
      status: 'active' as const
    }
  ];

  // Mock data for active promotions
  const [activePromos, setActivePromos] = useState<any[]>([
    {
      id: '1',
      sku: 'NAV-001',
      productName: 'Marine GPS Navigator Pro',
      promoType: 'percentage',
      discount: 15,
      status: 'active' as const,
      startDate: '2024-01-15',
      endDate: '2024-02-15',
      usage: 47,
      revenue: 28450
    },
    {
      id: '2',
      sku: 'COM-003',
      productName: 'VHF Communication Radio',
      promoType: 'fixed_amount',
      discount: 25,
      status: 'active' as const,
      startDate: '2024-02-01',
      endDate: '2024-02-29',
      usage: 0,
      revenue: 0
    }
  ]);

  // Mock analytics data
  const analyticsData = {
    attachRate: 24.5,
    aovDelta: 15.8,
    deadStockDays: 12,
    topPerformingPromos: [
      { name: 'Navigation Bundle Sale', revenue: 45200, usage: 89 },
      { name: 'Winter Equipment Discount', revenue: 32100, usage: 156 },
      { name: 'Communication Package Deal', revenue: 28900, usage: 67 }
    ],
    revenueByMonth: [
      { month: 'Jan', revenue: 45000, promoRevenue: 12000 },
      { month: 'Feb', revenue: 52000, promoRevenue: 15600 },
      { month: 'Mar', revenue: 48000, promoRevenue: 14400 },
      { month: 'Apr', revenue: 61000, promoRevenue: 18300 },
      { month: 'May', revenue: 55000, promoRevenue: 16500 },
      { month: 'Jun', revenue: 67000, promoRevenue: 20100 }
    ],
    promoTypeDistribution: [
      { name: 'Percentage', value: 45, color: 'hsl(var(--primary))' },
      { name: 'Fixed Amount', value: 30, color: 'hsl(var(--secondary))' },
      { name: 'Bundle', value: 25, color: 'hsl(var(--accent))' }
    ]
  };

  const handleCreatePromo = (promoData: any) => {
    const newPromo = {
      id: String(activePromos.length + 1),
      ...promoData,
      usage: 0,
      revenue: 0
    };
    setActivePromos([...activePromos, newPromo]);
  };

  const handleTogglePromo = (id: string, active: boolean) => {
    setActivePromos(promos =>
      promos.map(promo =>
        promo.id === id
          ? { ...promo, status: active ? 'active' : 'paused' }
          : promo
      )
    );
  };

  const handleEditPromo = (id: string) => {
    console.log('Edit promo:', id);
  };

  const handleEndPromo = (id: string) => {
    setActivePromos(promos =>
      promos.map(promo =>
        promo.id === id
          ? { ...promo, status: 'ended' }
          : promo
      )
    );
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col space-y-4 md:flex-row md:items-center md:justify-between md:space-y-0">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Promotion Console</h1>
          <p className="text-muted-foreground">
            Manage pricing, promotions, and analyze performance metrics.
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="sm">
            <Filter className="h-4 w-4 mr-2" />
            Filter
          </Button>
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
          <Button size="sm">
            <Plus className="h-4 w-4 mr-2" />
            New Promotion
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <Tabs defaultValue="cost-view" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="cost-view">Cost View</TabsTrigger>
          <TabsTrigger value="quick-sale">Quick Sale</TabsTrigger>
          <TabsTrigger value="active-promos">
            Active Promos
            <Badge variant="secondary" className="ml-2">
              {activePromos.filter(p => p.status === 'active').length}
            </Badge>
          </TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>

        <TabsContent value="cost-view">
          <CostViewGrid costData={costData} />
        </TabsContent>

        <TabsContent value="quick-sale">
          <QuickSaleBuilder onCreatePromo={handleCreatePromo} />
        </TabsContent>

        <TabsContent value="active-promos">
          <ActivePromosDashboard
            promos={activePromos}
            onTogglePromo={handleTogglePromo}
            onEditPromo={handleEditPromo}
            onEndPromo={handleEndPromo}
          />
        </TabsContent>

        <TabsContent value="analytics">
          <AnalyticsTab data={analyticsData} />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default EmployeePromoConsole;