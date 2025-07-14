// Shared product data for both customer and guest portals
export interface ProductOption {
  id: string;
  type: string;
  size: string;
  price: number;
  unit: string;
  minOrder: number;
  description: string;
}

export interface Product {
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
  customerPrice?: number; // Special customer pricing
  options: ProductOption[];
  specs: { key: string; value: string; }[];
  isHazardous: boolean;
  sdsUrl: string;
  documents: { name: string; url: string; }[];
}

export const mockProducts: Product[] = [
  {
    id: '1',
    itemCode: 'EO-5W30-001',
    name: 'Premium Engine Oil 5W-30',
    category: 'Engine Oils',
    description: 'High-performance synthetic engine oil for modern vehicles',
    viscosity: '5W-30',
    application: 'Automotive',
    image: '/lovable-uploads/87030237-a1f1-4d5a-ae5b-1a75883b24f0.png',
    inStock: true,
    startingPrice: 42.99,
    customerPrice: 38.50, // Customer gets better pricing
    options: [
      {
        id: '1-pail',
        type: 'Pail',
        size: '18.927L',
        price: 45.99,
        unit: 'per pail',
        minOrder: 1,
        description: '18.927L Pail - Perfect for small garages'
      },
      {
        id: '1-drum',
        type: 'Drum',
        size: '208.198L',
        price: 42.99,
        unit: 'per drum',
        minOrder: 1,
        description: '208.198L Drum - Great for workshops'
      }
    ],
    specs: [
      { key: 'Viscosity Grade', value: '5W-30' },
      { key: 'Application', value: 'Automotive' },
      { key: 'Base Oil Type', value: 'Synthetic' },
      { key: 'Color', value: 'Amber' },
      { key: 'Storage Temperature', value: '-10°C to +40°C' },
      { key: 'Shelf Life', value: '5 years from manufacture date' }
    ],
    isHazardous: false,
    sdsUrl: '/documents/sds/engine-oil-sds.pdf',
    documents: [
      { name: 'Technical Data Sheet', url: '/documents/tds/engine-oil-tds.pdf' },
      { name: 'Product Warranty Information', url: '/documents/warranty/engine-oil-warranty.pdf' }
    ]
  },
  {
    id: '2',
    itemCode: 'HF-ISO46-002',
    name: 'Industrial Hydraulic Fluid (Bulk)',
    category: 'Hydraulic Fluids',
    description: 'Premium quality hydraulic fluid for industrial machinery',
    viscosity: 'ISO 46',
    application: 'Industrial',
    image: '/lovable-uploads/e466ab4c-bb95-44ed-9edb-f24db0a4929f.png',
    inStock: true,
    isBulk: true,
    startingPrice: 14.99,
    customerPrice: 12.50,
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
    ],
    specs: [
      { key: 'Viscosity Grade', value: 'ISO 46' },
      { key: 'Application', value: 'Industrial' },
      { key: 'Base Oil Type', value: 'Mineral' },
      { key: 'Color', value: 'Clear' },
      { key: 'Operating Temperature', value: '-30°C to +100°C' }
    ],
    isHazardous: true,
    sdsUrl: '/documents/sds/hydraulic-fluid-sds.pdf',
    documents: [
      { name: 'Technical Data Sheet', url: '/documents/tds/hydraulic-fluid-tds.pdf' },
      { name: 'Industry Approvals', url: '/documents/approvals/hydraulic-fluid-approvals.pdf' }
    ]
  },
  {
    id: '3',
    itemCode: 'MGO-80W90-003',
    name: 'Marine Gear Oil',
    category: 'Marine Lubricants',
    description: 'Specialized gear oil for marine applications',
    viscosity: 'SAE 80W-90',
    application: 'Marine',
    image: '/lovable-uploads/9362ba69-b54d-4d24-8699-96bdb60d215c.png',
    inStock: true,
    startingPrice: 67.50,
    customerPrice: 59.95,
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
    ],
    specs: [
      { key: 'Viscosity Grade', value: 'SAE 80W-90' },
      { key: 'Application', value: 'Marine' },
      { key: 'Base Oil Type', value: 'Synthetic Blend' },
      { key: 'Color', value: 'Dark Amber' },
      { key: 'Operating Temperature', value: '-20°C to +120°C' }
    ],
    isHazardous: false,
    sdsUrl: '/documents/sds/marine-gear-oil-sds.pdf',
    documents: [
      { name: 'Technical Data Sheet', url: '/documents/tds/marine-gear-oil-tds.pdf' },
      { name: 'Marine Approvals', url: '/documents/approvals/marine-gear-oil-approvals.pdf' }
    ]
  },
  {
    id: '4',
    itemCode: 'GR-NLGI2-004',
    name: 'Multi-Purpose Grease',
    category: 'Greases',
    description: 'Versatile lithium-based grease for various applications',
    viscosity: 'NLGI 2',
    application: 'General Purpose',
    image: '/lovable-uploads/e466ab4c-bb95-44ed-9edb-f24db0a4929f.png',
    inStock: false,
    startingPrice: 25.99,
    customerPrice: 23.50,
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
    ],
    specs: [
      { key: 'Viscosity Grade', value: 'NLGI 2' },
      { key: 'Application', value: 'General Purpose' },
      { key: 'Base Oil Type', value: 'Lithium Complex' },
      { key: 'Color', value: 'Brown' },
      { key: 'Operating Temperature', value: '-20°C to +160°C' }
    ],
    isHazardous: false,
    sdsUrl: '/documents/sds/grease-sds.pdf',
    documents: [
      { name: 'Technical Data Sheet', url: '/documents/tds/grease-tds.pdf' },
      { name: 'Application Guide', url: '/documents/guides/grease-application.pdf' }
    ]
  },
  {
    id: '5',
    itemCode: 'TF-ATF-005',
    name: 'Automatic Transmission Fluid',
    category: 'Transmission Fluids',
    description: 'High-quality automatic transmission fluid for smooth shifting',
    viscosity: 'ATF',
    application: 'Automotive',
    image: '/lovable-uploads/87030237-a1f1-4d5a-ae5b-1a75883b24f0.png',
    inStock: true,
    startingPrice: 32.99,
    customerPrice: 28.50,
    options: [
      {
        id: '5-case',
        type: 'Case',
        size: '12 x 1L',
        price: 32.99,
        unit: 'per case',
        minOrder: 1,
        description: '12 x 1L Case - Standard transmission service'
      }
    ],
    specs: [
      { key: 'Viscosity Grade', value: 'ATF' },
      { key: 'Application', value: 'Automotive Transmissions' },
      { key: 'Base Oil Type', value: 'Synthetic' },
      { key: 'Color', value: 'Red' },
      { key: 'Operating Temperature', value: '-40°C to +150°C' }
    ],
    isHazardous: false,
    sdsUrl: '/documents/sds/atf-sds.pdf',
    documents: [
      { name: 'Technical Data Sheet', url: '/documents/tds/atf-tds.pdf' },
      { name: 'Compatibility Guide', url: '/documents/guides/atf-compatibility.pdf' }
    ]
  }
];

export const categories = [
  'All',
  'Engine Oils',
  'Hydraulic Fluids',
  'Marine Lubricants',
  'Greases',
  'Transmission Fluids'
];

export const getProductById = (id: string) => {
  return mockProducts.find(p => p.id === id);
};

export const getProductsByCategory = (category: string) => {
  if (category === 'All') return mockProducts;
  return mockProducts.filter(p => p.category === category);
};

export const searchProducts = (query: string) => {
  const lowerQuery = query.toLowerCase();
  return mockProducts.filter(p => 
    p.name.toLowerCase().includes(lowerQuery) ||
    p.description.toLowerCase().includes(lowerQuery) ||
    p.category.toLowerCase().includes(lowerQuery) ||
    p.itemCode.toLowerCase().includes(lowerQuery)
  );
};