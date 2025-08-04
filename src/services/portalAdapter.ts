import { Product } from '@/data/products';
import { QuoteItem } from '@/contexts/QuoteContext';
import { User } from '@/contexts/UserContext';

export interface PortalData {
  products: Product[];
  quotes: QuoteItem[];
  allowedOperations: string[];
  priceLevel: 'list' | 'customer' | 'employee' | 'guest';
}

export class PortalAdapter {
  static filterDataForPortal(user: User | null, products: Product[], quotes: QuoteItem[]): PortalData {
    if (!user || user.role === 'guest') {
      return this.getGuestPortalData(products, quotes);
    }

    switch (user.role) {
      case 'customer':
        return this.getCustomerPortalData(user, products, quotes);
      case 'employee':
      case 'admin':
        return this.getEmployeePortalData(user, products, quotes);
      default:
        return this.getGuestPortalData(products, quotes);
    }
  }

  private static getGuestPortalData(products: Product[], quotes: QuoteItem[]): PortalData {
    // Guests see basic product info without pricing
    const guestProducts = products.map(product => ({
      ...product,
      startingPrice: 0,
      customerPrice: undefined,
      options: product.options.map(option => ({
        ...option,
        price: 0
      }))
    }));

    return {
      products: guestProducts,
      quotes: [], // Guests can't see existing quotes
      allowedOperations: ['view_products', 'request_quote'],
      priceLevel: 'guest'
    };
  }

  private static getCustomerPortalData(user: User, products: Product[], quotes: QuoteItem[]): PortalData {
    // Customers see their pricing level and filtered quotes
    const customerProducts = products.map(product => ({
      ...product,
      startingPrice: product.customerPrice || product.startingPrice
    }));

    // Filter quotes for this customer only
    const customerQuotes = quotes.filter(quote => 
      // In a real app, you'd filter by customer code
      true // For demo, show all quotes
    );

    return {
      products: customerProducts,
      quotes: customerQuotes,
      allowedOperations: [
        'view_products', 
        'view_pricing', 
        'create_orders', 
        'view_own_quotes',
        'accept_quotes'
      ],
      priceLevel: 'customer'
    };
  }

  private static getEmployeePortalData(user: User, products: Product[], quotes: QuoteItem[]): PortalData {
    // Employees see all data and have full permissions
    return {
      products,
      quotes,
      allowedOperations: [
        'view_all_products',
        'view_all_pricing',
        'manage_quotes',
        'manage_orders',
        'view_all_customers',
        'create_quotes',
        'modify_pricing'
      ],
      priceLevel: 'employee'
    };
  }

  static canPerformOperation(user: User | null, operation: string): boolean {
    const portalData = this.filterDataForPortal(user, [], []);
    return portalData.allowedOperations.includes(operation);
  }

  static getPriceForUser(product: Product, user: User | null): number {
    if (!user || user.role === 'guest') {
      return 0; // Guests don't see pricing
    }

    if (user.role === 'customer' && product.customerPrice) {
      return product.customerPrice;
    }

    return product.startingPrice;
  }

  static getAvailableProductOptions(product: Product, user: User | null) {
    const baseOptions = product.options;
    
    if (!user || user.role === 'guest') {
      // Guests see options but no pricing
      return baseOptions.map(option => ({
        ...option,
        price: 0
      }));
    }

    if (user.role === 'customer' && product.customerPrice) {
      // Apply customer discount to all options
      const discountRatio = product.customerPrice / product.startingPrice;
      return baseOptions.map(option => ({
        ...option,
        price: option.price * discountRatio
      }));
    }

    return baseOptions;
  }
}