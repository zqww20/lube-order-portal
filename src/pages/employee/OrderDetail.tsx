import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { ArrowLeft, Save, Package, Truck, MapPin, Calendar, DollarSign, User } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface OrderProduct {
  name: string;
  quantity: number;
  price: number;
}

interface OrderDetail {
  id: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  products: OrderProduct[];
  totalValue: number;
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  orderDate: string;
  deliveryDate?: string;
  warehouse: string;
  shippingAddress: string;
  trackingNumber?: string;
  notes?: string;
}

const EmployeeOrderDetail = () => {
  const { orderId } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();

  // Mock data - would be fetched from API
  const [order, setOrder] = useState<OrderDetail>({
    id: orderId || 'ORD-2024-0156',
    customerName: 'Atlantic Marine Services',
    customerEmail: 'procurement@atlanticmarine.com',
    customerPhone: '(902) 555-0123',
    products: [
      { name: 'Marine Gear Oil', quantity: 24, price: 45.50 },
      { name: 'Hydraulic Fluid ISO 46', quantity: 12, price: 32.25 }
    ],
    totalValue: 1250.00,
    status: 'shipped',
    orderDate: '2024-01-16',
    deliveryDate: '2024-01-18',
    warehouse: 'Dartmouth',
    shippingAddress: '1234 Harbor Drive, Halifax, NS B3H 2Y8',
    trackingNumber: 'CP123456789CA',
    notes: 'Customer requested expedited shipping for urgent maintenance.'
  });

  const [isEditing, setIsEditing] = useState(false);

  const handleSave = () => {
    // API call to save changes would go here
    setIsEditing(false);
    toast({
      title: "Order Updated",
      description: "Order details have been successfully updated.",
    });
  };

  const handleStatusChange = (newStatus: string) => {
    setOrder(prev => ({ ...prev, status: newStatus as any }));
  };

  const handleWarehouseChange = (newWarehouse: string) => {
    setOrder(prev => ({ ...prev, warehouse: newWarehouse }));
  };

  const handleDeliveryDateChange = (newDate: string) => {
    setOrder(prev => ({ ...prev, deliveryDate: newDate }));
  };

  const handleTrackingNumberChange = (newTracking: string) => {
    setOrder(prev => ({ ...prev, trackingNumber: newTracking }));
  };

  const handleNotesChange = (newNotes: string) => {
    setOrder(prev => ({ ...prev, notes: newNotes }));
  };

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

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-4">
          <Button variant="outline" size="sm" onClick={() => navigate('/employee/orders')}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Orders
          </Button>
          <div>
            <h1 className="text-3xl font-bold text-foreground">Order {order.id}</h1>
            <p className="text-muted-foreground">Manage order details and status</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          {isEditing ? (
            <>
              <Button variant="outline" onClick={() => setIsEditing(false)}>
                Cancel
              </Button>
              <Button onClick={handleSave}>
                <Save className="h-4 w-4 mr-2" />
                Save Changes
              </Button>
            </>
          ) : (
            <Button onClick={() => setIsEditing(true)}>
              Edit Order
            </Button>
          )}
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {/* Order Status & Details */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Package className="h-5 w-5" />
              Order Status & Details
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>Status</Label>
                {isEditing ? (
                  <Select value={order.status} onValueChange={handleStatusChange}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="pending">Pending</SelectItem>
                      <SelectItem value="processing">Processing</SelectItem>
                      <SelectItem value="shipped">Shipped</SelectItem>
                      <SelectItem value="delivered">Delivered</SelectItem>
                      <SelectItem value="cancelled">Cancelled</SelectItem>
                    </SelectContent>
                  </Select>
                ) : (
                  <div className="mt-1">
                    <Badge variant={getStatusColor(order.status)}>
                      {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                    </Badge>
                  </div>
                )}
              </div>
              <div>
                <Label>Warehouse</Label>
                {isEditing ? (
                  <Select value={order.warehouse} onValueChange={handleWarehouseChange}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Dartmouth">Dartmouth</SelectItem>
                      <SelectItem value="Moncton">Moncton</SelectItem>
                      <SelectItem value="Charlottetown">Charlottetown</SelectItem>
                    </SelectContent>
                  </Select>
                ) : (
                  <p className="mt-1 text-sm">{order.warehouse}</p>
                )}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>Order Date</Label>
                <p className="mt-1 text-sm">{order.orderDate}</p>
              </div>
              <div>
                <Label>Delivery Date</Label>
                {isEditing ? (
                  <Input
                    type="date"
                    value={order.deliveryDate || ''}
                    onChange={(e) => handleDeliveryDateChange(e.target.value)}
                  />
                ) : (
                  <p className="mt-1 text-sm">{order.deliveryDate || 'Not set'}</p>
                )}
              </div>
            </div>

            <div>
              <Label>Tracking Number</Label>
              {isEditing ? (
                <Input
                  value={order.trackingNumber || ''}
                  onChange={(e) => handleTrackingNumberChange(e.target.value)}
                  placeholder="Enter tracking number"
                />
              ) : (
                <p className="mt-1 text-sm font-mono">{order.trackingNumber || 'Not assigned'}</p>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Customer Information */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <User className="h-5 w-5" />
              Customer Information
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label>Customer Name</Label>
              <p className="mt-1 font-medium">{order.customerName}</p>
            </div>
            <div>
              <Label>Email</Label>
              <p className="mt-1 text-sm">{order.customerEmail}</p>
            </div>
            <div>
              <Label>Phone</Label>
              <p className="mt-1 text-sm">{order.customerPhone}</p>
            </div>
            <div>
              <Label>Shipping Address</Label>
              <p className="mt-1 text-sm">{order.shippingAddress}</p>
            </div>
          </CardContent>
        </Card>

        {/* Products */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Package className="h-5 w-5" />
              Order Items
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {order.products.map((product, index) => (
                <div key={index} className="flex justify-between items-center py-2 border-b last:border-b-0">
                  <div>
                    <p className="font-medium">{product.name}</p>
                    <p className="text-sm text-muted-foreground">Quantity: {product.quantity}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">${(product.price * product.quantity).toFixed(2)}</p>
                    <p className="text-sm text-muted-foreground">${product.price.toFixed(2)} each</p>
                  </div>
                </div>
              ))}
              <Separator />
              <div className="flex justify-between items-center font-bold text-lg">
                <span>Total</span>
                <span>${order.totalValue.toFixed(2)}</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Notes */}
        <Card>
          <CardHeader>
            <CardTitle>Order Notes</CardTitle>
          </CardHeader>
          <CardContent>
            {isEditing ? (
              <textarea
                className="w-full min-h-24 p-3 border rounded-md resize-none"
                value={order.notes || ''}
                onChange={(e) => handleNotesChange(e.target.value)}
                placeholder="Add order notes..."
              />
            ) : (
              <p className="text-sm">{order.notes || 'No notes added'}</p>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default EmployeeOrderDetail;