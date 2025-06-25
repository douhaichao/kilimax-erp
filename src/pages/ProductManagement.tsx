
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import ProductList from '@/components/product/ProductList';
import ProductDetail from '@/components/product/ProductDetail';
import QuickCreateForm from '@/components/product/QuickCreateForm';
import BatchOperations from '@/components/product/BatchOperations';
import { Product, Category, UOM, ProductUOM } from '@/types/product';
import { Package, Plus, Search, Filter, BarChart3 } from 'lucide-react';

const ProductManagement = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [currentView, setCurrentView] = useState<'list' | 'detail' | 'create'>('list');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [selectedProducts, setSelectedProducts] = useState<string[]>([]);
  const [showBatchOperations, setShowBatchOperations] = useState(false);

  // System UOMs data
  const systemUOMs: UOM[] = [
    { 
      id: 'piece', 
      name: 'Piece', 
      ratio: 1, 
      isDefault: true, 
      symbol: 'pc', 
      type: 'piece', 
      isActive: true, 
      conversionFactor: 1 
    },
    { 
      id: 'kg', 
      name: 'Kilogram', 
      ratio: 1, 
      isDefault: false, 
      symbol: 'kg', 
      type: 'weight', 
      isActive: true, 
      conversionFactor: 1 
    },
    { 
      id: 'liter', 
      name: 'Liter', 
      ratio: 1, 
      isDefault: false, 
      symbol: 'L', 
      type: 'volume', 
      isActive: true, 
      conversionFactor: 1 
    },
    { 
      id: 'meter', 
      name: 'Meter', 
      ratio: 1, 
      isDefault: false, 
      symbol: 'm', 
      type: 'length', 
      isActive: true, 
      conversionFactor: 1 
    },
    { 
      id: 'pack', 
      name: 'Pack', 
      ratio: 6, 
      isDefault: false, 
      symbol: 'pack', 
      type: 'piece', 
      isActive: true, 
      conversionFactor: 6 
    }
  ];

  // Mock data initialization
  useEffect(() => {
    const mockProducts: Product[] = [
      {
        id: '1',
        name: 'iPhone 15 Pro',
        sku: 'IPH-15-PRO-001',
        description: 'Latest iPhone model with advanced features',
        category: 'Electronics',
        categoryId: '1',
        uoms: [
          { 
            id: '1', 
            name: 'Piece', 
            ratio: 1, 
            isDefault: true, 
            uomId: 'piece',
            uom: systemUOMs[0],
            price: 999,
            barcode: '123456789012'
          }
        ],
        primaryUOM: systemUOMs[0],
        baseUomId: 'piece',
        price: 999,
        cost: 750,
        status: 'active',
        supplier: 'Apple Inc.',
        stock: 25,
        safetyStock: 10,
        variants: [],
        images: [],
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      },
      {
        id: '2',
        name: 'Samsung Galaxy S24',
        sku: 'SAM-S24-001',
        description: 'Premium Android smartphone',
        category: 'Electronics',
        categoryId: '1',
        uoms: [
          { 
            id: '2', 
            name: 'Piece', 
            ratio: 1, 
            isDefault: true, 
            uomId: 'piece',
            uom: systemUOMs[0],
            price: 899,
            barcode: '123456789013'
          }
        ],
        primaryUOM: systemUOMs[0],
        baseUomId: 'piece',
        price: 899,
        cost: 650,
        status: 'active',
        supplier: 'Samsung',
        stock: 15,
        safetyStock: 5,
        variants: [],
        images: [],
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      },
      {
        id: '3',
        name: 'MacBook Pro 16"',
        sku: 'MBP-16-001',
        description: 'Professional laptop for power users',
        category: 'Computers',
        categoryId: '2',
        uoms: [
          { 
            id: '3', 
            name: 'Piece', 
            ratio: 1, 
            isDefault: true, 
            uomId: 'piece',
            uom: systemUOMs[0],
            price: 2499,
            barcode: '123456789014'
          }
        ],
        primaryUOM: systemUOMs[0],
        baseUomId: 'piece',
        price: 2499,
        cost: 1800,
        status: 'active',
        supplier: 'Apple Inc.',
        stock: 8,
        safetyStock: 3,
        variants: [],
        images: [],
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      }
    ];

    const mockCategories: Category[] = [
      { 
        id: '1', 
        name: 'Electronics', 
        description: 'Electronic devices and accessories',
        productCount: 2,
        children: [],
        parentId: undefined
      },
      { 
        id: '2', 
        name: 'Computers', 
        description: 'Laptops, desktops, and computer accessories',
        productCount: 1,
        children: [],
        parentId: undefined
      },
      { 
        id: '3', 
        name: 'Accessories', 
        description: 'Phone cases, chargers, and other accessories',
        productCount: 0,
        children: [],
        parentId: undefined
      }
    ];

    setProducts(mockProducts);
    setCategories(mockCategories);
  }, []);

  const handleProductSelect = (product: Product) => {
    console.log('Selected product:', product);
    setSelectedProduct(product);
    setCurrentView('detail');
  };

  const handleProductUpdate = (updatedProduct: Product) => {
    console.log('Updating product:', updatedProduct);
    setProducts(products.map(p => p.id === updatedProduct.id ? updatedProduct : p));
    setSelectedProduct(updatedProduct);
  };

  const handleProductDelete = (productId: string) => {
    console.log('Deleting product:', productId);
    setProducts(products.filter(p => p.id !== productId));
    setCurrentView('list');
    setSelectedProduct(null);
  };

  const handleProductCreate = (product: Product) => {
    console.log('Creating product:', product);
    const newProduct: Product = {
      ...product,
      id: `${Date.now()}`,
      categoryId: product.category,
      primaryUOM: systemUOMs.find(u => u.id === product.baseUomId) || systemUOMs[0],
      images: [],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    setProducts([...products, newProduct]);
    setCurrentView('list');
  };

  const handleBatchSelect = (productIds: string[]) => {
    setSelectedProducts(productIds);
    setShowBatchOperations(productIds.length > 0);
  };

  const getProductStats = () => {
    const totalProducts = products.length;
    const activeProducts = products.filter(p => p.status === 'active').length;
    const lowStockProducts = products.filter(p => p.stock && p.safetyStock && p.stock <= p.safetyStock).length;
    const totalValue = products.reduce((sum, p) => sum + (p.price * (p.stock || 0)), 0);

    return { totalProducts, activeProducts, lowStockProducts, totalValue };
  };

  const stats = getProductStats();

  // Product Detail View
  if (currentView === 'detail' && selectedProduct) {
    return (
      <div className="container mx-auto p-6">
        <ProductDetail
          product={selectedProduct}
          categories={categories}
          onUpdate={handleProductUpdate}
          onDelete={handleProductDelete}
          onBack={() => setCurrentView('list')}
        />
      </div>
    );
  }

  // Quick Create Form View
  if (currentView === 'create') {
    return (
      <div className="container mx-auto p-6">
        <QuickCreateForm
          categories={categories}
          systemUOMs={systemUOMs}
          onClose={() => setCurrentView('list')}
          onSave={handleProductCreate}
        />
      </div>
    );
  }

  // Main Product Management View
  return (
    <div className="container mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">产品管理</h1>
          <p className="text-gray-600 mt-2">管理您的产品库存、价格和基本信息</p>
        </div>
        <div className="flex gap-3">
          <Button 
            variant="outline" 
            onClick={() => setCurrentView('create')}
            className="border-blue-300 text-blue-700 hover:bg-blue-50"
          >
            <Plus className="h-4 w-4 mr-2" />
            快速创建
          </Button>
          <Button 
            onClick={() => setCurrentView('create')}
            className="bg-blue-600 hover:bg-blue-700 text-white"
          >
            <Plus className="h-4 w-4 mr-2" />
            新增产品
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="border-blue-200 bg-gradient-to-r from-blue-50 to-indigo-50">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-blue-800">总产品数</CardTitle>
            <Package className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-900">{stats.totalProducts}</div>
            <p className="text-xs text-blue-600">
              {stats.activeProducts} 个启用中
            </p>
          </CardContent>
        </Card>

        <Card className="border-green-200 bg-gradient-to-r from-green-50 to-emerald-50">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-green-800">启用产品</CardTitle>
            <Badge className="bg-green-600 text-white text-xs">{stats.activeProducts}</Badge>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-900">{stats.activeProducts}</div>
            <p className="text-xs text-green-600">
              {((stats.activeProducts / stats.totalProducts) * 100).toFixed(1)}% 启用率
            </p>
          </CardContent>
        </Card>

        <Card className="border-yellow-200 bg-gradient-to-r from-yellow-50 to-amber-50">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-yellow-800">低库存警告</CardTitle>
            <Badge className="bg-yellow-600 text-white text-xs">{stats.lowStockProducts}</Badge>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-900">{stats.lowStockProducts}</div>
            <p className="text-xs text-yellow-600">
              需要补货的产品
            </p>
          </CardContent>
        </Card>

        <Card className="border-purple-200 bg-gradient-to-r from-purple-50 to-violet-50">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-purple-800">库存总值</CardTitle>
            <BarChart3 className="h-4 w-4 text-purple-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-purple-900">
              ¥{stats.totalValue.toLocaleString()}
            </div>
            <p className="text-xs text-purple-600">
              按销售价格计算
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Main Content */}
      <div className="space-y-6">
        {/* Batch Operations Panel */}
        {showBatchOperations && (
          <BatchOperations
            selectedProducts={selectedProducts}
            products={products}
            systemUOMs={systemUOMs}
            onClose={() => {
              setSelectedProducts([]);
              setShowBatchOperations(false);
            }}
          />
        )}

        {/* Product List */}
        <ProductList
          products={products}
          categories={categories}
          systemUOMs={systemUOMs}
          onProductSelect={handleProductSelect}
          onBatchSelect={handleBatchSelect}
        />
      </div>
    </div>
  );
};

export default ProductManagement;
