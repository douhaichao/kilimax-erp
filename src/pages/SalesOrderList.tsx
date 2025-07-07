import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Search, Filter, Plus, Eye, Edit, Trash2 } from 'lucide-react';
import SalesOrderForm from '@/components/sales/SalesOrderForm';

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
  const [salesOrders, setSalesOrders] = useState<SalesOrder[]>([]);
  const [currentView, setCurrentView] = useState<'list' | 'detail' | 'create' | 'edit'>('list');
  const [selectedOrder, setSelectedOrder] = useState<SalesOrder | null>(null);
  const [searchTerm, setSearchTerm] = useState('');

  // Sample sales order data with African companies
  const mockSalesOrders: SalesOrder[] = [
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

  useEffect(() => {
    setSalesOrders(mockSalesOrders);
  }, []);

  const handleOrderSelect = (order: SalesOrder) => {
    setSelectedOrder(order);
    setCurrentView('detail');
  };

  const handleOrderUpdate = (updatedOrder: SalesOrder) => {
    setSalesOrders(orders => 
      orders.map(order => order.id === updatedOrder.id ? updatedOrder : order)
    );
    setSelectedOrder(updatedOrder);
  };

  const handleOrderDelete = (orderId: string) => {
    setSalesOrders(orders => orders.filter(order => order.id !== orderId));
    setCurrentView('list');
  };

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

  if (currentView === 'detail' && selectedOrder) {
    return (
      <div>Sales Order Detail View - To be implemented</div>
    );
  }

  if (currentView === 'create' || currentView === 'edit') {
    return (
      <SalesOrderForm
        order={currentView === 'edit' ? selectedOrder : undefined}
        onSave={(order) => {
          if (currentView === 'edit' && selectedOrder) {
            handleOrderUpdate(order);
          } else {
            setSalesOrders([...salesOrders, order]);
          }
          setCurrentView('list');
        }}
        onCancel={() => setCurrentView('list')}
      />
    );
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Sales Orders</h2>
          <p className="text-gray-600">Manage and track sales orders</p>
        </div>
        <Button onClick={() => setCurrentView('create')}>
          <Plus className="mr-2 h-4 w-4" />
          New Sales Order
        </Button>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="shadow-sm hover:shadow-md transition-shadow">
          <CardContent className="p-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-primary">{salesOrders.length}</div>
              <div className="text-sm text-muted-foreground font-medium">Total Orders</div>
            </div>
          </CardContent>
        </Card>
        <Card className="shadow-sm hover:shadow-md transition-shadow">
          <CardContent className="p-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-primary">
                {salesOrders.filter(o => o.approvalStatus === 'approved').length}
              </div>
              <div className="text-sm text-muted-foreground font-medium">Approved Orders</div>
            </div>
          </CardContent>
        </Card>
        <Card className="shadow-sm hover:shadow-md transition-shadow">
          <CardContent className="p-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-primary">
                {salesOrders.filter(o => o.shippingStatus === 'shipped' || o.shippingStatus === 'delivered').length}
              </div>
              <div className="text-sm text-muted-foreground font-medium">Shipped Orders</div>
            </div>
          </CardContent>
        </Card>
        <Card className="shadow-sm hover:shadow-md transition-shadow">
          <CardContent className="p-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-primary">
                {formatCurrency(salesOrders.reduce((sum, order) => sum + order.amount, 0))}
              </div>
              <div className="text-sm text-muted-foreground font-medium">Total Revenue</div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Search and Filter */}
      <div className="flex space-x-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
          <Input
            placeholder="Search sales orders..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <Button variant="outline">
          <Filter className="mr-2 h-4 w-4" />
          Filter
        </Button>
      </div>


      {/* Sales Orders Table */}
      <Card>
        <CardHeader>
          <CardTitle>Sales Orders</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Order #</TableHead>
                  <TableHead>Customer</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Sales Rep</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredOrders.map((order) => (
                  <TableRow key={order.id} className="hover:bg-muted/50">
                    <TableCell className="font-medium">
                      {order.orderNumber}
                    </TableCell>
                    <TableCell className="font-medium">{order.customer}</TableCell>
                    <TableCell className="font-bold">
                      {formatCurrency(order.amount)}
                    </TableCell>
                    <TableCell>{order.salesperson}</TableCell>
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
                    <TableCell className="text-muted-foreground">{order.orderDate}</TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end space-x-2">
                        <Button variant="ghost" size="sm" onClick={() => handleOrderSelect(order)}>
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm" onClick={() => {
                          setSelectedOrder(order);
                          setCurrentView('edit');
                        }}>
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm" onClick={() => handleOrderDelete(order.id)}>
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
