import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ArrowLeft, Plus, Trash2, Save, X } from 'lucide-react';
import { PurchaseOrder, PurchaseOrderItem, Supplier } from '@/types/purchaseOrder';
import { mockSuppliers } from '@/data/mockPurchaseOrders';

interface PurchaseOrderFormProps {
  order?: PurchaseOrder;
  onSave: (order: PurchaseOrder) => void;
  onCancel: () => void;
}

const PurchaseOrderForm = ({ order, onSave, onCancel }: PurchaseOrderFormProps) => {
  const [formData, setFormData] = useState({
    orderNumber: order?.orderNumber || `PO-${new Date().getFullYear()}-${Math.floor(Math.random() * 1000).toString().padStart(3, '0')}`,
    supplierId: order?.supplierId || '',
    supplierName: order?.supplierName || '',
    supplierEmail: order?.supplierEmail || '',
    supplierPhone: order?.supplierPhone || '',
    expectedDeliveryDate: order?.expectedDeliveryDate || '',
    deliveryAddress: order?.deliveryAddress || '123 Manufacturing Facility, Production City, PC 98765',
    paymentTerms: order?.paymentTerms || 'Net 30',
    currency: order?.currency || 'USD',
    notes: order?.notes || '',
    items: order?.items || [] as PurchaseOrderItem[]
  });

  const addItem = () => {
    const newItem: PurchaseOrderItem = {
      id: `item-${Date.now()}`,
      productId: '',
      productName: '',
      productSku: '',
      description: '',
      uom: 'pcs',
      requestedQuantity: 1,
      unitPrice: 0,
      totalPrice: 0,
      taxRate: 8.5,
      taxAmount: 0
    };
    setFormData(prev => ({
      ...prev,
      items: [...prev.items, newItem]
    }));
  };

  const updateItem = (index: number, field: keyof PurchaseOrderItem, value: any) => {
    const updatedItems = [...formData.items];
    updatedItems[index] = { ...updatedItems[index], [field]: value };
    
    // Recalculate totals
    if (field === 'requestedQuantity' || field === 'unitPrice' || field === 'taxRate') {
      const item = updatedItems[index];
      item.totalPrice = item.requestedQuantity * item.unitPrice;
      item.taxAmount = item.totalPrice * (item.taxRate || 0) / 100;
    }
    
    setFormData(prev => ({ ...prev, items: updatedItems }));
  };

  const removeItem = (index: number) => {
    setFormData(prev => ({
      ...prev,
      items: prev.items.filter((_, i) => i !== index)
    }));
  };

  const handleSupplierChange = (supplierId: string) => {
    const supplier = mockSuppliers.find(s => s.id === supplierId);
    if (supplier) {
      setFormData(prev => ({
        ...prev,
        supplierId: supplier.id,
        supplierName: supplier.name,
        supplierEmail: supplier.email || '',
        supplierPhone: supplier.phone || '',
        paymentTerms: supplier.paymentTerms || 'Net 30',
        currency: supplier.currency
      }));
    }
  };

  const handleSubmit = () => {
    const totalQuantity = formData.items.reduce((sum, item) => sum + item.requestedQuantity, 0);
    const totalValue = formData.items.reduce((sum, item) => sum + item.totalPrice + (item.taxAmount || 0), 0);

    const purchaseOrder: PurchaseOrder = {
      id: order?.id || `po-${Date.now()}`,
      orderNumber: formData.orderNumber,
      supplierId: formData.supplierId,
      supplierName: formData.supplierName,
      supplierEmail: formData.supplierEmail,
      supplierPhone: formData.supplierPhone,
      status: order?.status || 'draft',
      items: formData.items,
      requestedBy: order?.requestedBy || 'current-user@company.com',
      requestedDate: order?.requestedDate || new Date().toISOString().split('T')[0],
      expectedDeliveryDate: formData.expectedDeliveryDate,
      deliveryAddress: formData.deliveryAddress,
      paymentTerms: formData.paymentTerms,
      currency: formData.currency,
      notes: formData.notes,
      totalQuantity,
      totalValue,
      createdAt: order?.createdAt || new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      // Preserve existing workflow fields
      submittedBy: order?.submittedBy,
      submittedDate: order?.submittedDate,
      approvedBy: order?.approvedBy,
      approvedDate: order?.approvedDate,
      rejectedBy: order?.rejectedBy,
      rejectedDate: order?.rejectedDate,
      rejectionReason: order?.rejectionReason,
      orderedDate: order?.orderedDate
    };

    onSave(purchaseOrder);
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: formData.currency,
      minimumFractionDigits: 2
    }).format(amount);
  };

  const totalValue = formData.items.reduce((sum, item) => sum + item.totalPrice + (item.taxAmount || 0), 0);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Button variant="ghost" size="sm" onClick={onCancel}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back
          </Button>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              {order ? 'Edit Purchase Order' : 'New Purchase Order'}
            </h1>
            <p className="text-gray-600">
              {order ? `Order ${order.orderNumber}` : 'Create a new purchase order'}
            </p>
          </div>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline" onClick={onCancel}>
            <X className="mr-2 h-4 w-4" />
            Cancel
          </Button>
          <Button onClick={handleSubmit}>
            <Save className="mr-2 h-4 w-4" />
            Save Order
          </Button>
        </div>
      </div>

      {/* Order Information */}
      <Card>
        <CardHeader>
          <CardTitle>Order Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="orderNumber">Order Number</Label>
              <Input
                id="orderNumber"
                value={formData.orderNumber}
                onChange={(e) => setFormData(prev => ({ ...prev, orderNumber: e.target.value }))}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="supplier">Supplier</Label>
              <Select 
                value={formData.supplierId} 
                onValueChange={handleSupplierChange}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select supplier" />
                </SelectTrigger>
                <SelectContent>
                  {mockSuppliers.map((supplier) => (
                    <SelectItem key={supplier.id} value={supplier.id}>
                      {supplier.name} ({supplier.code})
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {formData.supplierId && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="supplierEmail">Supplier Email</Label>
                <Input
                  id="supplierEmail"
                  value={formData.supplierEmail}
                  onChange={(e) => setFormData(prev => ({ ...prev, supplierEmail: e.target.value }))}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="supplierPhone">Supplier Phone</Label>
                <Input
                  id="supplierPhone"
                  value={formData.supplierPhone}
                  onChange={(e) => setFormData(prev => ({ ...prev, supplierPhone: e.target.value }))}
                />
              </div>
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="expectedDeliveryDate">Expected Delivery Date</Label>
              <Input
                id="expectedDeliveryDate"
                type="date"
                value={formData.expectedDeliveryDate}
                onChange={(e) => setFormData(prev => ({ ...prev, expectedDeliveryDate: e.target.value }))}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="paymentTerms">Payment Terms</Label>
              <Select 
                value={formData.paymentTerms} 
                onValueChange={(value) => setFormData(prev => ({ ...prev, paymentTerms: value }))}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Net 15">Net 15</SelectItem>
                  <SelectItem value="Net 30">Net 30</SelectItem>
                  <SelectItem value="Net 45">Net 45</SelectItem>
                  <SelectItem value="COD">Cash on Delivery</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="deliveryAddress">Delivery Address</Label>
            <Textarea
              id="deliveryAddress"
              value={formData.deliveryAddress}
              onChange={(e) => setFormData(prev => ({ ...prev, deliveryAddress: e.target.value }))}
              rows={3}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="notes">Notes</Label>
            <Textarea
              id="notes"
              value={formData.notes}
              onChange={(e) => setFormData(prev => ({ ...prev, notes: e.target.value }))}
              rows={3}
              placeholder="Additional notes or special instructions..."
            />
          </div>
        </CardContent>
      </Card>

      {/* Order Items */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Order Items</CardTitle>
            <Button onClick={addItem}>
              <Plus className="mr-2 h-4 w-4" />
              Add Item
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Product</TableHead>
                  <TableHead>SKU</TableHead>
                  <TableHead>Description</TableHead>
                  <TableHead>UOM</TableHead>
                  <TableHead>Qty</TableHead>
                  <TableHead>Unit Price</TableHead>
                  <TableHead>Tax %</TableHead>
                  <TableHead>Total</TableHead>
                  <TableHead></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {formData.items.map((item, index) => (
                  <TableRow key={item.id}>
                    <TableCell>
                      <Input
                        value={item.productName}
                        onChange={(e) => updateItem(index, 'productName', e.target.value)}
                        placeholder="Product name"
                      />
                    </TableCell>
                    <TableCell>
                      <Input
                        value={item.productSku}
                        onChange={(e) => updateItem(index, 'productSku', e.target.value)}
                        placeholder="SKU"
                      />
                    </TableCell>
                    <TableCell>
                      <Input
                        value={item.description || ''}
                        onChange={(e) => updateItem(index, 'description', e.target.value)}
                        placeholder="Description"
                      />
                    </TableCell>
                    <TableCell>
                      <Select 
                        value={item.uom} 
                        onValueChange={(value) => updateItem(index, 'uom', value)}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="pcs">Pieces</SelectItem>
                          <SelectItem value="kg">Kilograms</SelectItem>
                          <SelectItem value="m">Meters</SelectItem>
                          <SelectItem value="l">Liters</SelectItem>
                          <SelectItem value="box">Box</SelectItem>
                        </SelectContent>
                      </Select>
                    </TableCell>
                    <TableCell>
                      <Input
                        type="number"
                        value={item.requestedQuantity}
                        onChange={(e) => updateItem(index, 'requestedQuantity', parseInt(e.target.value) || 0)}
                        min="1"
                      />
                    </TableCell>
                    <TableCell>
                      <Input
                        type="number"
                        step="0.01"
                        value={item.unitPrice}
                        onChange={(e) => updateItem(index, 'unitPrice', parseFloat(e.target.value) || 0)}
                        min="0"
                      />
                    </TableCell>
                    <TableCell>
                      <Input
                        type="number"
                        step="0.1"
                        value={item.taxRate || 0}
                        onChange={(e) => updateItem(index, 'taxRate', parseFloat(e.target.value) || 0)}
                        min="0"
                        max="100"
                      />
                    </TableCell>
                    <TableCell className="font-bold">
                      {formatCurrency(item.totalPrice + (item.taxAmount || 0))}
                    </TableCell>
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
          </div>

          {formData.items.length === 0 && (
            <div className="text-center py-8 text-gray-500">
              <p>No items added yet. Click "Add Item" to get started.</p>
            </div>
          )}

          {formData.items.length > 0 && (
            <>
              <Separator className="my-6" />
              <div className="flex justify-end">
                <div className="space-y-2 text-right">
                  <div className="text-lg font-bold">
                    Total: {formatCurrency(totalValue)}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {formData.items.reduce((sum, item) => sum + item.requestedQuantity, 0)} items
                  </div>
                </div>
              </div>
            </>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default PurchaseOrderForm;