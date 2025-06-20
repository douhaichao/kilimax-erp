import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Search, Filter, Plus, Download, Eye, Edit, Trash2, Mountain } from 'lucide-react';

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

  // Sample sales order data with African companies
  const salesOrders: SalesOrder[] = [
    {
      id: '1',
      orderNumber: 'SO-2024-001',
      customer: 'Kilimanjaro Trading Co.',
      amount: 156000,
      salesperson: 'Amara Okafor',
      approvalStatus: 'approved',
      shippingStatus: 'shipped',
      invoiceStatus: 'invoiced',
      paymentStatus: 'paid',
      orderDate: '2024-01-15'
    },
    {
      id: '2',
      orderNumber: 'SO-2024-002',
      customer: 'Lagos Tech Solutions',
      amount: 289000,
      salesperson: 'Kwame Asante',
      approvalStatus: 'pending',
      shippingStatus: 'not_shipped',
      invoiceStatus: 'not_invoiced',
      paymentStatus: 'unpaid',
      orderDate: '2024-01-16'
    },
    {
      id: '3',
      orderNumber: 'SO-2024-003',
      customer: 'Sahara Logistics Ltd',
      amount: 423000,
      salesperson: 'Fatima Al-Rashid',
      approvalStatus: 'approved',
      shippingStatus: 'preparing',
      invoiceStatus: 'invoiced',
      paymentStatus: 'partial',
      orderDate: '2024-01-17'
    },
    {
      id: '4',
      orderNumber: 'SO-2024-004',
      customer: 'Cape Verde Industries',
      amount: 87500,
      salesperson: 'Thabo Mthembu',
      approvalStatus: 'rejected',
      shippingStatus: 'not_shipped',
      invoiceStatus: 'not_invoiced',
      paymentStatus: 'unpaid',
      orderDate: '2024-01-18'
    },
    {
      id: '5',
      orderNumber: 'SO-2024-005',
      customer: 'Nile Valley Enterprises',
      amount: 672000,
      salesperson: 'Zara Kone',
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
        pending: { label: 'Pending Review', variant: 'outline', className: 'text-amber-700 border-amber-400 bg-amber-50' },
        approved: { label: 'Approved', variant: 'default', className: 'bg-green-600 text-white border-green-600' },
        rejected: { label: 'Rejected', variant: 'destructive', className: 'bg-red-600 text-white' }
      },
      shipping: {
        not_shipped: { label: 'Not Shipped', variant: 'outline', className: 'text-stone-600 border-stone-400 bg-stone-50' },
        preparing: { label: 'Preparing', variant: 'outline', className: 'text-orange-700 border-orange-400 bg-orange-50' },
        shipped: { label: 'Shipped', variant: 'default', className: 'bg-blue-600 text-white' },
        delivered: { label: 'Delivered', variant: 'default', className: 'bg-green-600 text-white' }
      },
      invoice: {
        not_invoiced: { label: 'Not Invoiced', variant: 'outline', className: 'text-stone-600 border-stone-400 bg-stone-50' },
        invoiced: { label: 'Invoiced', variant: 'default', className: 'bg-teal-600 text-white' },
        paid: { label: 'Paid', variant: 'default', className: 'bg-green-600 text-white' }
      },
      payment: {
        unpaid: { label: 'Unpaid', variant: 'outline', className: 'text-red-700 border-red-400 bg-red-50' },
        partial: { label: 'Partial', variant: 'outline', className: 'text-amber-700 border-amber-400 bg-amber-50' },
        paid: { label: 'Paid', variant: 'default', className: 'bg-green-600 text-white' }
      }
    };

    const config = statusConfig[type]?.[status];
    if (!config) return null;

    return (
      <Badge variant={config.variant} className={`text-xs font-medium ${config.className}`}>
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
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <div className="space-y-6 bg-gradient-to-br from-green-50 to-emerald-50 min-h-screen p-6">
      {/* Header with Kilimax branding */}
      <div className="flex justify-between items-center bg-white rounded-xl shadow-sm border border-green-200 p-6">
        <div className="flex items-center space-x-4">
          <div className="p-3 bg-gradient-to-br from-green-600 to-emerald-700 rounded-xl shadow-lg">
            <Mountain className="h-8 w-8 text-white" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-green-800">Sales Orders</h1>
            <p className="text-green-600 mt-1">Manage and track business opportunities with Kilimax</p>
          </div>
        </div>
        <div className="flex space-x-3">
          <Button variant="outline" size="sm" className="border-green-300 text-green-700 hover:bg-green-50">
            <Download className="h-4 w-4 mr-2" />
            Export Data
          </Button>
          <Button className="bg-gradient-to-r from-green-600 to-emerald-700 hover:from-green-700 hover:to-emerald-800 text-white shadow-lg">
            <Plus className="h-4 w-4 mr-2" />
            New Order
          </Button>
        </div>
      </div>

      {/* Search and filter with green styling */}
      <Card className="border-green-200 shadow-sm">
        <CardContent className="p-6">
          <div className="flex space-x-4">
            <div className="relative flex-1">
              <Search className="absolute left-4 top-3 h-5 w-5 text-green-500" />
              <Input
                placeholder="Search orders, customers, or sales representatives..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-12 h-12 border-green-200 focus:border-green-400 focus:ring-green-400"
              />
            </div>
            <Button variant="outline" className="h-12 border-green-300 text-green-700 hover:bg-green-50">
              <Filter className="h-4 w-4 mr-2" />
              Filter Orders
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Statistics with green theme */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="border-green-200 shadow-sm hover:shadow-md transition-shadow">
          <CardContent className="p-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-green-600">{salesOrders.length}</div>
              <div className="text-sm text-stone-600 font-medium">Total Orders</div>
            </div>
          </CardContent>
        </Card>
        <Card className="border-green-200 shadow-sm hover:shadow-md transition-shadow">
          <CardContent className="p-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-emerald-600">
                {salesOrders.filter(o => o.approvalStatus === 'approved').length}
              </div>
              <div className="text-sm text-stone-600 font-medium">Approved Orders</div>
            </div>
          </CardContent>
        </Card>
        <Card className="border-green-200 shadow-sm hover:shadow-md transition-shadow">
          <CardContent className="p-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-teal-600">
                {salesOrders.filter(o => o.shippingStatus === 'shipped' || o.shippingStatus === 'delivered').length}
              </div>
              <div className="text-sm text-stone-600 font-medium">Shipped Orders</div>
            </div>
          </CardContent>
        </Card>
        <Card className="border-green-200 shadow-sm hover:shadow-md transition-shadow">
          <CardContent className="p-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-green-700">
                {formatCurrency(salesOrders.reduce((sum, order) => sum + order.amount, 0))}
              </div>
              <div className="text-sm text-stone-600 font-medium">Total Revenue</div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Orders table with green styling */}
      <Card className="border-green-200 shadow-sm">
        <CardHeader className="bg-gradient-to-r from-green-100 to-emerald-100 border-b border-green-200">
          <CardTitle className="text-green-800 text-xl">Active Sales Orders</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="border-green-200">
                  <TableHead className="font-semibold text-green-700">Order #</TableHead>
                  <TableHead className="font-semibold text-green-700">Customer</TableHead>
                  <TableHead className="font-semibold text-green-700">Amount</TableHead>
                  <TableHead className="font-semibold text-green-700">Sales Rep</TableHead>
                  <TableHead className="font-semibold text-green-700">Status</TableHead>
                  <TableHead className="font-semibold text-green-700">Date</TableHead>
                  <TableHead className="text-right font-semibold text-green-700">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredOrders.map((order, index) => (
                  <TableRow key={order.id} className={`border-green-100 hover:bg-green-25 ${index % 2 === 0 ? 'bg-white' : 'bg-green-25'}`}>
                    <TableCell className="font-medium text-green-700">
                      {order.orderNumber}
                    </TableCell>
                    <TableCell className="font-medium text-stone-800">{order.customer}</TableCell>
                    <TableCell className="font-bold text-green-700">
                      {formatCurrency(order.amount)}
                    </TableCell>
                    <TableCell className="text-stone-700">{order.salesperson}</TableCell>
                    <TableCell>
                      <div className="flex flex-col gap-2">
                        <div className="flex gap-1">
                          {getStatusBadge(order.approvalStatus, 'approval')}
                          {getStatusBadge(order.shippingStatus, 'shipping')}
                        </div>
                        <div className="flex gap-1">
                          {getStatusBadge(order.invoiceStatus, 'invoice')}
                          {getStatusBadge(order.paymentStatus, 'payment')}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="text-stone-600">{order.orderDate}</TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end space-x-2">
                        <Button variant="ghost" size="sm" className="text-green-600 hover:text-green-800 hover:bg-green-50">
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm" className="text-blue-600 hover:text-blue-800 hover:bg-blue-50">
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm" className="text-red-600 hover:text-red-800 hover:bg-red-50">
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
