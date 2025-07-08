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
  User,
  Upload,
  Paperclip,
  File,
  FileText,
  Image as ImageIcon,
  X
} from 'lucide-react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface SalesOrderAttachment {
  id: string;
  name: string;
  size: number;
  type: string;
  url: string;
  uploadedAt: string;
}

interface SalesOrder {
  id: string;
  orderNumber: string;
  customer: string;
  amount: number;
  salesperson: string;
  approvalStatus: 'pending' | 'approved' | 'rejected';
  shippingStatus: 'not_shipped' | 'preparing' | 'shipped' | 'delivered';
  invoiceStatus: 'not_invoiced' | 'invoiced' | 'paid';
  paymentStatus: 'unpaid' | 'partial' | 'paid';
  orderDate: string;
  attachments?: SalesOrderAttachment[];
}

interface SalesOrderItem {
  id: string;
  productId: string;
  productName: string;
  productSku: string;
  quantity: number;
  unitPrice: number;
  totalPrice: number;
}

interface SalesOrderFormProps {
  order?: SalesOrder;
  onSave: (order: SalesOrder) => void;
  onCancel: () => void;
}

const SalesOrderForm = ({ order, onSave, onCancel }: SalesOrderFormProps) => {
  const [formData, setFormData] = useState({
    orderNumber: order?.orderNumber || `SO-${new Date().getFullYear()}-${Math.floor(Math.random() * 1000).toString().padStart(3, '0')}`,
    customer: order?.customer || '',
    salesperson: order?.salesperson || 'Current User',
    notes: '',
    items: [] as SalesOrderItem[],
    attachments: order?.attachments || [] as SalesOrderAttachment[]
  });

  const mockCustomers = [
    'Kilimanjaro Trading Co.',
    'Lagos Tech Solutions',
    'Sahara Logistics Ltd',
    'Cape Verde Industries',
    'Nile Valley Enterprises'
  ];

  const mockProducts = [
    { id: 'prod-1', name: 'Wireless Headphones', sku: 'WH-001', price: 150 },
    { id: 'prod-2', name: 'Office Chair', sku: 'OC-002', price: 180 },
    { id: 'prod-3', name: 'Water Bottle', sku: 'WB-003', price: 12.75 },
    { id: 'prod-4', name: 'Desk Lamp', sku: 'DL-004', price: 45 },
    { id: 'prod-5', name: 'Notebook', sku: 'NB-005', price: 5.50 }
  ];

  const addItem = () => {
    const newItem: SalesOrderItem = {
      id: `item-${Date.now()}`,
      productId: '',
      productName: '',
      productSku: '',
      quantity: 1,
      unitPrice: 0,
      totalPrice: 0
    };
    
    setFormData(prev => ({
      ...prev,
      items: [...prev.items, newItem]
    }));
  };

  const updateItem = (index: number, field: keyof SalesOrderItem, value: any) => {
    const updatedItems = [...formData.items];
    updatedItems[index] = { ...updatedItems[index], [field]: value };
    
    // Auto-calculate total price when quantity or unit price changes
    if (field === 'quantity' || field === 'unitPrice') {
      updatedItems[index].totalPrice = updatedItems[index].quantity * updatedItems[index].unitPrice;
    }
    
    // Auto-fill product details when product is selected
    if (field === 'productId') {
      const selectedProduct = mockProducts.find(p => p.id === value);
      if (selectedProduct) {
        updatedItems[index].productName = selectedProduct.name;
        updatedItems[index].productSku = selectedProduct.sku;
        updatedItems[index].unitPrice = selectedProduct.price;
        updatedItems[index].totalPrice = updatedItems[index].quantity * selectedProduct.price;
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

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files) return;

    const newAttachments: SalesOrderAttachment[] = Array.from(files).map(file => ({
      id: `att-${Date.now()}-${Math.random()}`,
      name: file.name,
      size: file.size,
      type: file.type,
      url: URL.createObjectURL(file), // In a real app, this would be uploaded to a server
      uploadedAt: new Date().toISOString().split('T')[0]
    }));

    setFormData(prev => ({
      ...prev,
      attachments: [...prev.attachments, ...newAttachments]
    }));

    // Reset the input
    event.target.value = '';
  };

  const removeAttachment = (attachmentId: string) => {
    setFormData(prev => ({
      ...prev,
      attachments: prev.attachments.filter(att => att.id !== attachmentId)
    }));
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const getFileIcon = (type: string) => {
    if (type.startsWith('image/')) return <ImageIcon className="h-4 w-4" />;
    if (type.includes('pdf')) return <FileText className="h-4 w-4" />;
    return <File className="h-4 w-4" />;
  };

  const handleSave = () => {
    const totalAmount = formData.items.reduce((sum, item) => sum + item.totalPrice, 0);
    
    const salesOrder: SalesOrder = {
      id: order?.id || `so-${Date.now()}`,
      orderNumber: formData.orderNumber,
      customer: formData.customer,
      salesperson: formData.salesperson,
      amount: totalAmount,
      approvalStatus: order?.approvalStatus || 'pending',
      shippingStatus: order?.shippingStatus || 'not_shipped',
      invoiceStatus: order?.invoiceStatus || 'not_invoiced',
      paymentStatus: order?.paymentStatus || 'unpaid',
      orderDate: order?.orderDate || new Date().toISOString().split('T')[0],
      attachments: formData.attachments
    };

    onSave(salesOrder);
  };

  const isValid = formData.customer && formData.items.length > 0 &&
                  formData.items.every(item => item.productId && item.quantity > 0);

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
              {order ? 'Edit Sales Order' : 'New Sales Order'}
            </h2>
            <p className="text-gray-600">Create or modify sales order details</p>
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
            <CardTitle>Order Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium text-gray-700">Order Number</label>
                <Input
                  value={formData.orderNumber}
                  onChange={(e) => setFormData(prev => ({ ...prev, orderNumber: e.target.value }))}
                  placeholder="SO-2024-001"
                />
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700">Sales Representative</label>
                <Input
                  value={formData.salesperson}
                  onChange={(e) => setFormData(prev => ({ ...prev, salesperson: e.target.value }))}
                  placeholder="Current User"
                />
              </div>
            </div>

            <div>
              <label className="text-sm font-medium text-gray-700">Customer</label>
              <Select value={formData.customer} onValueChange={(value) => setFormData(prev => ({ ...prev, customer: value }))}>
                <SelectTrigger>
                  <SelectValue placeholder="Select customer" />
                </SelectTrigger>
                <SelectContent>
                  {mockCustomers.map((customer) => (
                    <SelectItem key={customer} value={customer}>
                      {customer}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="text-sm font-medium text-gray-700">Notes</label>
              <Textarea
                value={formData.notes}
                onChange={(e) => setFormData(prev => ({ ...prev, notes: e.target.value }))}
                placeholder="Additional notes for this order..."
                rows={3}
              />
            </div>

            <div>
              <label className="text-sm font-medium text-gray-700">Attachments</label>
              <div className="mt-2 space-y-3">
                <div className="flex items-center space-x-2">
                  <input
                    type="file"
                    multiple
                    onChange={handleFileUpload}
                    className="hidden"
                    id="file-upload"
                    accept=".pdf,.doc,.docx,.png,.jpg,.jpeg,.gif"
                  />
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => document.getElementById('file-upload')?.click()}
                  >
                    <Upload className="mr-2 h-4 w-4" />
                    Upload Files
                  </Button>
                  <span className="text-xs text-muted-foreground">
                    PDF, DOC, images accepted
                  </span>
                </div>

                {formData.attachments.length > 0 && (
                  <div className="space-y-2">
                    {formData.attachments.map((attachment) => (
                      <div
                        key={attachment.id}
                        className="flex items-center justify-between p-2 border rounded-lg bg-muted/20"
                      >
                        <div className="flex items-center space-x-2">
                          {getFileIcon(attachment.type)}
                          <div>
                            <p className="text-sm font-medium">{attachment.name}</p>
                            <p className="text-xs text-muted-foreground">
                              {formatFileSize(attachment.size)}
                            </p>
                          </div>
                        </div>
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          onClick={() => removeAttachment(attachment.id)}
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
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
                  {formData.items.reduce((sum, item) => sum + item.quantity, 0)}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Total Amount:</span>
                <span className="font-medium">
                  ${formData.items.reduce((sum, item) => sum + item.totalPrice, 0).toFixed(2)}
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
            <CardTitle>Order Items</CardTitle>
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
                  <TableHead>Quantity</TableHead>
                  <TableHead>Unit Price</TableHead>
                  <TableHead>Total Price</TableHead>
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
                    <TableCell>
                      <Input
                        type="number"
                        value={item.quantity}
                        onChange={(e) => updateItem(index, 'quantity', parseInt(e.target.value) || 0)}
                        className="w-20"
                        min="1"
                      />
                    </TableCell>
                    <TableCell>${item.unitPrice.toFixed(2)}</TableCell>
                    <TableCell>${item.totalPrice.toFixed(2)}</TableCell>
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

export default SalesOrderForm;