import { PurchaseOrder, Supplier } from '@/types/purchaseOrder';

export const mockSuppliers: Supplier[] = [
  {
    id: 'sup-001',
    name: 'Acme Electronics Ltd',
    code: 'ACM001',
    email: 'orders@acme-electronics.com',
    phone: '+1-555-0123',
    address: '123 Industrial Ave, Tech City, TC 12345',
    contactPerson: 'John Smith',
    paymentTerms: 'Net 30',
    currency: 'USD',
    isActive: true
  },
  {
    id: 'sup-002',
    name: 'Global Components Inc',
    code: 'GCI002',
    email: 'purchasing@globalcomp.com',
    phone: '+1-555-0456',
    address: '456 Supply Chain Blvd, Commerce City, CC 67890',
    contactPerson: 'Sarah Johnson',
    paymentTerms: 'Net 15',
    currency: 'USD',
    isActive: true
  },
  {
    id: 'sup-003',
    name: 'Best Parts Co',
    code: 'BPC003',
    email: 'sales@bestparts.co',
    phone: '+1-555-0789',
    address: '789 Parts Street, Manufacturing Town, MT 54321',
    contactPerson: 'Mike Wilson',
    paymentTerms: 'Net 45',
    currency: 'USD',
    isActive: true
  }
];

export const mockPurchaseOrders: PurchaseOrder[] = [
  {
    id: 'po-001',
    orderNumber: 'PO-2024-001',
    supplierId: 'sup-001',
    supplierName: 'Acme Electronics Ltd',
    supplierEmail: 'orders@acme-electronics.com',
    supplierPhone: '+1-555-0123',
    status: 'approved',
    items: [
      {
        id: 'poi-001',
        productId: 'prod-001',
        productName: 'LED Display Module',
        productSku: 'LED-DISP-001',
        description: 'High-resolution LED display module for industrial use',
        uom: 'pcs',
        requestedQuantity: 50,
        orderedQuantity: 50,
        receivedQuantity: 30,
        unitPrice: 245.00,
        totalPrice: 12250.00,
        taxRate: 8.5,
        taxAmount: 1041.25
      },
      {
        id: 'poi-002',
        productId: 'prod-002',
        productName: 'Control Circuit Board',
        productSku: 'CCB-001',
        description: 'Main control circuit board for automation systems',
        uom: 'pcs',
        requestedQuantity: 25,
        orderedQuantity: 25,
        receivedQuantity: 15,
        unitPrice: 189.50,
        totalPrice: 4737.50,
        taxRate: 8.5,
        taxAmount: 402.69
      }
    ],
    requestedBy: 'procurement@company.com',
    requestedDate: '2024-01-15',
    submittedBy: 'procurement@company.com',
    submittedDate: '2024-01-16',
    approvedBy: 'manager@company.com',
    approvedDate: '2024-01-17',
    orderedDate: '2024-01-18',
    expectedDeliveryDate: '2024-02-15',
    notes: 'Urgent delivery required for Q1 production schedule',
    totalQuantity: 75,
    totalValue: 16987.50,
    currency: 'USD',
    deliveryAddress: '123 Manufacturing Facility, Production City, PC 98765',
    paymentTerms: 'Net 30',
    createdAt: '2024-01-15T08:00:00Z',
    updatedAt: '2024-01-20T14:30:00Z'
  },
  {
    id: 'po-002',
    orderNumber: 'PO-2024-002',
    supplierId: 'sup-002',
    supplierName: 'Global Components Inc',
    supplierEmail: 'purchasing@globalcomp.com',
    supplierPhone: '+1-555-0456',
    status: 'submitted',
    items: [
      {
        id: 'poi-003',
        productId: 'prod-003',
        productName: 'Industrial Sensors',
        productSku: 'SENS-IND-001',
        description: 'Temperature and pressure sensors for industrial applications',
        uom: 'pcs',
        requestedQuantity: 100,
        orderedQuantity: 100,
        unitPrice: 78.25,
        totalPrice: 7825.00,
        taxRate: 8.5,
        taxAmount: 665.13
      }
    ],
    requestedBy: 'engineering@company.com',
    requestedDate: '2024-01-18',
    submittedBy: 'procurement@company.com',
    submittedDate: '2024-01-19',
    expectedDeliveryDate: '2024-02-20',
    notes: 'Quality certification required before delivery',
    totalQuantity: 100,
    totalValue: 8490.13,
    currency: 'USD',
    deliveryAddress: '123 Manufacturing Facility, Production City, PC 98765',
    paymentTerms: 'Net 15',
    createdAt: '2024-01-18T10:15:00Z',
    updatedAt: '2024-01-19T16:45:00Z'
  },
  {
    id: 'po-003',
    orderNumber: 'PO-2024-003',
    supplierId: 'sup-003',
    supplierName: 'Best Parts Co',
    supplierEmail: 'sales@bestparts.co',
    supplierPhone: '+1-555-0789',
    status: 'draft',
    items: [
      {
        id: 'poi-004',
        productId: 'prod-004',
        productName: 'Hydraulic Pumps',
        productSku: 'HYD-PUMP-001',
        description: 'Heavy-duty hydraulic pumps for machinery',
        uom: 'pcs',
        requestedQuantity: 10,
        unitPrice: 1250.00,
        totalPrice: 12500.00,
        taxRate: 8.5,
        taxAmount: 1062.50
      }
    ],
    requestedBy: 'maintenance@company.com',
    requestedDate: '2024-01-20',
    expectedDeliveryDate: '2024-03-01',
    notes: 'Maintenance replacement parts for Q1 schedule',
    totalQuantity: 10,
    totalValue: 13562.50,
    currency: 'USD',
    deliveryAddress: '456 Warehouse Facility, Storage City, SC 11111',
    paymentTerms: 'Net 45',
    createdAt: '2024-01-20T09:30:00Z',
    updatedAt: '2024-01-20T09:30:00Z'
  }
];