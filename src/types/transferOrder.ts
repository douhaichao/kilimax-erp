
export interface TransferOrder {
  id: string;
  transferNumber: string;
  fromLocationId: string;
  fromLocationName: string;
  toLocationId: string;
  toLocationName: string;
  status: 'draft' | 'pending' | 'in_transit' | 'completed' | 'cancelled';
  items: TransferOrderItem[];
  requestedBy: string;
  requestedDate: string;
  approvedBy?: string;
  approvedDate?: string;
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

export type TransferOrderStatus = 'draft' | 'pending' | 'in_transit' | 'completed' | 'cancelled';
