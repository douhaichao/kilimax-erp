import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Search, 
  Plus, 
  Filter, 
  MoreHorizontal, 
  ArrowRight,
  Package,
  Clock,
  CheckCircle,
  XCircle,
  Eye,
  Edit,
  Trash2,
  Send,
  Truck
} from 'lucide-react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { TransferOrder, TransferOrderStatus } from '@/types/transferOrder';
import TransferOrderDetail from '@/components/transfer/TransferOrderDetail';
import TransferOrderForm from '@/components/transfer/TransferOrderForm';

const TransferOrderList = () => {
  const [transferOrders, setTransferOrders] = useState<TransferOrder[]>([]);
  const [currentView, setCurrentView] = useState<'list' | 'detail' | 'create' | 'edit'>('list');
  const [selectedOrder, setSelectedOrder] = useState<TransferOrder | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  const mockTransferOrders: TransferOrder[] = [
    {
      id: '1',
      transferNumber: 'TRF-2024-001',
      fromLocationId: 'loc-1',
      fromLocationName: 'Main Warehouse',
      toLocationId: 'loc-2',
      toLocationName: 'Store A',
      status: 'pending',
      items: [
        {
          id: '1',
          productId: 'prod-1',
          productName: 'Wireless Headphones',
          productSku: 'WH-001',
          uom: 'piece',
          requestedQuantity: 10,
          unitCost: 150,
          totalCost: 1500
        }
      ],
      requestedBy: 'John Doe',
      requestedDate: '2024-01-15',
      totalQuantity: 10,
      estimatedValue: 1500,
      createdAt: '2024-01-15T10:00:00Z',
      updatedAt: '2024-01-15T10:00:00Z'
    },
    {
      id: '2',
      transferNumber: 'TRF-2024-002',
      fromLocationId: 'loc-2',
      fromLocationName: 'Store A',
      toLocationId: 'loc-3',
      toLocationName: 'Store B',
      status: 'in_transit',
      items: [
        {
          id: '2',
          productId: 'prod-2',
          productName: 'Office Chair',
          productSku: 'OC-002',
          uom: 'piece',
          requestedQuantity: 5,
          shippedQuantity: 5,
          unitCost: 180,
          totalCost: 900
        }
      ],
      requestedBy: 'Jane Smith',
      requestedDate: '2024-01-14',
      approvedBy: 'Manager',
      approvedDate: '2024-01-14',
      shippedDate: '2024-01-15',
      totalQuantity: 5,
      estimatedValue: 900,
      createdAt: '2024-01-14T09:00:00Z',
      updatedAt: '2024-01-15T11:00:00Z'
    },
    {
      id: '3',
      transferNumber: 'TRF-2024-003',
      fromLocationId: 'loc-1',
      fromLocationName: 'Main Warehouse',
      toLocationId: 'loc-4',
      toLocationName: 'Store C',
      status: 'completed',
      items: [
        {
          id: '3',
          productId: 'prod-3',
          productName: 'Water Bottle',
          productSku: 'WB-003',
          uom: 'piece',
          requestedQuantity: 20,
          shippedQuantity: 20,
          receivedQuantity: 20,
          unitCost: 12.75,
          totalCost: 255
        }
      ],
      requestedBy: 'Mike Johnson',
      requestedDate: '2024-01-10',
      approvedBy: 'Manager',
      approvedDate: '2024-01-10',
      shippedDate: '2024-01-11',
      receivedDate: '2024-01-12',
      totalQuantity: 20,
      estimatedValue: 255,
      createdAt: '2024-01-10T08:00:00Z',
      updatedAt: '2024-01-12T16:00:00Z'
    }
  ];

  useEffect(() => {
    setTransferOrders(mockTransferOrders);
  }, []);

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

  const handleOrderSelect = (order: TransferOrder) => {
    setSelectedOrder(order);
    setCurrentView('detail');
  };

  const handleOrderUpdate = (updatedOrder: TransferOrder) => {
    setTransferOrders(orders => 
      orders.map(order => order.id === updatedOrder.id ? updatedOrder : order)
    );
    setSelectedOrder(updatedOrder);
  };

  const handleOrderDelete = (orderId: string) => {
    setTransferOrders(orders => orders.filter(order => order.id !== orderId));
    setCurrentView('list');
  };

  const handleQuickStatusChange = (order: TransferOrder, newStatus: TransferOrderStatus) => {
    const updatedOrder = {
      ...order,
      status: newStatus,
      updatedAt: new Date().toISOString()
    };

    // Add appropriate dates based on status change
    switch (newStatus) {
      case 'pending':
        updatedOrder.approvedDate = new Date().toISOString();
        updatedOrder.approvedBy = 'Current User';
        break;
      case 'in_transit':
        updatedOrder.shippedDate = new Date().toISOString();
        updatedOrder.items = order.items.map(item => ({
          ...item,
          shippedQuantity: item.requestedQuantity
        }));
        break;
      case 'completed':
        updatedOrder.receivedDate = new Date().toISOString();
        updatedOrder.items = order.items.map(item => ({
          ...item,
          receivedQuantity: item.shippedQuantity || item.requestedQuantity
        }));
        break;
    }

    handleOrderUpdate(updatedOrder);
  };

  const getQuickActions = (order: TransferOrder) => {
    const actions = [];

    switch (order.status) {
      case 'draft':
        actions.push(
          <DropdownMenuItem key="submit" onClick={() => handleQuickStatusChange(order, 'pending')}>
            <Send className="mr-2 h-4 w-4" />
            Submit for Approval
          </DropdownMenuItem>
        );
        break;
      case 'pending':
        actions.push(
          <DropdownMenuItem key="ship" onClick={() => handleQuickStatusChange(order, 'in_transit')}>
            <Truck className="mr-2 h-4 w-4" />
            Mark as Shipped
          </DropdownMenuItem>
        );
        actions.push(
          <DropdownMenuItem key="cancel" onClick={() => handleQuickStatusChange(order, 'cancelled')}>
            <XCircle className="mr-2 h-4 w-4" />
            Cancel
          </DropdownMenuItem>
        );
        break;
      case 'in_transit':
        actions.push(
          <DropdownMenuItem key="receive" onClick={() => handleQuickStatusChange(order, 'completed')}>
            <CheckCircle className="mr-2 h-4 w-4" />
            Mark as Received
          </DropdownMenuItem>
        );
        break;
    }

    return actions;
  };

  const filteredOrders = transferOrders.filter(order =>
    order.transferNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
    order.fromLocationName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    order.toLocationName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (currentView === 'detail' && selectedOrder) {
    return (
      <TransferOrderDetail
        order={selectedOrder}
        onUpdate={handleOrderUpdate}
        onDelete={handleOrderDelete}
        onBack={() => setCurrentView('list')}
        onEdit={() => setCurrentView('edit')}
      />
    );
  }

  if (currentView === 'create' || currentView === 'edit') {
    return (
      <TransferOrderForm
        order={currentView === 'edit' ? selectedOrder : undefined}
        onSave={(order) => {
          if (currentView === 'edit' && selectedOrder) {
            handleOrderUpdate(order);
          } else {
            setTransferOrders([...transferOrders, order]);
          }
          setCurrentView('list');
        }}
        onCancel={() => setCurrentView('list')}
      />
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Transfer Orders</h2>
          <p className="text-gray-600">Manage inventory transfers between locations</p>
        </div>
        <Button onClick={() => setCurrentView('create')}>
          <Plus className="mr-2 h-4 w-4" />
          New Transfer Order
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="flex items-center space-x-4 p-4">
            <div className="rounded-full bg-blue-100 p-2">
              <Package className="h-5 w-5 text-blue-600" />
            </div>
            <div>
              <CardTitle className="text-sm font-medium text-gray-600">Total Orders</CardTitle>
              <span className="text-2xl font-bold">{transferOrders.length}</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="flex items-center space-x-4 p-4">
            <div className="rounded-full bg-yellow-100 p-2">
              <Clock className="h-5 w-5 text-yellow-600" />
            </div>
            <div>
              <CardTitle className="text-sm font-medium text-gray-600">Pending</CardTitle>
              <span className="text-2xl font-bold">
                {transferOrders.filter(order => order.status === 'pending').length}
              </span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="flex items-center space-x-4 p-4">
            <div className="rounded-full bg-blue-100 p-2">
              <ArrowRight className="h-5 w-5 text-blue-600" />
            </div>
            <div>
              <CardTitle className="text-sm font-medium text-gray-600">In Transit</CardTitle>
              <span className="text-2xl font-bold">
                {transferOrders.filter(order => order.status === 'in_transit').length}
              </span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="flex items-center space-x-4 p-4">
            <div className="rounded-full bg-green-100 p-2">
              <CheckCircle className="h-5 w-5 text-green-600" />
            </div>
            <div>
              <CardTitle className="text-sm font-medium text-gray-600">Completed</CardTitle>
              <span className="text-2xl font-bold">
                {transferOrders.filter(order => order.status === 'completed').length}
              </span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Search and Filter */}
      <div className="flex space-x-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
          <Input
            placeholder="Search transfer orders..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
        <Button variant="outline">
          <Filter className="mr-2 h-4 w-4" />
          Filter
        </Button>
      </div>

      {/* Transfer Orders Table */}
      <Card>
        <CardHeader>
          <CardTitle>Transfer Orders</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Transfer #</TableHead>
                <TableHead>From → To</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Items</TableHead>
                <TableHead>Estimated Value</TableHead>
                <TableHead>Requested Date</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredOrders.map((order) => (
                <TableRow key={order.id} className="cursor-pointer hover:bg-gray-50">
                  <TableCell className="font-medium">{order.transferNumber}</TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      <span className="text-sm">{order.fromLocationName}</span>
                      <ArrowRight className="h-3 w-3 text-gray-400" />
                      <span className="text-sm">{order.toLocationName}</span>
                    </div>
                  </TableCell>
                  <TableCell>{getStatusBadge(order.status)}</TableCell>
                  <TableCell>{order.totalQuantity} items</TableCell>
                  <TableCell>${order.estimatedValue.toFixed(2)}</TableCell>
                  <TableCell>{new Date(order.requestedDate).toLocaleDateString()}</TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleOrderSelect(order)}
                      >
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => {
                          setSelectedOrder(order);
                          setCurrentView('edit');
                        }}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          {getQuickActions(order)}
                          <DropdownMenuItem onClick={() => handleOrderDelete(order.id)}>
                            <Trash2 className="mr-2 h-4 w-4" />
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default TransferOrderList;
