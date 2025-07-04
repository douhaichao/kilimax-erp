import React from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  MoreHorizontal, 
  ArrowRight,
  Eye,
  Edit,
  Trash2,
  Send,
  Truck,
  UserCheck,
  UserX,
  CheckCircle
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
import TransferOrderStatusBadge from './TransferOrderStatusBadge';

interface TransferOrderTableProps {
  orders: TransferOrder[];
  onOrderSelect: (order: TransferOrder) => void;
  onOrderEdit: (order: TransferOrder) => void;
  onOrderDelete: (orderId: string) => void;
  onQuickStatusChange: (order: TransferOrder, newStatus: TransferOrderStatus) => void;
}

const TransferOrderTable = ({ 
  orders, 
  onOrderSelect, 
  onOrderEdit, 
  onOrderDelete, 
  onQuickStatusChange 
}: TransferOrderTableProps) => {
  const getQuickActions = (order: TransferOrder) => {
    const actions = [];

    switch (order.status) {
      case 'draft':
        actions.push(
          <DropdownMenuItem key="submit" onClick={() => onQuickStatusChange(order, 'submitted')}>
            <Send className="mr-2 h-4 w-4" />
            Submit for Approval
          </DropdownMenuItem>
        );
        break;
      case 'submitted':
        actions.push(
          <DropdownMenuItem key="approve" onClick={() => onQuickStatusChange(order, 'approved')}>
            <UserCheck className="mr-2 h-4 w-4" />
            Approve
          </DropdownMenuItem>
        );
        actions.push(
          <DropdownMenuItem key="reject" onClick={() => onQuickStatusChange(order, 'rejected')}>
            <UserX className="mr-2 h-4 w-4" />
            Reject
          </DropdownMenuItem>
        );
        break;
      case 'approved':
        actions.push(
          <DropdownMenuItem key="ship" onClick={() => onQuickStatusChange(order, 'in_transit')}>
            <Truck className="mr-2 h-4 w-4" />
            Mark as Shipped
          </DropdownMenuItem>
        );
        break;
      case 'in_transit':
        actions.push(
          <DropdownMenuItem key="receive" onClick={() => onQuickStatusChange(order, 'completed')}>
            <CheckCircle className="mr-2 h-4 w-4" />
            Mark as Received
          </DropdownMenuItem>
        );
        break;
    }

    return actions;
  };

  return (
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
            {orders.map((order) => (
              <TableRow key={order.id} className="cursor-pointer hover:bg-gray-50">
                <TableCell className="font-medium">{order.transferNumber}</TableCell>
                <TableCell>
                  <div className="flex items-center space-x-2">
                    <span className="text-sm">{order.fromLocationName}</span>
                    <ArrowRight className="h-3 w-3 text-gray-400" />
                    <span className="text-sm">{order.toLocationName}</span>
                  </div>
                </TableCell>
                <TableCell>
                  <TransferOrderStatusBadge status={order.status} order={order} />
                </TableCell>
                <TableCell>{order.totalQuantity} items</TableCell>
                <TableCell>${order.estimatedValue.toFixed(2)}</TableCell>
                <TableCell>{new Date(order.requestedDate).toLocaleDateString()}</TableCell>
                <TableCell>
                  <div className="flex space-x-2">
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
                        {getQuickActions(order)}
                        <DropdownMenuItem onClick={() => onOrderDelete(order.id)}>
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
  );
};

export default TransferOrderTable;