import React from 'react';
import { Badge } from "@/components/ui/badge";

interface QuotationStatusBadgeProps {
  status: 'draft' | 'sent' | 'accepted' | 'rejected' | 'expired';
}

const QuotationStatusBadge = ({ status }: QuotationStatusBadgeProps) => {
  const getStatusConfig = (status: string) => {
    const configs = {
      draft: {
        label: 'Draft',
        className: 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200'
      },
      sent: {
        label: 'Sent',
        className: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200'
      },
      accepted: {
        label: 'Accepted',
        className: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
      },
      rejected: {
        label: 'Rejected',
        className: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
      },
      expired: {
        label: 'Expired',
        className: 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200'
      }
    };

    return configs[status as keyof typeof configs] || configs.draft;
  };

  const config = getStatusConfig(status);

  return (
    <Badge className={`text-xs font-medium ${config.className}`}>
      {config.label}
    </Badge>
  );
};

export default QuotationStatusBadge;