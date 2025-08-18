import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
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

interface AnalyticsReportsTabProps {
  data: AnalyticsData;
}

const AnalyticsReportsTab = ({ data }: AnalyticsReportsTabProps) => {
  const COLORS = ['hsl(192 77% 59%)', 'hsl(162 100% 38%)', 'hsl(39 100% 67%)', 'hsl(0 79% 69%)', 'hsl(271 44% 52%)'];

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
    <div className="space-y-6">
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

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Revenue Trends */}
        <Card>
          <CardHeader>
            <CardTitle>Revenue Trends (Last 6 Months)</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={data.revenueByMonth}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Line 
                    type="monotone" 
                    dataKey="revenue" 
                    stroke="hsl(192 77% 59%)" 
                    strokeWidth={2}
                    name="Total Revenue"
                  />
                  <Line 
                    type="monotone" 
                    dataKey="promoRevenue" 
                    stroke="hsl(162 100% 38%)" 
                    strokeWidth={2}
                    name="Promo Revenue"
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Promo Type Distribution */}
        <Card>
          <CardHeader>
            <CardTitle>Promotion Type Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="h-48">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={data.promoTypeDistribution}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      outerRadius={60}
                      fill="hsl(192 77% 59%)"
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
              <div className="grid grid-cols-2 gap-2">
                {data.promoTypeDistribution.map((item, index) => (
                  <div key={item.name} className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div 
                        className="w-3 h-3 rounded-full"
                        style={{ backgroundColor: COLORS[index % COLORS.length] }}
                      />
                      <span className="text-xs font-medium">{item.name}</span>
                    </div>
                    <Badge variant="outline" className="text-xs">{item.value}%</Badge>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Top Performing Promos */}
      <Card>
        <CardHeader>
          <CardTitle>Top Performing Promotions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {data.topPerformingPromos.map((promo, index) => (
              <div key={promo.name} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center gap-3">
                  <Badge variant="outline">#{index + 1}</Badge>
                  <div>
                    <p className="font-medium text-sm">{promo.name}</p>
                    <p className="text-xs text-muted-foreground">{promo.usage} uses</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-bold text-success text-sm">${promo.revenue.toLocaleString()}</p>
                  <p className="text-xs text-muted-foreground">Revenue</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

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
    </div>
  );
};

export default AnalyticsReportsTab;