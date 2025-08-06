import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Progress } from '@/components/ui/progress';
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from 'recharts';
import {
  TrendingUp,
  TrendingDown,
  Target,
  Users,
  DollarSign,
  Clock,
  Award,
  Calendar,
  Filter,
  Download
} from 'lucide-react';

// Performance data interfaces
interface PerformanceMetric {
  title: string;
  value: string;
  change: string;
  trend: 'up' | 'down' | 'neutral';
  target?: string;
  icon: React.ComponentType<{ className?: string }>;
}

interface TeamMember {
  name: string;
  role: string;
  quotesProcessed: number;
  revenue: number;
  responseTime: number;
  satisfaction: number;
  avatar: string;
}

const PerformanceExtension = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('30d');
  const [selectedTeam, setSelectedTeam] = useState('all');

  // Performance metrics data
  const performanceMetrics: PerformanceMetric[] = [
    {
      title: 'Quote Conversion Rate',
      value: '73.2%',
      change: '+5.8%',
      trend: 'up',
      target: '75%',
      icon: Target
    },
    {
      title: 'Avg. Response Time',
      value: '1.8h',
      change: '-0.4h',
      trend: 'up',
      target: '< 2h',
      icon: Clock
    },
    {
      title: 'Customer Satisfaction',
      value: '4.7/5',
      change: '+0.3',
      trend: 'up',
      target: '4.5/5',
      icon: Award
    },
    {
      title: 'Revenue per Quote',
      value: '$18,450',
      change: '+12%',
      trend: 'up',
      target: '$20K',
      icon: DollarSign
    }
  ];

  // Revenue trend data
  const revenueData = [
    { month: 'Jan', revenue: 680000, quotes: 120 },
    { month: 'Feb', revenue: 720000, quotes: 135 },
    { month: 'Mar', revenue: 790000, quotes: 142 },
    { month: 'Apr', revenue: 850000, quotes: 158 },
    { month: 'May', revenue: 820000, quotes: 145 },
    { month: 'Jun', revenue: 920000, quotes: 172 }
  ];

  // Team performance data
  const teamPerformance: TeamMember[] = [
    {
      name: 'Sarah Chen',
      role: 'Senior Sales Rep',
      quotesProcessed: 45,
      revenue: 285000,
      responseTime: 1.2,
      satisfaction: 4.9,
      avatar: '/lovable-uploads/55e4f4d0-f564-42e5-99d3-e7bad233d344.png'
    },
    {
      name: 'Mike Rodriguez',
      role: 'Account Manager',
      quotesProcessed: 38,
      revenue: 220000,
      responseTime: 1.8,
      satisfaction: 4.6,
      avatar: '/lovable-uploads/5a3219f9-f6bb-4b5b-936f-6484a5d764f6.png'
    },
    {
      name: 'Emma Thompson',
      role: 'Sales Specialist',
      quotesProcessed: 52,
      revenue: 310000,
      responseTime: 1.5,
      satisfaction: 4.8,
      avatar: '/lovable-uploads/73e1d39d-4ed6-4eb1-9866-b1671d7f685a.png'
    }
  ];

  // Department performance data
  const departmentData = [
    { name: 'Marine Electronics', value: 35, color: 'hsl(var(--primary))' },
    { name: 'Safety Equipment', value: 25, color: 'hsl(var(--secondary))' },
    { name: 'Navigation', value: 20, color: 'hsl(var(--accent))' },
    { name: 'Communication', value: 20, color: 'hsl(var(--muted))' }
  ];

  const PerformanceCard = ({ metric }: { metric: PerformanceMetric }) => (
    <Card className="hover:shadow-md transition-shadow">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{metric.title}</CardTitle>
        <metric.icon className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{metric.value}</div>
        <div className="flex items-center space-x-2 text-xs">
          <span className={metric.trend === 'up' ? 'text-success' : 'text-destructive'}>
            {metric.trend === 'up' ? <TrendingUp className="h-3 w-3 inline mr-1" /> : <TrendingDown className="h-3 w-3 inline mr-1" />}
            {metric.change}
          </span>
          {metric.target && (
            <Badge variant="outline" className="text-xs">
              Target: {metric.target}
            </Badge>
          )}
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col space-y-4 md:flex-row md:items-center md:justify-between md:space-y-0">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Performance Analytics</h2>
          <p className="text-muted-foreground">
            Comprehensive insights into team and business performance
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
            <SelectTrigger className="w-32">
              <SelectValue placeholder="Period" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="7d">Last 7 days</SelectItem>
              <SelectItem value="30d">Last 30 days</SelectItem>
              <SelectItem value="90d">Last 3 months</SelectItem>
              <SelectItem value="1y">Last year</SelectItem>
            </SelectContent>
          </Select>
          <Select value={selectedTeam} onValueChange={setSelectedTeam}>
            <SelectTrigger className="w-32">
              <SelectValue placeholder="Team" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Teams</SelectItem>
              <SelectItem value="sales">Sales</SelectItem>
              <SelectItem value="support">Support</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
        </div>
      </div>

      {/* Performance Metrics Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {performanceMetrics.map((metric, index) => (
          <PerformanceCard key={index} metric={metric} />
        ))}
      </div>

      {/* Performance Analysis Tabs */}
      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="team">Team Performance</TabsTrigger>
          <TabsTrigger value="trends">Trends & Forecasts</TabsTrigger>
          <TabsTrigger value="goals">Goals & Targets</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2">
            {/* Revenue Trend Chart */}
            <Card>
              <CardHeader>
                <CardTitle>Revenue & Quote Trends</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={revenueData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Line 
                      type="monotone" 
                      dataKey="revenue" 
                      stroke="hsl(var(--primary))" 
                      strokeWidth={2}
                      name="Revenue ($)"
                    />
                    <Line 
                      type="monotone" 
                      dataKey="quotes" 
                      stroke="hsl(var(--secondary))" 
                      strokeWidth={2}
                      name="Quotes"
                    />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Department Performance */}
            <Card>
              <CardHeader>
                <CardTitle>Performance by Department</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={departmentData}
                      cx="50%"
                      cy="50%"
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                      label={({ name, value }) => `${name}: ${value}%`}
                    >
                      {departmentData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="team" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Team Member Performance</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {teamPerformance.map((member, index) => (
                  <div key={index} className="flex items-center space-x-4 p-4 border rounded-lg">
                    <img 
                      src={member.avatar} 
                      alt={member.name}
                      className="w-12 h-12 rounded-full object-cover"
                    />
                    <div className="flex-1 space-y-2">
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="font-medium">{member.name}</h4>
                          <p className="text-sm text-muted-foreground">{member.role}</p>
                        </div>
                        <Badge variant="outline">
                          {member.satisfaction}/5 ⭐
                        </Badge>
                      </div>
                      <div className="grid grid-cols-3 gap-4 text-sm">
                        <div>
                          <p className="text-muted-foreground">Quotes</p>
                          <p className="font-medium">{member.quotesProcessed}</p>
                        </div>
                        <div>
                          <p className="text-muted-foreground">Revenue</p>
                          <p className="font-medium">${member.revenue.toLocaleString()}</p>
                        </div>
                        <div>
                          <p className="text-muted-foreground">Response Time</p>
                          <p className="font-medium">{member.responseTime}h</p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="trends" className="space-y-6">
          <div className="grid gap-6 md:grid-cols-1">
            <Card>
              <CardHeader>
                <CardTitle>Monthly Performance Comparison</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={400}>
                  <BarChart data={revenueData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="revenue" fill="hsl(var(--primary))" name="Revenue ($)" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="goals" className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Monthly Goals Progress</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-sm font-medium">Revenue Target</span>
                    <span className="text-sm text-muted-foreground">$920K / $1M</span>
                  </div>
                  <Progress value={92} />
                </div>
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-sm font-medium">Quotes Processed</span>
                    <span className="text-sm text-muted-foreground">172 / 200</span>
                  </div>
                  <Progress value={86} />
                </div>
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-sm font-medium">Customer Satisfaction</span>
                    <span className="text-sm text-muted-foreground">4.7 / 5.0</span>
                  </div>
                  <Progress value={94} />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Team Rankings</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {teamPerformance
                    .sort((a, b) => b.revenue - a.revenue)
                    .map((member, index) => (
                      <div key={index} className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <Badge variant={index === 0 ? "default" : "outline"}>
                            #{index + 1}
                          </Badge>
                          <span className="font-medium">{member.name}</span>
                        </div>
                        <span className="text-sm text-muted-foreground">
                          ${member.revenue.toLocaleString()}
                        </span>
                      </div>
                    ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default PerformanceExtension;