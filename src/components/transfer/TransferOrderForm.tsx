
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { 
  ArrowLeft, 
  Plus, 
  Trash2, 
  Save,
  MapPin
} from 'lucide-react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { TransferOrder, TransferOrderItem, Location } from '@/types/transferOrder';

interface TransferOrderFormProps {
  order?: TransferOrder;
  onSave: (order: TransferOrder) => void;
  onCancel: () => void;
}

const TransferOrderForm = ({ order, onSave, onCancel }: TransferOrderFormProps) => {
  const [formData, setFormData] = useState({
    transferNumber: order?.transferNumber || `TRF-${new Date().getFullYear()}-${Math.floor(Math.random() * 1000).toString().padStart(3, '0')}`,
    fromLocationId: order?.fromLocationId || '',
    toLocationId: order?.toLocationId || '',
    requestedBy: order?.requestedBy || 'Current User',
    notes: order?.notes || '',
    items: order?.items || []
  });

  const mockLocations: Location[] = [
    { id: 'loc-1', name: 'Main Warehouse', code: 'MW001', type: 'warehouse', address: '123 Main St', isActive: true },
    { id: 'loc-2', name: 'Store A', code: 'SA001', type: 'store', address: '456 Oak Ave', isActive: true },
    { id: 'loc-3', name: 'Store B', code: 'SB001', type: 'store', address: '789 Pine St', isActive: true },
    { id: 'loc-4', name: 'Store C', code: 'SC001', type: 'store', address: '321 Elm St', isActive: true }
  ];

  const mockProducts = [
    { id: 'prod-1', name: 'Wireless Headphones', sku: 'WH-001', cost: 150, uom: 'piece' },
    { id: 'prod-2', name: 'Office Chair', sku: 'OC-002', cost: 180, uom: 'piece' },
    { id: 'prod-3', name: 'Water Bottle', sku: 'WB-003', cost: 12.75, uom: 'piece' },
    { id: 'prod-4', name: 'Desk Lamp', sku: 'DL-004', cost: 45, uom: 'piece' },
    { id: 'prod-5', name: 'Notebook', sku: 'NB-005', cost: 5.50, uom: 'piece' }
  ];

  const addItem = () => {
    const newItem: TransferOrderItem = {
      id: `item-${Date.now()}`,
      productId: '',
      productName: '',
      productSku: '',
      uom: 'piece',
      requestedQuantity: 1,
      unitCost: 0,
      totalCost: 0
    };
    
    setFormData(prev => ({
      ...prev,
      items: [...prev.items, newItem]
    }));
  };

  const updateItem = (index: number, field: keyof TransferOrderItem, value: any) => {
    const updatedItems = [...formData.items];
    updatedItems[index] = { ...updatedItems[index], [field]: value };
    
    // Auto-calculate total cost when quantity or unit cost changes
    if (field === 'requestedQuantity' || field === 'unitCost') {
      updatedItems[index].totalCost = updatedItems[index].requestedQuantity * updatedItems[index].unitCost;
    }
    
    // Auto-fill product details when product is selected
    if (field === 'productId') {
      const selectedProduct = mockProducts.find(p => p.id === value);
      if (selectedProduct) {
        updatedItems[index].productName = selectedProduct.name;
        updatedItems[index].productSku = selectedProduct.sku;
        updatedItems[index].unitCost = selectedProduct.cost;
        updatedItems[index].uom = selectedProduct.uom;
        updatedItems[index].totalCost = updatedItems[index].requestedQuantity * selectedProduct.cost;
      }
    }
    
    setFormData(prev => ({ ...prev, items: updatedItems }));
  };

  const removeItem = (index: number) => {
    setFormData(prev => ({
      ...prev,
      items: prev.items.filter((_, i) => i !== index)
    }));
  };

  const handleSave = () => {
    const totalQuantity = formData.items.reduce((sum, item) => sum + item.requestedQuantity, 0);
    const estimatedValue = formData.items.reduce((sum, item) => sum + item.totalCost, 0);
    
    const fromLocation = mockLocations.find(loc => loc.id === formData.fromLocationId);
    const toLocation = mockLocations.find(loc => loc.id === formData.toLocationId);

    const transferOrder: TransferOrder = {
      id: order?.id || `to-${Date.now()}`,
      transferNumber: formData.transferNumber,
      fromLocationId: formData.fromLocationId,
      fromLocationName: fromLocation?.name || '',
      toLocationId: formData.toLocationId,
      toLocationName: toLocation?.name || '',
      status: order?.status || 'draft',
      items: formData.items,
      requestedBy: formData.requestedBy,
      requestedDate: order?.requestedDate || new Date().toISOString().split('T')[0],
      notes: formData.notes,
      totalQuantity,
      estimatedValue,
      createdAt: order?.createdAt || new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      approvedBy: order?.approvedBy,
      approvedDate: order?.approvedDate,
      shippedDate: order?.shippedDate,
      receivedDate: order?.receivedDate
    };

    onSave(transferOrder);
  };

  const isValid = formData.fromLocationId && formData.toLocationId && 
                 formData.fromLocationId !== formData.toLocationId && 
                 formData.items.length > 0 &&
                 formData.items.every(item => item.productId && item.requestedQuantity > 0);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Button variant="ghost" onClick={onCancel}>
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <div>
            <h2 className="text-2xl font-bold text-gray-900">
              {order ? 'Edit Transfer Order' : 'New Transfer Order'}
            </h2>
            <p className="text-gray-600">Create or modify transfer order details</p>
          </div>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline" onClick={onCancel}>
            Cancel
          </Button>
          <Button onClick={handleSave} disabled={!isValid}>
            <Save className="mr-2 h-4 w-4" />
            Save
          </Button>
        </div>
      </div>

      {/* Form */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Basic Information */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Transfer Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium text-gray-700">Transfer Number</label>
                <Input
                  value={formData.transferNumber}
                  onChange={(e) => setFormData(prev => ({ ...prev, transferNumber: e.target.value }))}
                  placeholder="TRF-2024-001"
                />
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700">Requested By</label>
                <Input
                  value={formData.requestedBy}
                  onChange={(e) => setFormData(prev => ({ ...prev, requestedBy: e.target.value }))}
                  placeholder="Current User"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium text-gray-700">From Location</label>
                <Select value={formData.fromLocationId} onValueChange={(value) => setFormData(prev => ({ ...prev, fromLocationId: value }))}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select source location" />
                  </SelectTrigger>
                  <SelectContent>
                    {mockLocations.map((location) => (
                      <SelectItem key={location.id} value={location.id}>
                        {location.name} ({location.code})
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700">To Location</label>
                <Select value={formData.toLocationId} onValueChange={(value) => setFormData(prev => ({ ...prev, toLocationId: value }))}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select destination location" />
                  </SelectTrigger>
                  <SelectContent>
                    {mockLocations.filter(loc => loc.id !== formData.fromLocationId).map((location) => (
                      <SelectItem key={location.id} value={location.id}>
                        {location.name} ({location.code})
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div>
              <label className="text-sm font-medium text-gray-700">Notes</label>
              <Textarea
                value={formData.notes}
                onChange={(e) => setFormData(prev => ({ ...prev, notes: e.target.value }))}
                placeholder="Additional notes for this transfer..."
                rows={3}
              />
            </div>
          </CardContent>
        </Card>

        {/* Summary */}
        <Card>
          <CardHeader>
            <CardTitle>Summary</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Total Items:</span>
                <span className="font-medium">{formData.items.length}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Total Quantity:</span>
                <span className="font-medium">
                  {formData.items.reduce((sum, item) => sum + item.requestedQuantity, 0)}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Estimated Value:</span>
                <span className="font-medium">
                  ${formData.items.reduce((sum, item) => sum + item.totalCost, 0).toFixed(2)}
                </span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Items */}
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle>Transfer Items</CardTitle>
            <Button onClick={addItem}>
              <Plus className="mr-2 h-4 w-4" />
              Add Item
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          {formData.items.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              No items added yet. Click "Add Item" to get started.
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Product</TableHead>
                  <TableHead>SKU</TableHead>
                  <TableHead>UOM</TableHead>
                  <TableHead>Quantity</TableHead>
                  <TableHead>Unit Cost</TableHead>
                  <TableHead>Total Cost</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {formData.items.map((item, index) => (
                  <TableRow key={item.id}>
                    <TableCell>
                      <Select
                        value={item.productId}
                        onValueChange={(value) => updateItem(index, 'productId', value)}
                      >
                        <SelectTrigger className="w-40">
                          <SelectValue placeholder="Select product" />
                        </SelectTrigger>
                        <SelectContent>
                          {mockProducts.map((product) => (
                            <SelectItem key={product.id} value={product.id}>
                              {product.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </TableCell>
                    <TableCell className="font-mono text-sm">{item.productSku}</TableCell>
                    <TableCell>{item.uom}</TableCell>
                    <TableCell>
                      <Input
                        type="number"
                        value={item.requestedQuantity}
                        onChange={(e) => updateItem(index, 'requestedQuantity', parseInt(e.target.value) || 0)}
                        className="w-20"
                        min="1"
                      />
                    </TableCell>
                    <TableCell>${item.unitCost.toFixed(2)}</TableCell>
                    <TableCell>${item.totalCost.toFixed(2)}</TableCell>
                    <TableCell>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => removeItem(index)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default TransferOrderForm;
