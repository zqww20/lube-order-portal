import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Search, Filter, Eye } from 'lucide-react';

interface ProductOption {
  id: string;
  type: string;
  size: string;
  price: number;
  unit: string;
  minOrder: number;
  description: string;
}

interface Product {
  id: string;
  itemCode: string;
  name: string;
  category: string;
  description: string;
  viscosity: string;
  application: string;
  image: string;
  inStock: boolean;
  isBulk?: boolean;
  startingPrice: number;
  options: ProductOption[];
}

const mockProducts: Product[] = [
  {
    id: '1-pail',
    itemCode: 'EO-5W30-001-P',
    name: 'Premium Engine Oil 5W-30',
    category: 'Engine Oils',
    description: 'High-performance synthetic engine oil for modern vehicles',
    viscosity: '5W-30',
    application: 'Automotive',
    image: '/lovable-uploads/87030237-a1f1-4d5a-ae5b-1a75883b24f0.png',
    inStock: true,
    startingPrice: 45.99,
    options: [
      {
        id: '1-pail',
        type: 'Pail',
        size: '18.927L',
        price: 45.99,
        unit: 'per pail',
        minOrder: 1,
        description: '18.927L Pail - Perfect for small garages'
      }
    ]
  },
  {
    id: '1-drum',
    itemCode: 'EO-5W30-001-D',
    name: 'Premium Engine Oil 5W-30',
    category: 'Engine Oils',
    description: 'High-performance synthetic engine oil for modern vehicles',
    viscosity: '5W-30',
    application: 'Automotive',
    image: '/lovable-uploads/87030237-a1f1-4d5a-ae5b-1a75883b24f0.png',
    inStock: true,
    startingPrice: 42.99,
    options: [
      {
        id: '1-drum',
        type: 'Drum',
        size: '208.198L',
        price: 42.99,
        unit: 'per drum',
        minOrder: 1,
        description: '208.198L Drum - Great for workshops'
      }
    ]
  },
  {
    id: '2-bulk',
    itemCode: 'HF-ISO46-002-B',
    name: 'Industrial Hydraulic Fluid (Bulk)',
    category: 'Hydraulic Fluids',
    description: 'Premium quality hydraulic fluid for industrial machinery',
    viscosity: 'ISO 46',
    application: 'Industrial',
    image: '/lovable-uploads/e466ab4c-bb95-44ed-9edb-f24db0a4929f.png',
    inStock: true,
    isBulk: true,
    startingPrice: 14.99,
    options: [
      {
        id: '2-bulk',
        type: 'Bulk',
        size: '>400L',
        price: 14.99,
        unit: 'per liter',
        minOrder: 400,
        description: 'Bulk quantity - Minimum 400L order'
      }
    ]
  },
  {
    id: '3-case',
    itemCode: 'MGO-80W90-003-C',
    name: 'Marine Gear Oil',
    category: 'Marine Lubricants',
    description: 'Specialized gear oil for marine applications',
    viscosity: 'SAE 80W-90',
    application: 'Marine',
    image: '/lovable-uploads/9362ba69-b54d-4d24-8699-96bdb60d215c.png',
    inStock: true,
    startingPrice: 67.50,
    options: [
      {
        id: '3-case',
        type: 'Case',
        size: '6 x 1L',
        price: 67.50,
        unit: 'per case',
        minOrder: 1,
        description: '6 x 1L Case - Perfect for small boats'
      }
    ]
  },
  {
    id: '4-case',
    itemCode: 'GR-NLGI2-004-C',
    name: 'Multi-Purpose Grease',
    category: 'Greases',
    description: 'Versatile lithium-based grease for various applications',
    viscosity: 'NLGI 2',
    application: 'General Purpose',
    image: '/lovable-uploads/e466ab4c-bb95-44ed-9edb-f24db0a4929f.png',
    inStock: false,
    startingPrice: 25.99,
    options: [
      {
        id: '4-case',
        type: 'Case',
        size: '3 x 4.73L',
        price: 25.99,
        unit: 'per case',
        minOrder: 1,
        description: '3 x 4.73L Case - Handy for maintenance'
      }
    ]
  }
];

const categories = ['All', 'Engine Oils', 'Hydraulic Fluids', 'Marine Lubricants', 'Greases'];

const GuestProducts = () => {
  const [products, setProducts] = useState<Product[]>(mockProducts);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>(mockProducts);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const navigate = useNavigate();

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

  const handleProductClick = (productId: string) => {
    navigate(`/guest/products/${productId}`);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Lubricant Products</h1>
          <p className="text-gray-600 mt-2">Professional grade lubricants for all your needs</p>
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

      {/* Products Table */}
      <div className="bg-white rounded-lg border shadow-sm">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="font-semibold">Item Code</TableHead>
              <TableHead className="font-semibold">Product Name</TableHead>
              <TableHead className="font-semibold">Category</TableHead>
              <TableHead className="font-semibold">Viscosity</TableHead>
              <TableHead className="font-semibold">Application</TableHead>
              <TableHead className="font-semibold">Status</TableHead>
              <TableHead className="font-semibold">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredProducts.map((product) => (
              <TableRow 
                key={product.id}
                className="hover:bg-muted/50 cursor-pointer"
                onClick={() => handleProductClick(product.id)}
              >
                <TableCell>
                  <div className="font-mono text-sm text-muted-foreground">
                    {product.itemCode}
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-3">
                    <img 
                      src={product.image} 
                      alt={product.name}
                      className="h-10 w-10 rounded-md object-cover bg-muted"
                    />
                    <div>
                      <div className="font-semibold text-foreground">{product.name}</div>
                      <div className="text-sm text-muted-foreground">{product.description}</div>
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <Badge variant="secondary">{product.category}</Badge>
                </TableCell>
                <TableCell className="font-medium">{product.viscosity}</TableCell>
                <TableCell>
                  <div className="space-y-1">
                    <div>{product.application}</div>
                    <div className="text-xs text-muted-foreground">
                      {product.options[0].type} ({product.options[0].size})
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="space-y-1">
                    <Badge variant={product.inStock ? "default" : "destructive"}>
                      {product.inStock ? "In Stock" : "Out of Stock"}
                    </Badge>
                    {!product.inStock && (
                      <p className="text-xs text-muted-foreground">
                        10-12 days to fulfill
                      </p>
                    )}
                  </div>
                </TableCell>
                <TableCell>
                  <Button size="sm" variant="outline">
                    <Eye className="h-4 w-4 mr-1" />
                    View
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {filteredProducts.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">No products found matching your criteria.</p>
        </div>
      )}
    </div>
  );
};

export default GuestProducts;