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

// Mock data for the Grainger-style layout
const mockProductData = {
  itemCode: 'LUB-5W30-001',
  itemName: 'Premium Synthetic Engine Oil 5W-30',
  brand: 'Castrol',
  imageUrl: '/lovable-uploads/87030237-a1f1-4d5a-ae5b-1a75883b24f0.png',
  customerPrice: 45.99,
  listPrice: 52.99,
  stockQty: 12,
  nextZoneDate: 'Tomorrow 2:00 PM',
  specs: [
    { key: 'Viscosity Grade', value: '5W-30' },
    { key: 'API Classification', value: 'API SN/CF' },
    { key: 'ACEA Classification', value: 'ACEA A3/B4' },
    { key: 'SAE Grade', value: 'SAE 5W-30' },
    { key: 'Density @ 15°C', value: '0.85 kg/L' },
    { key: 'Flash Point', value: '230°C' },
    { key: 'Pour Point', value: '-42°C' },
    { key: 'Viscosity @ 40°C', value: '70 cSt' },
    { key: 'Viscosity @ 100°C', value: '12 cSt' },
    { key: 'Viscosity Index', value: '160' },
    { key: 'Base Oil Type', value: 'Synthetic' },
    { key: 'Package Size', value: '205L Drum' },
    { key: 'Color', value: 'Amber' },
    { key: 'Odor', value: 'Mild petroleum' },
    { key: 'Storage Temperature', value: '-10°C to +40°C' },
    { key: 'Shelf Life', value: '5 years from manufacture date' },
    { key: 'UN Number', value: 'Not classified as dangerous goods' },
    { key: 'Environmental Impact', value: 'Biodegradable additives' }
  ],
  isHazardous: false,
  sdsUrl: '/documents/sds/castrol-5w30-sds.pdf',
  documents: [
    { name: 'Technical Data Sheet', url: '/documents/tds/castrol-5w30-tds.pdf' },
    { name: 'Product Warranty Information', url: '/documents/warranty/castrol-warranty.pdf' },
    { name: 'Industry Approvals', url: '/documents/approvals/castrol-approvals.pdf' }
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

const breadcrumbItems = [
  { label: 'Products', href: '/products' },
  { label: 'Lubricants', href: '/products?category=lubricants' },
  { label: 'Engine Oils', href: '/products?category=engine-oils' },
  { label: 'Synthetic', href: '/products?category=synthetic' },
  { label: mockProductData.itemCode }
];

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [cart, setCart] = useState<{[key: string]: number}>({});
  const { toast } = useToast();

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