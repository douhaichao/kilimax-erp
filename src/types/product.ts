
export interface ProductUOM {
  id: string;
  name: string;
  ratio: number;
  isDefault: boolean;
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
  createdAt: string;
  updatedAt: string;
}

export interface Category {
  id: string;
  name: string;
  description: string;
}

export interface UOM {
  id: string;
  name: string;
  ratio: number;
  isDefault: boolean;
}
