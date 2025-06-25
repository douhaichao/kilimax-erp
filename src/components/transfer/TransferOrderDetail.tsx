
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { 
  ArrowLeft, 
  ArrowRight, 
  Edit, 
  Trash2, 
  Package, 
  MapPin,
  Clock,
  User,
  FileText,
  CheckCircle,
  Truck,
  XCircle,
  Send,
  Eye,
  UserCheck,
  UserX,
  QrCode,
  Plus,
  Minus
} from 'lucide-react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { TransferOrder, TransferOrderStatus } from '@/types/transferOrder';

interface TransferOrderDetailProps {
  order: TransferOrder;
  onUpdate: (order: TransferOrder) => void;
  onDelete: (orderId: string) => void;
  onBack: () => void;
  onEdit: () => void;
}

const TransferOrderDetail = ({ order, onUpdate, onDelete, onBack, onEdit }: TransferOrderDetailProps) => {
  const [editableItems, setEditableItems] = useState(order.items);
  const [rejectionReason, setRejectionReason] = useState('');
  const [showRejectDialog, setShowRejectDialog] = useState(false);

  const getStatusBadge = (status: TransferOrderStatus) => {
    const statusConfig = {
      draft: { label: 'Draft', className: 'bg-gray-100 text-gray-800' },
      submitted: { label: 'Submitted', className: 'bg-blue-100 text-blue-800' },
      approved: { label: 'Approved', className: 'bg-purple-100 text-purple-800' },
      rejected: { label: 'Rejected', className: 'bg-red-100 text-red-800' },
      in_transit: { label: 'In Transit', className: 'bg-blue-100 text-blue-800' },
      completed: { label: 'Completed', className: 'bg-green-100 text-green-800' }
    };

    return (
      <Badge className={statusConfig[status].className}>
        {statusConfig[status].label}
      </Badge>
    );
  };

  const handleStatusChange = (newStatus: TransferOrderStatus, reason?: string) => {
    const updatedOrder = {
      ...order,
      status: newStatus,
      updatedAt: new Date().toISOString(),
      items: editableItems
    };

    // Add appropriate dates based on status change
    switch (newStatus) {
      case 'submitted':
        updatedOrder.submittedDate = new Date().toISOString();
        updatedOrder.submittedBy = 'Current User';
        break;
      case 'approved':
        updatedOrder.approvedDate = new Date().toISOString();
        updatedOrder.approvedBy = 'Current User';
        // Set default shipped quantities to requested quantities when approved
        updatedOrder.items = editableItems.map(item => ({
          ...item,
          shippedQuantity: item.requestedQuantity
        }));
        break;
      case 'rejected':
        updatedOrder.rejectedDate = new Date().toISOString();
        updatedOrder.rejectedBy = 'Current User';
        updatedOrder.rejectionReason = reason;
        break;
      case 'in_transit':
        updatedOrder.shippedDate = new Date().toISOString();
        break;
      case 'completed':
        updatedOrder.receivedDate = new Date().toISOString();
        break;
    }

    onUpdate(updatedOrder);
  };

  const handleQuantityUpdate = (itemId: string, field: 'shippedQuantity' | 'receivedQuantity', value: number) => {
    setEditableItems(items => 
      items.map(item => 
        item.id === itemId 
          ? { ...item, [field]: value }
          : item
      )
    );
  };

  const handleSerialNumberUpdate = (itemId: string, serialNumbers: string[]) => {
    setEditableItems(items => 
      items.map(item => 
        item.id === itemId 
          ? { ...item, serialNumbers }
          : item
      )
    );
  };

  const saveQuantityChanges = () => {
    const updatedOrder = {
      ...order,
      items: editableItems,
      updatedAt: new Date().toISOString()
    };
    onUpdate(updatedOrder);
  };

  const handleReject = () => {
    handleStatusChange('rejected', rejectionReason);
    setShowRejectDialog(false);
    setRejectionReason('');
  };

  const getAvailableActions = () => {
    const actions = [];

    switch (order.status) {
      case 'draft':
        actions.push(
          <Button key="submit" onClick={() => handleStatusChange('submitted')}>
            <Send className="mr-2 h-4 w-4" />
            Submit for Approval
          </Button>
        );
        break;
      case 'submitted':
        actions.push(
          <Button key="approve" onClick={() => handleStatusChange('approved')}>
            <UserCheck className="mr-2 h-4 w-4" />
            Approve
          </Button>
        );
        actions.push(
          <Dialog open={showRejectDialog} onOpenChange={setShowRejectDialog}>
            <DialogTrigger asChild>
              <Button key="reject" variant="outline">
                <UserX className="mr-2 h-4 w-4" />
                Reject
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Reject Transfer Order</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="rejection-reason">Rejection Reason</Label>
                  <Textarea
                    id="rejection-reason"
                    value={rejectionReason}
                    onChange={(e) => setRejectionReason(e.target.value)}
                    placeholder="Please provide a reason for rejection..."
                    rows={4}
                  />
                </div>
                <div className="flex justify-end space-x-2">
                  <Button variant="outline" onClick={() => setShowRejectDialog(false)}>
                    Cancel
                  </Button>
                  <Button variant="destructive" onClick={handleReject} disabled={!rejectionReason.trim()}>
                    Reject Order
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        );
        break;
      case 'approved':
        actions.push(
          <Button key="ship" onClick={() => handleStatusChange('in_transit')}>
            <Truck className="mr-2 h-4 w-4" />
            Mark as In Transit
          </Button>
        );
        break;
      case 'in_transit':
        actions.push(
          <Button key="receive" onClick={() => handleStatusChange('completed')}>
            <CheckCircle className="mr-2 h-4 w-4" />
            Mark as Received
          </Button>
        );
        break;
    }

    return actions;
  };

  const SerialNumberInput = ({ item }: { item: any }) => {
    const [serialNumbers, setSerialNumbers] = useState<string[]>(item.serialNumbers || []);
    const [newSerial, setNewSerial] = useState('');

    const addSerialNumber = () => {
      if (newSerial.trim() && !serialNumbers.includes(newSerial.trim())) {
        const updated = [...serialNumbers, newSerial.trim()];
        setSerialNumbers(updated);
        handleSerialNumberUpdate(item.id, updated);
        setNewSerial('');
      }
    };

    const removeSerialNumber = (index: number) => {
      const updated = serialNumbers.filter((_, i) => i !== index);
      setSerialNumbers(updated);
      handleSerialNumberUpdate(item.id, updated);
    };

    return (
      <div className="space-y-2">
        <div className="flex space-x-2">
          <Input
            value={newSerial}
            onChange={(e) => setNewSerial(e.target.value)}
            placeholder="Scan or enter serial number"
            className="flex-1"
            onKeyPress={(e) => e.key === 'Enter' && addSerialNumber()}
          />
          <Button size="sm" onClick={addSerialNumber} disabled={!newSerial.trim()}>
            <Plus className="h-3 w-3" />
          </Button>
        </div>
        {serialNumbers.length > 0 && (
          <div className="space-y-1">
            {serialNumbers.map((serial, index) => (
              <div key={index} className="flex items-center justify-between bg-gray-50 p-2 rounded text-xs">
                <span className="font-mono">{serial}</span>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => removeSerialNumber(index)}
                  className="h-4 w-4 p-0"
                >
                  <Minus className="h-3 w-3" />
                </Button>
              </div>
            ))}
          </div>
        )}
      </div>
    );
  };

  const canEdit = order.status === 'draft' || order.status === 'submitted';
  const canDelete = order.status === 'draft';
  const isApproved = order.status === 'approved';
  const isInTransit = order.status === 'in_transit';

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Button variant="ghost" onClick={onBack}>
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <div>
            <h2 className="text-2xl font-bold text-gray-900">{order.transferNumber}</h2>
            <p className="text-gray-600">Transfer Order Details</p>
          </div>
        </div>
        <div className="flex space-x-2">
          {/* Status Action Buttons */}
          {getAvailableActions()}
          
          {canEdit && (
            <Button variant="outline" onClick={onEdit}>
              <Edit className="mr-2 h-4 w-4" />
              Edit
            </Button>
          )}
          {canDelete && (
            <Button variant="outline" onClick={() => onDelete(order.id)}>
              <Trash2 className="mr-2 h-4 w-4" />
              Delete
            </Button>
          )}
        </div>
      </div>

      {/* Status Flow Indicator - Updated to remove pending */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Clock className="h-5 w-5" />
            <span>Status Flow</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            {['draft', 'submitted', 'approved', 'in_transit', 'completed'].map((status, index) => {
              const isActive = order.status === status;
              const isCompleted = ['draft', 'submitted', 'approved', 'in_transit', 'completed'].indexOf(order.status) > index;
              const isRejected = order.status === 'rejected';
              
              return (
                <div key={status} className="flex items-center">
                  <div className={`flex items-center justify-center w-8 h-8 rounded-full border-2 ${
                    isActive ? 'bg-blue-500 border-blue-500 text-white' :
                    isCompleted ? 'bg-green-500 border-green-500 text-white' :
                    isRejected ? 'bg-red-500 border-red-500 text-white' :
                    'bg-gray-100 border-gray-300 text-gray-500'
                  }`}>
                    {isCompleted || isActive ? (
                      <CheckCircle className="h-4 w-4" />
                    ) : (
                      <span className="text-xs">{index + 1}</span>
                    )}
                  </div>
                  <div className="ml-2">
                    <p className={`text-sm font-medium ${isActive ? 'text-blue-600' : isCompleted ? 'text-green-600' : 'text-gray-500'}`}>
                      {status.charAt(0).toUpperCase() + status.slice(1).replace('_', ' ')}
                    </p>
                  </div>
                  {index < 4 && (
                    <div className={`mx-4 h-0.5 w-12 ${isCompleted ? 'bg-green-500' : 'bg-gray-300'}`} />
                  )}
                </div>
              );
            })}
          </div>
          
          {order.status === 'rejected' && (
            <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg">
              <div className="flex items-center">
                <XCircle className="h-5 w-5 text-red-500 mr-2" />
                <span className="text-red-700 font-medium">This transfer order has been rejected</span>
              </div>
              {order.rejectionReason && (
                <p className="text-red-600 text-sm mt-2">{order.rejectionReason}</p>
              )}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Order Overview */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Info */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Package className="h-5 w-5" />
              <span>Transfer Information</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium text-gray-600">Transfer Number</label>
                <p className="text-sm font-mono">{order.transferNumber}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-600">Status</label>
                <div className="mt-1">{getStatusBadge(order.status)}</div>
              </div>
            </div>

            <Separator />

            <div>
              <label className="text-sm font-medium text-gray-600 flex items-center space-x-1">
                <MapPin className="h-3 w-3" />
                <span>Transfer Route</span>
              </label>
              <div className="mt-2 flex items-center space-x-4 p-3 bg-gray-50 rounded-lg">
                <div className="flex-1">
                  <p className="font-medium">{order.fromLocationName}</p>
                  <p className="text-xs text-gray-500">From Location</p>
                </div>
                <ArrowRight className="h-5 w-5 text-gray-400" />
                <div className="flex-1">
                  <p className="font-medium">{order.toLocationName}</p>
                  <p className="text-xs text-gray-500">To Location</p>
                </div>
              </div>
            </div>

            {order.notes && (
              <>
                <Separator />
                <div>
                  <label className="text-sm font-medium text-gray-600 flex items-center space-x-1">
                    <FileText className="h-3 w-3" />
                    <span>Notes</span>
                  </label>
                  <p className="mt-1 text-sm text-gray-700 p-3 bg-gray-50 rounded-lg">{order.notes}</p>
                </div>
              </>
            )}
          </CardContent>
        </Card>

        {/* Status Timeline */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Clock className="h-5 w-5" />
              <span>Timeline</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                <div>
                  <p className="text-sm font-medium">Requested</p>
                  <p className="text-xs text-gray-500">{new Date(order.requestedDate).toLocaleDateString()}</p>
                  <p className="text-xs text-gray-500">by {order.requestedBy}</p>
                </div>
              </div>

              {order.submittedDate && (
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                  <div>
                    <p className="text-sm font-medium">Submitted</p>
                    <p className="text-xs text-gray-500">{new Date(order.submittedDate).toLocaleDateString()}</p>
                    <p className="text-xs text-gray-500">by {order.submittedBy}</p>
                  </div>
                </div>
              )}

              {order.approvedDate && (
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                  <div>
                    <p className="text-sm font-medium">Approved</p>
                    <p className="text-xs text-gray-500">{new Date(order.approvedDate).toLocaleDateString()}</p>
                    <p className="text-xs text-gray-500">by {order.approvedBy}</p>
                  </div>
                </div>
              )}

              {order.rejectedDate && (
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-red-500 rounded-full mt-2"></div>
                  <div>
                    <p className="text-sm font-medium">Rejected</p>
                    <p className="text-xs text-gray-500">{new Date(order.rejectedDate).toLocaleDateString()}</p>
                    <p className="text-xs text-gray-500">by {order.rejectedBy}</p>
                  </div>
                </div>
              )}

              {order.shippedDate && (
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                  <div>
                    <p className="text-sm font-medium">Shipped</p>
                    <p className="text-xs text-gray-500">{new Date(order.shippedDate).toLocaleDateString()}</p>
                  </div>
                </div>
              )}

              {order.receivedDate && (
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                  <div>
                    <p className="text-sm font-medium">Received</p>
                    <p className="text-xs text-gray-500">{new Date(order.receivedDate).toLocaleDateString()}</p>
                  </div>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Items Table - Updated with serial number functionality */}
      <Card>
        <CardHeader>
          <CardTitle>Transfer Items</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Product</TableHead>
                <TableHead>SKU</TableHead>
                <TableHead>UOM</TableHead>
                <TableHead>Requested</TableHead>
                <TableHead>Shipped</TableHead>
                {/* Only show Received column for in_transit and completed status */}
                {(isInTransit || order.status === 'completed') && (
                  <TableHead>Received</TableHead>
                )}
                {/* Show Serial Numbers column for in_transit status */}
                {isInTransit && (
                  <TableHead>Serial Numbers</TableHead>
                )}
                <TableHead>Unit Cost</TableHead>
                <TableHead>Total Cost</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {editableItems.map((item) => (
                <TableRow key={item.id}>
                  <TableCell className="font-medium">{item.productName}</TableCell>
                  <TableCell className="font-mono text-sm">{item.productSku}</TableCell>
                  <TableCell>{item.uom}</TableCell>
                  <TableCell>{item.requestedQuantity}</TableCell>
                  <TableCell>
                    {/* Editable shipped quantity for approved status */}
                    {isApproved ? (
                      <Input
                        type="number"
                        value={item.shippedQuantity || item.requestedQuantity}
                        onChange={(e) => handleQuantityUpdate(item.id, 'shippedQuantity', parseInt(e.target.value) || 0)}
                        onBlur={saveQuantityChanges}
                        className="w-20"
                        min={0}
                        max={item.requestedQuantity}
                      />
                    ) : (
                      item.shippedQuantity || '-'
                    )}
                  </TableCell>
                  {/* Only show Received column for in_transit and completed status */}
                  {(isInTransit || order.status === 'completed') && (
                    <TableCell>
                      {/* Editable received quantity for in_transit status */}
                      {isInTransit ? (
                        <Input
                          type="number"
                          value={item.receivedQuantity || item.shippedQuantity || 0}
                          onChange={(e) => handleQuantityUpdate(item.id, 'receivedQuantity', parseInt(e.target.value) || 0)}
                          onBlur={saveQuantityChanges}
                          className="w-20"
                          min={0}
                          max={item.shippedQuantity || 0}
                        />
                      ) : (
                        item.receivedQuantity || '-'
                      )}
                    </TableCell>
                  )}
                  {/* Show Serial Numbers column for in_transit status */}
                  {isInTransit && (
                    <TableCell>
                      <SerialNumberInput item={item} />
                    </TableCell>
                  )}
                  <TableCell>${item.unitCost.toFixed(2)}</TableCell>
                  <TableCell>${item.totalCost.toFixed(2)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          <div className="mt-4 pt-4 border-t">
            <div className="flex justify-between items-center">
              <span className="font-medium">Total Estimated Value:</span>
              <span className="text-lg font-bold">${order.estimatedValue.toFixed(2)}</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default TransferOrderDetail;
