import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import CreatePromotionTab from '@/components/EmployeePromoConsole/CreatePromotionTab';
import ManagePromotionsTab from '@/components/EmployeePromoConsole/ManagePromotionsTab';
import AnalyticsReportsTab from '@/components/EmployeePromoConsole/AnalyticsReportsTab';

// Mock data
const mockCostData = [
  {
    sku: 'LUB-5W30-001',
    productName: 'Premium Synthetic Engine Oil 5W-30',
    avgCost: 32.50,
    stdPrice: 45.99,
    marginPercent: 29.3,
    status: 'active' as const
  },
  {
    sku: 'HYD-ISO46-205',
    productName: 'Industrial Hydraulic Fluid ISO 46',
    avgCost: 12.80,
    stdPrice: 16.50,
    marginPercent: 22.4,
    status: 'active' as const
  },
  {
    sku: 'GRE-MP2-18K',
    productName: 'Multi-Purpose Grease NLGI 2',
    avgCost: 15.20,
    stdPrice: 18.50,
    marginPercent: 17.8,
    status: 'low-stock' as const
  },
  {
    sku: 'DEF-AD32-1K',
    productName: 'Diesel Exhaust Fluid AdBlue',
    avgCost: 8.95,
    stdPrice: 12.99,
    marginPercent: 31.1,
    status: 'active' as const
  },
  {
    sku: 'SOL-VAR-20L',
    productName: 'Varsol Cleaning Solvent',
    avgCost: 18.75,
    stdPrice: 24.99,
    marginPercent: 25.0,
    status: 'discontinued' as const
  }
];

const mockActivePromos = [
  {
    id: '1',
    sku: 'LUB-5W30-001',
    productName: 'Premium Synthetic Engine Oil 5W-30',
    promoType: 'percentage',
    discount: 15,
    status: 'active' as const,
    startDate: '2024-01-15',
    endDate: '2024-02-15',
    usage: 127,
    revenue: 4850
  },
  {
    id: '2',
    sku: 'HYD-ISO46-205',
    productName: 'Industrial Hydraulic Fluid ISO 46',
    promoType: 'clearance',
    discount: 25,
    status: 'active' as const,
    startDate: '2024-01-20',
    usage: 89,
    revenue: 2340
  },
  {
    id: '3',
    sku: 'GRE-MP2-18K',
    productName: 'Multi-Purpose Grease NLGI 2',
    promoType: 'bundle',
    discount: 20,
    status: 'paused' as const,
    startDate: '2024-01-10',
    endDate: '2024-01-31',
    usage: 45,
    revenue: 1250
  }
];

const mockAnalyticsData = {
  attachRate: 23.5,
  aovDelta: 34.60,
  deadStockDays: 28,
  topPerformingPromos: [
    { name: '15% Off Engine Oils', revenue: 4850, usage: 127 },
    { name: '25% Clearance Hydraulics', revenue: 2340, usage: 89 },
    { name: 'BOGO Shop Towels', revenue: 1890, usage: 156 },
    { name: 'Bundle Deal Filters', revenue: 1250, usage: 45 }
  ],
  revenueByMonth: [
    { month: 'Jan', revenue: 45000, promoRevenue: 8500 },
    { month: 'Feb', revenue: 52000, promoRevenue: 12300 },
    { month: 'Mar', revenue: 48000, promoRevenue: 9800 },
    { month: 'Apr', revenue: 55000, promoRevenue: 15200 },
    { month: 'May', revenue: 61000, promoRevenue: 18900 },
    { month: 'Jun', revenue: 58000, promoRevenue: 16400 }
  ],
  promoTypeDistribution: [
    { name: 'Percentage Off', value: 35, color: 'hsl(192 77% 59%)' },
    { name: 'Clearance', value: 25, color: 'hsl(162 100% 38%)' },
    { name: 'Bundle Deals', value: 20, color: 'hsl(39 100% 67%)' },
    { name: 'BOGO', value: 12, color: 'hsl(0 79% 69%)' },
    { name: 'Fixed Amount', value: 8, color: 'hsl(271 44% 52%)' }
  ]
};

const EmployeePromoConsole = () => {
  const [activePromos, setActivePromos] = useState(mockActivePromos);

  const handleCreatePromo = (promoData: any) => {
    const newPromo = {
      id: Date.now().toString(),
      sku: promoData.sku,
      productName: `Product for ${promoData.sku}`,
      promoType: promoData.promoType,
      discount: promoData.discountPercent,
      status: 'active' as const,
      startDate: new Date().toISOString().split('T')[0],
      endDate: promoData.expiryDate?.toISOString().split('T')[0],
      usage: 0,
      revenue: 0
    };
    
    setActivePromos(prev => [...prev, newPromo]);
  };

  const handleTogglePromo = (id: string, active: boolean) => {
    setActivePromos(prev => prev.map(promo => 
      promo.id === id 
        ? { ...promo, status: active ? 'active' as any : 'paused' as any }
        : promo
    ) as any);
  };

  const handleEditPromo = (id: string) => {
    console.log('Edit promo:', id);
  };

  const handleEndPromo = (id: string) => {
    setActivePromos(prev => prev.map(promo => 
      promo.id === id 
        ? { ...promo, status: 'ended' as any }
        : promo
    ) as any);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-heading font-bold text-foreground mb-2">
          Employee Promotion Console
        </h1>
        <p className="text-muted-foreground">
          Manage pricing, create promotions, and analyze performance
        </p>
      </div>

      <Tabs defaultValue="create" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="create">Create Promotion</TabsTrigger>
          <TabsTrigger value="manage">Manage Promotions</TabsTrigger>
          <TabsTrigger value="analytics">Analytics & Reports</TabsTrigger>
        </TabsList>

        <TabsContent value="create" className="mt-6">
          <CreatePromotionTab 
            costData={mockCostData} 
            onCreatePromo={handleCreatePromo} 
          />
        </TabsContent>

        <TabsContent value="manage" className="mt-6">
          <ManagePromotionsTab
            promos={activePromos}
            onTogglePromo={handleTogglePromo}
            onEditPromo={handleEditPromo}
            onEndPromo={handleEndPromo}
          />
        </TabsContent>

        <TabsContent value="analytics" className="mt-6">
          <AnalyticsReportsTab data={mockAnalyticsData} />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default EmployeePromoConsole;