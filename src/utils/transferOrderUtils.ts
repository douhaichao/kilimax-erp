import { TransferOrder } from '@/types/transferOrder';

export const hasReceivingDiscrepancy = (order: TransferOrder) => {
  if (order.status !== 'completed') return false;
  return order.items.some(item => {
    const shippedQty = item.shippedQuantity || item.requestedQuantity;
    const receivedQty = item.receivedQuantity || 0;
    return receivedQty !== shippedQty;
  });
};