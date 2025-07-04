import { TransferOrder } from '@/types/transferOrder';

export const mockTransferOrders: TransferOrder[] = [
  {
    id: '1',
    transferNumber: 'TRF-2024-001',
    fromLocationId: 'loc-1',
    fromLocationName: 'Main Warehouse',
    toLocationId: 'loc-2',
    toLocationName: 'Store A',
    status: 'submitted',
    items: [
      {
        id: '1',
        productId: 'prod-1',
        productName: 'Wireless Headphones',
        productSku: 'WH-001',
        uom: 'piece',
        requestedQuantity: 10,
        unitCost: 150,
        totalCost: 1500
      }
    ],
    requestedBy: 'John Doe',
    requestedDate: '2024-01-15',
    submittedBy: 'John Doe',
    submittedDate: '2024-01-15',
    totalQuantity: 10,
    estimatedValue: 1500,
    createdAt: '2024-01-15T10:00:00Z',
    updatedAt: '2024-01-15T10:00:00Z'
  },
  {
    id: '2',
    transferNumber: 'TRF-2024-002',
    fromLocationId: 'loc-2',
    fromLocationName: 'Store A',
    toLocationId: 'loc-3',
    toLocationName: 'Store B',
    status: 'in_transit',
    items: [
      {
        id: '2',
        productId: 'prod-2',
        productName: 'Office Chair',
        productSku: 'OC-002',
        uom: 'piece',
        requestedQuantity: 5,
        shippedQuantity: 5,
        unitCost: 180,
        totalCost: 900
      }
    ],
    requestedBy: 'Jane Smith',
    requestedDate: '2024-01-14',
    submittedBy: 'Jane Smith',
    submittedDate: '2024-01-14',
    approvedBy: 'Manager',
    approvedDate: '2024-01-14',
    shippedDate: '2024-01-15',
    totalQuantity: 5,
    estimatedValue: 900,
    createdAt: '2024-01-14T09:00:00Z',
    updatedAt: '2024-01-15T11:00:00Z'
  },
  {
    id: '3',
    transferNumber: 'TRF-2024-003',
    fromLocationId: 'loc-1',
    fromLocationName: 'Main Warehouse',
    toLocationId: 'loc-4',
    toLocationName: 'Store C',
    status: 'completed',
    items: [
      {
        id: '3',
        productId: 'prod-3',
        productName: 'Water Bottle',
        productSku: 'WB-003',
        uom: 'piece',
        requestedQuantity: 20,
        shippedQuantity: 20,
        receivedQuantity: 20,
        unitCost: 12.75,
        totalCost: 255
      }
    ],
    requestedBy: 'Mike Johnson',
    requestedDate: '2024-01-10',
    submittedBy: 'Mike Johnson',
    submittedDate: '2024-01-10',
    approvedBy: 'Manager',
    approvedDate: '2024-01-10',
    shippedDate: '2024-01-11',
    receivedDate: '2024-01-12',
    totalQuantity: 20,
    estimatedValue: 255,
    createdAt: '2024-01-10T08:00:00Z',
    updatedAt: '2024-01-12T16:00:00Z'
  }
];