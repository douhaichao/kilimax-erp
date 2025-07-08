import React from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { 
  ArrowLeft, 
  Edit, 
  Trash2, 
  Download,
  Printer,
  Send,
  DollarSign,
  Package,
  Paperclip,
  File,
  FileText,
  Image as ImageIcon,
  Calendar,
  User,
  Mail,
  Phone
} from 'lucide-react';
import { Quotation, QuotationAttachment } from '@/types/quotation';
import QuotationStatusBadge from './QuotationStatusBadge';

interface QuotationDetailProps {
  quotation: Quotation;
  onUpdate: (quotation: Quotation) => void;
  onDelete: (quotationId: string) => void;
  onBack: () => void;
  onEdit: () => void;
}

const QuotationDetail = ({ quotation, onUpdate, onDelete, onBack, onEdit }: QuotationDetailProps) => {
  const handleStatusChange = (newStatus: 'draft' | 'sent' | 'accepted' | 'rejected' | 'expired') => {
    const updatedQuotation = {
      ...quotation,
      status: newStatus
    };
    onUpdate(updatedQuotation);
  };

  const handlePrint = () => {
    window.print();
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
    }).format(amount);
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

  const handleDownload = (attachment: QuotationAttachment) => {
    console.log('Downloading:', attachment.name);
  };

  const isExpired = new Date(quotation.validUntil) < new Date();

  return (
    <div className="space-y-6 print:space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between print:hidden">
        <div className="flex items-center space-x-4">
          <Button variant="ghost" onClick={onBack}>
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <div>
            <h2 className="text-2xl font-bold">Quotation Details</h2>
            <p className="text-muted-foreground">View and manage quotation information</p>
          </div>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline" onClick={handlePrint}>
            <Printer className="mr-2 h-4 w-4" />
            Print
          </Button>
          {quotation.status === 'draft' && (
            <Button onClick={() => handleStatusChange('sent')}>
              <Send className="mr-2 h-4 w-4" />
              Send
            </Button>
          )}
          <Button variant="outline" onClick={onEdit}>
            <Edit className="mr-2 h-4 w-4" />
            Edit
          </Button>
          <Button variant="destructive" onClick={() => onDelete(quotation.id)}>
            <Trash2 className="mr-2 h-4 w-4" />
            Delete
          </Button>
        </div>
      </div>

      {/* Status Alert */}
      {isExpired && quotation.status !== 'accepted' && quotation.status !== 'rejected' && (
        <Card className="border-orange-200 bg-orange-50 dark:border-orange-800 dark:bg-orange-950">
          <CardContent className="pt-6">
            <div className="flex items-center space-x-2">
              <Calendar className="h-4 w-4 text-orange-600" />
              <span className="text-sm text-orange-800 dark:text-orange-200">
                This quotation has expired. Valid until: {quotation.validUntil}
              </span>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Quotation Information */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Package className="h-5 w-5" />
              <span>Quotation Information</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium text-muted-foreground">Quotation Number</label>
                <p className="text-lg font-semibold">{quotation.quotationNumber}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-muted-foreground">Quotation Date</label>
                <p className="text-lg font-semibold">{quotation.quotationDate}</p>
              </div>
            </div>
            
            <Separator />
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium text-muted-foreground">Customer</label>
                <p className="text-lg font-semibold">{quotation.customer}</p>
                {quotation.customerEmail && (
                  <div className="flex items-center space-x-1 mt-1">
                    <Mail className="h-3 w-3 text-muted-foreground" />
                    <span className="text-sm text-muted-foreground">{quotation.customerEmail}</span>
                  </div>
                )}
                {quotation.customerPhone && (
                  <div className="flex items-center space-x-1 mt-1">
                    <Phone className="h-3 w-3 text-muted-foreground" />
                    <span className="text-sm text-muted-foreground">{quotation.customerPhone}</span>
                  </div>
                )}
              </div>
              <div>
                <label className="text-sm font-medium text-muted-foreground">Sales Representative</label>
                <div className="flex items-center space-x-1">
                  <User className="h-4 w-4 text-muted-foreground" />
                  <p className="text-lg font-semibold">{quotation.salesperson}</p>
                </div>
              </div>
            </div>

            <Separator />

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium text-muted-foreground">Status</label>
                <div className="mt-2">
                  <QuotationStatusBadge status={quotation.status} />
                </div>
              </div>
              <div>
                <label className="text-sm font-medium text-muted-foreground">Valid Until</label>
                <div className="flex items-center space-x-1 mt-2">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <p className="text-lg font-semibold">{quotation.validUntil}</p>
                </div>
              </div>
            </div>

            {quotation.notes && (
              <>
                <Separator />
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Notes</label>
                  <p className="mt-2 text-sm">{quotation.notes}</p>
                </div>
              </>
            )}
          </CardContent>
        </Card>

        {/* Quotation Summary */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <DollarSign className="h-5 w-5" />
              <span>Quotation Summary</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Total Items:</span>
                <span className="font-medium">{quotation.items.length}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Total Quantity:</span>
                <span className="font-medium">
                  {quotation.items.reduce((sum, item) => sum + item.quantity, 0)}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Subtotal:</span>
                <span className="font-medium">
                  {formatCurrency(quotation.items.reduce((sum, item) => sum + item.totalPrice, 0))}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Tax (10%):</span>
                <span className="font-medium">
                  {formatCurrency(quotation.items.reduce((sum, item) => sum + item.totalPrice, 0) * 0.1)}
                </span>
              </div>
              <Separator />
              <div className="flex justify-between text-lg font-bold">
                <span>Total:</span>
                <span>{formatCurrency(quotation.amount)}</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quotation Items */}
      <Card>
        <CardHeader>
          <CardTitle>Quotation Items</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Product</TableHead>
                <TableHead>SKU</TableHead>
                <TableHead>Description</TableHead>
                <TableHead className="text-right">Quantity</TableHead>
                <TableHead className="text-right">Unit Price</TableHead>
                <TableHead className="text-right">Total Price</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {quotation.items.map((item) => (
                <TableRow key={item.id}>
                  <TableCell className="font-medium">{item.productName}</TableCell>
                  <TableCell className="font-mono text-sm">{item.sku}</TableCell>
                  <TableCell className="text-sm text-muted-foreground">
                    {item.description || '-'}
                  </TableCell>
                  <TableCell className="text-right">{item.quantity}</TableCell>
                  <TableCell className="text-right">{formatCurrency(item.unitPrice)}</TableCell>
                  <TableCell className="text-right">{formatCurrency(item.totalPrice)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Attachments */}
      {quotation.attachments && quotation.attachments.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Paperclip className="h-5 w-5" />
              <span>Attachments ({quotation.attachments.length})</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {quotation.attachments.map((attachment) => (
                <div
                  key={attachment.id}
                  className="flex items-center p-3 border rounded-lg hover:bg-muted/50 transition-colors"
                >
                  <div className="flex items-center space-x-3 flex-1">
                    <div className="flex-shrink-0 text-muted-foreground">
                      {getFileIcon(attachment.type)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium truncate">
                        {attachment.name}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {formatFileSize(attachment.size)} • {attachment.uploadedAt}
                      </p>
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleDownload(attachment)}
                    className="flex-shrink-0"
                  >
                    <Download className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default QuotationDetail;