import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Search, 
  Plus, 
  Filter, 
  MoreHorizontal, 
  Package,
  TrendingUp,
  AlertTriangle,
  Eye,
  Edit,
  Trash2,
  Download,
  Upload
} from 'lucide-react';
import ProductList from '@/components/product/ProductList';
import ProductDetail from '@/components/product/ProductDetail';
import QuickCreateForm from '@/components/product/QuickCreateForm';
import CategoryManagement from '@/components/product/CategoryManagement';
import BatchOperations from '@/components/product/BatchOperations';

// Updated Product interface to match ProductList expectations
export interface Product {
  id: string;
  name: string;
  sku: string;
  category: string;
  price: number;
  cost: number;
  stock: number;
  status: 'active' | 'inactive' | 'archived';
  primaryUOM: string;
  categoryId: string;
  description: string;
  images: string[];
  variants: ProductVariant[];
  uoms: {
    id: string;
    name: string;
    ratio: number;
    isDefault: boolean;
  }[];
  supplier: string;
  tags: string[];
}

export interface ProductVariant {
  id: string;
  name: string;
  sku: string;
  price: number;
  stock: number;
  attributes: Record<string, string>;
}

export interface ProductUOM {
  id: string;
  uomId: string;
  ratio: number;
  isDefault: boolean;
}

export interface UOM {
  id: string;
  name: string;
  symbol: string;
  type: 'length' | 'weight' | 'volume' | 'piece';
}

export interface Category {
  id: string;
  name: string;
  description: string;
  parentId?: string;
  level: number;
  path: string;
}

