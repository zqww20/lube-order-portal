import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { ArrowLeft, Download, Truck, Package, MapPin, Calendar, Receipt, Phone, Mail, Link as LinkIcon, Clock } from 'lucide-react';
import WarehouseStagingStatus from '@/components/WarehouseStagingStatus';

interface OrderItem {
  id: string;
  name: string;
  category: string;
  quantity: number;
  unitPrice: number;
  totalPrice: number;
  image: string;
}

interface TrackingEvent {
  date: string;
  status: string;
  location: string;
  description: string;
}

interface OrderDetail {
  id: string;
  orderNumber: string;
  date: string;
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled' | 'backordered';
  total: number;
  subtotal: number;
  tax: number;
  shippingCost: number;
  emergencyDelivery: boolean;
  shippingAddress: string;
  billingAddress: string;
  erpReference?: string;
  trackingNumber?: string;
  carrier?: string;
  estimatedDelivery?: string;
  items: OrderItem[];
  tracking: TrackingEvent[];
  customerNotes?: string;
  internalNotes?: string;
  type?: 'sales' | 'backorder';
  relatedOrderId?: string;
}

// Mock data for different orders
const mockOrderDetails: Record<string, OrderDetail> = {
  '1': {
    id: '1',
    orderNumber: 'ORD-2024-001',
    date: '2024-01-15',
    status: 'delivered',
    subtotal: 255.96,
    tax: 20.48,
    shippingCost: 0.00,
    emergencyDelivery: false,
    total: 276.44,
    shippingAddress: '123 Industrial Park, Manufacturing District, Houston, TX 77001',
    billingAddress: '123 Industrial Park, Manufacturing District, Houston, TX 77001',
    erpReference: 'ERP-SO-2024-001',
    trackingNumber: 'TRK123456789',
    carrier: 'FedEx',
    estimatedDelivery: '2024-01-18',
    customerNotes: 'Please deliver to dock 3',
    internalNotes: 'Priority customer - expedite processing',
    items: [
      {
        id: '1',
        name: 'Premium Engine Oil 5W-30',
        category: 'Engine Oils',
        quantity: 4,
        unitPrice: 45.99,
        totalPrice: 183.96,
        image: '/placeholder.svg'
      },
      {
        id: '2',
        name: 'Industrial Hydraulic Fluid',
        category: 'Hydraulic Fluids',
        quantity: 2,
        unitPrice: 36.00,
        totalPrice: 72.00,
        image: '/placeholder.svg'
      }
    ],
    tracking: [
      {
        date: '2024-01-18T14:30:00Z',
        status: 'Delivered',
        location: 'Houston, TX',
        description: 'Package delivered to dock 3'
      },
      {
        date: '2024-01-18T09:15:00Z',
        status: 'Out for delivery',
        location: 'Houston, TX',
        description: 'Package is out for delivery'
      },
      {
        date: '2024-01-17T16:45:00Z',
        status: 'In transit',
        location: 'Dallas, TX',
        description: 'Package departed facility'
      },
      {
        date: '2024-01-16T10:20:00Z',
        status: 'Processing',
        location: 'Warehouse, TX',
        description: 'Package processed at warehouse'
      },
      {
        date: '2024-01-15T08:00:00Z',
        status: 'Order placed',
        location: 'Online',
        description: 'Order confirmed and submitted to ERP'
      }
    ]
  },
  '2': {
    id: '2',
    orderNumber: 'ORD-2024-002',
    date: '2024-01-20',
    status: 'shipped',
    subtotal: 175.98,
    tax: 14.08,
    shippingCost: 0.00,
    emergencyDelivery: false,
    total: 190.06,
    shippingAddress: '456 Factory Lane, Industrial Zone, Dallas, TX 75201',
    billingAddress: '456 Factory Lane, Industrial Zone, Dallas, TX 75201',
    erpReference: 'ERP-SO-2024-002',
    trackingNumber: 'TRK987654321',
    carrier: 'UPS',
    estimatedDelivery: '2024-01-22',
    customerNotes: 'Call before delivery',
    items: [
      {
        id: '3',
        name: 'Marine Gear Oil',
        category: 'Marine Lubricants',
        quantity: 3,
        unitPrice: 55.99,
        totalPrice: 167.97,
        image: '/placeholder.svg'
      },
      {
        id: '4',
        name: 'Multi-Purpose Grease',
        category: 'Greases',
        quantity: 1,
        unitPrice: 18.50,
        totalPrice: 18.50,
        image: '/placeholder.svg'
      }
    ],
    tracking: [
      {
        date: '2024-01-21T16:20:00Z',
        status: 'In transit',
        location: 'Austin, TX',
        description: 'Package in transit to destination'
      },
      {
        date: '2024-01-20T14:15:00Z',
        status: 'Shipped',
        location: 'Warehouse, TX',
        description: 'Package shipped via UPS'
      },
      {
        date: '2024-01-20T08:30:00Z',
        status: 'Processing',
        location: 'Warehouse, TX',
        description: 'Order processed and packed'
      },
      {
        date: '2024-01-20T07:00:00Z',
        status: 'Order placed',
        location: 'Online',
        description: 'Order confirmed and submitted to ERP'
      }
    ]
  },
  '3': {
    id: '3',
    orderNumber: 'ORD-2024-003',
    date: '2024-01-22',
    status: 'processing',
    subtotal: 524.55,
    tax: 41.96,
    shippingCost: 0.00,
    emergencyDelivery: true,
    total: 641.51,
    shippingAddress: '789 Workshop Road, Manufacturing Hub, San Antonio, TX 78201',
    billingAddress: '789 Workshop Road, Manufacturing Hub, San Antonio, TX 78201',
    erpReference: 'ERP-SO-2024-003',
    customerNotes: 'Emergency delivery needed for production line',
    internalNotes: 'Rush order - expedite all processes',
    items: [
      {
        id: '1',
        name: 'Premium Engine Oil 5W-30',
        category: 'Engine Oils',
        quantity: 8,
        unitPrice: 45.99,
        totalPrice: 367.92,
        image: '/placeholder.svg'
      },
      {
        id: '2',
        name: 'Industrial Hydraulic Fluid',
        category: 'Hydraulic Fluids',
        quantity: 4,
        unitPrice: 36.00,
        totalPrice: 144.00,
        image: '/placeholder.svg'
      },
      {
        id: '4',
        name: 'Multi-Purpose Grease',
        category: 'Greases',
        quantity: 3,
        unitPrice: 18.50,
        totalPrice: 55.50,
        image: '/placeholder.svg'
      }
    ],
    tracking: [
      {
        date: '2024-01-22T10:45:00Z',
        status: 'Processing',
        location: 'Warehouse, TX',
        description: 'Emergency order being expedited'
      },
      {
        date: '2024-01-22T09:15:00Z',
        status: 'Order placed',
        location: 'Online',
        description: 'Emergency order confirmed and submitted to ERP'
      }
    ]
  },
  '4': {
    id: '4',
    orderNumber: 'ORD-2024-004',
    date: '2024-01-25',
    status: 'pending',
    subtotal: 114.35,
    tax: 9.15,
    shippingCost: 0.00,
    emergencyDelivery: false,
    total: 123.50,
    shippingAddress: '321 Service Center, Industrial Area, Austin, TX 73301',
    billingAddress: '321 Service Center, Industrial Area, Austin, TX 73301',
    items: [
      {
        id: '4',
        name: 'Multi-Purpose Grease',
        category: 'Greases',
        quantity: 6,
        unitPrice: 18.50,
        totalPrice: 111.00,
        image: '/placeholder.svg'
      }
    ],
    tracking: [
      {
        date: '2024-01-25T11:30:00Z',
        status: 'Order placed',
        location: 'Online',
        description: 'Order received and awaiting processing'
      }
    ]
  },
  // Backorder examples
  '2b': {
    id: '2b',
    orderNumber: 'BO-2024-002',
    date: '2024-01-20',
    status: 'backordered',
    subtotal: 83.18,
    tax: 6.65,
    shippingCost: 0.00,
    emergencyDelivery: false,
    total: 89.83,
    shippingAddress: '456 Factory Lane, Industrial Zone, Dallas, TX 75201',
    billingAddress: '456 Factory Lane, Industrial Zone, Dallas, TX 75201',
    erpReference: 'ERP-BO-2024-002',
    estimatedDelivery: '2024-02-05',
    type: 'backorder',
    relatedOrderId: '2',
    customerNotes: 'Waiting for supplier delivery',
    internalNotes: 'Backorder due to insufficient inventory. Expected restocking: Feb 3rd',
    items: [
      {
        id: '2',
        name: 'Industrial Hydraulic Fluid',
        category: 'Hydraulic Fluids',
        quantity: 2,
        unitPrice: 36.00,
        totalPrice: 72.00,
        image: '/placeholder.svg'
      }
    ],
    tracking: [
      {
        date: '2024-01-20T14:15:00Z',
        status: 'Backordered',
        location: 'Warehouse, TX',
        description: 'Items placed on backorder - insufficient inventory'
      },
      {
        date: '2024-01-20T08:30:00Z',
        status: 'Order split',
        location: 'Warehouse, TX',
        description: 'Order partially fulfilled - remaining items backordered'
      }
    ]
  },
  '5b': {
    id: '5b',
    orderNumber: 'BO-2024-005',
    date: '2024-01-26',
    status: 'backordered',
    subtotal: 144.27,
    tax: 11.54,
    shippingCost: 0.00,
    emergencyDelivery: false,
    total: 155.81,
    shippingAddress: 'Main Warehouse, Halifax, NS B3H 4R2',
    billingAddress: 'Main Warehouse, Halifax, NS B3H 4R2',
    erpReference: 'ERP-BO-2024-005',
    estimatedDelivery: '2024-02-10',
    type: 'backorder',
    relatedOrderId: '5',
    internalNotes: 'Partial shipment backordered due to insufficient inventory',
    items: [
      {
        id: '3',
        name: 'Marine Gear Oil',
        category: 'Marine Lubricants',
        quantity: 2,
        unitPrice: 55.99,
        totalPrice: 111.98,
        image: '/placeholder.svg'
      },
      {
        id: '4',
        name: 'Multi-Purpose Grease',
        category: 'Greases',
        quantity: 1,
        unitPrice: 18.50,
        totalPrice: 18.50,
        image: '/placeholder.svg'
      }
    ],
    tracking: [
      {
        date: '2024-01-26T16:30:00Z',
        status: 'Backordered',
        location: 'Warehouse, Halifax',
        description: 'Items placed on backorder - awaiting supplier shipment'
      },
      {
        date: '2024-01-26T12:15:00Z',
        status: 'Order split',
        location: 'Warehouse, Halifax',
        description: 'Available items shipped separately - remaining items backordered'
      }
    ]
  }
};

