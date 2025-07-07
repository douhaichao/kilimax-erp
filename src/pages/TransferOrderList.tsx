import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Search, 
  Plus, 
  Filter,
  Upload,
  Download,
  Printer
} from 'lucide-react';
import { TransferOrder, TransferOrderStatus } from '@/types/transferOrder';
import TransferOrderDetail from '@/components/transfer/TransferOrderDetail';
import TransferOrderForm from '@/components/transfer/TransferOrderForm';
import TransferOrderStats from '@/components/transfer/TransferOrderStats';
import TransferOrderTable from '@/components/transfer/TransferOrderTable';
import { mockTransferOrders } from '@/data/mockTransferOrders';

const TransferOrderList = () => {
  const [transferOrders, setTransferOrders] = useState<TransferOrder[]>([]);
  const [currentView, setCurrentView] = useState<'list' | 'detail' | 'create' | 'edit'>('list');
  const [selectedOrder, setSelectedOrder] = useState<TransferOrder | null>(null);
  const [searchQuery, setSearchQuery] = useState('');


  useEffect(() => {
    setTransferOrders(mockTransferOrders);
  }, []);


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
      {/* Action Buttons */}
      <div className="flex justify-between items-center">
        <div className="flex gap-2">
          {/* Batch operations would go here */}
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Upload className="mr-2 h-4 w-4" />
            Import
          </Button>
          <Button variant="outline">
            <Download className="mr-2 h-4 w-4" />
            Export
          </Button>
          <Button variant="outline">
            <Printer className="mr-2 h-4 w-4" />
            Print
          </Button>
          <Button onClick={() => setCurrentView('create')}>
            <Plus className="mr-2 h-4 w-4" />
            New Transfer Order
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <TransferOrderStats transferOrders={transferOrders} />

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
      <TransferOrderTable
        orders={filteredOrders}
        onOrderSelect={handleOrderSelect}
        onOrderEdit={(order) => {
          setSelectedOrder(order);
          setCurrentView('edit');
        }}
        onOrderDelete={handleOrderDelete}
        onQuickStatusChange={handleQuickStatusChange}
      />
    </div>
  );
};

export default TransferOrderList;
