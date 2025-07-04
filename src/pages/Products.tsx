import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ShoppingCart, Search, Filter } from 'lucide-react';
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

const mockProducts: Product[] = [
  {
    id: '1',
    name: 'Premium Engine Oil 5W-30',
    category: 'Engine Oils',
    description: 'High-performance synthetic engine oil for modern vehicles',
    viscosity: '5W-30',
    application: 'Automotive',
    image: '/placeholder.svg',
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
    image: '/placeholder.svg',
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
    image: '/placeholder.svg',
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
    image: '/placeholder.svg',
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

const categories = ['All', 'Engine Oils', 'Hydraulic Fluids', 'Marine Lubricants', 'Greases'];

const Products = () => {
  const [products, setProducts] = useState<Product[]>(mockProducts);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>(mockProducts);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [cart, setCart] = useState<{[key: string]: number}>({});
  const { toast } = useToast();

  useEffect(() => {
    let filtered = products;
    
    if (selectedCategory !== 'All') {
      filtered = filtered.filter(product => product.category === selectedCategory);
    }
    
    if (searchTerm) {
      filtered = filtered.filter(product =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    setFilteredProducts(filtered);
  }, [products, searchTerm, selectedCategory]);

  const addToCart = (optionId: string, quantity: number = 1) => {
    // Find the product and option
    let foundProduct: Product | undefined;
    let foundOption: ProductOption | undefined;
    
    for (const product of products) {
      const option = product.options.find(opt => opt.id === optionId);
      if (option) {
        foundProduct = product;
        foundOption = option;
        break;
      }
    }

    if (!foundProduct || !foundOption) return;

    const newQuantity = (cart[optionId] || 0) + quantity;
    
    if (newQuantity < foundOption.minOrder) {
      toast({
        title: "Minimum Order Requirement",
        description: `Minimum order quantity for ${foundProduct.name} (${foundOption.type}) is ${foundOption.minOrder} units.`,
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
      description: `${foundProduct.name} (${foundOption.type}) has been added to your cart.`,
    });
  };

  const getTotalItems = () => {
    return Object.values(cart).reduce((sum, quantity) => sum + quantity, 0);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Lubricant Products</h1>
          <p className="text-gray-600 mt-2">Professional grade lubricants for all your needs</p>
        </div>
        <div className="flex items-center space-x-2">
          <ShoppingCart className="h-6 w-6" />
          <span className="bg-blue-600 text-white px-2 py-1 rounded-full text-sm">
            {getTotalItems()}
          </span>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-col md:flex-row gap-4 mb-8">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            placeholder="Search products..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <Select value={selectedCategory} onValueChange={setSelectedCategory}>
          <SelectTrigger className="w-full md:w-48">
            <Filter className="h-4 w-4 mr-2" />
            <SelectValue placeholder="Category" />
          </SelectTrigger>
          <SelectContent>
            {categories.map(category => (
              <SelectItem key={category} value={category}>
                {category}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredProducts.map((product) => (
          <Card key={product.id} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="aspect-square bg-gray-100 rounded-lg mb-4 flex items-center justify-center">
                <img 
                  src={product.image} 
                  alt={product.name}
                  className="w-full h-full object-cover rounded-lg"
                />
              </div>
              <CardTitle className="text-lg">{product.name}</CardTitle>
              <CardDescription>{product.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <Badge variant="secondary">{product.category}</Badge>
                  <Badge variant={product.inStock ? "default" : "destructive"}>
                    {product.inStock ? "In Stock" : "Out of Stock"}
                  </Badge>
                </div>
                <div className="text-sm text-gray-600">
                  <p>Viscosity: {product.viscosity}</p>
                  <p>Application: {product.application}</p>
                </div>
                
                {/* Product Options */}
                <div className="space-y-3">
                  <h4 className="font-medium text-gray-900">Available Options:</h4>
                  {product.options.map((option) => (
                    <div key={option.id} className="border rounded-lg p-3 bg-gray-50">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <Badge variant="outline" className="mb-1">{option.type}</Badge>
                          <p className="text-sm text-gray-600">{option.description}</p>
                        </div>
                        <div className="text-right">
                          <p className="font-bold text-blue-600">
                            ${option.price} <span className="text-xs font-normal text-gray-500">{option.unit}</span>
                          </p>
                          <p className="text-xs text-gray-500">Min: {option.minOrder}</p>
                        </div>
                      </div>
                      <Button 
                        onClick={() => addToCart(option.id)}
                        disabled={!product.inStock}
                        size="sm"
                        className="w-full"
                      >
                        <ShoppingCart className="h-4 w-4 mr-2" />
                        Add {option.type}
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
            <CardFooter>
              {/* Footer can be empty now since buttons are in options */}
            </CardFooter>
          </Card>
        ))}
      </div>

      {filteredProducts.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">No products found matching your criteria.</p>
        </div>
      )}
    </div>
  );
};

export default Products;
