import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { 
  ArrowLeft, 
  Edit, 
  Trash2, 
  FileText, 
  CheckCircle, 
  XCircle, 
  Send,
  Calendar,
  User,
  MapPin,
  DollarSign
} from 'lucide-react';
import { PurchaseOrder, PurchaseOrderStatus } from '@/types/purchaseOrder';
import PurchaseOrderStatusBadge from './PurchaseOrderStatusBadge';

interface PurchaseOrderDetailProps {
  order: PurchaseOrder;
  onUpdate: (order: PurchaseOrder) => void;
  onDelete: (orderId: string) => void;
  onBack: () => void;
  onEdit: () => void;
}

const PurchaseOrderDetail = ({ order, onUpdate, onDelete, onBack, onEdit }: PurchaseOrderDetailProps) => {
  const [editableItems, setEditableItems] = useState(order.items);
  const [rejectionReason, setRejectionReason] = useState('');
  const [showRejectionDialog, setShowRejectionDialog] = useState(false);

  const getStatusBadge = (status: PurchaseOrderStatus) => {
    const statusConfig = {
      draft: { label: 'Draft', variant: 'outline' as const, className: 'text-gray-700 border-gray-400 bg-gray-50' },
      submitted: { label: 'Submitted', variant: 'outline' as const, className: 'text-blue-700 border-blue-400 bg-blue-50' },
      approved: { label: 'Approved', variant: 'default' as const, className: 'bg-green-600 text-white' },
      rejected: { label: 'Rejected', variant: 'destructive' as const, className: 'bg-red-600 text-white' },
      ordered: { label: 'Ordered', variant: 'default' as const, className: 'bg-purple-600 text-white' },
      partially_received: { label: 'Partially Received', variant: 'outline' as const, className: 'text-orange-700 border-orange-400 bg-orange-50' },
      completed: { label: 'Completed', variant: 'default' as const, className: 'bg-green-600 text-white' },
      cancelled: { label: 'Cancelled', variant: 'outline' as const, className: 'text-red-700 border-red-400 bg-red-50' }
    };
    const config = statusConfig[status];
    return <Badge variant={config.variant} className={`text-xs font-medium ${config.className}`}>{config.label}</Badge>;
  };

  const handleStatusChange = (newStatus: PurchaseOrderStatus, reason?: string) => {
    const updatedOrder = {
      ...order,
      status: newStatus,
      updatedAt: new Date().toISOString()
    };

    // Add appropriate workflow fields based on status
    switch (newStatus) {
      case 'submitted':
        updatedOrder.submittedDate = new Date().toISOString();
        updatedOrder.submittedBy = 'Current User';
        break;
      case 'approved':
        updatedOrder.approvedDate = new Date().toISOString();
        updatedOrder.approvedBy = 'Current User';
        break;
      case 'rejected':
        updatedOrder.rejectedDate = new Date().toISOString();
        updatedOrder.rejectedBy = 'Current User';
        updatedOrder.rejectionReason = reason;
        break;
      case 'ordered':
        updatedOrder.orderedDate = new Date().toISOString();
        updatedOrder.items = order.items.map(item => ({
          ...item,
          orderedQuantity: item.requestedQuantity
        }));
        break;
    }

    onUpdate(updatedOrder);
  };

  const handleReject = () => {
    handleStatusChange('rejected', rejectionReason);
    setShowRejectionDialog(false);
    setRejectionReason('');
  };

  const getAvailableActions = () => {
    const actions = [];
    
    switch (order.status) {
      case 'draft':
        actions.push(
          { label: 'Submit for Approval', icon: Send, action: () => handleStatusChange('submitted'), variant: 'default' }
        );
        break;
      case 'submitted':
        actions.push(
          { label: 'Approve', icon: CheckCircle, action: () => handleStatusChange('approved'), variant: 'default' },
          { label: 'Reject', icon: XCircle, action: () => setShowRejectionDialog(true), variant: 'destructive' }
        );
        break;
      case 'approved':
        actions.push(
          { label: 'Send Order', icon: Send, action: () => handleStatusChange('ordered'), variant: 'default' }
        );
        break;
    }
    
    return actions;
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: order.currency,
      minimumFractionDigits: 2
    }).format(amount);
  };

  const formatDate = (dateString: string | undefined) => {
    if (!dateString) return '-';
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Button variant="ghost" size="sm" onClick={onBack}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back
          </Button>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Purchase Order Detail</h1>
            <p className="text-gray-600">Order {order.orderNumber}</p>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <PurchaseOrderStatusBadge status={order.status} order={order} />
          <Button variant="outline" onClick={onEdit}>
            <Edit className="mr-2 h-4 w-4" />
            Edit
          </Button>
          <Button variant="destructive" onClick={() => onDelete(order.id)}>
            <Trash2 className="mr-2 h-4 w-4" />
            Delete
          </Button>
        </div>
      </div>

      {/* Status Actions */}
      {getAvailableActions().length > 0 && (
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Available Actions:</span>
              <div className="flex space-x-2">
                {getAvailableActions().map((action, index) => {
                  const Icon = action.icon;
                  return (
                    <Button
                      key={index}
                      variant={action.variant as any}
                      size="sm"
                      onClick={action.action}
                    >
                      <Icon className="mr-2 h-4 w-4" />
                      {action.label}
                    </Button>
                  );
                })}
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Order Information */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <FileText className="mr-2 h-5 w-5" />
              Order Information
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <Label className="text-muted-foreground">Order Number</Label>
                <p className="font-medium">{order.orderNumber}</p>
              </div>
              <div>
                <Label className="text-muted-foreground">Status</Label>
                <div className="mt-1">
                  {getStatusBadge(order.status)}
                </div>
              </div>
              <div>
                <Label className="text-muted-foreground">Requested Date</Label>
                <p className="font-medium">{formatDate(order.requestedDate)}</p>
              </div>
              <div>
                <Label className="text-muted-foreground">Expected Delivery</Label>
                <p className="font-medium">{formatDate(order.expectedDeliveryDate)}</p>
              </div>
              <div>
                <Label className="text-muted-foreground">Payment Terms</Label>
                <p className="font-medium">{order.paymentTerms || '-'}</p>
              </div>
              <div>
                <Label className="text-muted-foreground">Currency</Label>
                <p className="font-medium">{order.currency}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Supplier Information */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <User className="mr-2 h-5 w-5" />
              Supplier Information
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3 text-sm">
              <div>
                <Label className="text-muted-foreground">Supplier Name</Label>
                <p className="font-medium">{order.supplierName}</p>
              </div>
              {order.supplierEmail && (
                <div>
                  <Label className="text-muted-foreground">Email</Label>
                  <p className="font-medium">{order.supplierEmail}</p>
                </div>
              )}
              {order.supplierPhone && (
                <div>
                  <Label className="text-muted-foreground">Phone</Label>
                  <p className="font-medium">{order.supplierPhone}</p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Delivery Information */}
      {order.deliveryAddress && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <MapPin className="mr-2 h-5 w-5" />
              Delivery Information
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-sm">
              <Label className="text-muted-foreground">Delivery Address</Label>
              <p className="font-medium mt-1">{order.deliveryAddress}</p>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Workflow History */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Calendar className="mr-2 h-5 w-5" />
            Workflow History
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between py-2 border-b">
              <div>
                <p className="font-medium">Order Created</p>
                <p className="text-sm text-muted-foreground">By {order.requestedBy}</p>
              </div>
              <p className="text-sm text-muted-foreground">{formatDate(order.requestedDate)}</p>
            </div>
            {order.submittedDate && (
              <div className="flex items-center justify-between py-2 border-b">
                <div>
                  <p className="font-medium">Submitted for Approval</p>
                  <p className="text-sm text-muted-foreground">By {order.submittedBy}</p>
                </div>
                <p className="text-sm text-muted-foreground">{formatDate(order.submittedDate)}</p>
              </div>
            )}
            {order.approvedDate && (
              <div className="flex items-center justify-between py-2 border-b">
                <div>
                  <p className="font-medium">Approved</p>
                  <p className="text-sm text-muted-foreground">By {order.approvedBy}</p>
                </div>
                <p className="text-sm text-muted-foreground">{formatDate(order.approvedDate)}</p>
              </div>
            )}
            {order.rejectedDate && (
              <div className="flex items-center justify-between py-2 border-b">
                <div>
                  <p className="font-medium">Rejected</p>
                  <p className="text-sm text-muted-foreground">By {order.rejectedBy}</p>
                  {order.rejectionReason && (
                    <p className="text-sm text-red-600 mt-1">{order.rejectionReason}</p>
                  )}
                </div>
                <p className="text-sm text-muted-foreground">{formatDate(order.rejectedDate)}</p>
              </div>
            )}
            {order.orderedDate && (
              <div className="flex items-center justify-between py-2 border-b">
                <div>
                  <p className="font-medium">Order Sent to Supplier</p>
                </div>
                <p className="text-sm text-muted-foreground">{formatDate(order.orderedDate)}</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Order Items */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <DollarSign className="mr-2 h-5 w-5" />
            Order Items
          </CardTitle>
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
                  <TableHead>Requested</TableHead>
                  <TableHead>Ordered</TableHead>
                  <TableHead>Received</TableHead>
                  <TableHead>Unit Price</TableHead>
                  <TableHead>Total</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {order.items.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell className="font-medium">{item.productName}</TableCell>
                    <TableCell>{item.productSku}</TableCell>
                    <TableCell>{item.description || '-'}</TableCell>
                    <TableCell>{item.uom}</TableCell>
                    <TableCell>{item.requestedQuantity}</TableCell>
                    <TableCell>{item.orderedQuantity || '-'}</TableCell>
                    <TableCell>
                      {item.receivedQuantity !== undefined ? (
                        <span className={
                          item.receivedQuantity !== item.orderedQuantity 
                            ? 'text-amber-600 font-medium' 
                            : 'text-green-600'
                        }>
                          {item.receivedQuantity}
                        </span>
                      ) : '-'}
                    </TableCell>
                    <TableCell>{formatCurrency(item.unitPrice)}</TableCell>
                    <TableCell className="font-medium">
                      {formatCurrency(item.totalPrice + (item.taxAmount || 0))}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
          
          <Separator className="my-6" />
          <div className="flex justify-end">
            <div className="space-y-2 text-right">
              <div className="text-lg font-bold">
                Total: {formatCurrency(order.totalValue)}
              </div>
              <div className="text-sm text-muted-foreground">
                {order.totalQuantity} items
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Notes */}
      {order.notes && (
        <Card>
          <CardHeader>
            <CardTitle>Notes</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm">{order.notes}</p>
          </CardContent>
        </Card>
      )}

      {/* Rejection Dialog */}
      <Dialog open={showRejectionDialog} onOpenChange={setShowRejectionDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Reject Purchase Order</DialogTitle>
            <DialogDescription>
              Please provide a reason for rejecting this purchase order.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <Textarea
              placeholder="Enter rejection reason..."
              value={rejectionReason}
              onChange={(e) => setRejectionReason(e.target.value)}
              rows={4}
            />
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowRejectionDialog(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleReject} disabled={!rejectionReason.trim()}>
              Reject Order
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default PurchaseOrderDetail;