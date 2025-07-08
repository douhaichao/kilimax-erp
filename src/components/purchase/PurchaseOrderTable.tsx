import React from 'react';
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
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
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Eye, Edit, Trash2, MoreHorizontal, CheckCircle, XCircle, Send } from 'lucide-react';
import { PurchaseOrder, PurchaseOrderStatus } from '@/types/purchaseOrder';
import PurchaseOrderStatusBadge from './PurchaseOrderStatusBadge';

interface PurchaseOrderTableProps {
  orders: PurchaseOrder[];
  onOrderSelect: (order: PurchaseOrder) => void;
  onOrderEdit: (order: PurchaseOrder) => void;
  onOrderDelete: (orderId: string) => void;
  onQuickStatusChange: (order: PurchaseOrder, newStatus: PurchaseOrderStatus) => void;
  selectedOrders: string[];
  onSelectOrder: (orderId: string, checked: boolean) => void;
  onSelectAll: (checked: boolean) => void;
}

const PurchaseOrderTable = ({ 
  orders, 
  onOrderSelect, 
  onOrderEdit, 
  onOrderDelete, 
  onQuickStatusChange,
  selectedOrders,
  onSelectOrder,
  onSelectAll
}: PurchaseOrderTableProps) => {
  
  const getQuickActions = (order: PurchaseOrder) => {
    const actions = [];
    
    switch (order.status) {
      case 'draft':
        actions.push({ label: 'Submit', icon: Send, action: () => onQuickStatusChange(order, 'submitted') });
        break;
      case 'submitted':
        actions.push(
          { label: 'Approve', icon: CheckCircle, action: () => onQuickStatusChange(order, 'approved') },
          { label: 'Reject', icon: XCircle, action: () => onQuickStatusChange(order, 'rejected') }
        );
        break;
      case 'approved':
        actions.push({ label: 'Order', icon: Send, action: () => onQuickStatusChange(order, 'ordered') });
        break;
    }
    
    return actions;
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  };

  return (
    <Card>
      <CardContent className="p-0">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-12">
                  <Checkbox
                    checked={selectedOrders.length === orders.length && orders.length > 0}
                    onCheckedChange={onSelectAll}
                  />
                </TableHead>
                <TableHead>Order Number</TableHead>
                <TableHead>Supplier</TableHead>
                <TableHead>Total Value</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Requested Date</TableHead>
                <TableHead>Expected Delivery</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {orders.map((order) => (
                <TableRow key={order.id} className="hover:bg-muted/50">
                  <TableCell>
                    <Checkbox
                      checked={selectedOrders.includes(order.id)}
                      onCheckedChange={(checked) => onSelectOrder(order.id, !!checked)}
                    />
                  </TableCell>
                  <TableCell className="font-medium">
                    {order.orderNumber}
                  </TableCell>
                  <TableCell>
                    <div>
                      <div className="font-medium">{order.supplierName}</div>
                      {order.supplierEmail && (
                        <div className="text-sm text-muted-foreground">{order.supplierEmail}</div>
                      )}
                    </div>
                  </TableCell>
                  <TableCell className="font-bold">
                    {formatCurrency(order.totalValue)}
                  </TableCell>
                  <TableCell>
                    <PurchaseOrderStatusBadge status={order.status} order={order} />
                  </TableCell>
                  <TableCell className="text-muted-foreground">
                    {new Date(order.requestedDate).toLocaleDateString()}
                  </TableCell>
                  <TableCell className="text-muted-foreground">
                    {order.expectedDeliveryDate 
                      ? new Date(order.expectedDeliveryDate).toLocaleDateString()
                      : '-'
                    }
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end space-x-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => onOrderSelect(order)}
                      >
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => onOrderEdit(order)}
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
                          <DropdownMenuLabel>Quick Actions</DropdownMenuLabel>
                          <DropdownMenuSeparator />
                          {getQuickActions(order).map((action, index) => {
                            const Icon = action.icon;
                            return (
                              <DropdownMenuItem key={index} onClick={action.action}>
                                <Icon className="mr-2 h-4 w-4" />
                                {action.label}
                              </DropdownMenuItem>
                            );
                          })}
                          <DropdownMenuSeparator />
                          <DropdownMenuItem 
                            onClick={() => onOrderDelete(order.id)}
                            className="text-red-600"
                          >
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
        </div>
      </CardContent>
    </Card>
  );
};

export default PurchaseOrderTable;