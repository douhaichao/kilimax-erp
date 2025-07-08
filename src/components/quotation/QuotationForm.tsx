import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Plus, Trash2, Upload, X } from 'lucide-react';
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

  const removeItem = (id: string) => {
    setItems(items.filter(item => item.id !== id));
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
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

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Button variant="ghost" onClick={onCancel}>
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <div>
            <h2 className="text-2xl font-bold">
              {quotation ? 'Edit Quotation' : 'Create New Quotation'}
            </h2>
            <p className="text-muted-foreground">
              {quotation ? 'Update quotation information' : 'Fill in the details below to create a new quotation'}
            </p>
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Basic Information */}
        <Card>
          <CardHeader>
            <CardTitle>Quotation Information</CardTitle>
          </CardHeader>
          <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="quotationNumber">Quotation Number</Label>
              <Input
                id="quotationNumber"
                value={formData.quotationNumber}
                onChange={(e) => setFormData(prev => ({ ...prev, quotationNumber: e.target.value }))}
                required
              />
            </div>
            <div>
              <Label htmlFor="quotationDate">Quotation Date</Label>
              <Input
                id="quotationDate"
                type="date"
                value={formData.quotationDate}
                onChange={(e) => setFormData(prev => ({ ...prev, quotationDate: e.target.value }))}
                required
              />
            </div>
            <div>
              <Label htmlFor="customer">Customer</Label>
              <Input
                id="customer"
                value={formData.customer}
                onChange={(e) => setFormData(prev => ({ ...prev, customer: e.target.value }))}
                required
              />
            </div>
            <div>
              <Label htmlFor="customerEmail">Customer Email</Label>
              <Input
                id="customerEmail"
                type="email"
                value={formData.customerEmail}
                onChange={(e) => setFormData(prev => ({ ...prev, customerEmail: e.target.value }))}
              />
            </div>
            <div>
              <Label htmlFor="customerPhone">Customer Phone</Label>
              <Input
                id="customerPhone"
                value={formData.customerPhone}
                onChange={(e) => setFormData(prev => ({ ...prev, customerPhone: e.target.value }))}
              />
            </div>
            <div>
              <Label htmlFor="salesperson">Salesperson</Label>
              <Input
                id="salesperson"
                value={formData.salesperson}
                onChange={(e) => setFormData(prev => ({ ...prev, salesperson: e.target.value }))}
                required
              />
            </div>
            <div>
              <Label htmlFor="validUntil">Valid Until</Label>
              <Input
                id="validUntil"
                type="date"
                value={formData.validUntil}
                onChange={(e) => setFormData(prev => ({ ...prev, validUntil: e.target.value }))}
                required
              />
            </div>
            <div>
              <Label htmlFor="status">Status</Label>
              <Select
                value={formData.status}
                onValueChange={(value) => setFormData(prev => ({ ...prev, status: value as any }))}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="draft">Draft</SelectItem>
                  <SelectItem value="sent">Sent</SelectItem>
                  <SelectItem value="accepted">Accepted</SelectItem>
                  <SelectItem value="rejected">Rejected</SelectItem>
                  <SelectItem value="expired">Expired</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Items */}
        <Card>
          <CardHeader>
            <CardTitle>Quotation Items</CardTitle>
          </CardHeader>
          <CardContent>
            {/* Add New Item */}
            <div className="grid grid-cols-1 md:grid-cols-6 gap-4 mb-4 p-4 border rounded-lg">
              <div>
                <Label htmlFor="productName">Product Name</Label>
                <Input
                  id="productName"
                  value={newItem.productName}
                  onChange={(e) => setNewItem(prev => ({ ...prev, productName: e.target.value }))}
                  placeholder="Product name"
                />
              </div>
              <div>
                <Label htmlFor="sku">SKU</Label>
                <Input
                  id="sku"
                  value={newItem.sku}
                  onChange={(e) => setNewItem(prev => ({ ...prev, sku: e.target.value }))}
                  placeholder="SKU"
                />
              </div>
              <div>
                <Label htmlFor="quantity">Quantity</Label>
                <Input
                  id="quantity"
                  type="number"
                  min="1"
                  value={newItem.quantity}
                  onChange={(e) => setNewItem(prev => ({ ...prev, quantity: parseInt(e.target.value) || 1 }))}
                />
              </div>
              <div>
                <Label htmlFor="unitPrice">Unit Price</Label>
                <Input
                  id="unitPrice"
                  type="number"
                  step="0.01"
                  min="0"
                  value={newItem.unitPrice}
                  onChange={(e) => setNewItem(prev => ({ ...prev, unitPrice: parseFloat(e.target.value) || 0 }))}
                />
              </div>
              <div>
                <Label>Total</Label>
                <div className="h-10 flex items-center px-3 text-sm bg-muted rounded-md">
                  ${((newItem.quantity || 1) * (newItem.unitPrice || 0)).toFixed(2)}
                </div>
              </div>
              <div className="flex items-end">
                <Button type="button" onClick={addItem}>
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* Items List */}
            {items.length > 0 && (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Product</TableHead>
                    <TableHead>SKU</TableHead>
                    <TableHead className="text-right">Quantity</TableHead>
                    <TableHead className="text-right">Unit Price</TableHead>
                    <TableHead className="text-right">Total</TableHead>
                    <TableHead className="w-12"></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {items.map((item) => (
                    <TableRow key={item.id}>
                      <TableCell>{item.productName}</TableCell>
                      <TableCell className="font-mono text-sm">{item.sku}</TableCell>
                      <TableCell className="text-right">{item.quantity}</TableCell>
                      <TableCell className="text-right">${item.unitPrice.toFixed(2)}</TableCell>
                      <TableCell className="text-right">${item.totalPrice.toFixed(2)}</TableCell>
                      <TableCell>
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          onClick={() => removeItem(item.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                  <TableRow>
                    <TableCell colSpan={4} className="text-right font-semibold">Total Amount:</TableCell>
                    <TableCell className="text-right font-bold text-lg">${calculateTotal().toFixed(2)}</TableCell>
                    <TableCell></TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            )}
          </CardContent>
        </Card>

        {/* Attachments */}
        <Card>
          <CardHeader>
            <CardTitle>Attachments</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <Label htmlFor="attachments">Upload Files</Label>
                <Input
                  id="attachments"
                  type="file"
                  multiple
                  onChange={handleAttachmentUpload}
                  className="cursor-pointer"
                />
              </div>
              
              {formData.attachments && formData.attachments.length > 0 && (
                <div className="space-y-2">
                  <Label>Uploaded Files</Label>
                  {formData.attachments.map((attachment) => (
                    <div key={attachment.id} className="flex items-center justify-between p-2 border rounded">
                      <div className="flex items-center space-x-2">
                        <span className="text-sm">{attachment.name}</span>
                        <Badge variant="outline" className="text-xs">
                          {(attachment.size / 1024).toFixed(1)} KB
                        </Badge>
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
          </CardContent>
        </Card>

        {/* Notes */}
        <Card>
          <CardHeader>
            <CardTitle>Notes</CardTitle>
          </CardHeader>
          <CardContent>
            <Textarea
              value={formData.notes}
              onChange={(e) => setFormData(prev => ({ ...prev, notes: e.target.value }))}
              placeholder="Additional notes or terms..."
              rows={4}
            />
          </CardContent>
        </Card>

        {/* Actions */}
        <div className="flex justify-end space-x-2">
          <Button type="button" variant="outline" onClick={onCancel}>
            Cancel
          </Button>
          <Button type="submit">
            {quotation ? 'Update Quotation' : 'Create Quotation'}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default QuotationForm;