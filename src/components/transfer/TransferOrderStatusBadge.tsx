import React from 'react';
import { Badge } from "@/components/ui/badge";
import { AlertTriangle } from 'lucide-react';
import { TransferOrder, TransferOrderStatus } from '@/types/transferOrder';
import { hasReceivingDiscrepancy } from '@/utils/transferOrderUtils';

interface TransferOrderStatusBadgeProps {
  status: TransferOrderStatus;
  order?: TransferOrder;
}

const TransferOrderStatusBadge = ({ status, order }: TransferOrderStatusBadgeProps) => {
  const statusConfig = {
    draft: { label: 'Draft', className: 'bg-gray-100 text-gray-800' },
    submitted: { label: 'Submitted', className: 'bg-blue-100 text-blue-800' },
    approved: { label: 'Approved', className: 'bg-purple-100 text-purple-800' },
    rejected: { label: 'Rejected', className: 'bg-red-100 text-red-800' },
    in_transit: { label: 'In Transit', className: 'bg-blue-100 text-blue-800' },
    completed: { label: 'Completed', className: 'bg-green-100 text-green-800' }
  };

  const config = statusConfig[status];
  const hasDiscrepancy = order && hasReceivingDiscrepancy(order);

  if (status === 'completed' && hasDiscrepancy) {
    return (
      <div className="flex items-center space-x-2">
        <Badge className={config.className}>
          {config.label}
        </Badge>
        <div className="flex items-center space-x-1">
          <AlertTriangle className="h-4 w-4 text-yellow-500" />
          <span className="text-xs text-yellow-600 font-medium">差异</span>
        </div>
      </div>
    );
  }

  return (
    <Badge className={config.className}>
      {config.label}
    </Badge>
  );
};

export default TransferOrderStatusBadge;