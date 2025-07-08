export interface QuotationAttachment {
  id: string;
  name: string;
  size: number;
  type: string;
  url: string;
  uploadedAt: string;
}

export interface QuotationItem {
  id: string;
  productName: string;
  sku: string;
  description?: string;
  quantity: number;
  unitPrice: number;
  totalPrice: number;
}

export interface Quotation {
  id: string;
  quotationNumber: string;
  customer: string;
  customerEmail?: string;
  customerPhone?: string;
  salesperson: string;
  amount: number;
  status: 'draft' | 'sent' | 'accepted' | 'rejected' | 'expired';
  validUntil: string;
  quotationDate: string;
  items: QuotationItem[];
  notes?: string;
  attachments?: QuotationAttachment[];
}