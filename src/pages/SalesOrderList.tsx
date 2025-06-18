
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

const SalesOrderList = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedOrders, setSelectedOrders] = useState<string[]>([]);

  // 模拟销售订单数据
  const salesOrders: SalesOrder[] = [
    {
      id: '1',
      orderNumber: 'SO-2024-001',
      customer: 'Acme Corporation',
      amount: 15600,
      salesperson: '张三',
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
      salesperson: '李四',
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
      salesperson: '王五',
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
      salesperson: '赵六',
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
      salesperson: '张三',
      approvalStatus: 'approved',
      shippingStatus: 'delivered',
      invoiceStatus: 'paid',
      paymentStatus: 'paid',
      orderDate: '2024-01-19'
    }
  ];

  const getStatusBadge = (status: string, type: 'approval' | 'shipping' | 'invoice' | 'payment') => {
    const statusConfig = {
      approval: {
        pending: { label: '待审批', variant: 'outline' as const, className: 'text-yellow-600 border-yellow-300' },
        approved: { label: '已审批', variant: 'default' as const, className: 'bg-green-500' },
        rejected: { label: '已拒绝', variant: 'destructive' as const, className: '' }
      },
      shipping: {
        not_shipped: { label: '未发货', variant: 'outline' as const, className: 'text-gray-600' },
        preparing: { label: '备货中', variant: 'outline' as const, className: 'text-blue-600 border-blue-300' },
        shipped: { label: '已发货', variant: 'default' as const, className: 'bg-blue-500' },
        delivered: { label: '已送达', variant: 'default' as const, className: 'bg-green-500' }
      },
      invoice: {
        not_invoiced: { label: '未开票', variant: 'outline' as const, className: 'text-gray-600' },
        invoiced: { label: '已开票', variant: 'default' as const, className: 'bg-purple-500' },
        paid: { label: '已付款', variant: 'default' as const, className: 'bg-green-500' }
      },
      payment: {
        unpaid: { label: '未付款', variant: 'outline' as const, className: 'text-red-600 border-red-300' },
        partial: { label: '部分付款', variant: 'outline' as const, className: 'text-orange-600 border-orange-300' },
        paid: { label: '已付款', variant: 'default' as const, className: 'bg-green-500' }
      }
    };

    const config = statusConfig[type][status as keyof typeof statusConfig[typeof type]];
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
      {/* 页面标题和操作按钮 */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">销售订单</h1>
          <p className="text-gray-600 mt-1">管理和跟踪所有销售订单</p>
        </div>
        <div className="flex space-x-3">
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />
            导出
          </Button>
          <Button className="bg-blue-600 hover:bg-blue-700">
            <Plus className="h-4 w-4 mr-2" />
            新建订单
          </Button>
        </div>
      </div>

      {/* 搜索和筛选 */}
      <Card>
        <CardContent className="p-4">
          <div className="flex space-x-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
              <Input
                placeholder="搜索订单号、客户或业务员..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Button variant="outline">
              <Filter className="h-4 w-4 mr-2" />
              筛选
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* 订单统计 */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">{salesOrders.length}</div>
              <div className="text-sm text-gray-500">总订单数</div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">
                {salesOrders.filter(o => o.approvalStatus === 'approved').length}
              </div>
              <div className="text-sm text-gray-500">已审批</div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-orange-600">
                {salesOrders.filter(o => o.shippingStatus === 'shipped' || o.shippingStatus === 'delivered').length}
              </div>
              <div className="text-sm text-gray-500">已发货</div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-600">
                {formatCurrency(salesOrders.reduce((sum, order) => sum + order.amount, 0))}
              </div>
              <div className="text-sm text-gray-500">总金额</div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* 订单列表 */}
      <Card>
        <CardHeader>
          <CardTitle>订单列表</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>订单号</TableHead>
                  <TableHead>客户</TableHead>
                  <TableHead>金额</TableHead>
                  <TableHead>业务员</TableHead>
                  <TableHead>状态</TableHead>
                  <TableHead>订单日期</TableHead>
                  <TableHead className="text-right">操作</TableHead>
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
