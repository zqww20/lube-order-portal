import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Search, Filter, Eye, Package } from 'lucide-react';

interface Order {
  id: string;
  customerName: string;
  products: Array<{
    name: string;
    quantity: number;
  }>;
  totalValue: number;
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  orderDate: string;
  deliveryDate?: string;
  warehouse: string;
}

const EmployeeOrders = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  // Mock data - would be fetched from API
  const orders: Order[] = [
    {
      id: 'ORD-2024-0156',
      customerName: 'Atlantic Marine Services',
      products: [
        { name: 'Marine Gear Oil', quantity: 24 },
        { name: 'Hydraulic Fluid ISO 46', quantity: 12 }
      ],
      totalValue: 1250.00,
      status: 'shipped',
      orderDate: '2024-01-16',
      deliveryDate: '2024-01-18',
      warehouse: 'Dartmouth'
    },
    {
      id: 'ORD-2024-0157',
      customerName: 'Industrial Solutions Ltd',
      products: [
        { name: 'Premium Engine Oil 5W-30', quantity: 48 }
      ],
      totalValue: 890.50,
      status: 'processing',
      orderDate: '2024-01-15',
      warehouse: 'Moncton'
    },
    {
      id: 'ORD-2024-0158',
      customerName: 'Maritime Transport Co',
      products: [
        { name: 'Multi-Purpose Grease', quantity: 36 },
        { name: 'Engine Oil 10W-40', quantity: 24 }
      ],
      totalValue: 2150.75,
      status: 'delivered',
      orderDate: '2024-01-14',
      deliveryDate: '2024-01-16',
      warehouse: 'Dartmouth'
    },
    {
      id: 'ORD-2024-0159',
      customerName: 'Coastal Construction',
      products: [
        { name: 'Hydraulic Fluid ISO 68', quantity: 18 }
      ],
      totalValue: 675.25,
      status: 'pending',
      orderDate: '2024-01-13',
      warehouse: 'Moncton'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'delivered': return 'default';
      case 'shipped': return 'secondary';
      case 'processing': return 'secondary';
      case 'pending': return 'outline';
      case 'cancelled': return 'destructive';
      default: return 'secondary';
    }
  };

  const filteredOrders = orders.filter(order => {
    const matchesSearch = order.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         order.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || order.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-foreground">All Orders</h1>
          <p className="text-muted-foreground">Track and manage all customer orders</p>
        </div>
      </div>

      {/* Filters */}
      <Card className="mb-6">
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Search by customer name or order ID..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full md:w-48">
                <Filter className="h-4 w-4 mr-2" />
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="processing">Processing</SelectItem>
                <SelectItem value="shipped">Shipped</SelectItem>
                <SelectItem value="delivered">Delivered</SelectItem>
                <SelectItem value="cancelled">Cancelled</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Orders Table */}
      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Order ID</TableHead>
                <TableHead>Customer</TableHead>
                <TableHead>Products</TableHead>
                <TableHead>Value</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Order Date</TableHead>
                <TableHead>Warehouse</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredOrders.map((order) => (
                <TableRow key={order.id} className="hover:bg-muted/50">
                  <TableCell className="font-medium">{order.id}</TableCell>
                  <TableCell>
                    <div className="font-medium">{order.customerName}</div>
                  </TableCell>
                  <TableCell>
                    <div className="space-y-1">
                      {order.products.map((product, idx) => (
                        <div key={idx} className="text-sm">
                          {product.name} ({product.quantity})
                        </div>
                      ))}
                    </div>
                  </TableCell>
                  <TableCell className="font-semibold">
                    ${order.totalValue.toFixed(2)}
                  </TableCell>
                  <TableCell>
                    <Badge variant={getStatusColor(order.status)}>
                      {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                    </Badge>
                  </TableCell>
                  <TableCell>{order.orderDate}</TableCell>
                  <TableCell>
                    <Badge variant="outline">{order.warehouse}</Badge>
                  </TableCell>
                  <TableCell>
                    <Button 
                      size="sm" 
                      variant="outline"
                      onClick={() => window.location.href = `/employee/orders/${order.id}`}
                    >
                      <Eye className="h-4 w-4 mr-1" />
                      View
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {filteredOrders.length === 0 && (
        <div className="text-center py-12">
          <Package className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
          <p className="text-muted-foreground text-lg">No orders found matching your criteria.</p>
        </div>
      )}
    </div>
  );
};

export default EmployeeOrders;