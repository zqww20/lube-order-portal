import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Badge } from '@/components/ui/badge';
import { ShoppingCart, Package, Users } from 'lucide-react';
import { useQuotes, QuoteItem } from '@/contexts/QuoteContext';

interface QuoteSelectionModalProps {
  isOpen: boolean;
  onClose: () => void;
  customerName: string;
}

export const QuoteSelectionModal: React.FC<QuoteSelectionModalProps> = ({
  isOpen,
  onClose,
  customerName
}) => {
  const { quotes, selectedItems, selectItem, deselectItem, selectAllForCustomer, clearSelection, consolidateSelectedItems } = useQuotes();

  // Filter quotes for the specific customer that are ready for selection
  const customerQuotes = quotes.filter(quote => 
    quote.customerName === customerName && quote.status === 'ready'
  );

  const selectedCustomerItems = customerQuotes.filter(quote => selectedItems.includes(quote.id));
  const totalSelectedValue = selectedCustomerItems.reduce((sum, quote) => sum + quote.totalPrice, 0);

  const handleItemToggle = (itemId: string, checked: boolean) => {
    if (checked) {
      selectItem(itemId);
    } else {
      deselectItem(itemId);
    }
  };

  const handleSelectAll = () => {
    selectAllForCustomer(customerName);
  };

  const handleClearAll = () => {
    // Clear only this customer's items
    const customerItemIds = customerQuotes.map(quote => quote.id);
    customerItemIds.forEach(id => deselectItem(id));
  };

  const handleConsolidate = () => {
    consolidateSelectedItems();
    onClose();
  };

  const allSelected = customerQuotes.length > 0 && customerQuotes.every(quote => selectedItems.includes(quote.id));
  const someSelected = selectedCustomerItems.length > 0;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Package className="h-5 w-5" />
            Select Quote Items - {customerName}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          {/* Selection Controls */}
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={handleSelectAll}
                    disabled={allSelected}
                  >
                    <Users className="h-4 w-4 mr-2" />
                    Select All
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={handleClearAll}
                    disabled={!someSelected}
                  >
                    Clear Selection
                  </Button>
                </div>
                <div className="text-sm text-muted-foreground">
                  {selectedCustomerItems.length} of {customerQuotes.length} items selected
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Quote Items */}
          <div className="space-y-3">
            {customerQuotes.map((quote) => (
              <Card key={quote.id} className={`transition-colors ${
                selectedItems.includes(quote.id) ? 'bg-primary/5 border-primary/20' : ''
              }`}>
                <CardContent className="p-4">
                  <div className="flex items-start gap-4">
                    <Checkbox
                      checked={selectedItems.includes(quote.id)}
                      onCheckedChange={(checked) => handleItemToggle(quote.id, !!checked)}
                      className="mt-1"
                    />
                    
                    <div className="flex-1 space-y-2">
                      <div className="flex items-start justify-between">
                        <div>
                          <h4 className="font-medium">{quote.productName}</h4>
                          <p className="text-sm text-muted-foreground">Quote ID: {quote.quoteId}</p>
                        </div>
                        <Badge variant="secondary">{quote.status}</Badge>
                      </div>
                      
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                        <div>
                          <span className="text-muted-foreground">Quantity:</span>
                          <p className="font-medium">{quote.quantity}</p>
                        </div>
                        <div>
                          <span className="text-muted-foreground">Unit Price:</span>
                          <p className="font-medium">${quote.unitPrice.toFixed(2)}</p>
                        </div>
                        <div>
                          <span className="text-muted-foreground">Total:</span>
                          <p className="font-medium">${quote.totalPrice.toFixed(2)}</p>
                        </div>
                        <div>
                          <span className="text-muted-foreground">Employee:</span>
                          <p className="font-medium">{quote.employeeName}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {customerQuotes.length === 0 && (
            <Card>
              <CardContent className="p-8 text-center">
                <Package className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <p className="text-muted-foreground">No ready quotes found for this customer.</p>
              </CardContent>
            </Card>
          )}

          {/* Selection Summary */}
          {someSelected && (
            <Card className="bg-primary/5 border-primary/20">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <ShoppingCart className="h-5 w-5 text-primary" />
                    <span className="font-medium">Selection Summary</span>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-muted-foreground">
                      {selectedCustomerItems.length} items selected
                    </p>
                    <p className="font-semibold text-lg">
                      Total: ${totalSelectedValue.toFixed(2)}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button 
            onClick={handleConsolidate}
            disabled={!someSelected}
            className="min-w-[140px]"
          >
            <ShoppingCart className="h-4 w-4 mr-2" />
            Create Order ({selectedCustomerItems.length})
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};