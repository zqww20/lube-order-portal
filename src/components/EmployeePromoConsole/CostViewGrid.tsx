import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Eye, Edit, TrendingUp, TrendingDown } from 'lucide-react';

interface CostData {
  sku: string;
  productName: string;
  avgCost: number;
  stdPrice: number;
  marginPercent: number;
  status: 'active' | 'discontinued' | 'low-stock';
}

interface CostViewGridProps {
  costData: CostData[];
}

const CostViewGrid = ({ costData }: CostViewGridProps) => {
  const getMarginColor = (margin: number) => {
    if (margin >= 30) return 'text-success';
    if (margin >= 20) return 'text-warning';
    return 'text-destructive';
  };

  const getMarginIcon = (margin: number) => {
    return margin >= 25 ? <TrendingUp className="h-4 w-4" /> : <TrendingDown className="h-4 w-4" />;
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'active':
        return <Badge variant="default" className="bg-success">Active</Badge>;
      case 'discontinued':
        return <Badge variant="destructive">Discontinued</Badge>;
      case 'low-stock':
        return <Badge variant="secondary" className="bg-warning text-warning-foreground">Low Stock</Badge>;
      default:
        return <Badge variant="outline">Unknown</Badge>;
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Eye className="h-5 w-5" />
          Cost View & Margin Analysis
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>SKU</TableHead>
                <TableHead>Product Name</TableHead>
                <TableHead className="text-right">Avg Cost</TableHead>
                <TableHead className="text-right">Std Price</TableHead>
                <TableHead className="text-right">Margin %</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-center">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {costData.map((item) => (
                <TableRow key={item.sku}>
                  <TableCell className="font-mono text-sm">{item.sku}</TableCell>
                  <TableCell className="font-medium">{item.productName}</TableCell>
                  <TableCell className="text-right font-mono">
                    ${item.avgCost.toFixed(2)}
                  </TableCell>
                  <TableCell className="text-right font-mono">
                    ${item.stdPrice.toFixed(2)}
                  </TableCell>
                  <TableCell className={`text-right font-semibold ${getMarginColor(item.marginPercent)}`}>
                    <div className="flex items-center justify-end gap-1">
                      {getMarginIcon(item.marginPercent)}
                      {item.marginPercent.toFixed(1)}%
                    </div>
                  </TableCell>
                  <TableCell>
                    {getStatusBadge(item.status)}
                  </TableCell>
                  <TableCell className="text-center">
                    <div className="flex justify-center gap-1">
                      <Button variant="outline" size="sm">
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button variant="outline" size="sm">
                        <Edit className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
};

export default CostViewGrid;