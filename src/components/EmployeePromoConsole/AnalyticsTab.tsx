import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from 'recharts';
import { TrendingUp, TrendingDown, DollarSign, Package, Clock, Target } from 'lucide-react';

interface AnalyticsData {
  attachRate: number;
  aovDelta: number;
  deadStockDays: number;
  topPerformingPromos: Array<{
    name: string;
    revenue: number;
    usage: number;
  }>;
  revenueByMonth: Array<{
    month: string;
    revenue: number;
    promoRevenue: number;
  }>;
  promoTypeDistribution: Array<{
    name: string;
    value: number;
    color: string;
  }>;
}

interface AnalyticsTabProps {
  data: AnalyticsData;
}

const AnalyticsTab = ({ data }: AnalyticsTabProps) => {
  const COLORS = ['#0091FF', '#00C08D', '#FFA500', '#FF6B6B', '#9B59B6'];

  const StatCard = ({ 
    title, 
    value, 
    change, 
    icon: Icon, 
    trend 
  }: { 
    title: string; 
    value: string; 
    change?: string; 
    icon: any; 
    trend?: 'up' | 'down' | 'neutral';
  }) => (
    <Card>
      <CardContent className="p-4">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-muted-foreground">{title}</p>
            <p className="text-2xl font-bold">{value}</p>
            {change && (
              <div className="flex items-center gap-1 mt-1">
                {trend === 'up' && <TrendingUp className="h-4 w-4 text-success" />}
                {trend === 'down' && <TrendingDown className="h-4 w-4 text-destructive" />}
                <span className={`text-sm ${
                  trend === 'up' ? 'text-success' : 
                  trend === 'down' ? 'text-destructive' : 
                  'text-muted-foreground'
                }`}>
                  {change}
                </span>
              </div>
            )}
          </div>
          <Icon className="h-8 w-8 text-muted-foreground" />
        </div>
      </CardContent>
    </Card>
  );

  return (
    <Tabs defaultValue="overview" className="w-full">
      <TabsList className="grid w-full grid-cols-4">
        <TabsTrigger value="overview">Overview</TabsTrigger>
        <TabsTrigger value="performance">Performance</TabsTrigger>
        <TabsTrigger value="trends">Trends</TabsTrigger>
        <TabsTrigger value="inventory">Inventory</TabsTrigger>
      </TabsList>

      <TabsContent value="overview" className="space-y-6 mt-6">
        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard
            title="Attach Rate"
            value={`${data.attachRate}%`}
            change="+2.3%"
            icon={Target}
            trend="up"
          />
          <StatCard
            title="AOV Delta"
            value={`$${data.aovDelta}`}
            change="+$12.40"
            icon={DollarSign}
            trend="up"
          />
          <StatCard
            title="Dead Stock Days"
            value={`${data.deadStockDays}`}
            change="-5 days"
            icon={Clock}
            trend="up"
          />
          <StatCard
            title="Active Promos"
            value="12"
            change="+3"
            icon={Package}
            trend="up"
          />
        </div>

        {/* Promo Type Distribution */}
        <Card>
          <CardHeader>
            <CardTitle>Promotion Type Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={data.promoTypeDistribution}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {data.promoTypeDistribution.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="space-y-3">
                {data.promoTypeDistribution.map((item, index) => (
                  <div key={item.name} className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div 
                        className="w-3 h-3 rounded-full"
                        style={{ backgroundColor: COLORS[index % COLORS.length] }}
                      />
                      <span className="text-sm font-medium">{item.name}</span>
                    </div>
                    <Badge variant="outline">{item.value}%</Badge>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="performance" className="space-y-6 mt-6">
        {/* Top Performing Promos */}
        <Card>
          <CardHeader>
            <CardTitle>Top Performing Promotions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {data.topPerformingPromos.map((promo, index) => (
                <div key={promo.name} className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center gap-3">
                    <Badge variant="outline">#{index + 1}</Badge>
                    <div>
                      <p className="font-medium">{promo.name}</p>
                      <p className="text-sm text-muted-foreground">{promo.usage} uses</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-success">${promo.revenue.toLocaleString()}</p>
                    <p className="text-sm text-muted-foreground">Revenue</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="trends" className="space-y-6 mt-6">
        {/* Revenue Trends */}
        <Card>
          <CardHeader>
            <CardTitle>Revenue Trends (Last 12 Months)</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={data.revenueByMonth}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Line 
                    type="monotone" 
                    dataKey="revenue" 
                    stroke="#0091FF" 
                    strokeWidth={2}
                    name="Total Revenue"
                  />
                  <Line 
                    type="monotone" 
                    dataKey="promoRevenue" 
                    stroke="#00C08D" 
                    strokeWidth={2}
                    name="Promo Revenue"
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="inventory" className="space-y-6 mt-6">
        {/* Inventory Impact */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Stock Movement Impact</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm">Fast Moving Items</span>
                  <span className="text-sm font-medium">85%</span>
                </div>
                <Progress value={85} className="h-2" />
              </div>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm">Dead Stock Reduction</span>
                  <span className="text-sm font-medium text-success">+23%</span>
                </div>
                <Progress value={23} className="h-2" />
              </div>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm">Turnover Rate</span>
                  <span className="text-sm font-medium">4.2x</span>
                </div>
                <Progress value={70} className="h-2" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Clearance Effectiveness</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="text-center">
                <div className="text-3xl font-bold text-success">67%</div>
                <p className="text-sm text-muted-foreground">Success Rate</p>
              </div>
              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span>Items Cleared</span>
                  <span className="font-medium">142 / 210</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Avg. Days to Clear</span>
                  <span className="font-medium">12 Days</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Recovery Value</span>
                  <span className="font-medium text-success">$28,450</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </TabsContent>
    </Tabs>
  );
};

export default AnalyticsTab;