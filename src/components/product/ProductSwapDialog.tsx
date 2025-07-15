import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowLeftRight, Save, X } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";

interface ProductSwapDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const ProductSwapDialog = ({ open, onOpenChange }: ProductSwapDialogProps) => {
  const [oldItemUIN, setOldItemUIN] = useState('');
  const [newItemUIN, setNewItemUIN] = useState('');
  const [isSwapping, setIsSwapping] = useState(false);
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
      
      // Reset form and close dialog
      setOldItemUIN('');
      setNewItemUIN('');
      onOpenChange(false);
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

  const handleClose = () => {
    setOldItemUIN('');
    setNewItemUIN('');
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <ArrowLeftRight className="h-5 w-5 text-orange-600" />
            Product Swap
          </DialogTitle>
          <DialogDescription>
            Swap a product with another using UIN (IMEI, Serial Number, etc.)
          </DialogDescription>
        </DialogHeader>
        
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
            <Save className="h-4 w-4 mr-2" />
            {isSwapping ? 'Swapping...' : 'Swap Items'}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ProductSwapDialog;