import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Calendar } from "@/components/ui/calendar";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { 
  Plus, 
  Trash2, 
  Calendar as CalendarIcon,
  Package,
  AlertTriangle
} from 'lucide-react';
import { format } from 'date-fns';
import { cn } from "@/lib/utils";
import { BatchInfo } from '@/types/transferOrder';

interface BatchEntryDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  productName: string;
  totalQuantity: number;
  currentBatches: BatchInfo[];
  onSave: (batches: BatchInfo[]) => void;
  mode: 'ship' | 'receive';
}

const BatchEntryDialog = ({ 
  open, 
  onOpenChange, 
  productName, 
  totalQuantity, 
  currentBatches, 
  onSave,
  mode 
}: BatchEntryDialogProps) => {
  const [batches, setBatches] = useState<BatchInfo[]>(currentBatches.length > 0 ? currentBatches : []);
  const [newBatch, setNewBatch] = useState({
    batchNumber: '',
    productionDate: undefined as Date | undefined,
    expiryDate: undefined as Date | undefined,
    quantity: 0
  });

  const addBatch = () => {
    if (newBatch.batchNumber.trim() && newBatch.quantity > 0) {
      const batch: BatchInfo = {
        batchNumber: newBatch.batchNumber.trim(),
        productionDate: newBatch.productionDate?.toISOString().split('T')[0],
        expiryDate: newBatch.expiryDate?.toISOString().split('T')[0],
        quantity: newBatch.quantity
      };
      
      setBatches([...batches, batch]);
      setNewBatch({
        batchNumber: '',
        productionDate: undefined,
        expiryDate: undefined,
        quantity: 0
      });
    }
  };

  const removeBatch = (index: number) => {
    setBatches(batches.filter((_, i) => i !== index));
  };

  const updateBatch = (index: number, field: keyof BatchInfo, value: any) => {
    const updatedBatches = [...batches];
    updatedBatches[index] = { ...updatedBatches[index], [field]: value };
    setBatches(updatedBatches);
  };

  const totalBatchQuantity = batches.reduce((sum, batch) => sum + batch.quantity, 0);
  const quantityMismatch = totalBatchQuantity !== totalQuantity;

  const handleSave = () => {
    if (!quantityMismatch) {
      onSave(batches);
      onOpenChange(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-2">
            <Package className="h-5 w-5" />
            <span>Batch Entry - {productName}</span>
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6">
          {/* Summary */}
          <div className="grid grid-cols-3 gap-4 p-4 bg-gray-50 rounded-lg">
            <div>
              <Label className="text-sm text-gray-600">
                {mode === 'ship' ? 'Shipping Quantity' : 'Receiving Quantity'}
              </Label>
              <p className="text-lg font-semibold">{totalQuantity}</p>
            </div>
            <div>
              <Label className="text-sm text-gray-600">Batch Quantity Total</Label>
              <p className={`text-lg font-semibold ${quantityMismatch ? 'text-red-600' : 'text-green-600'}`}>
                {totalBatchQuantity}
              </p>
            </div>
            <div>
              <Label className="text-sm text-gray-600">Status</Label>
              <p className={`text-sm font-medium flex items-center space-x-1 ${
                quantityMismatch ? 'text-red-600' : 'text-green-600'
              }`}>
                {quantityMismatch && <AlertTriangle className="h-4 w-4" />}
                <span>{quantityMismatch ? 'Quantity Mismatch' : 'Quantities Match'}</span>
              </p>
            </div>
          </div>

          {/* Add New Batch */}
          <div className="border rounded-lg p-4">
            <Label className="text-sm font-medium mb-3 block">Add New Batch</Label>
            <div className="grid grid-cols-5 gap-3 items-end">
              <div>
                <Label className="text-xs text-gray-600">Batch Number</Label>
                <Input
                  value={newBatch.batchNumber}
                  onChange={(e) => setNewBatch({ ...newBatch, batchNumber: e.target.value })}
                  placeholder="Enter batch number"
                />
              </div>
              
              <div>
                <Label className="text-xs text-gray-600">Production Date</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn(
                        "w-full justify-start text-left font-normal",
                        !newBatch.productionDate && "text-muted-foreground"
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {newBatch.productionDate ? format(newBatch.productionDate, "PPP") : "Select date"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={newBatch.productionDate}
                      onSelect={(date) => setNewBatch({ ...newBatch, productionDate: date })}
                      initialFocus
                      className="p-3 pointer-events-auto"
                    />
                  </PopoverContent>
                </Popover>
              </div>

              <div>
                <Label className="text-xs text-gray-600">Expiry Date</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn(
                        "w-full justify-start text-left font-normal",
                        !newBatch.expiryDate && "text-muted-foreground"
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {newBatch.expiryDate ? format(newBatch.expiryDate, "PPP") : "Select date"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={newBatch.expiryDate}
                      onSelect={(date) => setNewBatch({ ...newBatch, expiryDate: date })}
                      initialFocus
                      className="p-3 pointer-events-auto"
                    />
                  </PopoverContent>
                </Popover>
              </div>

              <div>
                <Label className="text-xs text-gray-600">Quantity</Label>
                <Input
                  type="number"
                  value={newBatch.quantity || ''}
                  onChange={(e) => setNewBatch({ ...newBatch, quantity: parseInt(e.target.value) || 0 })}
                  placeholder="0"
                  min="1"
                />
              </div>

              <Button onClick={addBatch} disabled={!newBatch.batchNumber.trim() || newBatch.quantity <= 0}>
                <Plus className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Existing Batches */}
          {batches.length > 0 && (
            <div>
              <Label className="text-sm font-medium mb-3 block">Batch Details</Label>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Batch Number</TableHead>
                    <TableHead>Production Date</TableHead>
                    <TableHead>Expiry Date</TableHead>
                    <TableHead>Quantity</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {batches.map((batch, index) => (
                    <TableRow key={index}>
                      <TableCell>
                        <Input
                          value={batch.batchNumber}
                          onChange={(e) => updateBatch(index, 'batchNumber', e.target.value)}
                          className="font-mono text-sm"
                        />
                      </TableCell>
                      <TableCell>
                        <Popover>
                          <PopoverTrigger asChild>
                            <Button
                              variant="outline"
                              size="sm"
                              className={cn(
                                "justify-start text-left font-normal",
                                !batch.productionDate && "text-muted-foreground"
                              )}
                            >
                              <CalendarIcon className="mr-2 h-4 w-4" />
                              {batch.productionDate ? format(new Date(batch.productionDate), "PP") : "Select"}
                            </Button>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0" align="start">
                            <Calendar
                              mode="single"
                              selected={batch.productionDate ? new Date(batch.productionDate) : undefined}
                              onSelect={(date) => updateBatch(index, 'productionDate', date?.toISOString().split('T')[0])}
                              initialFocus
                              className="p-3 pointer-events-auto"
                            />
                          </PopoverContent>
                        </Popover>
                      </TableCell>
                      <TableCell>
                        <Popover>
                          <PopoverTrigger asChild>
                            <Button
                              variant="outline"
                              size="sm"
                              className={cn(
                                "justify-start text-left font-normal",
                                !batch.expiryDate && "text-muted-foreground"
                              )}
                            >
                              <CalendarIcon className="mr-2 h-4 w-4" />
                              {batch.expiryDate ? format(new Date(batch.expiryDate), "PP") : "Select"}
                            </Button>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0" align="start">
                            <Calendar
                              mode="single"
                              selected={batch.expiryDate ? new Date(batch.expiryDate) : undefined}
                              onSelect={(date) => updateBatch(index, 'expiryDate', date?.toISOString().split('T')[0])}
                              initialFocus
                              className="p-3 pointer-events-auto"
                            />
                          </PopoverContent>
                        </Popover>
                      </TableCell>
                      <TableCell>
                        <Input
                          type="number"
                          value={batch.quantity}
                          onChange={(e) => updateBatch(index, 'quantity', parseInt(e.target.value) || 0)}
                          className="w-20"
                          min="1"
                        />
                      </TableCell>
                      <TableCell>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => removeBatch(index)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}

          {/* Actions */}
          <div className="flex justify-end space-x-2 pt-4 border-t">
            <Button variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button 
              onClick={handleSave} 
              disabled={batches.length === 0 || quantityMismatch}
              className={quantityMismatch ? 'bg-red-100 text-red-600 cursor-not-allowed' : ''}
            >
              {quantityMismatch ? 'Fix Quantity Mismatch' : 'Save Batch Information'}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default BatchEntryDialog;
