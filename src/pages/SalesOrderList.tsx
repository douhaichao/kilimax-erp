
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Search, Filter, Plus, Download, Eye, Edit, Trash2 } from 'lucide-react';

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

interface StatusConfig {
  label: string;
  variant: 'default' | 'secondary' | 'destructive' | 'outline';
  className: string;
}

interface StatusConfigMap {
  [key: string]: StatusConfig;
}

const SalesOrderList = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedOrders, setSelectedOrders] = useState<string[]>([]);

  // Sample sales order data
  const salesOrders: SalesOrder[] = [
    {
      id: '1',
      orderNumber: 'SO-2024-001',
      customer: 'Acme Corporation',
      amount: 15600,
      salesperson: 'John Smith',
      approvalStatus: 'approved',
      shippingStatus: 'shipped',
      invoiceStatus: 'invoiced',
      paymentStatus: 'paid',
      orderDate: '2024-01-15'
    },
    {
      id: '2',
      orderNumber: 'SO-2024-002',
      customer: 'TechStart Inc.',
      amount: 28900,
      salesperson: 'Jane Doe',
      approvalStatus: 'pending',
      shippingStatus: 'not_shipped',
      invoiceStatus: 'not_invoiced',
      paymentStatus: 'unpaid',
      orderDate: '2024-01-16'
    },
    {
      id: '3',
      orderNumber: 'SO-2024-003',
      customer: 'Global Systems Ltd',
      amount: 42300,
      salesperson: 'Mike Johnson',
      approvalStatus: 'approved',
      shippingStatus: 'preparing',
      invoiceStatus: 'invoiced',
      paymentStatus: 'partial',
      orderDate: '2024-01-17'
    },
    {
      id: '4',
      orderNumber: 'SO-2024-004',
      customer: 'Innovation Hub',
      amount: 8750,
      salesperson: 'Sarah Wilson',
      approvalStatus: 'rejected',
      shippingStatus: 'not_shipped',
      invoiceStatus: 'not_invoiced',
      paymentStatus: 'unpaid',
      orderDate: '2024-01-18'
    },
    {
      id: '5',
      orderNumber: 'SO-2024-005',
      customer: 'Future Solutions',
      amount: 67200,
      salesperson: 'John Smith',
      approvalStatus: 'approved',
      shippingStatus: 'delivered',
      invoiceStatus: 'paid',
      paymentStatus: 'paid',
      orderDate: '2024-01-19'
    }
  ];

  const getStatusBadge = (status: string, type: 'approval' | 'shipping' | 'invoice' | 'payment') => {
    const statusConfig: Record<string, StatusConfigMap> = {
      approval: {
        pending: { label: 'Pending Approval', variant: 'outline', className: 'text-yellow-600 border-yellow-300' },
        approved: { label: 'Approved', variant: 'default', className: 'bg-green-500' },
        rejected: { label: 'Rejected', variant: 'destructive', className: '' }
      },
      shipping: {
        not_shipped: { label: 'Not Shipped', variant: 'outline', className: 'text-gray-600' },
        preparing: { label: 'Preparing', variant: 'outline', className: 'text-blue-600 border-blue-300' },
        shipped: { label: 'Shipped', variant: 'default', className: 'bg-blue-500' },
        delivered: { label: 'Delivered', variant: 'default', className: 'bg-green-500' }
      },
      invoice: {
        not_invoiced: { label: 'Not Invoiced', variant: 'outline', className: 'text-gray-600' },
        invoiced: { label: 'Invoiced', variant: 'default', className: 'bg-purple-500' },
        paid: { label: 'Paid', variant: 'default', className: 'bg-green-500' }
      },
      payment: {
        unpaid: { label: 'Unpaid', variant: 'outline', className: 'text-red-600 border-red-300' },
        partial: { label: 'Partial Payment', variant: 'outline', className: 'text-orange-600 border-orange-300' },
        paid: { label: 'Paid', variant: 'default', className: 'bg-green-500' }
      }
    };

    const config = statusConfig[type]?.[status];
    if (!config) return null;

    return (
      <Badge variant={config.variant} className={`text-xs ${config.className}`}>
        {config.label}
      </Badge>
    );
  };

  const filteredOrders = salesOrders.filter(order =>
    order.orderNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
    order.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
    order.salesperson.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('zh-CN', {
      style: 'currency',
      currency: 'CNY'
    }).format(amount);
  };

  return (
    <div className="space-y-6">
      {/* Page title and action buttons */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Sales Orders</h1>
          <p className="text-gray-600 mt-1">Manage and track all sales orders</p>
        </div>
        <div className="flex space-x-3">
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
          <Button className="bg-blue-600 hover:bg-blue-700">
            <Plus className="h-4 w-4 mr-2" />
            New Order
          </Button>
        </div>
      </div>

      {/* Search and filter */}
      <Card>
        <CardContent className="p-4">
          <div className="flex space-x-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search order number, customer or salesperson..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Button variant="outline">
              <Filter className="h-4 w-4 mr-2" />
              Filter
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Order statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">{salesOrders.length}</div>
              <div className="text-sm text-gray-500">Total Orders</div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">
                {salesOrders.filter(o => o.approvalStatus === 'approved').length}
              </div>
              <div className="text-sm text-gray-500">Approved</div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-orange-600">
                {salesOrders.filter(o => o.shippingStatus === 'shipped' || o.shippingStatus === 'delivered').length}
              </div>
              <div className="text-sm text-gray-500">Shipped</div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-600">
                {formatCurrency(salesOrders.reduce((sum, order) => sum + order.amount, 0))}
              </div>
              <div className="text-sm text-gray-500">Total Amount</div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Order list */}
      <Card>
        <CardHeader>
          <CardTitle>Order List</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Order Number</TableHead>
                  <TableHead>Customer</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Salesperson</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Order Date</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredOrders.map((order) => (
                  <TableRow key={order.id}>
                    <TableCell className="font-medium">
                      {order.orderNumber}
                    </TableCell>
                    <TableCell>{order.customer}</TableCell>
                    <TableCell className="font-medium">
                      {formatCurrency(order.amount)}
                    </TableCell>
                    <TableCell>{order.salesperson}</TableCell>
                    <TableCell>
                      <div className="space-y-1">
                        <div className="flex flex-wrap gap-1">
                          {getStatusBadge(order.approvalStatus, 'approval')}
                          {getStatusBadge(order.shippingStatus, 'shipping')}
                        </div>
                        <div className="flex flex-wrap gap-1">
                          {getStatusBadge(order.invoiceStatus, 'invoice')}
                          {getStatusBadge(order.paymentStatus, 'payment')}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>{order.orderDate}</TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end space-x-2">
                        <Button variant="ghost" size="sm">
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm">
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm" className="text-red-600 hover:text-red-800">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SalesOrderList;
