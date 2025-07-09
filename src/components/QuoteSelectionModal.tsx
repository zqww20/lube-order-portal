import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Quote, QuoteItem, useQuotes } from '@/contexts/QuoteContext';
import { useToast } from '@/hooks/use-toast';

interface QuoteSelectionModalProps {
  quote: Quote;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const QuoteSelectionModal: React.FC<QuoteSelectionModalProps> = ({
  quote,
  open,
  onOpenChange,
}) => {
  const { updateQuoteStatus } = useQuotes();
  const { toast } = useToast();
  const [selectedItems, setSelectedItems] = useState<Set<string>>(new Set());

  const handleItemSelect = (itemId: string, checked: boolean) => {
    const newSelected = new Set(selectedItems);
    if (checked) {
      newSelected.add(itemId);
    } else {
      newSelected.delete(itemId);
    }
    setSelectedItems(newSelected);
  };

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedItems(new Set(quote.items.map(item => item.id)));
    } else {
      setSelectedItems(new Set());
    }
  };

  const calculateSelectedTotal = () => {
    return quote.items
      .filter(item => selectedItems.has(item.id))
      .reduce((total, item) => total + (item.quotedPrice || item.currentPrice) * item.quantity, 0);
  };

  const handleCreateOrder = () => {
    if (selectedItems.size === 0) {
      toast({
        title: "No items selected",
        description: "Please select at least one item to create an order.",
        variant: "destructive",
      });
      return;
    }

    const selectedItemsArray = quote.items.filter(item => selectedItems.has(item.id));
    const isPartialSelection = selectedItems.size < quote.items.length;

    // Update quote status based on selection
    const newStatus = isPartialSelection ? 'partially-accepted' : 'accepted';
    updateQuoteStatus(quote.id, newStatus);

    // Simulate order creation
    toast({
      title: "Order Created Successfully",
      description: `Order created with ${selectedItems.size} item(s) for $${calculateSelectedTotal().toFixed(2)}`,
    });

    onOpenChange(false);
    setSelectedItems(new Set());
  };

  const allSelected = selectedItems.size === quote.items.length;
  const someSelected = selectedItems.size > 0;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[80vh] overflow-hidden flex flex-col">
        <DialogHeader>
          <DialogTitle>Select Items for Order - {quote.id}</DialogTitle>
        </DialogHeader>

        <div className="flex-1 overflow-auto">
          <div className="mb-4">
            <div className="flex items-center space-x-2 mb-2">
              <Checkbox
                id="select-all"
                checked={allSelected}
                onCheckedChange={handleSelectAll}
                className="data-[state=checked]:bg-primary data-[state=checked]:border-primary"
              />
              <label htmlFor="select-all" className="text-sm font-medium">
                Select All Items
              </label>
            </div>
            <p className="text-sm text-muted-foreground">
              Customer: {quote.customerName}
            </p>
          </div>

          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-12">Select</TableHead>
                <TableHead>Product</TableHead>
                <TableHead>Quantity</TableHead>
                <TableHead>Current Price</TableHead>
                <TableHead>Quoted Price</TableHead>
                <TableHead>Subtotal</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {quote.items.map((item) => {
                const isSelected = selectedItems.has(item.id);
                const price = item.quotedPrice || item.currentPrice;
                const subtotal = price * item.quantity;

                return (
                  <TableRow 
                    key={item.id} 
                    className={isSelected ? "bg-muted/50" : ""}
                  >
                    <TableCell>
                      <Checkbox
                        checked={isSelected}
                        onCheckedChange={(checked) => handleItemSelect(item.id, checked as boolean)}
                        className="data-[state=checked]:bg-primary data-[state=checked]:border-primary"
                      />
                    </TableCell>
                    <TableCell className="font-medium">{item.productName}</TableCell>
                    <TableCell>{item.quantity}</TableCell>
                    <TableCell>${item.currentPrice.toFixed(2)}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        ${price.toFixed(2)}
                        {item.quotedPrice && item.quotedPrice < item.currentPrice && (
                          <Badge variant="secondary" className="text-xs">
                            Discounted
                          </Badge>
                        )}
                      </div>
                    </TableCell>
                    <TableCell className="font-semibold">
                      ${subtotal.toFixed(2)}
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </div>

        <DialogFooter className="border-t pt-4">
          <div className="flex justify-between items-center w-full">
            <div className="text-sm text-muted-foreground">
              {selectedItems.size} of {quote.items.length} items selected
            </div>
            <div className="flex items-center gap-4">
              <div className="text-lg font-semibold">
                Total: ${calculateSelectedTotal().toFixed(2)}
              </div>
              <div className="flex gap-2">
                <Button variant="outline" onClick={() => onOpenChange(false)}>
                  Cancel
                </Button>
                <Button 
                  onClick={handleCreateOrder}
                  disabled={!someSelected}
                  className="bg-primary hover:bg-primary/90"
                >
                  Create Order ({selectedItems.size} items)
                </Button>
              </div>
            </div>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};