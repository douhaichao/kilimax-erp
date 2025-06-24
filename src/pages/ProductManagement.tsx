
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Package, Plus, Upload, Download, Layers } from 'lucide-react';
import ProductList from '@/components/product/ProductList';
import ProductDetail from '@/components/product/ProductDetail';
import QuickCreateForm from '@/components/product/QuickCreateForm';
import BatchOperations from '@/components/product/BatchOperations';
import CategoryManagement from '@/components/product/CategoryManagement';

export interface Product {
  id: string;
  sku: string;
  name: string;
  category: string;
  categoryId: string;
  stock: number;
  safetyStock: number;
  status: 'active' | 'inactive' | 'archived';
  price: number;
  supplier: string;
  description: string;
  images: string[];
  variants: ProductVariant[];
  createdAt: string;
  updatedAt: string;
}

export interface ProductVariant {
  id: string;
  size?: string;
  color?: string;
  sku: string;
  stock: number;
  price: number;
}

export interface Category {
  id: string;
  name: string;
  parentId?: string;
  children?: Category[];
  productCount: number;
}

const ProductManagement = () => {
  const [activeTab, setActiveTab] = useState('list');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [selectedProducts, setSelectedProducts] = useState<string[]>([]);
  const [showQuickCreate, setShowQuickCreate] = useState(false);
  const [showBatchOperations, setShowBatchOperations] = useState(false);

  // Sample product data
  const products: Product[] = [
    {
      id: '1',
      sku: 'KLMX-001',
      name: 'Organic Coffee Beans - Premium Blend',
      category: 'Beverages',
      categoryId: 'cat-1',
      stock: 45,
      safetyStock: 50,
      status: 'active',
      price: 24.99,
      supplier: 'Kili Coffee Co.',
      description: 'Premium organic coffee beans sourced from Mount Kilimanjaro',
      images: [],
      variants: [
        { id: 'v1', size: '250g', sku: 'KLMX-001-250', stock: 25, price: 24.99 },
        { id: 'v2', size: '500g', sku: 'KLMX-001-500', stock: 20, price: 45.99 }
      ],
      createdAt: '2024-01-15',
      updatedAt: '2024-01-20'
    },
    {
      id: '2',
      sku: 'KLMX-002',
      name: 'Traditional Maasai Jewelry Set',
      category: 'Handicrafts',
      categoryId: 'cat-2',
      stock: 12,
      safetyStock: 15,
      status: 'active',
      price: 89.99,
      supplier: 'Maasai Artisans Ltd',
      description: 'Handcrafted traditional jewelry made by Maasai artisans',
      images: [],
      variants: [
        { id: 'v3', color: 'Red', sku: 'KLMX-002-RED', stock: 8, price: 89.99 },
        { id: 'v4', color: 'Blue', sku: 'KLMX-002-BLU', stock: 4, price: 89.99 }
      ],
      createdAt: '2024-01-16',
      updatedAt: '2024-01-18'
    },
    {
      id: '3',
      sku: 'KLMX-003',
      name: 'Safari Adventure Backpack',
      category: 'Outdoor Gear',
      categoryId: 'cat-3',
      stock: 8,
      safetyStock: 10,
      status: 'active',
      price: 129.99,
      supplier: 'Adventure Gear Africa',
      description: 'Durable backpack designed for African safari adventures',
      images: [],
      variants: [
        { id: 'v5', size: '30L', color: 'Khaki', sku: 'KLMX-003-30K', stock: 5, price: 129.99 },
        { id: 'v6', size: '45L', color: 'Olive', sku: 'KLMX-003-45O', stock: 3, price: 159.99 }
      ],
      createdAt: '2024-01-17',
      updatedAt: '2024-01-19'
    }
  ];

  const categories: Category[] = [
    {
      id: 'cat-1',
      name: 'Beverages',
      productCount: 15,
      children: [
        { id: 'cat-1-1', name: 'Coffee', parentId: 'cat-1', productCount: 8 },
        { id: 'cat-1-2', name: 'Tea', parentId: 'cat-1', productCount: 7 }
      ]
    },
    {
      id: 'cat-2',
      name: 'Handicrafts',
      productCount: 23,
      children: [
        { id: 'cat-2-1', name: 'Jewelry', parentId: 'cat-2', productCount: 12 },
        { id: 'cat-2-2', name: 'Pottery', parentId: 'cat-2', productCount: 11 }
      ]
    },
    {
      id: 'cat-3',
      name: 'Outdoor Gear',
      productCount: 18,
      children: [
        { id: 'cat-3-1', name: 'Backpacks', parentId: 'cat-3', productCount: 8 },
        { id: 'cat-3-2', name: 'Camping', parentId: 'cat-3', productCount: 10 }
      ]
    }
  ];

  const handleProductSelect = (product: Product) => {
    setSelectedProduct(product);
    setActiveTab('detail');
  };

  const handleBatchSelect = (productIds: string[]) => {
    setSelectedProducts(productIds);
    if (productIds.length > 0) {
      setShowBatchOperations(true);
    }
  };

  return (
    <div className="space-y-6 bg-gradient-to-br from-blue-50 to-indigo-50 min-h-screen p-6">
      {/* Header */}
      <div className="flex justify-between items-center bg-white rounded-xl shadow-sm border border-blue-200 p-6">
        <div className="flex items-center space-x-4">
          <div className="p-3 bg-gradient-to-br from-blue-600 to-indigo-700 rounded-xl shadow-lg">
            <Package className="h-8 w-8 text-white" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-blue-800">Product Management</h1>
            <p className="text-blue-600 mt-1">Manage your product catalog with Kilimax</p>
          </div>
        </div>
        <div className="flex space-x-3">
          <Button 
            variant="outline" 
            size="sm" 
            className="border-blue-300 text-blue-700 hover:bg-blue-50"
            onClick={() => setActiveTab('categories')}
          >
            <Layers className="h-4 w-4 mr-2" />
            Categories
          </Button>
          <Button 
            variant="outline" 
            size="sm" 
            className="border-blue-300 text-blue-700 hover:bg-blue-50"
          >
            <Upload className="h-4 w-4 mr-2" />
            Import
          </Button>
          <Button 
            variant="outline" 
            size="sm" 
            className="border-blue-300 text-blue-700 hover:bg-blue-50"
          >
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
          <Button 
            className="bg-gradient-to-r from-blue-600 to-indigo-700 hover:from-blue-700 hover:to-indigo-800 text-white shadow-lg"
            onClick={() => setShowQuickCreate(true)}
          >
            <Plus className="h-4 w-4 mr-2" />
            New Product
          </Button>
        </div>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="border-blue-200 shadow-sm hover:shadow-md transition-shadow">
          <CardContent className="p-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600">{products.length}</div>
              <div className="text-sm text-gray-600 font-medium">Total Products</div>
            </div>
          </CardContent>
        </Card>
        <Card className="border-blue-200 shadow-sm hover:shadow-md transition-shadow">
          <CardContent className="p-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-green-600">
                {products.filter(p => p.status === 'active').length}
              </div>
              <div className="text-sm text-gray-600 font-medium">Active Products</div>
            </div>
          </CardContent>
        </Card>
        <Card className="border-blue-200 shadow-sm hover:shadow-md transition-shadow">
          <CardContent className="p-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-amber-600">
                {products.filter(p => p.stock <= p.safetyStock).length}
              </div>
              <div className="text-sm text-gray-600 font-medium">Low Stock Alerts</div>
            </div>
          </CardContent>
        </Card>
        <Card className="border-blue-200 shadow-sm hover:shadow-md transition-shadow">
          <CardContent className="p-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-indigo-600">{categories.length}</div>
              <div className="text-sm text-gray-600 font-medium">Categories</div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content */}
      <Card className="border-blue-200 shadow-sm">
        <CardContent className="p-0">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <div className="bg-gradient-to-r from-blue-100 to-indigo-100 border-b border-blue-200 px-6 pt-6">
              <TabsList className="bg-white border border-blue-200">
                <TabsTrigger value="list" className="data-[state=active]:bg-blue-600 data-[state=active]:text-white">
                  Product List
                </TabsTrigger>
                <TabsTrigger value="detail" className="data-[state=active]:bg-blue-600 data-[state=active]:text-white">
                  Product Detail
                </TabsTrigger>
                <TabsTrigger value="categories" className="data-[state=active]:bg-blue-600 data-[state=active]:text-white">
                  Categories
                </TabsTrigger>
              </TabsList>
            </div>

            <TabsContent value="list" className="p-6">
              <ProductList 
                products={products} 
                categories={categories}
                onProductSelect={handleProductSelect}
                onBatchSelect={handleBatchSelect}
              />
            </TabsContent>

            <TabsContent value="detail" className="p-6">
              {selectedProduct ? (
                <ProductDetail 
                  product={selectedProduct}
                  onBack={() => setActiveTab('list')}
                />
              ) : (
                <div className="text-center py-12">
                  <Package className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-500">Select a product to view details</p>
                </div>
              )}
            </TabsContent>

            <TabsContent value="categories" className="p-6">
              <CategoryManagement categories={categories} />
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      {/* Quick Create Modal */}
      {showQuickCreate && (
        <QuickCreateForm 
          onClose={() => setShowQuickCreate(false)}
          categories={categories}
        />
      )}

      {/* Batch Operations Panel */}
      {showBatchOperations && selectedProducts.length > 0 && (
        <BatchOperations 
          selectedProducts={selectedProducts}
          products={products}
          onClose={() => {
            setShowBatchOperations(false);
            setSelectedProducts([]);
          }}
        />
      )}
    </div>
  );
};

export default ProductManagement;
