
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowLeftRight, Save, X, Edit3, ArrowRight } from 'lucide-react';
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
  
  // Variant details for the new item
  const [variantDetails, setVariantDetails] = useState({
    color: '',
    size: '',
    memory: '',
    sku: '',
    price: '',
    stock: ''
  });
  
  const { toast } = useToast();

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
      <DialogContent className="sm:max-w-md">
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
          // Step 1: Swap Items
          <>
            <div className="space-y-6 py-4">
              <div className="space-y-2">
                <Label htmlFor="oldItem">Old Item UIN/Serial Number</Label>
                <Input
                  id="oldItem"
                  placeholder="Enter old item UIN (e.g., IMEI, Serial Number)"
                  value={oldItemUIN}
                  onChange={(e) => setOldItemUIN(e.target.value)}
                  disabled={isSwapping}
                />
              </div>
              
              <div className="flex justify-center">
                <ArrowLeftRight className="h-6 w-6 text-orange-500" />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="newItem">New Item UIN/Serial Number</Label>
                <Input
                  id="newItem"
                  placeholder="Enter new item UIN (e.g., IMEI, Serial Number)"
                  value={newItemUIN}
                  onChange={(e) => setNewItemUIN(e.target.value)}
                  disabled={isSwapping}
                />
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
                  <Input
                    id="variantColor"
                    placeholder="e.g., Space Gray, Blue"
                    value={variantDetails.color}
                    onChange={(e) => setVariantDetails(prev => ({ ...prev, color: e.target.value }))}
                    disabled={isSaving}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="variantSize">Size</Label>
                  <Input
                    id="variantSize"
                    placeholder="e.g., Small, Medium, Large"
                    value={variantDetails.size}
                    onChange={(e) => setVariantDetails(prev => ({ ...prev, size: e.target.value }))}
                    disabled={isSaving}
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="variantMemory">Memory/Storage</Label>
                  <Input
                    id="variantMemory"
                    placeholder="e.g., 128GB, 256GB, 512GB"
                    value={variantDetails.memory}
                    onChange={(e) => setVariantDetails(prev => ({ ...prev, memory: e.target.value }))}
                    disabled={isSaving}
                  />
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
