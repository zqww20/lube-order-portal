import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ShoppingCart, ArrowLeft, Package } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface ProductOption {
  id: string;
  type: string;
  price: number;
  unit: string;
  minOrder: number;
  description: string;
}

interface Product {
  id: string;
  name: string;
  category: string;
  description: string;
  viscosity: string;
  application: string;
  image: string;
  inStock: boolean;
  options: ProductOption[];
}

const crossSellProducts = [
  {
    id: 'cs1',
    name: 'Diesel Exhaust Fluid (DEF)',
    category: 'Consumables',
    description: 'High-quality DEF for diesel engines',
    price: 12.99,
    unit: 'per 10L',
    image: '/placeholder.svg',
    inStock: true
  },
  {
    id: 'cs2',
    name: 'Windshield Wiper Fluid',
    category: 'Consumables', 
    description: 'All-season windshield washer fluid',
    price: 8.99,
    unit: 'per 4L',
    image: '/placeholder.svg',
    inStock: true
  },
  {
    id: 'cs3',
    name: 'Varsol Solvent',
    category: 'Consumables',
    description: 'Industrial grade cleaning solvent',
    price: 24.99,
    unit: 'per 20L',
    image: '/placeholder.svg',
    inStock: true
  },
  {
    id: 'cs4',
    name: 'Shop Rags',
    category: 'Consumables',
    description: 'Absorbent cleaning rags for workshops',
    price: 15.99,
    unit: 'per box',
    image: '/placeholder.svg',
    inStock: true
  }
];

