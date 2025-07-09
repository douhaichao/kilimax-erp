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
  Image as ImageIcon,
  Package
} from 'lucide-react';
import { Quotation, QuotationItem, QuotationAttachment } from '@/types/quotation';
import { Product } from '@/types/product';
import ProductSelectionModal from './ProductSelectionModal';

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

  const [showProductModal, setShowProductModal] = useState(false);

  // Mock products data - in a real app, this would come from props or API
  const mockProducts: Product[] = [
    {
      id: '1',
      name: 'iPhone 15 Pro',
      sku: 'IPH-15-PRO-001',
      description: 'Latest iPhone model with advanced features',
      category: 'Electronics',
      categoryId: '1',
      uoms: [],
      primaryUOM: { id: 'piece', name: 'Piece', ratio: 1, isDefault: true, symbol: 'pc', type: 'piece', isActive: true, conversionFactor: 1 },
      baseUomId: 'piece',
      price: 999,
      cost: 750,
      status: 'active',
      supplier: 'Apple Inc.',
      stock: 25,
      safetyStock: 10,
      variants: [],
      images: [],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    },
    {
      id: '2',
      name: 'Samsung Galaxy S24',
      sku: 'SAM-S24-001',
      description: 'Premium Android smartphone',
      category: 'Electronics',
      categoryId: '1',
      uoms: [],
      primaryUOM: { id: 'piece', name: 'Piece', ratio: 1, isDefault: true, symbol: 'pc', type: 'piece', isActive: true, conversionFactor: 1 },
      baseUomId: 'piece',
      price: 899,
      cost: 650,
      status: 'active',
      supplier: 'Samsung',
      stock: 15,
      safetyStock: 5,
      variants: [],
      images: [],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    },
    {
      id: '3',
      name: 'MacBook Pro 16"',
      sku: 'MBP-16-001',
      description: 'Professional laptop for power users',
      category: 'Computers',
      categoryId: '2',
      uoms: [],
      primaryUOM: { id: 'piece', name: 'Piece', ratio: 1, isDefault: true, symbol: 'pc', type: 'piece', isActive: true, conversionFactor: 1 },
      baseUomId: 'piece',
      price: 2499,
      cost: 1800,
      status: 'active',
      supplier: 'Apple Inc.',
      stock: 8,
      safetyStock: 3,
      variants: [],
      images: [],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
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
    if (newItem.productName && newItem.sku && newItem.quantity && newItem.unitPrice) {
      const item: QuotationItem = {
        id: Date.now().toString(),
        productName: newItem.productName || '',
        sku: newItem.sku || '',
        description: newItem.description,
        quantity: newItem.quantity || 1,
        unitPrice: newItem.unitPrice || 0,
        totalPrice: (newItem.quantity || 1) * (newItem.unitPrice || 0)
      };
      
      setItems([...items, item]);
      setNewItem({
        productName: '',
        sku: '',
        description: '',
        quantity: 1,
        unitPrice: 0
      });
    }
  };

  const addProductsFromModal = (selectedItems: Partial<QuotationItem>[]) => {
    const newItems: QuotationItem[] = selectedItems.map(item => ({
      id: Date.now().toString() + Math.random().toString(36).substr(2, 9),
      productName: item.productName || '',
      sku: item.sku || '',
      description: item.description,
      quantity: item.quantity || 1,
      unitPrice: item.unitPrice || 0,
      totalPrice: (item.quantity || 1) * (item.unitPrice || 0)
    }));
    
    setItems([...items, ...newItems]);
  };

  const removeItem = (id: string) => {
    setItems(items.filter(item => item.id !== id));
  };

  const updateItem = (id: string, field: keyof QuotationItem, value: string | number) => {
    setItems(items.map(item => {
      if (item.id === id) {
        const updatedItem = { ...item, [field]: value };
        if (field === 'quantity' || field === 'unitPrice') {
          updatedItem.totalPrice = updatedItem.quantity * updatedItem.unitPrice;
        }
        return updatedItem;
      }
      return item;
    }));
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
    <>
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
              <div className="flex space-x-2">
                <Button onClick={() => setShowProductModal(true)} variant="outline">
                  <Package className="mr-2 h-4 w-4" />
                  Select Products
                </Button>
                <Button onClick={addItem}>
                  <Plus className="mr-2 h-4 w-4" />
                  Add Manual Item
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            {items.length === 0 ? (
              <div className="text-center py-8 text-gray-500">
                <Package className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                <p className="mb-4">No items added yet</p>
                <div className="flex justify-center space-x-2">
                  <Button onClick={() => setShowProductModal(true)} variant="outline">
                    <Package className="mr-2 h-4 w-4" />
                    Select from Products
                  </Button>
                  <Button onClick={addItem}>
                    <Plus className="mr-2 h-4 w-4" />
                    Add Manual Item
                  </Button>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                {/* Manual Item Entry Form */}
                <Card className="border-dashed">
                  <CardContent className="p-4">
                    <h4 className="font-medium mb-3">Add New Item Manually</h4>
                    <div className="grid grid-cols-1 md:grid-cols-6 gap-3">
                      <Input
                        placeholder="Product Name"
                        value={newItem.productName}
                        onChange={(e) => setNewItem(prev => ({ ...prev, productName: e.target.value }))}
                      />
                      <Input
                        placeholder="SKU"
                        value={newItem.sku}
                        onChange={(e) => setNewItem(prev => ({ ...prev, sku: e.target.value }))}
                      />
                      <Input
                        type="number"
                        min="1"
                        placeholder="Quantity"
                        value={newItem.quantity}
                        onChange={(e) => setNewItem(prev => ({ ...prev, quantity: parseInt(e.target.value) || 1 }))}
                      />
                      <Input
                        type="number"
                        step="0.01"
                        placeholder="Unit Price"
                        value={newItem.unitPrice}
                        onChange={(e) => setNewItem(prev => ({ ...prev, unitPrice: parseFloat(e.target.value) || 0 }))}
                      />
                      <Input
                        placeholder="Description (optional)"
                        value={newItem.description}
                        onChange={(e) => setNewItem(prev => ({ ...prev, description: e.target.value }))}
                      />
                      <Button 
                        onClick={addItem}
                        disabled={!newItem.productName || !newItem.sku}
                      >
                        <Plus className="h-4 w-4 mr-1" />
                        Add
                      </Button>
                    </div>
                  </CardContent>
                </Card>

                {/* Items Table */}
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
                    {items.map((item) => (
                      <TableRow key={item.id}>
                        <TableCell>
                          <Input
                            value={item.productName}
                            onChange={(e) => updateItem(item.id, 'productName', e.target.value)}
                            className="min-w-[150px]"
                          />
                        </TableCell>
                        <TableCell>
                          <Input
                            value={item.sku}
                            onChange={(e) => updateItem(item.id, 'sku', e.target.value)}
                            className="font-mono text-sm min-w-[120px]"
                          />
                        </TableCell>
                        <TableCell>
                          <Input
                            type="number"
                            min="1"
                            value={item.quantity}
                            onChange={(e) => updateItem(item.id, 'quantity', parseInt(e.target.value) || 1)}
                            className="w-20"
                          />
                        </TableCell>
                        <TableCell>
                          <Input
                            type="number"
                            step="0.01"
                            value={item.unitPrice}
                            onChange={(e) => updateItem(item.id, 'unitPrice', parseFloat(e.target.value) || 0)}
                            className="w-24"
                          />
                        </TableCell>
                        <TableCell className="font-medium">
                          ${item.totalPrice.toFixed(2)}
                        </TableCell>
                        <TableCell>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => removeItem(item.id)}
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

      {/* Product Selection Modal */}
      <ProductSelectionModal
        open={showProductModal}
        onClose={() => setShowProductModal(false)}
        onSelectProducts={addProductsFromModal}
        products={mockProducts}
      />
    </>
  );
};

export default QuotationForm;
