
import React from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
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
  Eye
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
  const getStatusBadge = (status: TransferOrderStatus) => {
    const statusConfig = {
      draft: { label: 'Draft', className: 'bg-gray-100 text-gray-800' },
      pending: { label: 'Pending', className: 'bg-yellow-100 text-yellow-800' },
      in_transit: { label: 'In Transit', className: 'bg-blue-100 text-blue-800' },
      completed: { label: 'Completed', className: 'bg-green-100 text-green-800' },
      cancelled: { label: 'Cancelled', className: 'bg-red-100 text-red-800' }
    };

    return (
      <Badge className={statusConfig[status].className}>
        {statusConfig[status].label}
      </Badge>
    );
  };

  const handleStatusChange = (newStatus: TransferOrderStatus) => {
    const updatedOrder = {
      ...order,
      status: newStatus,
      updatedAt: new Date().toISOString()
    };

    // Add appropriate dates based on status change
    switch (newStatus) {
      case 'pending':
        updatedOrder.approvedDate = new Date().toISOString();
        updatedOrder.approvedBy = 'Current User'; // In real app, get from auth
        break;
      case 'in_transit':
        updatedOrder.shippedDate = new Date().toISOString();
        // Update shipped quantities to match requested
        updatedOrder.items = order.items.map(item => ({
          ...item,
          shippedQuantity: item.requestedQuantity
        }));
        break;
      case 'completed':
        updatedOrder.receivedDate = new Date().toISOString();
        // Update received quantities to match shipped
        updatedOrder.items = order.items.map(item => ({
          ...item,
          receivedQuantity: item.shippedQuantity || item.requestedQuantity
        }));
        break;
    }

    onUpdate(updatedOrder);
  };

  const getAvailableActions = () => {
    const actions = [];

    switch (order.status) {
      case 'draft':
        actions.push(
          <Button key="submit" onClick={() => handleStatusChange('pending')}>
            <Send className="mr-2 h-4 w-4" />
            Submit for Approval
          </Button>
        );
        break;
      case 'pending':
        actions.push(
          <Button key="approve" onClick={() => handleStatusChange('in_transit')}>
            <Truck className="mr-2 h-4 w-4" />
            Mark as Shipped
          </Button>
        );
        actions.push(
          <Button key="cancel" variant="outline" onClick={() => handleStatusChange('cancelled')}>
            <XCircle className="mr-2 h-4 w-4" />
            Cancel
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

  const canEdit = order.status === 'draft' || order.status === 'pending';
  const canDelete = order.status === 'draft';

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

      {/* Status Flow Indicator */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Clock className="h-5 w-5" />
            <span>Status Flow</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            {['draft', 'pending', 'in_transit', 'completed'].map((status, index) => {
              const isActive = order.status === status;
              const isCompleted = ['draft', 'pending', 'in_transit', 'completed'].indexOf(order.status) > index;
              const isCancelled = order.status === 'cancelled';
              
              return (
                <div key={status} className="flex items-center">
                  <div className={`flex items-center justify-center w-8 h-8 rounded-full border-2 ${
                    isActive ? 'bg-blue-500 border-blue-500 text-white' :
                    isCompleted ? 'bg-green-500 border-green-500 text-white' :
                    isCancelled ? 'bg-red-500 border-red-500 text-white' :
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
                  {index < 3 && (
                    <div className={`mx-4 h-0.5 w-12 ${isCompleted ? 'bg-green-500' : 'bg-gray-300'}`} />
                  )}
                </div>
              );
            })}
          </div>
          
          {order.status === 'cancelled' && (
            <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg">
              <div className="flex items-center">
                <XCircle className="h-5 w-5 text-red-500 mr-2" />
                <span className="text-red-700 font-medium">This transfer order has been cancelled</span>
              </div>
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

      {/* Items Table */}
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
                <TableHead>Received</TableHead>
                <TableHead>Unit Cost</TableHead>
                <TableHead>Total Cost</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {order.items.map((item) => (
                <TableRow key={item.id}>
                  <TableCell className="font-medium">{item.productName}</TableCell>
                  <TableCell className="font-mono text-sm">{item.productSku}</TableCell>
                  <TableCell>{item.uom}</TableCell>
                  <TableCell>{item.requestedQuantity}</TableCell>
                  <TableCell>{item.shippedQuantity || '-'}</TableCell>
                  <TableCell>{item.receivedQuantity || '-'}</TableCell>
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
