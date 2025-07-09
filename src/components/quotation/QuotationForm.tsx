import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { 
  ArrowLeft, 
  Plus, 
  Trash2, 
  Save,
  Upload,
  X,
  File,
  FileText,
  Image as ImageIcon
} from 'lucide-react';
import { Quotation, QuotationItem, QuotationAttachment } from '@/types/quotation';

interface QuotationFormProps {
  quotation?: Quotation;
  onSave: (quotation: Quotation) => void;
  onCancel: () => void;
}

const QuotationForm = ({ quotation, onSave, onCancel }: QuotationFormProps) => {
  const [formData, setFormData] = useState<Partial<Quotation>>({
    quotationNumber: '',
    customer: '',
    customerEmail: '',
    customerPhone: '',
    salesperson: '',
    status: 'draft',
    validUntil: '',
    quotationDate: new Date().toISOString().split('T')[0],
    notes: '',
    items: [],
    attachments: []
  });

  const [items, setItems] = useState<QuotationItem[]>([]);
  const [newItem, setNewItem] = useState<Partial<QuotationItem>>({
    productName: '',
    sku: '',
    description: '',
    quantity: 1,
    unitPrice: 0
  });

  // Mock products data to match sales order pattern
  const mockProducts = [
    { 
      id: 'prod-1', 
      name: 'Wireless Headphones', 
      sku: 'WH-001', 
      price: 150,
      image: 'https://images.unsplash.com/photo-1618160702438-9b02ab6515c9?w=100&h=100&fit=crop',
      description: 'Premium wireless headphones with noise cancellation'
    },
    { 
      id: 'prod-2', 
      name: 'Office Chair', 
      sku: 'OC-002', 
      price: 180,
      image: 'https://images.unsplash.com/photo-1582562124811-c09040d0a901?w=100&h=100&fit=crop',
      description: 'Ergonomic office chair with lumbar support'
    },
    { 
      id: 'prod-3', 
      name: 'Water Bottle', 
      sku: 'WB-003', 
      price: 12.75,
      image: 'https://images.unsplash.com/photo-1535268647677-300dbf3d78d1?w=100&h=100&fit=crop',
      description: 'Stainless steel insulated water bottle'
    },
    { 
      id: 'prod-4', 
      name: 'Desk Lamp', 
      sku: 'DL-004', 
      price: 45,
      image: 'https://images.unsplash.com/photo-1493962853295-0fd70327578a?w=100&h=100&fit=crop',
      description: 'Adjustable LED desk lamp with USB charging'
    },
    { 
      id: 'prod-5', 
      name: 'Notebook', 
      sku: 'NB-005', 
      price: 5.50,
      image: 'https://images.unsplash.com/photo-1618160702438-9b02ab6515c9?w=100&h=100&fit=crop',
      description: 'A5 lined notebook with hardcover'
    }
  ];

  useEffect(() => {
    if (quotation) {
      setFormData(quotation);
      setItems(quotation.items || []);
    } else {
      // Generate new quotation number
      const date = new Date();
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const day = String(date.getDate()).padStart(2, '0');
      const time = String(date.getTime()).slice(-4);
      setFormData(prev => ({
        ...prev,
        quotationNumber: `QUO-${year}-${month}${day}${time}`
      }));
    }
  }, [quotation]);

  const addItem = () => {
    const newItem: QuotationItem = {
      id: Date.now().toString(),
      productName: '',
      sku: '',
      description: '',
      quantity: 1,
      unitPrice: 0,
      totalPrice: 0
    };
    
    setItems([...items, newItem]);
  };

  const updateItem = (index: number, field: keyof QuotationItem, value: any) => {
    const updatedItems = [...items];
    updatedItems[index] = { ...updatedItems[index], [field]: value };
    
    // Auto-calculate total price when quantity or unit price changes
    if (field === 'quantity' || field === 'unitPrice') {
      updatedItems[index].totalPrice = updatedItems[index].quantity * updatedItems[index].unitPrice;
    }
    
    // Auto-fill product details when product is selected
    if (field === 'productName' && value) {
      const selectedProduct = mockProducts.find(p => p.name === value);
      if (selectedProduct) {
        updatedItems[index].sku = selectedProduct.sku;
        updatedItems[index].description = selectedProduct.description;
        updatedItems[index].unitPrice = selectedProduct.price;
        updatedItems[index].totalPrice = updatedItems[index].quantity * selectedProduct.price;
      }
    }
    
    setItems(updatedItems);
  };

  const removeItem = (index: string) => {
    setItems(items.filter(item => item.id !== index));
  };

  const calculateTotal = () => {
    return items.reduce((total, item) => total + item.totalPrice, 0);
  };

  const handleAttachmentUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      const newAttachments: QuotationAttachment[] = Array.from(files).map(file => ({
        id: Date.now().toString() + Math.random().toString(36).substr(2, 9),
        name: file.name,
        size: file.size,
        type: file.type,
        url: URL.createObjectURL(file),
        uploadedAt: new Date().toISOString().split('T')[0]
      }));

      setFormData(prev => ({
        ...prev,
        attachments: [...(prev.attachments || []), ...newAttachments]
      }));
    }
  };

  const removeAttachment = (id: string) => {
    setFormData(prev => ({
      ...prev,
      attachments: prev.attachments?.filter(att => att.id !== id)
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
    const quotationToSave: Quotation = {
      id: quotation?.id || Date.now().toString(),
      quotationNumber: formData.quotationNumber || '',
      customer: formData.customer || '',
      customerEmail: formData.customerEmail,
      customerPhone: formData.customerPhone,
      salesperson: formData.salesperson || '',
      amount: calculateTotal(),
      status: formData.status as 'draft' | 'sent' | 'accepted' | 'rejected' | 'expired',
      validUntil: formData.validUntil || '',
      quotationDate: formData.quotationDate || '',
      items,
      notes: formData.notes,
      attachments: formData.attachments
    };

    onSave(quotationToSave);
  };

  const isValid = formData.customer && items.length > 0 && formData.quotationNumber && formData.salesperson;

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
              {quotation ? 'Edit Quotation' : 'New Quotation'}
            </h2>
            <p className="text-gray-600">Create or modify quotation details</p>
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
            <CardTitle>Quotation Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium text-gray-700">Quotation Number</label>
                <Input
                  value={formData.quotationNumber}
                  onChange={(e) => setFormData(prev => ({ ...prev, quotationNumber: e.target.value }))}
                  placeholder="QUO-2024-001"
                />
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700">Salesperson</label>
                <Input
                  value={formData.salesperson}
                  onChange={(e) => setFormData(prev => ({ ...prev, salesperson: e.target.value }))}
                  placeholder="Sales Representative"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium text-gray-700">Quotation Date</label>
                <Input
                  type="date"
                  value={formData.quotationDate}
                  onChange={(e) => setFormData(prev => ({ ...prev, quotationDate: e.target.value }))}
                />
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700">Valid Until</label>
                <Input
                  type="date"
                  value={formData.validUntil}
                  onChange={(e) => setFormData(prev => ({ ...prev, validUntil: e.target.value }))}
                />
              </div>
            </div>

            <div>
              <label className="text-sm font-medium text-gray-700">Customer</label>
              <Input
                value={formData.customer}
                onChange={(e) => setFormData(prev => ({ ...prev, customer: e.target.value }))}
                placeholder="Customer name"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium text-gray-700">Customer Email</label>
                <Input
                  type="email"
                  value={formData.customerEmail}
                  onChange={(e) => setFormData(prev => ({ ...prev, customerEmail: e.target.value }))}
                  placeholder="customer@example.com"
                />
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700">Customer Phone</label>
                <Input
                  value={formData.customerPhone}
                  onChange={(e) => setFormData(prev => ({ ...prev, customerPhone: e.target.value }))}
                  placeholder="Phone number"
                />
              </div>
            </div>

            <div>
              <label className="text-sm font-medium text-gray-700">Notes</label>
              <Textarea
                value={formData.notes}
                onChange={(e) => setFormData(prev => ({ ...prev, notes: e.target.value }))}
                placeholder="Additional notes for this quotation..."
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
                    onChange={handleAttachmentUpload}
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

                {formData.attachments && formData.attachments.length > 0 && (
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
                <span className="font-medium">{items.length}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Total Quantity:</span>
                <span className="font-medium">
                  {items.reduce((sum, item) => sum + item.quantity, 0)}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Total Amount:</span>
                <span className="font-medium">
                  ${calculateTotal().toFixed(2)}
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
            <CardTitle>Quotation Items</CardTitle>
            <Button onClick={addItem}>
              <Plus className="mr-2 h-4 w-4" />
              Add Item
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          {items.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              No items added yet. Click "Add Item" to get started.
            </div>
          ) : (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Product</TableHead>
                    <TableHead>Description</TableHead>
                    <TableHead>Quantity</TableHead>
                    <TableHead>Unit Price</TableHead>
                    <TableHead>Total Price</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {items.map((item, index) => (
                    <TableRow key={item.id}>
                      <TableCell>
                        <div className="space-y-2">
                          <Select
                            value={item.productName}
                            onValueChange={(value) => updateItem(index, 'productName', value)}
                          >
                            <SelectTrigger className="w-40">
                              <SelectValue placeholder="Select product" />
                            </SelectTrigger>
                            <SelectContent>
                              {mockProducts.map((product) => (
                                <SelectItem key={product.id} value={product.name}>
                                  <div className="flex items-center space-x-2">
                                    <img 
                                      src={product.image} 
                                      alt={product.name}
                                      className="w-6 h-6 rounded object-cover"
                                    />
                                    <span>{product.name}</span>
                                  </div>
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          {item.sku && (
                            <p className="text-xs text-gray-500">SKU: {item.sku}</p>
                          )}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="max-w-32">
                          <Input
                            value={item.description}
                            onChange={(e) => updateItem(index, 'description', e.target.value)}
                            placeholder="Description"
                            className="text-sm"
                          />
                        </div>
                      </TableCell>
                      <TableCell>
                        <Input
                          type="number"
                          value={item.quantity}
                          onChange={(e) => updateItem(index, 'quantity', parseInt(e.target.value) || 1)}
                          className="w-20"
                          min="1"
                        />
                      </TableCell>
                      <TableCell>
                        <Input
                          type="number"
                          value={item.unitPrice}
                          onChange={(e) => updateItem(index, 'unitPrice', parseFloat(e.target.value) || 0)}
                          className="w-24"
                          min="0"
                          step="0.01"
                          placeholder="0.00"
                        />
                      </TableCell>
                      <TableCell>
                        <div className="text-right font-medium">
                          ${item.totalPrice.toFixed(2)}
                        </div>
                      </TableCell>
                      <TableCell>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => removeItem(item.id)}
                          className="hover:bg-destructive/10 hover:text-destructive"
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
        </CardContent>
      </Card>
    </div>
  );
};

export default QuotationForm;
