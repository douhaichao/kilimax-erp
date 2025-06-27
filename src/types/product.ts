
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
  status: 'active' | 'inactive' | 'archived';
  supplier?: string;
  primaryUOM: UOM;
  images: string[];
  baseUomId: string;
  safetyStock: number;
  uoms: ProductUOM[];
  variants?: ProductVariant[];
  createdAt: string;
  updatedAt: string;
}

export interface ProductUOM {
  id: string;
  name: string;
  uomId: string;
  uom?: UOM;
  ratio: number;
  price: number;
  isDefault: boolean;
  barcode?: string;
}

export interface ProductVariant {
  id?: string;
  size?: string;
  color?: string;
  sku: string;
  stock: number;
  price: number;
}

export interface UOM {
  id: string;
  name: string;
  symbol: string;
  type: 'length' | 'piece' | 'weight' | 'volume';
  conversionFactor: number;
  baseUnit?: boolean;
  ratio: number;
  isDefault: boolean;
  isActive: boolean;
}

export interface Category {
  id: string;
  name: string;
  description?: string;
  parentId?: string;
  level: number;
  isActive: boolean;
  productCount: number;
  children: Category[];
  createdAt: string;
  updatedAt: string;
}
