
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

  const handleSwap = async () => {
    if (!oldItemUIN.trim() || !newItemUIN.trim()) {
      toast({
        title: "Error",
        description: "Please enter both Old Item and New Item UIN/Serial numbers",
        variant: "destructive",
      });
      return;
    }

    if (oldItemUIN.trim() === newItemUIN.trim()) {
      toast({
        title: "Error", 
        description: "Old Item and New Item cannot be the same",
        variant: "destructive",
      });
      return;
    }

    setIsSwapping(true);
    
    try {
      // Simulate API call for swapping items
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      toast({
        title: "Success",
        description: `Product swapped successfully! Old: ${oldItemUIN} → New: ${newItemUIN}`,
      });
      
      // Move to variant editing step
      setCurrentStep('variant');
      setVariantDetails(prev => ({
        ...prev,
        sku: `${newItemUIN}-VAR` // Pre-populate with basic SKU
      }));
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to swap products. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSwapping(false);
    }
  };

  const handleSaveVariant = async () => {
    if (!variantDetails.color.trim() && !variantDetails.size.trim() && !variantDetails.memory.trim()) {
      toast({
        title: "Error",
        description: "Please specify at least one variant attribute (color, size, or memory)",
        variant: "destructive",
      });
      return;
    }

    setIsSaving(true);
    
    try {
      // Simulate API call for updating variant details
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast({
        title: "Success",
        description: `Variant details saved successfully for ${newItemUIN}`,
      });
      
      // Reset and close dialog
      handleClose();
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to save variant details. Please try again.",
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
      <DialogContent className="sm:max-w-4xl">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            {currentStep === 'swap' ? (
              <>
                <ArrowLeftRight className="h-5 w-5 text-orange-600" />
                Product Swap
              </>
            ) : (
              <>
                <Edit3 className="h-5 w-5 text-blue-600" />
                Edit Variant Details
              </>
            )}
          </DialogTitle>
          <DialogDescription>
            {currentStep === 'swap' 
              ? "Swap a product with another using UIN (IMEI, Serial Number, etc.)"
              : `Set variant details for the new item: ${newItemUIN}`
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
                    <Label htmlFor="oldItem">Old Item UIN/Serial Number</Label>
                    <Input
                      id="oldItem"
                      placeholder="Enter old item UIN"
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
                        <span className="font-medium text-sm">Product Details</span>
                      </div>
                      <div className="space-y-2 text-sm">
                        <div><span className="font-medium">Name:</span> {productDetails.name}</div>
                        <div><span className="font-medium">Category:</span> {productDetails.category}</div>
                        <div><span className="font-medium">SKU:</span> {productDetails.sku}</div>
                        <div><span className="font-medium">Current Variant:</span></div>
                        <div className="ml-4 space-y-1">
                          <div>• Color: {productDetails.currentVariant.color}</div>
                          <div>• Memory: {productDetails.currentVariant.memory}</div>
                          <div>• Price: ${productDetails.currentVariant.price}</div>
                        </div>
                        <div><span className="font-medium">Stock:</span> {productDetails.stock} units</div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Arrow Section */}
                <div className="flex items-center justify-center">
                  <div className="flex flex-col items-center gap-2">
                    <ArrowLeftRight className="h-8 w-8 text-orange-500" />
                    <span className="text-sm text-muted-foreground">Swap</span>
                  </div>
                </div>
                
                {/* New Item Section */}
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="newItem">New Item UIN/Serial Number</Label>
                    <Input
                      id="newItem"
                      placeholder="Enter new item UIN"
                      value={newItemUIN}
                      onChange={(e) => setNewItemUIN(e.target.value)}
                      disabled={isSwapping}
                    />
                  </div>
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
                Cancel
              </Button>
              <Button
                onClick={handleSwap}
                disabled={isSwapping}
                className="bg-orange-600 hover:bg-orange-700 text-white"
              >
                <ArrowRight className="h-4 w-4 mr-2" />
                {isSwapping ? 'Swapping...' : 'Swap & Continue'}
              </Button>
            </div>
          </>
        ) : (
          // Step 2: Edit Variant Details
          <>
            <div className="space-y-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="variantColor">Color</Label>
                  <Select 
                    value={variantDetails.color} 
                    onValueChange={(value) => setVariantDetails(prev => ({ ...prev, color: value }))}
                    disabled={isSaving}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select color" />
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
                  <Label htmlFor="variantSize">Size</Label>
                  <Select 
                    value={variantDetails.size} 
                    onValueChange={(value) => setVariantDetails(prev => ({ ...prev, size: value }))}
                    disabled={isSaving}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select size" />
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
                  <Label htmlFor="variantMemory">Memory/Storage</Label>
                  <Select 
                    value={variantDetails.memory} 
                    onValueChange={(value) => setVariantDetails(prev => ({ ...prev, memory: value }))}
                    disabled={isSaving}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select memory/storage" />
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
                  <Label htmlFor="variantSku">Variant SKU</Label>
                  <Input
                    id="variantSku"
                    placeholder="Auto-generated SKU"
                    value={variantDetails.sku}
                    onChange={(e) => setVariantDetails(prev => ({ ...prev, sku: e.target.value }))}
                    disabled={isSaving}
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="variantPrice">Variant Price</Label>
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
                  <Label htmlFor="variantStock">Initial Stock</Label>
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
                Back
              </Button>
              <Button
                onClick={handleSaveVariant}
                disabled={isSaving}
                className="bg-blue-600 hover:bg-blue-700 text-white"
              >
                <Save className="h-4 w-4 mr-2" />
                {isSaving ? 'Saving...' : 'Save Variant'}
              </Button>
            </div>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default ProductSwapDialog;
