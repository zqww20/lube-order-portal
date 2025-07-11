import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, ShoppingCart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import ProductBreadcrumbs from '@/components/ProductDetail/ProductBreadcrumbs';
import ProductHero from '@/components/ProductDetail/ProductHero';
import CustomersAlsoViewed from '@/components/ProductDetail/CustomersAlsoViewed';
import TechnicalSpecs from '@/components/ProductDetail/TechnicalSpecs';
import ComplianceRestrictions from '@/components/ProductDetail/ComplianceRestrictions';
import Documentation from '@/components/ProductDetail/Documentation';
import ChatWidget from '@/components/ProductDetail/ChatWidget';

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
  name: string;
  category: string;
  description: string;
  viscosity: string;
  application: string;
  image: string;
  inStock: boolean;
  isBulk?: boolean;
  options: ProductOption[];
}

const mockProducts: Product[] = [
  {
    id: '1-pail',
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
    name: 'Premium Engine Oil 5W-30',
    category: 'Engine Oils',
    description: 'High-performance synthetic engine oil for modern vehicles',
    viscosity: '5W-30',
    application: 'Automotive',
    image: '/lovable-uploads/87030237-a1f1-4d5a-ae5b-1a75883b24f0.png',
    inStock: true,
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
    name: 'Industrial Hydraulic Fluid (Bulk)',
    category: 'Hydraulic Fluids',
    description: 'Premium quality hydraulic fluid for industrial machinery',
    viscosity: 'ISO 46',
    application: 'Industrial',
    image: '/lovable-uploads/e466ab4c-bb95-44ed-9edb-f24db0a4929f.png',
    inStock: true,
    isBulk: true,
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
    name: 'Marine Gear Oil',
    category: 'Marine Lubricants',
    description: 'Specialized gear oil for marine applications',
    viscosity: 'SAE 80W-90',
    application: 'Marine',
    image: '/lovable-uploads/9362ba69-b54d-4d24-8699-96bdb60d215c.png',
    inStock: true,
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
    name: 'Multi-Purpose Grease',
    category: 'Greases',
    description: 'Versatile lithium-based grease for various applications',
    viscosity: 'NLGI 2',
    application: 'General Purpose',
    image: '/lovable-uploads/e466ab4c-bb95-44ed-9edb-f24db0a4929f.png',
    inStock: false,
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

// Function to convert product data to Grainger-style format
const convertToGraingerFormat = (product: Product) => {
  const basePrice = product.options[0]?.price || 0;
  return {
    itemCode: `${product.category.substring(0,3).toUpperCase()}-${product.id.padStart(3, '0')}`,
    itemName: product.name,
    brand: 'Premium',
    imageUrl: product.image,
    customerPrice: basePrice,
    listPrice: basePrice * 1.15,
    stockQty: product.inStock ? 12 : 0,
    nextZoneDate: 'Tomorrow 2:00 PM',
    isBulk: product.isBulk,
    specs: [
      { key: 'Viscosity Grade', value: product.viscosity },
      { key: 'Application', value: product.application },
      { key: 'Category', value: product.category },
      { key: 'Package Type', value: product.options[0]?.type || 'Various' },
      { key: 'Base Oil Type', value: 'Synthetic' },
      { key: 'Color', value: 'Amber' },
      { key: 'Storage Temperature', value: '-10°C to +40°C' },
      { key: 'Shelf Life', value: '5 years from manufacture date' }
    ],
    isHazardous: false,
    sdsUrl: '/documents/sds/product-sds.pdf',
    documents: [
      { name: 'Technical Data Sheet', url: '/documents/tds/product-tds.pdf' },
      { name: 'Product Warranty Information', url: '/documents/warranty/product-warranty.pdf' },
      { name: 'Industry Approvals', url: '/documents/approvals/product-approvals.pdf' }
    ],
    crossSell: [
      {
        itemCode: 'CS-001',
        title: 'Oil Filter - Premium Grade',
        thumbUrl: '/lovable-uploads/e466ab4c-bb95-44ed-9edb-f24db0a4929f.png',
        price: 12.99
      },
      {
        itemCode: 'CS-002',
        title: 'Funnel Set - Professional',
        thumbUrl: '/lovable-uploads/9362ba69-b54d-4d24-8699-96bdb60d215c.png',
        price: 24.50
      },
      {
        itemCode: 'CS-003',
        title: 'Oil Drain Pan - 20L Capacity',
        thumbUrl: '/lovable-uploads/5a3219f9-f6bb-4b5b-936f-6484a5d764f6.png',
        price: 34.99
      },
      {
        itemCode: 'CS-004',
        title: 'Shop Towels - Heavy Duty',
        thumbUrl: '/lovable-uploads/73e1d39d-4ed6-4eb1-9866-b1671d7f685a.png',
        price: 18.75
      }
    ]
  };
};

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
          <h1 className="text-2xl font-bold text-foreground mb-4">Product Not Found</h1>
          <Button onClick={() => navigate('/products')}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Products
          </Button>
        </div>
      </div>
    );
  }

  const mockProductData = convertToGraingerFormat(product);
  
  const breadcrumbItems = [
    { label: 'Products', href: '/products' },
    { label: 'Lubricants', href: '/products?category=lubricants' },
    { label: product.category, href: `/products?category=${product.category.toLowerCase()}` },
    { label: mockProductData.itemCode }
  ];

  const getTotalItems = () => {
    return Object.values(cart).reduce((sum, quantity) => sum + quantity, 0);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header with Back Button and Cart */}
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between mb-4">
          <Button
            variant="outline"
            onClick={() => navigate('/products')}
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Products
          </Button>
          <div className="flex items-center space-x-2">
            <ShoppingCart className="h-6 w-6" />
            <span className="bg-action text-white px-2 py-1 rounded-full text-sm">
              {getTotalItems()}
            </span>
          </div>
        </div>

        {/* Breadcrumbs */}
        <ProductBreadcrumbs items={breadcrumbItems} />

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 xl:grid-cols-4 gap-8">
          {/* Main Content - 3/4 width on desktop */}
          <div className="xl:col-span-3 space-y-8">
            {/* Product Hero */}
            <ProductHero {...mockProductData} />

            {/* Information Blocks */}
            <div className="space-y-6">
              {/* Technical Specifications */}
              <TechnicalSpecs specs={mockProductData.specs} />

              {/* Compliance & Restrictions */}
              <ComplianceRestrictions
                isHazardous={mockProductData.isHazardous}
                sdsUrl={mockProductData.sdsUrl}
              />

              {/* Documentation */}
              <Documentation documents={mockProductData.documents} />
            </div>
          </div>

          {/* Sidebar - 1/4 width on desktop, full width on mobile */}
          <div className="xl:col-span-1">
            {/* Mobile: Horizontal carousel, Desktop: Vertical sidebar */}
            <div className="xl:sticky xl:top-4">
              <CustomersAlsoViewed crossSell={mockProductData.crossSell} />
            </div>
          </div>
        </div>
      </div>

      {/* Chat Widget */}
      <ChatWidget />
    </div>
  );
};

export default ProductDetail;