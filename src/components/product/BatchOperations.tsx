
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { X, DollarSign, Package, Tag, CheckCircle, AlertCircle } from 'lucide-react';
import { Product } from '@/pages/ProductManagement';

interface BatchOperationsProps {
  selectedProducts: string[];
  products: Product[];
  onClose: () => void;
}

const BatchOperations = ({ selectedProducts, products, onClose }: BatchOperationsProps) => {
  const [operation, setOperation] = useState<'price' | 'stock' | 'category' | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [results, setResults] = useState<{ success: number; failed: number; total: number } | null>(null);

  // Form states
  const [priceUpdate, setPriceUpdate] = useState({ type: 'absolute', value: '' });
  const [stockUpdate, setStockUpdate] = useState({ type: 'set', value: '' });
  const [categoryUpdate, setCategoryUpdate] = useState('');

  const selectedProductDetails = products.filter(p => selectedProducts.includes(p.id));

  const handleBatchOperation = async () => {
    setIsProcessing(true);
    setProgress(0);
    
    // Simulate batch processing
    const total = selectedProducts.length;
    let processed = 0;
    let success = 0;
    let failed = 0;

    for (const productId of selectedProducts) {
      // Simulate processing time
      await new Promise(resolve => setTimeout(resolve, 200));
      
      processed++;
      
      // Simulate some failures
      if (Math.random() > 0.1) {
        success++;
      } else {
        failed++;
      }
      
      setProgress((processed / total) * 100);
    }

    setResults({ success, failed, total });
    setIsProcessing(false);
  };

  const resetForm = () => {
    setOperation(null);
    setResults(null);
    setProgress(0);
    setPriceUpdate({ type: 'absolute', value: '' });
    setStockUpdate({ type: 'set', value: '' });
    setCategoryUpdate('');
  };

  const getOperationIcon = (op: string) => {
    switch (op) {
      case 'price': return <DollarSign className="h-5 w-5" />;
      case 'stock': return <Package className="h-5 w-5" />;
      case 'category': return <Tag className="h-5 w-5" />;
      default: return null;
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(amount);
  };

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl text-blue-800">Batch Operations</DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Selected Products Summary */}
          <Card className="border-blue-200 bg-blue-50">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-semibold text-blue-800">Selected Products</h3>
                  <p className="text-blue-600">{selectedProducts.length} products selected for batch operation</p>
                </div>
                <Badge className="bg-blue-600 text-white">
                  {selectedProducts.length} items
                </Badge>
              </div>
            </CardContent>
          </Card>

          {/* Product Preview */}
          <div className="max-h-40 overflow-y-auto border border-blue-200 rounded-lg">
            <div className="p-3 bg-blue-50 border-b border-blue-200">
              <h4 className="font-medium text-blue-800">Selected Products Preview</h4>
            </div>
            <div className="divide-y divide-blue-100">
              {selectedProductDetails.slice(0, 5).map((product) => (
                <div key={product.id} className="p-3 flex justify-between items-center">
                  <div>
                    <p className="font-medium text-sm">{product.name}</p>
                    <p className="text-xs text-gray-600">{product.sku}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium">{formatCurrency(product.price)}</p>
                    <p className="text-xs text-gray-600">Stock: {product.stock}</p>
                  </div>
                </div>
              ))}
              {selectedProductDetails.length > 5 && (
                <div className="p-3 text-center text-sm text-gray-500">
                  ... and {selectedProductDetails.length - 5} more products
                </div>
              )}
            </div>
          </div>

          {!operation && !results && (
            <div>
              <h3 className="text-lg font-semibold text-blue-800 mb-4">Choose Operation</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card 
                  className="border-blue-200 cursor-pointer hover:border-blue-400 hover:shadow-md transition-all"
                  onClick={() => setOperation('price')}
                >
                  <CardContent className="p-6 text-center">
                    <DollarSign className="h-8 w-8 text-blue-600 mx-auto mb-3" />
                    <h4 className="font-semibold text-blue-800">Update Prices</h4>
                    <p className="text-sm text-gray-600 mt-2">Change product prices in bulk</p>
                  </CardContent>
                </Card>

                <Card 
                  className="border-blue-200 cursor-pointer hover:border-blue-400 hover:shadow-md transition-all"
                  onClick={() => setOperation('stock')}
                >
                  <CardContent className="p-6 text-center">
                    <Package className="h-8 w-8 text-blue-600 mx-auto mb-3" />
                    <h4 className="font-semibold text-blue-800">Update Stock</h4>
                    <p className="text-sm text-gray-600 mt-2">Adjust inventory levels</p>
                  </CardContent>
                </Card>

                <Card 
                  className="border-blue-200 cursor-pointer hover:border-blue-400 hover:shadow-md transition-all"
                  onClick={() => setOperation('category')}
                >
                  <CardContent className="p-6 text-center">
                    <Tag className="h-8 w-8 text-blue-600 mx-auto mb-3" />
                    <h4 className="font-semibold text-blue-800">Change Category</h4>
                    <p className="text-sm text-gray-600 mt-2">Move products to new category</p>
                  </CardContent>
                </Card>
              </div>
            </div>
          )}

          {operation && !isProcessing && !results && (
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-2">
                  {getOperationIcon(operation)}
                  <h3 className="text-lg font-semibold text-blue-800">
                    {operation === 'price' && 'Update Prices'}
                    {operation === 'stock' && 'Update Stock'}
                    {operation === 'category' && 'Change Category'}
                  </h3>
                </div>
                <Button variant="ghost" onClick={resetForm} className="text-gray-500">
                  <X className="h-4 w-4" />
                </Button>
              </div>

              {operation === 'price' && (
                <div className="space-y-4">
                  <div>
                    <Label className="text-blue-800 font-medium">Price Update Method</Label>
                    <Select value={priceUpdate.type} onValueChange={(value) => setPriceUpdate({...priceUpdate, type: value})}>
                      <SelectTrigger className="mt-2 border-blue-200">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="absolute">Set absolute price</SelectItem>
                        <SelectItem value="increase">Increase by amount</SelectItem>
                        <SelectItem value="decrease">Decrease by amount</SelectItem>
                        <SelectItem value="percentage">Increase by percentage</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label className="text-blue-800 font-medium">
                      {priceUpdate.type === 'absolute' && 'New Price'}
                      {priceUpdate.type === 'increase' && 'Increase Amount'}
                      {priceUpdate.type === 'decrease' && 'Decrease Amount'}
                      {priceUpdate.type === 'percentage' && 'Percentage Increase'}
                    </Label>
                    <Input
                      type="number"
                      step="0.01"
                      value={priceUpdate.value}
                      onChange={(e) => setPriceUpdate({...priceUpdate, value: e.target.value})}
                      placeholder={priceUpdate.type === 'percentage' ? '10' : '0.00'}
                      className="mt-2 border-blue-200 focus:border-blue-400"
                    />
                  </div>
                </div>
              )}

              {operation === 'stock' && (
                <div className="space-y-4">
                  <div>
                    <Label className="text-blue-800 font-medium">Stock Update Method</Label>
                    <Select value={stockUpdate.type} onValueChange={(value) => setStockUpdate({...stockUpdate, type: value})}>
                      <SelectTrigger className="mt-2 border-blue-200">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="set">Set stock level</SelectItem>
                        <SelectItem value="add">Add to current stock</SelectItem>
                        <SelectItem value="subtract">Subtract from current stock</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label className="text-blue-800 font-medium">
                      {stockUpdate.type === 'set' && 'New Stock Level'}
                      {stockUpdate.type === 'add' && 'Add Quantity'}
                      {stockUpdate.type === 'subtract' && 'Subtract Quantity'}
                    </Label>
                    <Input
                      type="number"
                      value={stockUpdate.value}
                      onChange={(e) => setStockUpdate({...stockUpdate, value: e.target.value})}
                      placeholder="0"
                      className="mt-2 border-blue-200 focus:border-blue-400"
                    />
                  </div>
                </div>
              )}

              {operation === 'category' && (
                <div>
                  <Label className="text-blue-800 font-medium">New Category</Label>
                  <Select value={categoryUpdate} onValueChange={setCategoryUpdate}>
                    <SelectTrigger className="mt-2 border-blue-200">
                      <SelectValue placeholder="Select new category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="cat-1">Beverages</SelectItem>
                      <SelectItem value="cat-2">Handicrafts</SelectItem>
                      <SelectItem value="cat-3">Outdoor Gear</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              )}

              <div className="flex justify-end space-x-3 pt-6">
                <Button variant="outline" onClick={resetForm} className="border-gray-300">
                  Cancel
                </Button>
                <Button 
                  onClick={handleBatchOperation}
                  className="bg-blue-600 hover:bg-blue-700 text-white"
                  disabled={
                    (operation === 'price' && !priceUpdate.value) ||
                    (operation === 'stock' && !stockUpdate.value) ||
                    (operation === 'category' && !categoryUpdate)
                  }
                >
                  Apply to {selectedProducts.length} Products
                </Button>
              </div>
            </div>
          )}

          {isProcessing && (
            <div className="text-center space-y-4">
              <div className="flex items-center justify-center space-x-2 mb-4">
                {getOperationIcon(operation!)}
                <h3 className="text-lg font-semibold text-blue-800">Processing Batch Operation</h3>
              </div>
              <Progress value={progress} className="w-full" />
              <p className="text-blue-600">
                Processing {Math.round(progress)}% complete...
              </p>
            </div>
          )}

          {results && (
            <div className="text-center space-y-4">
              <div className="flex items-center justify-center space-x-2 mb-4">
                <CheckCircle className="h-8 w-8 text-green-600" />
                <h3 className="text-lg font-semibold text-green-800">Batch Operation Complete</h3>
              </div>
              
              <div className="grid grid-cols-3 gap-4">
                <Card className="border-green-200 bg-green-50">
                  <CardContent className="p-4 text-center">
                    <div className="text-2xl font-bold text-green-600">{results.success}</div>
                    <div className="text-sm text-green-700">Successful</div>
                  </CardContent>
                </Card>
                
                <Card className="border-red-200 bg-red-50">
                  <CardContent className="p-4 text-center">
                    <div className="text-2xl font-bold text-red-600">{results.failed}</div>
                    <div className="text-sm text-red-700">Failed</div>
                  </CardContent>
                </Card>
                
                <Card className="border-blue-200 bg-blue-50">
                  <CardContent className="p-4 text-center">
                    <div className="text-2xl font-bold text-blue-600">{results.total}</div>
                    <div className="text-sm text-blue-700">Total</div>
                  </CardContent>
                </Card>
              </div>

              {results.failed > 0 && (
                <div className="flex items-center justify-center space-x-2 text-amber-600">
                  <AlertCircle className="h-4 w-4" />
                  <span className="text-sm">Some operations failed. Check the error log for details.</span>
                </div>
              )}

              <div className="flex justify-center space-x-3 pt-4">
                <Button variant="outline" onClick={resetForm} className="border-blue-300 text-blue-700">
                  Run Another Operation
                </Button>
                <Button onClick={onClose} className="bg-blue-600 hover:bg-blue-700 text-white">
                  Close
                </Button>
              </div>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default BatchOperations;