const ProductManagement = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [uoms, setUoms] = useState<UOM[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [currentView, setCurrentView] = useState<'list' | 'detail' | 'create'>('list');
  const [activeTab, setActiveTab] = useState('products');
  const [searchQuery, setSearchQuery] = useState('');
  const [filterOptions, setFilterOptions] = useState({});

  const handleProductSelect = (product: Product) => {
    setSelectedProduct(product);
    setCurrentView('detail');
  };

  const handleProductUpdate = (updatedProduct: Product) => {
    setProducts(products.map(p => p.id === updatedProduct.id ? updatedProduct : p));
    setSelectedProduct(updatedProduct);
  };

  const handleProductDelete = (productId: string) => {
    setProducts(products.filter(p => p.id !== productId));
    setSelectedProduct(null);
    setCurrentView('list');
  };

  const handleBatchUpdate = (selectedIds: string[], updates: Partial<Product>) => {
    setProducts(products.map(product => 
      selectedIds.includes(product.id) 
        ? { ...product, ...updates }
        : product
    ));
  };

  const mockProducts: Product[] = [
    {
      id: '1',
      name: 'Wireless Bluetooth Headphones',
      sku: 'WBH-001',
      category: 'Electronics',
      categoryId: 'cat-electronics',
      description: 'High-quality wireless headphones with noise cancellation',
      price: 299.99,
      cost: 150.00,
      stock: 45,
      status: 'active',
      primaryUOM: 'piece',
      images: ['/placeholder.svg'],
      variants: [],
      uoms: [
        { id: 'uom-1', name: 'Piece', ratio: 1, isDefault: true },
        { id: 'uom-2', name: 'Pack of 6', ratio: 6, isDefault: false }
      ],
      supplier: 'TechCorp Inc.',
      tags: ['electronics', 'audio', 'wireless']
    },
    {
      id: '2',
      name: 'Ergonomic Office Chair',
      sku: 'EOC-002',
      category: 'Furniture',
      categoryId: 'cat-furniture',
      description: 'Adjustable ergonomic chair for office use',
      price: 349.00,
      cost: 180.00,
      stock: 30,
      status: 'active',
      primaryUOM: 'piece',
      images: ['/placeholder.svg'],
      variants: [],
      uoms: [
        { id: 'uom-3', name: 'Piece', ratio: 1, isDefault: true }
      ],
      supplier: 'Office Solutions Ltd.',
      tags: ['furniture', 'office', 'ergonomic']
    },
    {
      id: '3',
      name: 'Stainless Steel Water Bottle',
      sku: 'SSWB-003',
      category: 'Home & Kitchen',
      categoryId: 'cat-home-kitchen',
      description: 'Reusable water bottle made of stainless steel',
      price: 25.50,
      cost: 12.75,
      stock: 120,
      status: 'active',
      primaryUOM: 'piece',
      images: ['/placeholder.svg'],
      variants: [],
      uoms: [
        { id: 'uom-4', name: 'Piece', ratio: 1, isDefault: true }
      ],
      supplier: 'EcoLife Products',
      tags: ['home', 'kitchen', 'eco-friendly']
    }
  ];

  const mockUOMs: UOM[] = [
    { id: 'piece', name: 'Piece', symbol: 'pc', type: 'piece' },
    { id: 'kg', name: 'Kilogram', symbol: 'kg', type: 'weight' },
    { id: 'liter', name: 'Liter', symbol: 'L', type: 'volume' },
    { id: 'meter', name: 'Meter', symbol: 'm', type: 'length' }
  ];

  const mockCategories: Category[] = [
    { id: 'cat-electronics', name: 'Electronics', description: 'Electronic devices and accessories', level: 1, path: 'Electronics' },
    { id: 'cat-clothing', name: 'Clothing', description: 'Apparel and fashion items', level: 1, path: 'Clothing' },
    { id: 'cat-books', name: 'Books', description: 'Books and publications', level: 1, path: 'Books' }
  ];

  useEffect(() => {
    setProducts(mockProducts);
    setUoms(mockUOMs);
    setCategories(mockCategories);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow">
        <div className="container mx-auto py-4 px-4 sm:px-6 lg:px-8">
          <div className="md:flex md:items-center md:justify-between">
            <div className="flex-1 min-w-0">
              <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:text-3xl sm:truncate">
                Product Management
              </h2>
            </div>
            <div className="mt-4 flex md:mt-0 md:ml-4">
              <Button onClick={() => setCurrentView('create')}>
                <Plus className="mr-2 h-4 w-4" />
                Add Product
              </Button>
            </div>
          </div>
        </div>
      </header>
      
      <main className="container mx-auto px-4 py-6">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 mb-6">
          <Card>
            <CardContent className="flex items-center space-x-4 p-3">
              <div className="rounded-full bg-blue-100 p-2">
                <Package className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <CardTitle className="text-lg font-semibold">Total Products</CardTitle>
                <span className="text-2xl font-bold">{products.length}</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="flex items-center space-x-4 p-3">
              <div className="rounded-full bg-green-100 p-2">
                <TrendingUp className="h-5 w-5 text-green-600" />
              </div>
              <div>
                <CardTitle className="text-lg font-semibold">In Stock</CardTitle>
                <span className="text-2xl font-bold">{products.reduce((acc, product) => acc + product.stock, 0)}</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="flex items-center space-x-4 p-3">
              <div className="rounded-full bg-red-100 p-2">
                <AlertTriangle className="h-5 w-5 text-red-600" />
              </div>
              <div>
                <CardTitle className="text-lg font-semibold">Low Stock</CardTitle>
                <span className="text-2xl font-bold">{products.filter(product => product.stock < 10).length}</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="flex items-center space-x-4 p-3">
              <div className="rounded-full bg-gray-100 p-2">
                <Eye className="h-5 w-5 text-gray-600" />
              </div>
              <div>
                <CardTitle className="text-lg font-semibold">Active Products</CardTitle>
                <span className="text-2xl font-bold">{products.filter(product => product.status === 'active').length}</span>
              </div>
            </CardContent>
          </Card>
        </div>
        
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="products">Products</TabsTrigger>
            <TabsTrigger value="categories">Categories</TabsTrigger>
            <TabsTrigger value="batch">Batch Operations</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
          </TabsList>

          <TabsContent value="products" className="space-y-6">
            {currentView === 'list' && (
              <ProductList
                products={products}
                uoms={uoms}
                onProductSelect={handleProductSelect}
                onProductUpdate={handleProductUpdate}
                onProductDelete={handleProductDelete}
              />
            )}

            {currentView === 'detail' && selectedProduct && (
              <ProductDetail
                product={selectedProduct}
                uoms={uoms}
                categories={categories}
                onUpdate={handleProductUpdate}
                onDelete={handleProductDelete}
                onBack={() => setCurrentView('list')}
              />
            )}

            {currentView === 'create' && (
              <QuickCreateForm
                categories={categories}
                uoms={uoms}
                onProductCreate={(product) => {
                  setProducts([...products, product]);
                  setCurrentView('list');
                }}
                onCancel={() => setCurrentView('list')}
              />
            )}
          </TabsContent>

          <TabsContent value="categories">
            <CategoryManagement categories={categories} />
          </TabsContent>

          <TabsContent value="batch">
            <BatchOperations products={products} onBatchUpdate={handleBatchUpdate} />
          </TabsContent>

          <TabsContent value="analytics">
            <div>
              <h3 className="text-lg font-semibold mb-4">Product Analytics</h3>
              <p>Detailed analytics and reports coming soon.</p>
            </div>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default ProductManagement;
