import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { ArrowLeftRight, Save, X, Edit3, ArrowRight } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";

interface ProductSwapDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const ProductSwapDialog = ({ open, onOpenChange }: ProductSwapDialogProps) => {
  const [currentStep, setCurrentStep] = useState<'swap' | 'modify'>('swap');
  const [oldItemUIN, setOldItemUIN] = useState('');
  const [newItemUIN, setNewItemUIN] = useState('');
  const [isSwapping, setIsSwapping] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  
  // New item details for modification
  const [newItemDetails, setNewItemDetails] = useState({
    name: '',
    model: '',
    condition: '',
    notes: '',
    price: '',
    category: ''
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
      
      // Move to modification step instead of closing
      setCurrentStep('modify');
      setNewItemDetails(prev => ({
        ...prev,
        name: `Product ${newItemUIN}` // Pre-populate with basic info
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

  const handleModifyDetails = async () => {
    if (!newItemDetails.name.trim()) {
      toast({
        title: "Error",
        description: "Product name is required",
        variant: "destructive",
      });
      return;
    }

    setIsSaving(true);
    
    try {
      // Simulate API call for updating item details
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast({
        title: "Success",
        description: `New item details updated successfully for ${newItemUIN}`,
      });
      
      // Reset and close dialog
      handleClose();
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update item details. Please try again.",
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
    setNewItemDetails({
      name: '',
      model: '',
      condition: '',
      notes: '',
      price: '',
      category: ''
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
                Modify New Item Details
              </>
            )}
          </DialogTitle>
          <DialogDescription>
            {currentStep === 'swap' 
              ? "Swap a product with another using UIN (IMEI, Serial Number, etc.)"
              : `Update details for the new item: ${newItemUIN}`
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
          // Step 2: Modify New Item Details
          <>
            <div className="space-y-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="itemName">Product Name *</Label>
                  <Input
                    id="itemName"
                    placeholder="Enter product name"
                    value={newItemDetails.name}
                    onChange={(e) => setNewItemDetails(prev => ({ ...prev, name: e.target.value }))}
                    disabled={isSaving}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="itemModel">Model</Label>
                  <Input
                    id="itemModel"
                    placeholder="Enter model"
                    value={newItemDetails.model}
                    onChange={(e) => setNewItemDetails(prev => ({ ...prev, model: e.target.value }))}
                    disabled={isSaving}
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="itemCondition">Condition</Label>
                  <Input
                    id="itemCondition"
                    placeholder="e.g., New, Used, Refurbished"
                    value={newItemDetails.condition}
                    onChange={(e) => setNewItemDetails(prev => ({ ...prev, condition: e.target.value }))}
                    disabled={isSaving}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="itemPrice">Price</Label>
                  <Input
                    id="itemPrice"
                    placeholder="0.00"
                    type="number"
                    value={newItemDetails.price}
                    onChange={(e) => setNewItemDetails(prev => ({ ...prev, price: e.target.value }))}
                    disabled={isSaving}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="itemCategory">Category</Label>
                <Input
                  id="itemCategory"
                  placeholder="Enter category"
                  value={newItemDetails.category}
                  onChange={(e) => setNewItemDetails(prev => ({ ...prev, category: e.target.value }))}
                  disabled={isSaving}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="itemNotes">Notes</Label>
                <Textarea
                  id="itemNotes"
                  placeholder="Additional notes about the item..."
                  value={newItemDetails.notes}
                  onChange={(e) => setNewItemDetails(prev => ({ ...prev, notes: e.target.value }))}
                  disabled={isSaving}
                  className="min-h-[60px]"
                />
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
                onClick={handleModifyDetails}
                disabled={isSaving || !newItemDetails.name.trim()}
                className="bg-blue-600 hover:bg-blue-700 text-white"
              >
                <Save className="h-4 w-4 mr-2" />
                {isSaving ? 'Saving...' : 'Save Details'}
              </Button>
            </div>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default ProductSwapDialog;