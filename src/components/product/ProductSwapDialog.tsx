import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowLeftRight, Save, X, Edit3, ArrowRight, Package } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";

interface ProductSwapDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const ProductSwapDialog = ({ open, onOpenChange }: ProductSwapDialogProps) => {
  const [currentStep, setCurrentStep] = useState<'swap' | 'variant'>('swap');
  const [oldItemUIN, setOldItemUIN] = useState('');
  const [newItemUIN, setNewItemUIN] = useState('');
  const [selectedProduct, setSelectedProduct] = useState('');
  const [isSwapping, setIsSwapping] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  
  // Mock product details for display
  const [productDetails, setProductDetails] = useState<any>(null);
  
  // Variant details for the new item
  const [variantDetails, setVariantDetails] = useState({
    color: '',
    size: '',
    memory: '',
    sku: '',
    price: '',
    stock: ''
  });

  // Mock data for existing variants
  const existingColors = ['Space Gray', 'Silver', 'Gold', 'Blue', 'Green', 'Red', 'Black', 'White'];
  const existingSizes = ['XS', 'S', 'M', 'L', 'XL', 'XXL', '6', '7', '8', '9', '10', '11', '12'];
  const existingMemory = ['64GB', '128GB', '256GB', '512GB', '1TB', '2TB', '4GB', '8GB', '16GB', '32GB'];
  
  // Mock available products data
  const availableProducts = [
    {
      id: '1',
      name: 'iPhone 15 Pro',
      category: 'Electronics',
      specifications: 'A17 Pro chip, 48MP camera, Titanium design',
      sku: 'IPH-15-PRO'
    },
    {
      id: '2', 
      name: 'Samsung Galaxy S24',
      category: 'Electronics',
      specifications: 'Snapdragon 8 Gen 3, 50MP camera, 120Hz display',
      sku: 'SAM-S24'
    },
    {
      id: '3',
      name: 'MacBook Pro 16"',
      category: 'Computers',
      specifications: 'M3 Pro chip, 16GB RAM, 512GB SSD',
      sku: 'MBP-16'
    },
    {
      id: '4',
      name: 'iPad Air',
      category: 'Tablets',
      specifications: 'M2 chip, 10.9" display, Wi-Fi 6E',
      sku: 'IPAD-AIR'
    }
  ];
  
  const { toast } = useToast();

  // Mock function to fetch product details
  const fetchProductDetails = (uin: string) => {
    if (uin.length > 5) {
      // Simulate API call
      setProductDetails({
        name: 'iPhone 15 Pro',
        category: 'Smartphones',
        sku: 'IPH15P-001',
        currentVariant: {
          color: 'Space Gray',
          memory: '256GB',
          price: 999.00
        },
        stock: 15
      });
    } else {
      setProductDetails(null);
    }
  };

  const handleOldItemChange = (value: string) => {
    setOldItemUIN(value);
    fetchProductDetails(value);
  };

  const handleProductSelect = (productId: string) => {
    setSelectedProduct(productId);
    const product = availableProducts.find(p => p.id === productId);
    if (product) {
      // Auto-generate UIN based on selected product
      const autoUIN = `${product.sku}-${Date.now().toString().slice(-6)}`;
      setNewItemUIN(autoUIN);
    }
  };

  const handleSwap = async () => {
    if (!oldItemUIN.trim() || (!newItemUIN.trim() && !selectedProduct)) {
      toast({
        title: "错误",
        description: "请输入旧商品UIN并选择新商品或输入新商品UIN",
        variant: "destructive",
      });
      return;
    }

    if (oldItemUIN.trim() === newItemUIN.trim()) {
      toast({
        title: "错误", 
        description: "旧商品和新商品不能相同",
        variant: "destructive",
      });
      return;
    }

    setIsSwapping(true);
    
    try {
      // Simulate API call for swapping items
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      const selectedProductName = selectedProduct ? 
        availableProducts.find(p => p.id === selectedProduct)?.name : 
        newItemUIN;
      
      toast({
        title: "成功",
        description: `商品换货成功！旧商品: ${oldItemUIN} → 新商品: ${selectedProductName}`,
      });
      
      // Move to variant editing step
      setCurrentStep('variant');
      setVariantDetails(prev => ({
        ...prev,
        sku: `${newItemUIN}-VAR` // Pre-populate with basic SKU
      }));
    } catch (error) {
      toast({
        title: "错误",
        description: "换货失败，请重试",
        variant: "destructive",
      });
    } finally {
      setIsSwapping(false);
    }
  };

