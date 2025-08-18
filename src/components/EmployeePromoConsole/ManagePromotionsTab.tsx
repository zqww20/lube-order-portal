import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Switch } from '@/components/ui/switch';
import { Progress } from '@/components/ui/progress';
import { Edit, Trash2, TrendingUp, DollarSign, Users, Calendar } from 'lucide-react';

interface ActivePromo {
  id: string;
  sku: string;
  productName: string;
  promoType: string;
  discount: number;
  status: 'active' | 'paused' | 'ended';
  startDate: string;
  endDate?: string;
  usage: number;
  revenue: number;
}

interface ManagePromotionsTabProps {
  promos: ActivePromo[];
  onTogglePromo: (id: string, active: boolean) => void;
  onEditPromo: (id: string) => void;
  onEndPromo: (id: string) => void;
}

const ManagePromotionsTab = ({ 
  promos, 
  onTogglePromo, 
  onEditPromo, 
  onEndPromo 
}: ManagePromotionsTabProps) => {
  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'active':
        return <Badge className="bg-success">Active</Badge>;
      case 'paused':
        return <Badge variant="secondary" className="bg-warning text-warning-foreground">Paused</Badge>;
      case 'ended':
        return <Badge variant="destructive">Ended</Badge>;
      default:
        return <Badge variant="outline">Unknown</Badge>;
    }
  };

  const getPromoTypeDisplay = (type: string) => {
    switch (type) {
      case 'percentage':
        return 'Percentage Off';
      case 'fixed':
        return 'Fixed Amount';
      case 'bogo':
        return 'BOGO';
      case 'bundle':
        return 'Bundle Deal';
      case 'clearance':
        return 'Clearance';
      default:
        return type;
    }
  };

  const activePromos = promos.filter(p => p.status === 'active');
  const totalRevenue = promos.reduce((sum, p) => sum + p.revenue, 0);
  const totalUsage = promos.reduce((sum, p) => sum + p.usage, 0);

  return (
    <div className="space-y-6">
      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Active Promos</p>
                <p className="text-2xl font-bold">{activePromos.length}</p>
              </div>
              <TrendingUp className="h-8 w-8 text-muted-foreground" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Revenue</p>
                <p className="text-2xl font-bold text-success">${totalRevenue.toLocaleString()}</p>
              </div>
              <DollarSign className="h-8 w-8 text-muted-foreground" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Usage</p>
                <p className="text-2xl font-bold">{totalUsage}</p>
              </div>
              <Users className="h-8 w-8 text-muted-foreground" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Avg Revenue</p>
                <p className="text-2xl font-bold">
                  ${promos.length > 0 ? Math.round(totalRevenue / promos.length).toLocaleString() : '0'}
                </p>
              </div>
              <Calendar className="h-8 w-8 text-muted-foreground" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Promotions Table with Performance */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5" />
              Active Promotions with Performance
            </div>
            <Badge variant="outline" className="text-xs">
              {activePromos.length} Active
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>SKU</TableHead>
                  <TableHead>Product</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Discount</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Performance</TableHead>
                  <TableHead className="text-center">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {promos.map((promo) => {
                  const performanceScore = Math.min(100, (promo.revenue / 1000) * 20); // Simple calculation
                  return (
                    <TableRow key={promo.id}>
                      <TableCell className="font-mono text-sm">{promo.sku}</TableCell>
                      <TableCell className="font-medium max-w-48">
                        <div>
                          <div className="truncate">{promo.productName}</div>
                          <div className="text-xs text-muted-foreground">
                            {promo.usage} uses • ${promo.revenue.toLocaleString()} revenue
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>{getPromoTypeDisplay(promo.promoType)}</TableCell>
                      <TableCell className="font-semibold">
                        {promo.promoType === 'percentage' ? `${promo.discount}%` : `$${promo.discount}`}
                      </TableCell>
                      <TableCell>
                        {getStatusBadge(promo.status)}
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="space-y-1">
                          <div className="flex items-center justify-end gap-2">
                            <span className="text-xs text-muted-foreground">Performance</span>
                            <span className="text-sm font-medium">{Math.round(performanceScore)}%</span>
                          </div>
                          <Progress value={performanceScore} className="h-1 w-20" />
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center justify-center gap-1">
                          <div className="flex items-center gap-2">
                            <Switch
                              checked={promo.status === 'active'}
                              onCheckedChange={(checked) => onTogglePromo(promo.id, checked)}
                              disabled={promo.status === 'ended'}
                            />
                          </div>
                          
                          <div className="flex gap-1">
                            <Button 
                              variant="outline" 
                              size="sm"
                              onClick={() => onEditPromo(promo.id)}
                            >
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button 
                              variant="outline" 
                              size="sm"
                              onClick={() => onEndPromo(promo.id)}
                              disabled={promo.status === 'ended'}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </div>
          
          {promos.length === 0 && (
            <div className="text-center py-8 text-muted-foreground">
              No promotions found. Create your first promotion in the "Create Promotion" tab.
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default ManagePromotionsTab;