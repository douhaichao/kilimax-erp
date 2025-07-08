export interface PurchaseOrder {
  id: string;
  orderNumber: string;
  supplierId: string;
  supplierName: string;
  supplierEmail?: string;
  supplierPhone?: string;
  status: 'draft' | 'submitted' | 'approved' | 'rejected' | 'ordered' | 'partially_received' | 'completed' | 'cancelled';
  items: PurchaseOrderItem[];
  requestedBy: string;
  requestedDate: string;
  submittedBy?: string;
  submittedDate?: string;
  approvedBy?: string;
  approvedDate?: string;
  rejectedBy?: string;
  rejectedDate?: string;
  rejectionReason?: string;
  orderedDate?: string;
  deliveryDate?: string;
  expectedDeliveryDate?: string;
  notes?: string;
  totalQuantity: number;
  totalValue: number;
  currency: string;
  deliveryAddress?: string;
  paymentTerms?: string;
  createdAt: string;
  updatedAt: string;
}

export interface PurchaseOrderItem {
  id: string;
  productId: string;
  productName: string;
  productSku: string;
  description?: string;
  uom: string;
  requestedQuantity: number;
  orderedQuantity?: number;
  receivedQuantity?: number;
  unitPrice: number;
  totalPrice: number;
  taxRate?: number;
  taxAmount?: number;
  notes?: string;
}

export interface Supplier {
  id: string;
  name: string;
  code: string;
  email?: string;
  phone?: string;
  address?: string;
  contactPerson?: string;
  paymentTerms?: string;
  currency: string;
  isActive: boolean;
}

export type PurchaseOrderStatus = 'draft' | 'submitted' | 'approved' | 'rejected' | 'ordered' | 'partially_received' | 'completed' | 'cancelled';