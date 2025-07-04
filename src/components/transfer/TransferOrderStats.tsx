import React from 'react';
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { 
  Package,
  Send,
  UserCheck,
  ArrowRight,
  CheckCircle
} from 'lucide-react';
import { TransferOrder } from '@/types/transferOrder';

interface TransferOrderStatsProps {
  transferOrders: TransferOrder[];
}

const TransferOrderStats = ({ transferOrders }: TransferOrderStatsProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
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
          <div className="rounded-full bg-blue-100 p-2">
            <Send className="h-5 w-5 text-blue-600" />
          </div>
          <div>
            <CardTitle className="text-sm font-medium text-gray-600">Submitted</CardTitle>
            <span className="text-2xl font-bold">
              {transferOrders.filter(order => order.status === 'submitted').length}
            </span>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="flex items-center space-x-4 p-4">
          <div className="rounded-full bg-purple-100 p-2">
            <UserCheck className="h-5 w-5 text-purple-600" />
          </div>
          <div>
            <CardTitle className="text-sm font-medium text-gray-600">Approved</CardTitle>
            <span className="text-2xl font-bold">
              {transferOrders.filter(order => order.status === 'approved').length}
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
  );
};

export default TransferOrderStats;