export interface SAPCredentials {
  username: string;
  password: string;
  companyDB: string;
  serverUrl: string;
}

export interface SAPProduct {
  ItemCode: string;
  ItemName: string;
  ItemGroup: number;
  Price: number;
  QtyOnHand: number;
  Unit: string;
  UpdateDate: string;
  Valid: string;
  Frozen: string;
}

export interface SAPQuote {
  DocEntry: number;
  DocNum: string;
  CardCode: string;
  CardName: string;
  DocDate: string;
  DocDueDate: string;
  DocumentLines: SAPQuoteLine[];
  DocTotal: number;
  DocumentStatus: string;
}

export interface SAPQuoteLine {
  ItemCode: string;
  ItemDescription: string;
  Quantity: number;
  Price: number;
  LineTotal: number;
}

export interface SAPOrder {
  DocEntry: number;
  DocNum: string;
  CardCode: string;
  CardName: string;
  DocDate: string;
  DocDueDate: string;
  DocumentLines: SAPOrderLine[];
  DocTotal: number;
  DocumentStatus: string;
}

export interface SAPOrderLine {
  ItemCode: string;
  ItemDescription: string;
  Quantity: number;
  Price: number;
  LineTotal: number;
  WarehouseCode: string;
}

export interface SAPInventory {
  ItemCode: string;
  WhsCode: string;
  OnHand: number;
  Committed: number;
  Ordered: number;
}

export class SAPApiService {
  private baseUrl: string = '';
  private sessionId: string = '';
  private credentials: SAPCredentials | null = null;

  constructor() {
    this.loadCredentials();
  }

  private loadCredentials(): void {
    const stored = localStorage.getItem('sap_credentials');
    if (stored) {
      this.credentials = JSON.parse(stored);
      this.baseUrl = `${this.credentials.serverUrl}/b1s/v1`;
    }
  }

  async connect(credentials: SAPCredentials): Promise<boolean> {
    try {
      this.credentials = credentials;
      this.baseUrl = `${credentials.serverUrl}/b1s/v1`;
      
      const response = await fetch(`${this.baseUrl}/Login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          CompanyDB: credentials.companyDB,
          UserName: credentials.username,
          Password: credentials.password
        })
      });

      if (response.ok) {
        const data = await response.json();
        this.sessionId = data.SessionId;
        localStorage.setItem('sap_credentials', JSON.stringify(credentials));
        localStorage.setItem('sap_session', this.sessionId);
        return true;
      }
      return false;
    } catch (error) {
      console.error('SAP connection failed:', error);
      return false;
    }
  }

  async getProducts(): Promise<SAPProduct[]> {
    try {
      const response = await fetch(`${this.baseUrl}/Items`, {
        headers: this.getHeaders()
      });
      
      if (response.ok) {
        const data = await response.json();
        return data.value || [];
      }
      return [];
    } catch (error) {
      console.error('Failed to fetch products from SAP:', error);
      return [];
    }
  }

  async getInventory(itemCode?: string): Promise<SAPInventory[]> {
    try {
      const url = itemCode 
        ? `${this.baseUrl}/StockTransfers?$filter=ItemCode eq '${itemCode}'`
        : `${this.baseUrl}/StockTransfers`;
        
      const response = await fetch(url, {
        headers: this.getHeaders()
      });
      
      if (response.ok) {
        const data = await response.json();
        return data.value || [];
      }
      return [];
    } catch (error) {
      console.error('Failed to fetch inventory from SAP:', error);
      return [];
    }
  }

  async getQuotes(): Promise<SAPQuote[]> {
    try {
      const response = await fetch(`${this.baseUrl}/Quotations`, {
        headers: this.getHeaders()
      });
      
      if (response.ok) {
        const data = await response.json();
        return data.value || [];
      }
      return [];
    } catch (error) {
      console.error('Failed to fetch quotes from SAP:', error);
      return [];
    }
  }

  async createQuote(quoteData: Partial<SAPQuote>): Promise<SAPQuote | null> {
    try {
      const response = await fetch(`${this.baseUrl}/Quotations`, {
        method: 'POST',
        headers: this.getHeaders(),
        body: JSON.stringify(quoteData)
      });
      
      if (response.ok) {
        return await response.json();
      }
      return null;
    } catch (error) {
      console.error('Failed to create quote in SAP:', error);
      return null;
    }
  }

  async getOrders(): Promise<SAPOrder[]> {
    try {
      const response = await fetch(`${this.baseUrl}/Orders`, {
        headers: this.getHeaders()
      });
      
      if (response.ok) {
        const data = await response.json();
        return data.value || [];
      }
      return [];
    } catch (error) {
      console.error('Failed to fetch orders from SAP:', error);
      return [];
    }
  }

  private getHeaders(): HeadersInit {
    return {
      'Content-Type': 'application/json',
      'Cookie': `B1SESSION=${this.sessionId}`
    };
  }

  isConnected(): boolean {
    return !!this.sessionId && !!this.credentials;
  }

  disconnect(): void {
    this.sessionId = '';
    this.credentials = null;
    localStorage.removeItem('sap_credentials');
    localStorage.removeItem('sap_session');
  }
}

export const sapApiService = new SAPApiService();