import React from 'react';
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { 
  FileText,
  Clock,
  CheckCircle,
  Truck
} from 'lucide-react';
import { PurchaseOrder } from '@/types/purchaseOrder';

interface PurchaseOrderStatsProps {
  purchaseOrders: PurchaseOrder[];
}

const PurchaseOrderStats = ({ purchaseOrders }: PurchaseOrderStatsProps) => {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
      <Card className="shadow-sm hover:shadow-md transition-shadow">
        <CardContent className="flex items-center p-6">
          <FileText className="h-8 w-8 text-blue-600 mr-3" />
          <div>
            <CardTitle className="text-sm font-medium text-gray-600">Total Orders</CardTitle>
            <span className="text-2xl font-bold">{purchaseOrders.length}</span>
          </div>
        </CardContent>
      </Card>

      <Card className="shadow-sm hover:shadow-md transition-shadow">
        <CardContent className="flex items-center p-6">
          <Clock className="h-8 w-8 text-yellow-600 mr-3" />
          <div>
            <CardTitle className="text-sm font-medium text-gray-600">Pending Approval</CardTitle>
            <span className="text-2xl font-bold">
              {purchaseOrders.filter(order => order.status === 'submitted').length}
            </span>
          </div>
        </CardContent>
      </Card>

      <Card className="shadow-sm hover:shadow-md transition-shadow">
        <CardContent className="flex items-center p-6">
          <CheckCircle className="h-8 w-8 text-green-600 mr-3" />
          <div>
            <CardTitle className="text-sm font-medium text-gray-600">Approved</CardTitle>
            <span className="text-2xl font-bold">
              {purchaseOrders.filter(order => order.status === 'approved').length}
            </span>
          </div>
        </CardContent>
      </Card>

      <Card className="shadow-sm hover:shadow-md transition-shadow">
        <CardContent className="flex items-center p-6">
          <Truck className="h-8 w-8 text-purple-600 mr-3" />
          <div>
            <CardTitle className="text-sm font-medium text-gray-600">Total Value</CardTitle>
            <span className="text-2xl font-bold">
              {formatCurrency(purchaseOrders.reduce((sum, order) => sum + order.totalValue, 0))}
            </span>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PurchaseOrderStats;