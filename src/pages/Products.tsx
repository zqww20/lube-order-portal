import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ShoppingCart, Search, Filter } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';


interface Product {
  id: string;
  name: string;
  category: string;
  description: string;
  price: number;
  unit: string;
  viscosity: string;
  application: string;
  image: string;
  inStock: boolean;
  minOrder: number;
}

const mockProducts: Product[] = [
  {
    id: '1',
    name: 'Premium Engine Oil 5W-30',
    category: 'Engine Oils',
    description: 'High-performance synthetic engine oil for modern vehicles',
    price: 45.99,
    unit: 'per liter',
    viscosity: '5W-30',
    application: 'Automotive',
    image: '/placeholder.svg',
    inStock: true,
    minOrder: 4
  },
  {
    id: '2',
    name: 'Industrial Hydraulic Fluid',
    category: 'Hydraulic Fluids',
    description: 'Premium quality hydraulic fluid for industrial machinery',
    price: 89.99,
    unit: 'per 5L container',
    viscosity: 'ISO 46',
    application: 'Industrial',
    image: '/placeholder.svg',
    inStock: true,
    minOrder: 1
  },
  {
    id: '3',
    name: 'Marine Gear Oil',
    category: 'Marine Lubricants',
    description: 'Specialized gear oil for marine applications',
    price: 67.50,
    unit: 'per liter',
    viscosity: 'SAE 80W-90',
    application: 'Marine',
    image: '/placeholder.svg',
    inStock: true,
    minOrder: 2
  },
  {
    id: '4',
    name: 'Multi-Purpose Grease',
    category: 'Greases',
    description: 'Versatile lithium-based grease for various applications',
    price: 25.99,
    unit: 'per 500g tube',
    viscosity: 'NLGI 2',
    application: 'General Purpose',
    image: '/placeholder.svg',
    inStock: false,
    minOrder: 6
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

  const addToCart = (productId: string, quantity: number = 1) => {
    const product = products.find(p => p.id === productId);
    if (!product) return;

    const newQuantity = (cart[productId] || 0) + quantity;
    
    if (newQuantity < product.minOrder) {
      toast({
        title: "Minimum Order Requirement",
        description: `Minimum order quantity for ${product.name} is ${product.minOrder} units.`,
        variant: "destructive",
      });
      return;
    }

    setCart(prev => ({
      ...prev,
      [productId]: newQuantity
    }));

    toast({
      title: "Added to Cart",
      description: `${product.name} has been added to your cart.`,
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
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <Badge variant="secondary">{product.category}</Badge>
                  <Badge variant={product.inStock ? "default" : "destructive"}>
                    {product.inStock ? "In Stock" : "Out of Stock"}
                  </Badge>
                </div>
                <div className="text-sm text-gray-600">
                  <p>Viscosity: {product.viscosity}</p>
                  <p>Application: {product.application}</p>
                  <p>Min. Order: {product.minOrder} units</p>
                </div>
                <div className="text-2xl font-bold text-blue-600">
                  ${product.price} <span className="text-sm font-normal text-gray-500">{product.unit}</span>
                </div>
              </div>
            </CardContent>
            <CardFooter className="space-y-2">
              <Button 
                onClick={() => addToCart(product.id)}
                disabled={!product.inStock}
                className="w-full"
              >
                <ShoppingCart className="h-4 w-4 mr-2" />
                Add to Cart
              </Button>
              
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
