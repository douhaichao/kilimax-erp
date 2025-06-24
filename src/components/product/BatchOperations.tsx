import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { X, Package, DollarSign, Archive, Tag, Loader2 } from 'lucide-react';

interface Product {
  id: string;
  sku: string;
  name: string;
  category: string;
  stock: number;
  status: 'active' | 'inactive' | 'archived';
  price: number;
  supplier: string;
  safetyStock: number;
  primaryUOM: string;
  uoms: Array<{
    id: string;
    name: string;
    ratio: number;
    isDefault: boolean;
  }>;
}

interface UOM {
  id: string;
  name: string;
  symbol: string;
  type: 'length' | 'weight' | 'volume' | 'piece';
}

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
    // Here you would implement the actual batch update logic
    console.log(`Batch ${operation} operation completed for ${selectedProducts.length} products`);
  };

  if (selectedProducts.length === 0) {
    return (
      <Card>
        <CardContent className="p-6 text-center">
          <Package className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-500">请先选择要操作的商品</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-center">
          <div>
            <CardTitle className="flex items-center gap-2">
              <Package className="h-5 w-5" />
              批量操作
            </CardTitle>
            <CardDescription>
              已选择 {selectedProducts.length} 个商品进行批量操作
            </CardDescription>
          </div>
          <Button variant="ghost" size="sm" onClick={onClose}>
            <X className="h-4 w-4" />
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {/* Selected Products Preview */}
          <div>
            <Label className="text-sm font-medium">选中的商品</Label>
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
                调价
              </TabsTrigger>
              <TabsTrigger value="stock" className="flex items-center gap-2">
                <Package className="h-4 w-4" />
                库存
              </TabsTrigger>
              <TabsTrigger value="category" className="flex items-center gap-2">
                <Tag className="h-4 w-4" />
                分类
              </TabsTrigger>
              <TabsTrigger value="status" className="flex items-center gap-2">
                <Archive className="h-4 w-4" />
                状态
              </TabsTrigger>
            </TabsList>

            <TabsContent value="price" className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>操作类型</Label>
                  <Select value={priceAction} onValueChange={setPriceAction}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="set">设置价格</SelectItem>
                      <SelectItem value="increase">增加价格</SelectItem>
                      <SelectItem value="decrease">减少价格</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label>值类型</Label>
                  <Select value={priceType} onValueChange={setPriceType}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="fixed">固定金额</SelectItem>
                      <SelectItem value="percentage">百分比</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div>
                <Label>价格值</Label>
                <Input
                  type="number"
                  placeholder={priceType === 'fixed' ? '输入金额' : '输入百分比'}
                  value={priceValue}
                  onChange={(e) => setPriceValue(e.target.value)}
                />
              </div>
            </TabsContent>

            <TabsContent value="stock" className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>操作类型</Label>
                  <Select value={stockAction} onValueChange={setStockAction}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="set">设置库存</SelectItem>
                      <SelectItem value="add">增加库存</SelectItem>
                      <SelectItem value="subtract">减少库存</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label>单位</Label>
                  <Select value={stockUOM} onValueChange={setStockUOM}>
                    <SelectTrigger>
                      <SelectValue placeholder="选择单位" />
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
                <Label>库存数量</Label>
                <Input
                  type="number"
                  placeholder="输入数量"
                  value={stockValue}
                  onChange={(e) => setStockValue(e.target.value)}
                />
              </div>
            </TabsContent>

            <TabsContent value="category" className="space-y-4">
              <div>
                <Label>新分类</Label>
                <Input
                  placeholder="输入新的分类名称"
                  value={newCategory}
                  onChange={(e) => setNewCategory(e.target.value)}
                />
              </div>
            </TabsContent>

            <TabsContent value="status" className="space-y-4">
              <div>
                <Label>新状态</Label>
                <Select value={newStatus} onValueChange={setNewStatus}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="active">启用</SelectItem>
                    <SelectItem value="inactive">禁用</SelectItem>
                    <SelectItem value="archived">归档</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </TabsContent>
          </Tabs>

          {/* Progress Bar (show when processing) */}
          {isProcessing && (
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>处理进度</span>
                <span>{progress}%</span>
              </div>
              <Progress value={progress} />
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={onClose} disabled={isProcessing}>
              取消
            </Button>
            <Button onClick={handleBatchOperation} disabled={isProcessing}>
              {isProcessing ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  处理中...
                </>
              ) : (
                '执行批量操作'
              )}
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default BatchOperations;
