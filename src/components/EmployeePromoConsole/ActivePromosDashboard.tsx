import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Switch } from '@/components/ui/switch';
import { Play, Pause, Edit, Trash2, Eye, TrendingUp } from 'lucide-react';

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

interface ActivePromosDashboardProps {
  promos: ActivePromo[];
  onTogglePromo: (id: string, active: boolean) => void;
  onEditPromo: (id: string) => void;
  onEndPromo: (id: string) => void;
}

const ActivePromosDashboard = ({ 
  promos, 
  onTogglePromo, 
  onEditPromo, 
  onEndPromo 
}: ActivePromosDashboardProps) => {
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

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5" />
            Active Promotions Dashboard
          </div>
          <Badge variant="outline" className="text-xs">
            {promos.filter(p => p.status === 'active').length} Active
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
                <TableHead className="text-right">Usage</TableHead>
                <TableHead className="text-right">Revenue</TableHead>
                <TableHead className="text-center">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {promos.map((promo) => (
                <TableRow key={promo.id}>
                  <TableCell className="font-mono text-sm">{promo.sku}</TableCell>
                  <TableCell className="font-medium max-w-48 truncate">
                    {promo.productName}
                  </TableCell>
                  <TableCell>{getPromoTypeDisplay(promo.promoType)}</TableCell>
                  <TableCell className="font-semibold">
                    {promo.promoType === 'percentage' ? `${promo.discount}%` : `$${promo.discount}`}
                  </TableCell>
                  <TableCell>
                    {getStatusBadge(promo.status)}
                  </TableCell>
                  <TableCell className="text-right font-mono">
                    {promo.usage}
                  </TableCell>
                  <TableCell className="text-right font-mono text-success">
                    ${promo.revenue.toLocaleString()}
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center justify-center gap-1">
                      {/* Toggle Active/Pause */}
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
              ))}
            </TableBody>
          </Table>
        </div>
        
        {promos.length === 0 && (
          <div className="text-center py-8 text-muted-foreground">
            No active promotions found. Create your first promotion above.
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default ActivePromosDashboard;