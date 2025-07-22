import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, ShoppingCart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { useCart } from '@/contexts/CartContext';
import { getProductById, Product } from '@/data/products';
import ProductBreadcrumbs from '@/components/ProductDetail/ProductBreadcrumbs';
import ProductHero from '@/components/ProductDetail/ProductHero';
import CustomersAlsoViewed from '@/components/ProductDetail/CustomersAlsoViewed';
import TechnicalSpecs from '@/components/ProductDetail/TechnicalSpecs';
import ComplianceRestrictions from '@/components/ProductDetail/ComplianceRestrictions';
import Documentation from '@/components/ProductDetail/Documentation';
import ChatWidget from '@/components/ProductDetail/ChatWidget';

// Convert our product data to match Grainger-style component expectations
const convertToGraingerFormat = (product: Product) => {
  const basePrice = product.options[0]?.price || 0;
  return {
    itemCode: product.itemCode,
    itemName: product.name,
    brand: 'Premium',
    imageUrl: product.image,
    customerPrice: product.customerPrice || basePrice,
    listPrice: product.startingPrice,
    stockQty: product.inStock ? 12 : 0,
    nextZoneDate: 'Tomorrow 2:00 PM',
    isBulk: product.isBulk,
    specs: product.specs,
    isHazardous: product.isHazardous,
    sdsUrl: product.sdsUrl,
    documents: product.documents,
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

  const product = getProductById(id || '');

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

  const handleAddToCart = (quantity: number) => {
    const mockProductData = convertToGraingerFormat(product);
    const productKey = `${product.id}-${mockProductData.itemCode}`;
    setCart(prev => ({
      ...prev,
      [productKey]: (prev[productKey] || 0) + quantity
    }));
    
    toast({
      title: "Added to cart",
      description: `${quantity} item(s) added to your cart`,
    });
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
            <ProductHero {...mockProductData} onAddToCart={handleAddToCart} />

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