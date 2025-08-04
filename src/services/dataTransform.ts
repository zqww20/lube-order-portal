import { SAPProduct, SAPQuote, SAPOrder, SAPInventory } from './sapApi';
import { Product } from '@/data/products';
import { QuoteItem } from '@/contexts/QuoteContext';

export class DataTransformService {
  static sapProductToProduct(sapProduct: SAPProduct): Product {
    return {
      id: sapProduct.ItemCode,
      itemCode: sapProduct.ItemCode,
      name: sapProduct.ItemName,
      category: this.getProductCategory(sapProduct.ItemGroup),
      description: `SAP Product - ${sapProduct.ItemName}`,
      viscosity: 'Variable',
      application: 'General Purpose',
      image: '/placeholder.svg',
      inStock: sapProduct.QtyOnHand > 0,
      startingPrice: sapProduct.Price,
      options: [{
        id: `${sapProduct.ItemCode}-default`,
        type: 'Standard',
        size: sapProduct.Unit,
        price: sapProduct.Price,
        unit: sapProduct.Unit,
        minOrder: 1,
        description: `Standard ${sapProduct.Unit} package`
      }],
      specs: [
        { key: 'Viscosity Grade', value: 'Variable' },
        { key: 'Application', value: 'General Purpose' },
        { key: 'SAP Item Code', value: sapProduct.ItemCode }
      ],
      isHazardous: false,
      sdsUrl: '',
      documents: []
    };
  }

  static sapQuoteToQuoteItem(sapQuote: SAPQuote): QuoteItem[] {
    return sapQuote.DocumentLines.map((line, index) => ({
      id: `${sapQuote.DocEntry}-${index}`,
      productId: line.ItemCode,
      productName: line.ItemDescription,
      category: 'SAP Category',
      quantity: line.Quantity,
      unitPrice: line.Price,
      totalPrice: line.LineTotal,
      requirements: 'SAP Generated Quote',
      expectedDelivery: sapQuote.DocDueDate,
      status: this.mapSAPQuoteStatus(sapQuote.DocumentStatus),
      requestDate: sapQuote.DocDate,
      quoteAmount: line.LineTotal,
      validUntil: sapQuote.DocDueDate,
      selected: false
    }));
  }

  static productToSAPProduct(product: Product): Partial<SAPProduct> {
    return {
      ItemCode: product.itemCode,
      ItemName: product.name,
      Price: product.startingPrice,
      Unit: product.options[0]?.unit || 'pcs',
      Valid: 'Y',
      Frozen: 'N'
    };
  }

  static quoteItemToSAPQuote(items: QuoteItem[], customerCode: string): Partial<SAPQuote> {
    const documentLines = items.map(item => ({
      ItemCode: item.productId,
      ItemDescription: item.productName,
      Quantity: item.quantity,
      Price: item.unitPrice,
      LineTotal: item.totalPrice
    }));

    return {
      CardCode: customerCode,
      DocumentLines: documentLines,
      DocTotal: items.reduce((sum, item) => sum + item.totalPrice, 0)
    };
  }

  private static getProductCategory(itemGroup: number): string {
    const categoryMap: { [key: number]: string } = {
      100: 'Engine Oils',
      101: 'Transmission Fluids',
      102: 'Hydraulic Fluids',
      103: 'Industrial Fluids',
      104: 'Greases',
      105: 'Marine Lubricants'
    };
    return categoryMap[itemGroup] || 'General';
  }

  private static mapSAPQuoteStatus(sapStatus: string): 'pending' | 'processing' | 'quoted' | 'accepted' | 'declined' {
    const statusMap: { [key: string]: 'pending' | 'processing' | 'quoted' | 'accepted' | 'declined' } = {
      'O': 'pending',
      'C': 'quoted',
      'A': 'accepted',
      'R': 'declined'
    };
    return statusMap[sapStatus] || 'pending';
  }

  static getInventoryStatus(inventory: SAPInventory): {
    available: number;
    committed: number;
    onOrder: number;
    status: 'in-stock' | 'low-stock' | 'out-of-stock';
  } {
    const available = inventory.OnHand - inventory.Committed;
    
    let status: 'in-stock' | 'low-stock' | 'out-of-stock';
    if (available <= 0) {
      status = 'out-of-stock';
    } else if (available < 10) {
      status = 'low-stock';
    } else {
      status = 'in-stock';
    }

    return {
      available,
      committed: inventory.Committed,
      onOrder: inventory.Ordered,
      status
    };
  }
}