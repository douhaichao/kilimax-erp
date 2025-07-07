import React from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { 
  ArrowLeft, 
  Edit, 
  Trash2, 
  Download,
  Printer,
  CheckCircle,
  XCircle,
  Clock,
  User,
  Calendar,
  DollarSign,
  Package
} from 'lucide-react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

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
}

interface SalesOrderDetailProps {
  order: SalesOrder;
  onUpdate: (order: SalesOrder) => void;
  onDelete: (orderId: string) => void;
  onBack: () => void;
  onEdit: () => void;
}

const SalesOrderDetail = ({ order, onUpdate, onDelete, onBack, onEdit }: SalesOrderDetailProps) => {
  const mockOrderItems = [
    { id: '1', productName: 'Wireless Headphones', sku: 'WH-001', quantity: 2, unitPrice: 150, totalPrice: 300 },
    { id: '2', productName: 'Office Chair', sku: 'OC-002', quantity: 1, unitPrice: 180, totalPrice: 180 },
    { id: '3', productName: 'Water Bottle', sku: 'WB-003', quantity: 5, unitPrice: 12.75, totalPrice: 63.75 }
  ];

  const getStatusBadge = (status: string, type: 'approval' | 'shipping' | 'invoice' | 'payment') => {
    const statusConfig: Record<string, any> = {
      approval: {
        pending: { label: 'Pending Review', className: 'bg-yellow-100 text-yellow-800' },
        approved: { label: 'Approved', className: 'bg-green-100 text-green-800' },
        rejected: { label: 'Rejected', className: 'bg-red-100 text-red-800' }
      },
      shipping: {
        not_shipped: { label: 'Not Shipped', className: 'bg-gray-100 text-gray-800' },
        preparing: { label: 'Preparing', className: 'bg-orange-100 text-orange-800' },
        shipped: { label: 'Shipped', className: 'bg-blue-100 text-blue-800' },
        delivered: { label: 'Delivered', className: 'bg-green-100 text-green-800' }
      },
      invoice: {
        not_invoiced: { label: 'Not Invoiced', className: 'bg-gray-100 text-gray-800' },
        invoiced: { label: 'Invoiced', className: 'bg-blue-100 text-blue-800' },
        paid: { label: 'Paid', className: 'bg-green-100 text-green-800' }
      },
      payment: {
        unpaid: { label: 'Unpaid', className: 'bg-red-100 text-red-800' },
        partial: { label: 'Partial', className: 'bg-yellow-100 text-yellow-800' },
        paid: { label: 'Paid', className: 'bg-green-100 text-green-800' }
      }
    };

    const config = statusConfig[type]?.[status];
    if (!config) return null;

    return (
      <Badge className={`text-xs font-medium ${config.className}`}>
        {config.label}
      </Badge>
    );
  };

  const handleApproval = (newStatus: 'approved' | 'rejected') => {
    const updatedOrder = {
      ...order,
      approvalStatus: newStatus as 'pending' | 'approved' | 'rejected'
    };
    onUpdate(updatedOrder);
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

  return (
    <div className="space-y-6 print:space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between print:hidden">
        <div className="flex items-center space-x-4">
          <Button variant="ghost" onClick={onBack}>
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Sales Order Details</h2>
            <p className="text-gray-600">View and manage sales order information</p>
          </div>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline" onClick={handlePrint}>
            <Printer className="mr-2 h-4 w-4" />
            Print
          </Button>
          {order.approvalStatus === 'pending' && (
            <>
              <Button variant="outline" onClick={() => handleApproval('rejected')}>
                <XCircle className="mr-2 h-4 w-4" />
                Reject
              </Button>
              <Button onClick={() => handleApproval('approved')}>
                <CheckCircle className="mr-2 h-4 w-4" />
                Approve
              </Button>
            </>
          )}
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

      {/* Order Information */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Package className="h-5 w-5" />
              <span>Order Information</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium text-gray-500">Order Number</label>
                <p className="text-lg font-semibold">{order.orderNumber}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-500">Order Date</label>
                <p className="text-lg font-semibold">{order.orderDate}</p>
              </div>
            </div>
            
            <Separator />
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium text-gray-500">Customer</label>
                <p className="text-lg font-semibold">{order.customer}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-500">Sales Representative</label>
                <p className="text-lg font-semibold">{order.salesperson}</p>
              </div>
            </div>

            <Separator />

            <div>
              <label className="text-sm font-medium text-gray-500">Order Status</label>
              <div className="flex flex-wrap gap-2 mt-2">
                {getStatusBadge(order.approvalStatus, 'approval')}
                {getStatusBadge(order.shippingStatus, 'shipping')}
                {getStatusBadge(order.invoiceStatus, 'invoice')}
                {getStatusBadge(order.paymentStatus, 'payment')}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Order Summary */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <DollarSign className="h-5 w-5" />
              <span>Order Summary</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Total Items:</span>
                <span className="font-medium">{mockOrderItems.length}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Total Quantity:</span>
                <span className="font-medium">
                  {mockOrderItems.reduce((sum, item) => sum + item.quantity, 0)}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Subtotal:</span>
                <span className="font-medium">
                  {formatCurrency(mockOrderItems.reduce((sum, item) => sum + item.totalPrice, 0))}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Tax (10%):</span>
                <span className="font-medium">
                  {formatCurrency(mockOrderItems.reduce((sum, item) => sum + item.totalPrice, 0) * 0.1)}
                </span>
              </div>
              <Separator />
              <div className="flex justify-between text-lg font-bold">
                <span>Total:</span>
                <span>{formatCurrency(order.amount)}</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Order Items */}
      <Card>
        <CardHeader>
          <CardTitle>Order Items</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Product</TableHead>
                <TableHead>SKU</TableHead>
                <TableHead className="text-right">Quantity</TableHead>
                <TableHead className="text-right">Unit Price</TableHead>
                <TableHead className="text-right">Total Price</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mockOrderItems.map((item) => (
                <TableRow key={item.id}>
                  <TableCell className="font-medium">{item.productName}</TableCell>
                  <TableCell className="font-mono text-sm">{item.sku}</TableCell>
                  <TableCell className="text-right">{item.quantity}</TableCell>
                  <TableCell className="text-right">{formatCurrency(item.unitPrice)}</TableCell>
                  <TableCell className="text-right">{formatCurrency(item.totalPrice)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default SalesOrderDetail;