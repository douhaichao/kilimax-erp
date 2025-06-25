
export interface TransferOrder {
  id: string;
  transferNumber: string;
  fromLocationId: string;
  fromLocationName: string;
  toLocationId: string;
  toLocationName: string;
  status: 'draft' | 'submitted' | 'approved' | 'rejected' | 'in_transit' | 'completed';
  items: TransferOrderItem[];
  requestedBy: string;
  requestedDate: string;
  submittedBy?: string;
  submittedDate?: string;
  approvedBy?: string;
  approvedDate?: string;
  rejectedBy?: string;
  rejectedDate?: string;
  rejectionReason?: string;
  shippedDate?: string;
  receivedDate?: string;
  notes?: string;
  totalQuantity: number;
  estimatedValue: number;
  createdAt: string;
  updatedAt: string;
}

export interface TransferOrderItem {
  id: string;
  productId: string;
  productName: string;
  productSku: string;
  uom: string;
  requestedQuantity: number;
  shippedQuantity?: number;
  receivedQuantity?: number;
  serialNumbers?: string[];
  unitCost: number;
  totalCost: number;
  notes?: string;
}

export interface Location {
  id: string;
  name: string;
  code: string;
  type: 'warehouse' | 'store' | 'depot';
  address: string;
  isActive: boolean;
}

export type TransferOrderStatus = 'draft' | 'submitted' | 'approved' | 'rejected' | 'in_transit' | 'completed';
