
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { X, Package, DollarSign, Archive, Tag, Loader2 } from 'lucide-react';
import { Product, UOM } from '@/types/product';

interface BatchOperationsProps {
  selectedProducts: string[];
  products: Product[];
  systemUOMs: UOM[];
  onClose: () => void;
}

const BatchOperations = ({ selectedProducts, products, systemUOMs, onClose }: BatchOperationsProps) => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [operation, setOperation] = useState<'price' | 'stock' | 'category' | 'status'>('price');
  
  // Batch price update
  const [priceAction, setPriceAction] = useState<'set' | 'increase' | 'decrease'>('set');
  const [priceValue, setPriceValue] = useState('');
  const [priceType, setPriceType] = useState<'fixed' | 'percentage'>('fixed');
  
  // Batch stock update
  const [stockAction, setStockAction] = useState<'set' | 'add' | 'subtract'>('set');
  const [stockValue, setStockValue] = useState('');
  const [stockUOM, setStockUOM] = useState('');
  
  // Batch category update
  const [newCategory, setNewCategory] = useState('');
  
  // Batch status update
  const [newStatus, setNewStatus] = useState<'active' | 'inactive' | 'archived'>('active');

  const selectedProductsList = products.filter(p => selectedProducts.includes(p.id));

  const handleBatchOperation = async () => {
    setIsProcessing(true);
    setProgress(0);
    
    // Simulate batch processing
    for (let i = 0; i <= 100; i += 10) {
      await new Promise(resolve => setTimeout(resolve, 100));
      setProgress(i);
    }
    
    setIsProcessing(false);
    console.log(`Batch ${operation} operation completed for ${selectedProducts.length} products`);
    onClose();
  };

  if (selectedProducts.length === 0) {
    return null;
  }

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Package className="h-5 w-5" />
            Batch Operations
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Selected Products Preview */}
          <div>
            <Label className="text-sm font-medium">Selected Products ({selectedProducts.length})</Label>
            <div className="mt-2 space-y-2 max-h-40 overflow-y-auto">
              {selectedProductsList.map(product => (
                <div key={product.id} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                  <div>
                    <span className="font-medium">{product.name}</span>
                    <span className="text-sm text-gray-500 ml-2">({product.sku})</span>
                  </div>
                  <Badge variant="outline">{product.category}</Badge>
                </div>
              ))}
            </div>
          </div>

          {/* Operation Tabs */}
          <Tabs value={operation} onValueChange={(value) => setOperation(value as any)}>
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="price" className="flex items-center gap-2">
                <DollarSign className="h-4 w-4" />
                Price Update
              </TabsTrigger>
              <TabsTrigger value="stock" className="flex items-center gap-2">
                <Package className="h-4 w-4" />
                Stock Update
              </TabsTrigger>
              <TabsTrigger value="category" className="flex items-center gap-2">
                <Tag className="h-4 w-4" />
                Category
              </TabsTrigger>
              <TabsTrigger value="status" className="flex items-center gap-2">
                <Archive className="h-4 w-4" />
                Status
              </TabsTrigger>
            </TabsList>

            <TabsContent value="price" className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Operation Type</Label>
                  <Select value={priceAction} onValueChange={(value) => setPriceAction(value as 'set' | 'increase' | 'decrease')}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="set">Set Price</SelectItem>
                      <SelectItem value="increase">Increase Price</SelectItem>
                      <SelectItem value="decrease">Decrease Price</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label>Value Type</Label>
                  <Select value={priceType} onValueChange={(value) => setPriceType(value as 'fixed' | 'percentage')}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="fixed">Fixed Amount</SelectItem>
                      <SelectItem value="percentage">Percentage</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div>
                <Label>Price Value</Label>
                <Input
                  type="number"
                  placeholder={priceType === 'fixed' ? 'Enter amount' : 'Enter percentage'}
                  value={priceValue}
                  onChange={(e) => setPriceValue(e.target.value)}
                />
              </div>
            </TabsContent>

            <TabsContent value="stock" className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Operation Type</Label>
                  <Select value={stockAction} onValueChange={(value) => setStockAction(value as 'set' | 'add' | 'subtract')}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="set">Set Stock</SelectItem>
                      <SelectItem value="add">Add Stock</SelectItem>
                      <SelectItem value="subtract">Subtract Stock</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label>Unit</Label>
                  <Select value={stockUOM} onValueChange={setStockUOM}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select unit" />
                    </SelectTrigger>
                    <SelectContent>
                      {systemUOMs.map(uom => (
                        <SelectItem key={uom.id} value={uom.id}>
                          {uom.name} ({uom.symbol})
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div>
                <Label>Stock Quantity</Label>
                <Input
                  type="number"
                  placeholder="Enter quantity"
                  value={stockValue}
                  onChange={(e) => setStockValue(e.target.value)}
                />
              </div>
            </TabsContent>

            <TabsContent value="category" className="space-y-4">
              <div>
                <Label>New Category</Label>
                <Input
                  placeholder="Enter new category name"
                  value={newCategory}
                  onChange={(e) => setNewCategory(e.target.value)}
                />
              </div>
            </TabsContent>

            <TabsContent value="status" className="space-y-4">
              <div>
                <Label>New Status</Label>
                <Select value={newStatus} onValueChange={(value) => setNewStatus(value as 'active' | 'inactive' | 'archived')}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="inactive">Inactive</SelectItem>
                    <SelectItem value="archived">Archived</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </TabsContent>
          </Tabs>

          {/* Progress Bar (show when processing) */}
          {isProcessing && (
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Processing Progress</span>
                <span>{progress}%</span>
              </div>
              <Progress value={progress} />
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex justify-end gap-2 pt-4 border-t">
            <Button variant="outline" onClick={onClose} disabled={isProcessing}>
              Cancel
            </Button>
            <Button onClick={handleBatchOperation} disabled={isProcessing}>
              {isProcessing ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Processing...
                </>
              ) : (
                'Execute Batch Operation'
              )}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default BatchOperations;
