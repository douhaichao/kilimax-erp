import { Quotation } from '@/types/quotation';

export const mockQuotations: Quotation[] = [
  {
    id: '1',
    quotationNumber: 'QUO-2024-001',
    customer: 'Safaricom Ltd',
    customerEmail: 'procurement@safaricom.co.ke',
    customerPhone: '+254 700 000 000',
    salesperson: 'John Mwangi',
    amount: 125000.00,
    status: 'sent',
    validUntil: '2024-08-15',
    quotationDate: '2024-07-15',
    notes: 'Bulk order discount applied',
    items: [
      {
        id: '1',
        productName: 'Enterprise Router',
        sku: 'ER-001',
        description: 'High-performance enterprise router',
        quantity: 10,
        unitPrice: 12500.00,
        totalPrice: 125000.00
      }
    ],
    attachments: [
      {
        id: '1',
        name: 'technical-specs.pdf',
        size: 1024000,
        type: 'application/pdf',
        url: '#',
        uploadedAt: '2024-07-15'
      }
    ]
  },
  {
    id: '2',
    quotationNumber: 'QUO-2024-002',
    customer: 'MTN Uganda',
    customerEmail: 'orders@mtn.ug',
    customerPhone: '+256 700 000 000',
    salesperson: 'Sarah Nakato',
    amount: 78500.00,
    status: 'accepted',
    validUntil: '2024-08-20',
    quotationDate: '2024-07-20',
    notes: 'Urgent delivery required',
    items: [
      {
        id: '1',
        productName: 'Network Switch',
        sku: 'NS-024',
        description: '24-port managed switch',
        quantity: 5,
        unitPrice: 15700.00,
        totalPrice: 78500.00
      }
    ]
  },
  {
    id: '3',
    quotationNumber: 'QUO-2024-003',
    customer: 'Econet Wireless',
    customerEmail: 'procurement@econet.co.zw',
    customerPhone: '+263 700 000 000',
    salesperson: 'David Mutasa',
    amount: 45200.00,
    status: 'draft',
    validUntil: '2024-08-25',
    quotationDate: '2024-07-25',
    notes: 'Awaiting final specifications',
    items: [
      {
        id: '1',
        productName: 'Fiber Optic Cable',
        sku: 'FOC-500',
        description: 'Single-mode fiber optic cable 500m',
        quantity: 2,
        unitPrice: 22600.00,
        totalPrice: 45200.00
      }
    ]
  },
  {
    id: '4',
    quotationNumber: 'QUO-2024-004',
    customer: 'Orange Mali',
    customerEmail: 'achats@orange.ml',
    customerPhone: '+223 700 000 000',
    salesperson: 'Aminata Traore',
    amount: 92300.00,
    status: 'rejected',
    validUntil: '2024-07-30',
    quotationDate: '2024-07-10',
    notes: 'Price negotiation required',
    items: [
      {
        id: '1',
        productName: 'Base Station Controller',
        sku: 'BSC-01',
        description: 'Advanced base station controller',
        quantity: 1,
        unitPrice: 92300.00,
        totalPrice: 92300.00
      }
    ]
  },
  {
    id: '5',
    quotationNumber: 'QUO-2024-005',
    customer: 'Vodacom Tanzania',
    customerEmail: 'procurement@vodacom.co.tz',
    customerPhone: '+255 700 000 000',
    salesperson: 'Grace Moshi',
    amount: 156800.00,
    status: 'expired',
    validUntil: '2024-07-05',
    quotationDate: '2024-06-20',
    notes: 'Follow up for renewal',
    items: [
      {
        id: '1',
        productName: 'Satellite Dish',
        sku: 'SD-300',
        description: '3-meter satellite dish with accessories',
        quantity: 4,
        unitPrice: 39200.00,
        totalPrice: 156800.00
      }
    ]
  }
];