const mockProducts: Product[] = [
  {
    id: '1',
    name: 'Premium Engine Oil 5W-30',
    category: 'Engine Oils',
    description: 'High-performance synthetic engine oil for modern vehicles',
    viscosity: '5W-30',
    application: 'Automotive',
    image: '/lovable-uploads/87030237-a1f1-4d5a-ae5b-1a75883b24f0.png',
    inStock: true,
    options: [
      {
        id: '1-pail',
        type: 'Pail',
        price: 45.99,
        unit: 'per liter',
        minOrder: 4,
        description: '20L Pail - Perfect for small garages'
      },
      {
        id: '1-drum',
        type: 'Drum',
        price: 42.99,
        unit: 'per liter',
        minOrder: 1,
        description: '205L Drum - Great for workshops'
      },
      {
        id: '1-bulk',
        type: 'Bulk Tank',
        price: 38.99,
        unit: 'per liter',
        minOrder: 1000,
        description: '1000L+ Bulk delivery - Best price for large operations'
      }
    ]
  },
  {
    id: '2',
    name: 'Industrial Hydraulic Fluid',
    category: 'Hydraulic Fluids',
    description: 'Premium quality hydraulic fluid for industrial machinery',
    viscosity: 'ISO 46',
    application: 'Industrial',
    image: '/lovable-uploads/e466ab4c-bb95-44ed-9edb-f24db0a4929f.png',
    inStock: true,
    options: [
      {
        id: '2-container',
        type: '5L Container',
        price: 89.99,
        unit: 'per 5L container',
        minOrder: 1,
        description: '5L Container - Convenient for small applications'
      },
      {
        id: '2-drum',
        type: 'Drum',
        price: 16.50,
        unit: 'per liter',
        minOrder: 1,
        description: '205L Drum - Industrial standard'
      },
      {
        id: '2-bulk',
        type: 'Bulk Tank',
        price: 14.99,
        unit: 'per liter',
        minOrder: 2000,
        description: '2000L+ Bulk delivery - Maximum savings'
      }
    ]
  },
  {
    id: '3',
    name: 'Marine Gear Oil',
    category: 'Marine Lubricants',
    description: 'Specialized gear oil for marine applications',
    viscosity: 'SAE 80W-90',
    application: 'Marine',
    image: '/lovable-uploads/9362ba69-b54d-4d24-8699-96bdb60d215c.png',
    inStock: true,
    options: [
      {
        id: '3-bottle',
        type: '1L Bottle',
        price: 67.50,
        unit: 'per liter',
        minOrder: 2,
        description: '1L Bottle - Perfect for small boats'
      },
      {
        id: '3-case',
        type: 'Case',
        price: 62.50,
        unit: 'per liter',
        minOrder: 1,
        description: '12x1L Case - Great for marine services'
      },
      {
        id: '3-bulk',
        type: 'Bulk Tank',
        price: 55.99,
        unit: 'per liter',
        minOrder: 500,
        description: '500L+ Bulk delivery - For large marine operations'
      }
    ]
  },
  {
    id: '4',
    name: 'Multi-Purpose Grease',
    category: 'Greases',
    description: 'Versatile lithium-based grease for various applications',
    viscosity: 'NLGI 2',
    application: 'General Purpose',
    image: '/lovable-uploads/e466ab4c-bb95-44ed-9edb-f24db0a4929f.png',
    inStock: false,
    options: [
      {
        id: '4-tube',
        type: '500g Tube',
        price: 25.99,
        unit: 'per 500g tube',
        minOrder: 6,
        description: '500g Tube - Handy for maintenance'
      },
      {
        id: '4-pail',
        type: '18kg Pail',
        price: 18.50,
        unit: 'per kg',
        minOrder: 1,
        description: '18kg Pail - Workshop favorite'
      }
    ]
  }
];

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [cart, setCart] = useState<{[key: string]: number}>({});
  const { toast } = useToast();

  const product = mockProducts.find(p => p.id === id);

  if (!product) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Product Not Found</h1>
          <Button onClick={() => navigate('/products')}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Products
          </Button>
        </div>
      </div>
    );
  }

  const addToCart = (optionId: string, quantity: number = 1) => {
    const option = product.options.find(opt => opt.id === optionId);
    if (!option) return;

    const newQuantity = (cart[optionId] || 0) + quantity;
    
    if (newQuantity < option.minOrder) {
      toast({
        title: "Minimum Order Requirement",
        description: `Minimum order quantity for ${product.name} (${option.type}) is ${option.minOrder} units.`,
        variant: "destructive",
      });
      return;
    }

    setCart(prev => ({
      ...prev,
      [optionId]: newQuantity
    }));

    toast({
      title: "Added to Cart",
      description: `${product.name} (${option.type}) has been added to your cart.`,
    });
  };

  const getTotalItems = () => {
    return Object.values(cart).reduce((sum, quantity) => sum + quantity, 0);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-8">
        <Button 
          variant="outline" 
          onClick={() => navigate('/products')}
          className="flex items-center"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Products
        </Button>
        <div className="flex items-center space-x-2">
          <ShoppingCart className="h-6 w-6" />
          <span className="bg-blue-600 text-white px-2 py-1 rounded-full text-sm">
            {getTotalItems()}
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Product Image and Basic Info */}
        <div>
          <div className="aspect-square bg-gray-100 rounded-lg mb-6 flex items-center justify-center">
            <img 
              src={product.image} 
              alt={product.name}
              className="w-full h-full object-cover rounded-lg"
            />
          </div>
          
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <Badge variant="secondary">{product.category}</Badge>
              <Badge variant={product.inStock ? "default" : "destructive"}>
                {product.inStock ? "In Stock" : "Out of Stock"}
              </Badge>
            </div>
            
            <div className="space-y-2">
              <h3 className="font-semibold text-gray-900">Product Specifications</h3>
              <div className="text-sm text-gray-600 space-y-1">
                <p><span className="font-medium">Viscosity:</span> {product.viscosity}</p>
                <p><span className="font-medium">Application:</span> {product.application}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Product Details and Options */}
        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-4">{product.name}</h1>
            <p className="text-lg text-gray-600 mb-6">{product.description}</p>
          </div>

          {/* Product Options */}
          <div className="space-y-4">
            <h3 className="text-xl font-semibold text-gray-900">Available Options</h3>
            {product.options.map((option) => (
              <Card key={option.id} className="border-2 hover:border-blue-200 transition-colors">
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-lg flex items-center">
                        <Package className="h-5 w-5 mr-2 text-blue-600" />
                        {option.type}
                      </CardTitle>
                      <CardDescription>{option.description}</CardDescription>
                    </div>
                    <Badge variant="outline">Min: {option.minOrder}</Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex justify-between items-center">
                    <div className="text-2xl font-bold text-blue-600">
                      Request Quote
                    </div>
                    <Button 
                      onClick={() => addToCart(option.id)}
                      disabled={!product.inStock}
                      className="flex items-center"
                    >
                      <ShoppingCart className="h-4 w-4 mr-2" />
                      Add to Cart
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>

      {/* Cross-sell Section */}
      <div className="mt-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">You might also need</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {crossSellProducts.map((crossProduct) => (
            <Card key={crossProduct.id} className="hover:shadow-md transition-shadow">
              <CardHeader className="pb-2">
                <div className="aspect-square bg-gray-100 rounded-lg mb-2 flex items-center justify-center">
                  <img 
                    src={crossProduct.image} 
                    alt={crossProduct.name}
                    className="w-full h-full object-cover rounded-lg"
                  />
                </div>
                <CardTitle className="text-sm">{crossProduct.name}</CardTitle>
                <CardDescription className="text-xs">{crossProduct.description}</CardDescription>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="flex justify-between items-center mb-2">
                  <Badge variant="secondary" className="text-xs">{crossProduct.category}</Badge>
                  <Badge variant={crossProduct.inStock ? "default" : "destructive"} className="text-xs">
                    {crossProduct.inStock ? "In Stock" : "Out of Stock"}
                  </Badge>
                </div>
                <div className="text-lg font-bold text-blue-600 mb-2">
                  Request Quote
                </div>
                <Button 
                  size="sm" 
                  className="w-full"
                  disabled={!crossProduct.inStock}
                  onClick={() => {
                    toast({
                      title: "Added to Cart",
                      description: `${crossProduct.name} has been added to your cart.`,
                    });
                  }}
                >
                  <ShoppingCart className="h-3 w-3 mr-1" />
                  Add to Cart
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;