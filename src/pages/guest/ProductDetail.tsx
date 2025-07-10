import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
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
  { label: 'Products', href: '/guest/products' },
  { label: 'Lubricants', href: '/guest/products?category=lubricants' },
  { label: 'Engine Oils', href: '/guest/products?category=engine-oils' },
  { label: 'Synthetic', href: '/guest/products?category=synthetic' },
  { label: mockProductData.itemCode }
];

const GuestProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background">
      {/* Header with Back Button and Guest Notice */}
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between mb-4">
          <Button
            variant="outline"
            onClick={() => navigate('/guest/products')}
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Products
          </Button>
          
          <div className="bg-amber-50 border border-amber-200 rounded-lg px-4 py-2">
            <p className="text-amber-800 text-sm font-medium">
              Guest Portal: Cash or E-transfer • Pick-up Only • 5 SKU Limit
            </p>
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

export default GuestProductDetail;