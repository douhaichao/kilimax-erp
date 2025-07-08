import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Search, 
  Plus, 
  Filter,
  Download,
  Upload,
  Trash2,
  CheckCircle,
  XCircle,
  Printer
} from 'lucide-react';
import { Card, CardContent } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { PurchaseOrder, PurchaseOrderStatus } from '@/types/purchaseOrder';
import PurchaseOrderDetail from '@/components/purchase/PurchaseOrderDetail';
import PurchaseOrderForm from '@/components/purchase/PurchaseOrderForm';
import PurchaseOrderStats from '@/components/purchase/PurchaseOrderStats';
import PurchaseOrderTable from '@/components/purchase/PurchaseOrderTable';
import { mockPurchaseOrders } from '@/data/mockPurchaseOrders';

const PurchaseOrderList = () => {
  const [purchaseOrders, setPurchaseOrders] = useState<PurchaseOrder[]>([]);
  const [currentView, setCurrentView] = useState<'list' | 'detail' | 'create' | 'edit'>('list');
  const [selectedOrder, setSelectedOrder] = useState<PurchaseOrder | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedOrders, setSelectedOrders] = useState<string[]>([]);

  useEffect(() => {
    setPurchaseOrders(mockPurchaseOrders);
  }, []);

  const handleOrderSelect = (order: PurchaseOrder) => {
    setSelectedOrder(order);
    setCurrentView('detail');
  };

  const handleOrderUpdate = (updatedOrder: PurchaseOrder) => {
    setPurchaseOrders(orders => 
      orders.map(order => order.id === updatedOrder.id ? updatedOrder : order)
    );
    setSelectedOrder(updatedOrder);
  };

  const handleOrderDelete = (orderId: string) => {
    setPurchaseOrders(orders => orders.filter(order => order.id !== orderId));
    setCurrentView('list');
  };

  const handleQuickStatusChange = (order: PurchaseOrder, newStatus: PurchaseOrderStatus) => {
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
      case 'ordered':
        updatedOrder.orderedDate = new Date().toISOString();
        updatedOrder.items = order.items.map(item => ({
          ...item,
          orderedQuantity: item.requestedQuantity
        }));
        break;
    }

    handleOrderUpdate(updatedOrder);
  };

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedOrders(filteredOrders.map(order => order.id));
    } else {
      setSelectedOrders([]);
    }
  };

  const handleSelectOrder = (orderId: string, checked: boolean) => {
    if (checked) {
      setSelectedOrders(prev => [...prev, orderId]);
    } else {
      setSelectedOrders(prev => prev.filter(id => id !== orderId));
    }
  };

  const handleBatchDelete = () => {
    setPurchaseOrders(orders => orders.filter(order => !selectedOrders.includes(order.id)));
    setSelectedOrders([]);
  };

  const handleBatchApproval = (status: 'approved' | 'rejected') => {
    setPurchaseOrders(orders => 
      orders.map(order => 
        selectedOrders.includes(order.id) 
          ? { 
              ...order, 
              status: status as PurchaseOrderStatus,
              approvedBy: status === 'approved' ? 'Current User' : undefined,
              approvedDate: status === 'approved' ? new Date().toISOString() : undefined,
              rejectedBy: status === 'rejected' ? 'Current User' : undefined,
              rejectedDate: status === 'rejected' ? new Date().toISOString() : undefined,
              updatedAt: new Date().toISOString()
            } 
          : order
      )
    );
    setSelectedOrders([]);
  };

  const exportToCSV = () => {
    const headers = ['Order Number', 'Supplier', 'Total Value', 'Status', 'Requested Date', 'Expected Delivery'];
    const csvContent = [
      headers.join(','),
      ...purchaseOrders.map(order => [
        order.orderNumber,
        order.supplierName,
        order.totalValue,
        order.status,
        order.requestedDate,
        order.expectedDeliveryDate || ''
      ].join(','))
    ].join('\n');
    
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'purchase-orders.csv';
    a.click();
    window.URL.revokeObjectURL(url);
  };

  const handleImportCSV = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      const csv = e.target?.result as string;
      const lines = csv.split('\n');
      const headers = lines[0].split(',');
      
      const importedOrders = lines.slice(1).filter(line => line.trim()).map((line, index) => {
        const values = line.split(',');
        return {
          id: `imported-${Date.now()}-${index}`,
          orderNumber: values[0] || `PO-${new Date().getFullYear()}-${Math.floor(Math.random() * 1000).toString().padStart(3, '0')}`,
          supplierId: 'imported-supplier',
          supplierName: values[1] || 'Unknown Supplier',
          status: 'draft' as PurchaseOrderStatus,
          items: [],
          requestedBy: 'Imported User',
          requestedDate: new Date().toISOString().split('T')[0],
          totalQuantity: 0,
          totalValue: parseFloat(values[2]) || 0,
          currency: 'USD',
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        };
      });
      
      setPurchaseOrders(prev => [...prev, ...importedOrders]);
    };
    reader.readAsText(file);
    event.target.value = '';
  };

  const filteredOrders = purchaseOrders.filter(order =>
    order.orderNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
    order.supplierName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (currentView === 'detail' && selectedOrder) {
    return (
      <PurchaseOrderDetail
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
      <PurchaseOrderForm
        order={currentView === 'edit' ? selectedOrder : undefined}
        onSave={(order) => {
          if (currentView === 'edit' && selectedOrder) {
            handleOrderUpdate(order);
          } else {
            setPurchaseOrders([...purchaseOrders, order]);
          }
          setCurrentView('list');
        }}
        onCancel={() => setCurrentView('list')}
      />
    );
  }

  return (
    <div className="space-y-6">
      {/* Main Actions */}
      <div className="flex justify-end">
        <div className="flex space-x-2">
          <input 
            type="file" 
            accept=".csv" 
            onChange={handleImportCSV} 
            className="hidden" 
            id="csv-import" 
          />
          <Button 
            variant="outline" 
            onClick={() => document.getElementById('csv-import')?.click()}
          >
            <Upload className="mr-2 h-4 w-4" />
            Import CSV
          </Button>
          <Button variant="outline" onClick={exportToCSV}>
            <Download className="mr-2 h-4 w-4" />
            Export CSV
          </Button>
          <Button onClick={() => setCurrentView('create')}>
            <Plus className="mr-2 h-4 w-4" />
            New Purchase Order
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <PurchaseOrderStats purchaseOrders={purchaseOrders} />

      {/* Batch Operations */}
      {selectedOrders.length > 0 && (
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <Checkbox
                  checked={selectedOrders.length === filteredOrders.length && filteredOrders.length > 0}
                  onCheckedChange={handleSelectAll}
                />
                <span className="text-sm font-medium">
                  {selectedOrders.length} order(s) selected
                </span>
              </div>
              <div className="flex space-x-2">
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={() => handleBatchApproval('approved')}
                >
                  <CheckCircle className="mr-2 h-4 w-4" />
                  Approve Selected
                </Button>
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={() => handleBatchApproval('rejected')}
                >
                  <XCircle className="mr-2 h-4 w-4" />
                  Reject Selected
                </Button>
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={() => window.print()}
                >
                  <Printer className="mr-2 h-4 w-4" />
                  Print Selected
                </Button>
                <Button 
                  variant="destructive" 
                  size="sm" 
                  onClick={handleBatchDelete}
                >
                  <Trash2 className="mr-2 h-4 w-4" />
                  Delete Selected
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Search and Filter */}
      <div className="flex space-x-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
          <Input
            placeholder="Search purchase orders..."
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

      {/* Purchase Orders Table */}
      <PurchaseOrderTable
        orders={filteredOrders}
        onOrderSelect={handleOrderSelect}
        onOrderEdit={(order) => {
          setSelectedOrder(order);
          setCurrentView('edit');
        }}
        onOrderDelete={handleOrderDelete}
        onQuickStatusChange={handleQuickStatusChange}
        selectedOrders={selectedOrders}
        onSelectOrder={handleSelectOrder}
        onSelectAll={handleSelectAll}
      />
    </div>
  );
};

export default PurchaseOrderList;