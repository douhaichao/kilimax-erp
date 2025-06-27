
export interface Product {
  id: string;
  name: string;
  description?: string;
  category: string;
  categoryId: string;
  price: number;
  cost: number;
  stock: number;
  sku: string;
  status: 'active' | 'inactive' | 'discontinued';
  supplier?: string;
  primaryUOM: UOM;
  images: string[];
  baseUomId: string;
  createdAt: string;
  updatedAt: string;
}

export interface UOM {
  id: string;
  name: string;
  symbol: string;
  type: 'length' | 'piece' | 'weight' | 'volume';
  conversionFactor: number;
  baseUnit: boolean;
}

export interface Category {
  id: string;
  name: string;
  description?: string;
  parentId?: string;
  level: number;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}