  const handleSaveVariant = async () => {
    if (!variantDetails.color.trim() && !variantDetails.size.trim() && !variantDetails.memory.trim()) {
      toast({
        title: "错误",
        description: "请至少指定一个变体属性（颜色、尺寸或内存）",
        variant: "destructive",
      });
      return;
    }

    setIsSaving(true);
    
    try {
      // Simulate API call for updating variant details
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast({
        title: "成功",
        description: `变体详情保存成功：${newItemUIN}`,
      });
      
      // Reset and close dialog
      handleClose();
    } catch (error) {
      toast({
        title: "错误",
        description: "保存变体详情失败，请重试",
        variant: "destructive",
      });
    } finally {
      setIsSaving(false);
    }
  };

  const handleClose = () => {
    setCurrentStep('swap');
    setOldItemUIN('');
    setNewItemUIN('');
    setSelectedProduct('');
    setProductDetails(null);
    setVariantDetails({
      color: '',
      size: '',
      memory: '',
      sku: '',
      price: '',
      stock: ''
    });
    onOpenChange(false);
  };

  const handleBack = () => {
    setCurrentStep('swap');
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-6xl">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            {currentStep === 'swap' ? (
              <>
                <ArrowLeftRight className="h-5 w-5 text-orange-600" />
                商品换货
              </>
            ) : (
              <>
                <Edit3 className="h-5 w-5 text-blue-600" />
                编辑变体详情
              </>
            )}
          </DialogTitle>
          <DialogDescription>
            {currentStep === 'swap' 
              ? "使用UIN（IMEI、序列号等）进行商品换货"
              : `为新商品设置变体详情：${newItemUIN}`
            }
          </DialogDescription>
        </DialogHeader>
        
        {currentStep === 'swap' ? (
          // Step 1: Swap Items with horizontal layout
          <>
            <div className="py-4">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Old Item Section */}
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="oldItem">旧商品UIN/序列号</Label>
                    <Input
                      id="oldItem"
                      placeholder="输入旧商品UIN"
                      value={oldItemUIN}
                      onChange={(e) => handleOldItemChange(e.target.value)}
                      disabled={isSwapping}
                    />
                  </div>
                  
                  {/* Product Details Display */}
                  {productDetails && (
                    <div className="bg-muted/50 p-4 rounded-lg border">
                      <div className="flex items-center gap-2 mb-3">
                        <Package className="h-4 w-4 text-blue-600" />
                        <span className="font-medium text-sm">商品详情</span>
                      </div>
                      <div className="space-y-2 text-sm">
                        <div><span className="font-medium">名称:</span> {productDetails.name}</div>
                        <div><span className="font-medium">分类:</span> {productDetails.category}</div>
                        <div><span className="font-medium">SKU:</span> {productDetails.sku}</div>
                        <div><span className="font-medium">当前变体:</span></div>
                        <div className="ml-4 space-y-1">
                          <div>• 颜色: {productDetails.currentVariant.color}</div>
                          <div>• 内存: {productDetails.currentVariant.memory}</div>
                          <div>• 价格: ¥{productDetails.currentVariant.price}</div>
                        </div>
                        <div><span className="font-medium">库存:</span> {productDetails.stock} 件</div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Arrow Section */}
                <div className="flex items-center justify-center">
                  <div className="flex flex-col items-center gap-2">
                    <ArrowLeftRight className="h-8 w-8 text-orange-500" />
                    <span className="text-sm text-muted-foreground">换货</span>
                  </div>
                </div>
                
                {/* New Item Section */}
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="productSelect">选择商品</Label>
                    <Select 
                      value={selectedProduct} 
                      onValueChange={handleProductSelect}
                      disabled={isSwapping}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="选择商品" />
                      </SelectTrigger>
                      <SelectContent>
                        {availableProducts.map((product) => (
                          <SelectItem key={product.id} value={product.id}>
                            <div className="flex flex-col">
                              <div className="font-medium">{product.name}</div>
                              <div className="text-xs text-muted-foreground">
                                {product.category} • {product.specifications}
                              </div>
                            </div>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="text-sm text-muted-foreground text-center">或</div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="newItem">新商品UIN/序列号</Label>
                    <Input
                      id="newItem"
                      placeholder="输入新商品UIN"
                      value={newItemUIN}
                      onChange={(e) => setNewItemUIN(e.target.value)}
                      disabled={isSwapping}
                    />
                  </div>
                  
                  {/* Selected Product Details */}
                  {selectedProduct && (
                    <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                      <div className="flex items-center gap-2 mb-3">
                        <Package className="h-4 w-4 text-blue-600" />
                        <span className="font-medium text-sm">已选商品</span>
                      </div>
                      {(() => {
                        const product = availableProducts.find(p => p.id === selectedProduct);
                        return product ? (
                          <div className="space-y-2 text-sm">
                            <div><span className="font-medium">名称:</span> {product.name}</div>
                            <div><span className="font-medium">分类:</span> {product.category}</div>
                            <div><span className="font-medium">规格:</span> {product.specifications}</div>
                            <div><span className="font-medium">SKU:</span> {product.sku}</div>
                            <div><span className="font-medium">生成UIN:</span> {newItemUIN}</div>
                          </div>
                        ) : null;
                      })()}
                    </div>
                  )}
                </div>
              </div>
            </div>
            
            <div className="flex justify-end gap-3">
              <Button
                variant="outline"
                onClick={handleClose}
                disabled={isSwapping}
              >
                <X className="h-4 w-4 mr-2" />
                取消
              </Button>
              <Button
                onClick={handleSwap}
                disabled={isSwapping}
                className="bg-orange-600 hover:bg-orange-700 text-white"
              >
                <ArrowRight className="h-4 w-4 mr-2" />
                {isSwapping ? '处理中...' : '换货并继续'}
              </Button>
            </div>
          </>
        ) : (
          // Step 2: Edit Variant Details
          <>
            <div className="space-y-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="variantColor">颜色</Label>
                  <Select 
                    value={variantDetails.color} 
                    onValueChange={(value) => setVariantDetails(prev => ({ ...prev, color: value }))}
                    disabled={isSaving}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="选择颜色" />
                    </SelectTrigger>
                    <SelectContent>
                      {existingColors.map((color) => (
                        <SelectItem key={color} value={color}>
                          {color}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="variantSize">尺寸</Label>
                  <Select 
                    value={variantDetails.size} 
                    onValueChange={(value) => setVariantDetails(prev => ({ ...prev, size: value }))}
                    disabled={isSaving}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="选择尺寸" />
                    </SelectTrigger>
                    <SelectContent>
                      {existingSizes.map((size) => (
                        <SelectItem key={size} value={size}>
                          {size}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="variantMemory">内存/存储</Label>
                  <Select 
                    value={variantDetails.memory} 
                    onValueChange={(value) => setVariantDetails(prev => ({ ...prev, memory: value }))}
                    disabled={isSaving}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="选择内存/存储" />
                    </SelectTrigger>
                    <SelectContent>
                      {existingMemory.map((memory) => (
                        <SelectItem key={memory} value={memory}>
                          {memory}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="variantSku">变体SKU</Label>
                  <Input
                    id="variantSku"
                    placeholder="自动生成SKU"
                    value={variantDetails.sku}
                    onChange={(e) => setVariantDetails(prev => ({ ...prev, sku: e.target.value }))}
                    disabled={isSaving}
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="variantPrice">变体价格</Label>
                  <Input
                    id="variantPrice"
                    placeholder="0.00"
                    type="number"
                    value={variantDetails.price}
                    onChange={(e) => setVariantDetails(prev => ({ ...prev, price: e.target.value }))}
                    disabled={isSaving}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="variantStock">初始库存</Label>
                  <Input
                    id="variantStock"
                    placeholder="0"
                    type="number"
                    value={variantDetails.stock}
                    onChange={(e) => setVariantDetails(prev => ({ ...prev, stock: e.target.value }))}
                    disabled={isSaving}
                  />
                </div>
              </div>
            </div>
            
            <div className="flex justify-end gap-3">
              <Button
                variant="outline"
                onClick={handleBack}
                disabled={isSaving}
              >
                <X className="h-4 w-4 mr-2" />
                返回
              </Button>
              <Button
                onClick={handleSaveVariant}
                disabled={isSaving}
                className="bg-blue-600 hover:bg-blue-700 text-white"
              >
                <Save className="h-4 w-4 mr-2" />
                {isSaving ? '保存中...' : '保存变体'}
              </Button>
            </div>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default ProductSwapDialog;
