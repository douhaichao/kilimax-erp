import React from 'react';
import { Badge } from "@/components/ui/badge";
import { AlertTriangle } from 'lucide-react';
import { PurchaseOrder, PurchaseOrderStatus } from '@/types/purchaseOrder';

interface PurchaseOrderStatusBadgeProps {
  status: PurchaseOrderStatus;
  order?: PurchaseOrder;
}

const PurchaseOrderStatusBadge = ({ status, order }: PurchaseOrderStatusBadgeProps) => {
  const statusConfig = {
    draft: { label: 'Draft', variant: 'outline' as const, className: 'text-gray-700 border-gray-400 bg-gray-50' },
    submitted: { label: 'Submitted', variant: 'outline' as const, className: 'text-blue-700 border-blue-400 bg-blue-50' },
    approved: { label: 'Approved', variant: 'default' as const, className: 'bg-green-600 text-white' },
    rejected: { label: 'Rejected', variant: 'destructive' as const, className: 'bg-red-600 text-white' },
    ordered: { label: 'Ordered', variant: 'default' as const, className: 'bg-purple-600 text-white' },
    partially_received: { label: 'Partially Received', variant: 'outline' as const, className: 'text-orange-700 border-orange-400 bg-orange-50' },
    completed: { label: 'Completed', variant: 'default' as const, className: 'bg-green-600 text-white' },
    cancelled: { label: 'Cancelled', variant: 'outline' as const, className: 'text-red-700 border-red-400 bg-red-50' }
  };

  const config = statusConfig[status];
  
  // Check for receiving discrepancies
  const hasDiscrepancy = order && order.items.some(item => 
    item.receivedQuantity !== undefined && 
    item.orderedQuantity !== undefined && 
    item.receivedQuantity !== item.orderedQuantity
  );

  return (
    <div className="flex items-center gap-2">
      <Badge variant={config.variant} className={`text-xs font-medium ${config.className}`}>
        {config.label}
      </Badge>
      {hasDiscrepancy && (
        <AlertTriangle className="h-4 w-4 text-amber-500" />
      )}
    </div>
  );
};

export default PurchaseOrderStatusBadge;