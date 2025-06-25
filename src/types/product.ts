
export interface ProductUOM {
  id: string;
  name: string;
  ratio: number;
  isDefault: boolean;
  uomId?: string;
  uom?: UOM;
  price?: number;
  barcode?: string;
}

export interface Product {
  id: string;
  name: string;
  sku: string;
  description: string;
  category: string;
  uoms: ProductUOM[];
  price: number;
  cost: number;
  status: 'active' | 'inactive';
  supplier?: string;
  stock?: number;
  safetyStock?: number;
  variants?: any[];
  createdAt: string;
  updatedAt: string;
}

export interface Category {
  id: string;
  name: string;
  description: string;
  productCount?: number;
  children?: Category[];
  parentId?: string;
}

export interface UOM {
  id: string;
  name: string;
  ratio: number;
  isDefault: boolean;
  symbol?: string;
  isActive?: boolean;
  type?: string;
  conversionFactor?: number;
}