const statusColorMap = {
  pending: 'bg-yellow-100 text-yellow-800',
  processing: 'bg-blue-100 text-blue-800',
  shipped: 'bg-purple-100 text-purple-800',
  delivered: 'bg-green-100 text-green-800',
  cancelled: 'bg-red-100 text-red-800',
  backordered: 'bg-orange-100 text-orange-800'
};

const OrderDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [order, setOrder] = useState<OrderDetail | null>(null);

  useEffect(() => {
    // In a real app, fetch order details from API using the id
    if (id && mockOrderDetails[id]) {
      setOrder(mockOrderDetails[id]);
    } else {
      setOrder(null);
    }
  }, [id]);

  const downloadInvoice = () => {
    console.log('Downloading invoice for order:', order?.orderNumber);
    // Implement invoice download logic
  };

  const downloadPOD = () => {
    console.log('Downloading proof of delivery for order:', order?.orderNumber);
    // Implement proof of delivery download logic
  };

  if (!order) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <p>Loading order details...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center space-x-4">
          <Button variant="ghost" onClick={() => navigate('/orders')}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Orders
          </Button>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">{order.orderNumber}</h1>
            <p className="text-gray-600">Order placed on {new Date(order.date).toLocaleDateString()}</p>
          </div>
        </div>
        <div className="flex items-center space-x-3">
          <Badge className={statusColorMap[order.status]} variant="secondary">
            {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
          </Badge>
          {order.type === 'backorder' && (
            <Badge variant="outline" className="text-orange-700 border-orange-300 bg-orange-50">
              Backorder
            </Badge>
          )}
          <div className="flex space-x-2">
            <Button variant="outline" onClick={downloadInvoice}>
              <Download className="h-4 w-4 mr-2" />
              Invoice
            </Button>
            {order.status === 'delivered' && (
              <Button variant="outline" onClick={downloadPOD}>
                <Receipt className="h-4 w-4 mr-2" />
                Proof of Delivery
              </Button>
            )}
          </div>
        </div>
      </div>

      {/* Backorder Association Alert */}
      {order.type === 'backorder' && order.relatedOrderId && (
        <Card className="mb-6 border-orange-300 bg-orange-50/50">
          <CardContent className="p-4">
            <div className="flex items-center space-x-3">
              <LinkIcon className="h-5 w-5 text-orange-600 flex-shrink-0" />
              <div>
                <p className="font-medium text-orange-800">Associated with Additional Order</p>
                <p className="text-sm text-orange-700">
                  This backorder is related to sales order 
                  <Link 
                    to={`/orders/${order.relatedOrderId}`} 
                    className="font-medium underline ml-1 hover:text-orange-900"
                  >
                    ORD-2024-{order.relatedOrderId.padStart(3, '0')}
                  </Link>
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Warehouse Staging Status for Pickup Orders */}
          <WarehouseStagingStatus 
            orderId={order.id}
            orderType="pickup"
            status={order.status}
          />
          
          {/* Order Status & Tracking */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>Order Status</span>
                <Badge className={statusColorMap[order.status]}>
                  {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                </Badge>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                {order.trackingNumber && (
                  <div className="flex items-center space-x-2">
                    <Truck className="h-4 w-4 text-gray-400" />
                    <div>
                      <p className="text-sm text-gray-600">Tracking Number</p>
                      <p className="font-medium">{order.trackingNumber}</p>
                    </div>
                  </div>
                )}
                {order.carrier && (
                  <div className="flex items-center space-x-2">
                    <Package className="h-4 w-4 text-gray-400" />
                    <div>
                      <p className="text-sm text-gray-600">Carrier</p>
                      <p className="font-medium">{order.carrier}</p>
                    </div>
                  </div>
                )}
                {order.estimatedDelivery && (
                  <div className="flex items-center space-x-2">
                    <Calendar className="h-4 w-4 text-gray-400" />
                    <div>
                      <p className="text-sm text-gray-600">Est. Delivery</p>
                      <p className="font-medium">{new Date(order.estimatedDelivery).toLocaleDateString()}</p>
                    </div>
                  </div>
                )}
              </div>

              {/* Tracking Timeline */}
              <div className="space-y-4">
                <h4 className="font-medium">Tracking History</h4>
                <div className="space-y-3">
                  {order.tracking.map((event, index) => (
                    <div key={index} className="flex items-start space-x-3">
                      <div className={`w-3 h-3 rounded-full mt-1 ${index === 0 ? 'bg-primary' : 'bg-gray-300'}`} />
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <p className="font-medium text-sm">{event.status}</p>
                          <p className="text-xs text-gray-500">{new Date(event.date).toLocaleString()}</p>
                        </div>
                        <p className="text-sm text-gray-600">{event.description}</p>
                        <p className="text-xs text-gray-500">{event.location}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Order Items */}
          <Card>
            <CardHeader>
              <CardTitle>Order Items</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {order.items.map((item) => (
                  <div key={item.id} className="flex items-center space-x-4 p-4 border rounded-lg">
                    <img 
                      src={item.image} 
                      alt={item.name}
                      className="w-16 h-16 object-cover rounded-lg bg-gray-100"
                    />
                    <div className="flex-1">
                      <h4 className="font-medium">{item.name}</h4>
                      <p className="text-sm text-gray-600">{item.category}</p>
                      <p className="text-sm text-gray-600">Qty: {item.quantity} × ${item.unitPrice}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-bold">${item.totalPrice.toFixed(2)}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Notes */}
          {(order.customerNotes || order.internalNotes) && (
            <Card>
              <CardHeader>
                <CardTitle>Notes</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {order.customerNotes && (
                  <div>
                    <h4 className="font-medium text-sm text-gray-600 mb-1">Customer Notes</h4>
                    <p className="text-sm">{order.customerNotes}</p>
                  </div>
                )}
                {order.internalNotes && (
                  <div>
                    <h4 className="font-medium text-sm text-gray-600 mb-1">Internal Notes</h4>
                    <p className="text-sm">{order.internalNotes}</p>
                  </div>
                )}
              </CardContent>
            </Card>
          )}
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Order Summary */}
          <Card>
            <CardHeader>
              <CardTitle>Order Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>${order.subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Tax</span>
                <span>${order.tax.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Shipping</span>
                <span>{order.shippingCost === 0 ? 'Free' : `$${order.shippingCost.toFixed(2)}`}</span>
              </div>
              {order.emergencyDelivery && (
                <div className="flex justify-between">
                  <span>Emergency Delivery</span>
                  <span className="text-red-600">$75.00</span>
                </div>
              )}
              <Separator />
              <div className="flex justify-between font-bold text-lg">
                <span>Total</span>
                <span>${order.total.toFixed(2)}</span>
              </div>
            </CardContent>
          </Card>

          {/* Addresses */}
          <Card>
            <CardHeader>
              <CardTitle>Shipping & Billing</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h4 className="font-medium text-sm text-gray-600 mb-2 flex items-center">
                  <MapPin className="h-4 w-4 mr-1" />
                  Shipping Address
                </h4>
                <p className="text-sm">{order.shippingAddress}</p>
              </div>
              <Separator />
              <div>
                <h4 className="font-medium text-sm text-gray-600 mb-2 flex items-center">
                  <Receipt className="h-4 w-4 mr-1" />
                  Billing Address
                </h4>
                <p className="text-sm">{order.billingAddress}</p>
              </div>
            </CardContent>
          </Card>

          {/* ERP Reference */}
          {order.erpReference && (
            <Card>
              <CardHeader>
                <CardTitle>System Reference</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center">
                  <p className="text-sm text-gray-600 mb-1">ERP Reference</p>
                  <p className="font-mono text-sm font-medium">{order.erpReference}</p>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Contact Support */}
          <Card>
            <CardHeader>
              <CardTitle>Need Help?</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button variant="outline" className="w-full justify-start">
                <Phone className="h-4 w-4 mr-2" />
                Call Support: (555) 123-4567
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <Mail className="h-4 w-4 mr-2" />
                Email: support@company.com
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default OrderDetail;