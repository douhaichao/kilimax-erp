import React, { useState, useEffect } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { useNavigate } from 'react-router-dom';
import { Product, Category, UOM } from '@/types/product';
import { 
  Upload, 
  MessageCircle, 
  RotateCcw, 
  ScanLine, 
  Search, 
  Mic, 
  TrendingUp, 
  AlertTriangle,
  Check,
  Edit,
  Share,
  DollarSign,
  Package,
  Star,
  Flame,
  Eye,
  Plus
} from 'lucide-react';

const ProductManagement = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState('all');
  const [showProductDetail, setShowProductDetail] = useState(false);

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
    }
  ];

  // Enhanced mock data with seller-focused attributes
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
        images: ['/placeholder.svg?height=200&width=200'],
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
        stock: 2,
        safetyStock: 5,
        variants: [],
        images: ['/placeholder.svg?height=200&width=200'],
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
        stock: 0,
        safetyStock: 3,
        variants: [],
        images: ['/placeholder.svg?height=200&width=200'],
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
        parentId: undefined,
        level: 1,
        isActive: true,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      },
      { 
        id: '2', 
        name: 'Computers', 
        description: 'Laptops, desktops, and computer accessories',
        productCount: 1,
        children: [],
        parentId: undefined,
        level: 1,
        isActive: true,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      }
    ];

    setProducts(mockProducts);
    setCategories(mockCategories);
  }, []);

  // Helper functions
  const getProductStatus = (product: Product) => {
    if (product.stock === 0) return 'out-of-stock';
    if (product.stock <= product.safetyStock) return 'low-stock';
    return 'in-stock';
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'out-of-stock': return '🔴';
      case 'low-stock': return '🔴';
      case 'in-stock': return '✅';
      default: return '✅';
    }
  };

  const getPerformanceIcon = (product: Product) => {
    // Mock logic for performance
    if (product.price > 1000) return '🔥'; // Hot seller
    if (product.stock < 5) return '💤'; // Slow moving
    return '⭐'; // Regular
  };

  const getProfitMargin = (product: Product) => {
    return ((product.price - product.cost) / product.price * 100).toFixed(1);
  };

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.sku.toLowerCase().includes(searchTerm.toLowerCase());
    
    switch (activeTab) {
      case 'in-stock': return matchesSearch && product.stock > product.safetyStock;
      case 'out-of-stock': return matchesSearch && product.stock === 0;
      case 'top-selling': return matchesSearch && product.price > 1000;
      case 'drafts': return matchesSearch && product.status === 'inactive';
      default: return matchesSearch;
    }
  });

  const getPromoSuggestions = () => {
    return products.slice(0, 2).map(product => ({
      ...product,
      suggestion: product.stock < 5 ? 'Send discount to boost sales' : 'Bundle with accessories'
    }));
  };

  const handleProductClick = (product: Product) => {
    setSelectedProduct(product);
    setShowProductDetail(true);
  };

  const handleQuickEdit = (product: Product, field: string, value: number) => {
    setProducts(products.map(p => 
      p.id === product.id ? { ...p, [field]: value } : p
    ));
    if (selectedProduct?.id === product.id) {
      setSelectedProduct({ ...selectedProduct, [field]: value });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">My Products</h1>
        <p className="text-gray-600">Turn your inventory into profits 💰</p>
      </div>

      {/* Top Action Buttons */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
        <Button 
          onClick={() => navigate('/products/create')}
          className="h-16 bg-green-500 hover:bg-green-600 text-white font-semibold rounded-xl shadow-lg flex flex-col items-center justify-center"
        >
          <Upload className="h-6 w-6 mb-1" />
          Upload Product
        </Button>
        <Button 
          variant="outline"
          className="h-16 border-orange-300 text-orange-600 hover:bg-orange-50 font-semibold rounded-xl shadow-lg flex flex-col items-center justify-center"
        >
          <MessageCircle className="h-6 w-6 mb-1" />
          Send Promo
        </Button>
        <Button 
          variant="outline"
          className="h-16 border-blue-300 text-blue-600 hover:bg-blue-50 font-semibold rounded-xl shadow-lg flex flex-col items-center justify-center"
        >
          <RotateCcw className="h-6 w-6 mb-1" />
          Reorder Stock
        </Button>
        <Button 
          variant="outline"
          className="h-16 border-purple-300 text-purple-600 hover:bg-purple-50 font-semibold rounded-xl shadow-lg flex flex-col items-center justify-center"
        >
          <ScanLine className="h-6 w-6 mb-1" />
          Scan Barcode
        </Button>
      </div>

      {/* Search Bar with Voice */}
      <div className="relative mb-6">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
        <Input
          placeholder="Search products..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-10 pr-12 h-12 rounded-xl border-gray-200 bg-white shadow-md"
        />
        <Button 
          size="sm" 
          variant="ghost"
          className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
        >
          <Mic className="h-5 w-5" />
        </Button>
      </div>

      {/* Product Filters */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-6">
        <TabsList className="grid w-full grid-cols-5 bg-white rounded-xl shadow-md">
          <TabsTrigger value="all" className="rounded-lg">All</TabsTrigger>
          <TabsTrigger value="in-stock" className="rounded-lg">In Stock</TabsTrigger>
          <TabsTrigger value="out-of-stock" className="rounded-lg">Out</TabsTrigger>
          <TabsTrigger value="top-selling" className="rounded-lg">🔥 Hot</TabsTrigger>
          <TabsTrigger value="drafts" className="rounded-lg">Drafts</TabsTrigger>
        </TabsList>
      </Tabs>

      {/* Smart Promo Suggestions */}
      <Card className="mb-6 bg-gradient-to-r from-orange-50 to-yellow-50 border-orange-200 shadow-lg">
        <CardContent className="p-4">
          <h3 className="font-semibold text-gray-900 mb-3 flex items-center">
            <TrendingUp className="h-5 w-5 mr-2 text-orange-600" />
            Smart Sales Suggestions
          </h3>
          <div className="space-y-3">
            {getPromoSuggestions().map((product) => (
              <div key={product.id} className="flex items-center justify-between p-3 bg-white rounded-lg shadow-sm">
                <div className="flex items-center space-x-3">
                  <img 
                    src={product.images[0] || '/placeholder.svg'} 
                    alt={product.name}
                    className="w-10 h-10 rounded-lg object-cover"
                  />
                  <div>
                    <p className="font-medium text-sm">{product.name}</p>
                    <p className="text-xs text-gray-500">{product.suggestion}</p>
                  </div>
                </div>
                <Button size="sm" className="bg-orange-500 hover:bg-orange-600 text-white rounded-lg">
                  Promote
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Product Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {filteredProducts.map((product) => {
          const status = getProductStatus(product);
          const statusIcon = getStatusIcon(status);
          const performanceIcon = getPerformanceIcon(product);
          
          return (
            <Card 
              key={product.id}
              onClick={() => handleProductClick(product)}
              className="cursor-pointer hover:shadow-xl transition-all duration-300 bg-white rounded-xl overflow-hidden border-gray-200"
            >
              <div className="relative">
                <img 
                  src={product.images[0] || '/placeholder.svg'} 
                  alt={product.name}
                  className="w-full h-32 object-cover"
                />
                <div className="absolute top-2 left-2 flex space-x-1">
                  <span className="text-lg">{performanceIcon}</span>
                  <span className="text-lg">{statusIcon}</span>
                </div>
                {status === 'low-stock' && (
                  <Badge className="absolute top-2 right-2 bg-red-500 text-white text-xs">
                    {product.stock} left
                  </Badge>
                )}
              </div>
              
              <CardContent className="p-3">
                <h4 className="font-semibold text-sm text-gray-900 mb-1 line-clamp-2">
                  {product.name}
                </h4>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-lg font-bold text-green-600">
                    ₦{product.price.toLocaleString()}
                  </span>
                  <span className={`text-sm font-medium ${
                    status === 'out-of-stock' ? 'text-red-600' : 
                    status === 'low-stock' ? 'text-orange-600' : 'text-green-600'
                  }`}>
                    {product.stock} in stock
                  </span>
                </div>
                <div className="flex justify-between items-center text-xs text-gray-500">
                  <span>Profit: {getProfitMargin(product)}%</span>
                  <span>{product.category}</span>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Product Detail Sheet */}
      <Sheet open={showProductDetail} onOpenChange={setShowProductDetail}>
        <SheetContent side="bottom" className="h-[80vh] rounded-t-3xl">
          <SheetHeader className="mb-6">
            <SheetTitle className="text-xl font-bold">
              {selectedProduct?.name}
            </SheetTitle>
            <SheetDescription>
              Manage pricing, stock, and promotions
            </SheetDescription>
          </SheetHeader>
          
          {selectedProduct && (
            <div className="space-y-6">
              {/* Product Image and Basic Info */}
              <div className="flex space-x-4">
                <img 
                  src={selectedProduct.images[0] || '/placeholder.svg'} 
                  alt={selectedProduct.name}
                  className="w-24 h-24 rounded-lg object-cover"
                />
                <div className="flex-1">
                  <h3 className="font-semibold text-lg">{selectedProduct.name}</h3>
                  <p className="text-gray-600 text-sm mb-2">{selectedProduct.description}</p>
                  <div className="flex items-center space-x-4">
                    <Badge variant="outline">{selectedProduct.category}</Badge>
                    <span className="text-sm text-gray-500">SKU: {selectedProduct.sku}</span>
                  </div>
                </div>
              </div>

              {/* Financial Summary */}
              <div className="grid grid-cols-3 gap-4">
                <div className="bg-green-50 p-4 rounded-lg text-center">
                  <p className="text-sm text-gray-600">Selling Price</p>
                  <p className="text-xl font-bold text-green-600">₦{selectedProduct.price.toLocaleString()}</p>
                </div>
                <div className="bg-blue-50 p-4 rounded-lg text-center">
                  <p className="text-sm text-gray-600">Cost Price</p>
                  <p className="text-xl font-bold text-blue-600">₦{selectedProduct.cost.toLocaleString()}</p>
                </div>
                <div className="bg-purple-50 p-4 rounded-lg text-center">
                  <p className="text-sm text-gray-600">Profit Margin</p>
                  <p className="text-xl font-bold text-purple-600">{getProfitMargin(selectedProduct)}%</p>
                </div>
              </div>

              {/* Quick Edit Controls */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="font-medium">Current Stock:</span>
                  <div className="flex items-center space-x-2">
                    <Button 
                      size="sm" 
                      variant="outline"
                      onClick={() => handleQuickEdit(selectedProduct, 'stock', Math.max(0, selectedProduct.stock - 1))}
                    >
                      -
                    </Button>
                    <span className="font-bold text-lg px-3">{selectedProduct.stock}</span>
                    <Button 
                      size="sm" 
                      variant="outline"
                      onClick={() => handleQuickEdit(selectedProduct, 'stock', selectedProduct.stock + 1)}
                    >
                      +
                    </Button>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <span className="font-medium">Selling Price:</span>
                  <div className="flex items-center space-x-2">
                    <Button 
                      size="sm" 
                      variant="outline"
                      onClick={() => handleQuickEdit(selectedProduct, 'price', Math.max(1, selectedProduct.price - 50))}
                    >
                      -₦50
                    </Button>
                    <span className="font-bold text-lg px-3">₦{selectedProduct.price}</span>
                    <Button 
                      size="sm" 
                      variant="outline"
                      onClick={() => handleQuickEdit(selectedProduct, 'price', selectedProduct.price + 50)}
                    >
                      +₦50
                    </Button>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="grid grid-cols-2 gap-4 pt-4">
                <Button className="bg-green-500 hover:bg-green-600 text-white h-12 rounded-xl flex items-center justify-center">
                  <Share className="h-5 w-5 mr-2" />
                  Send to WhatsApp
                </Button>
                <Button variant="outline" className="h-12 rounded-xl flex items-center justify-center">
                  <Edit className="h-5 w-5 mr-2" />
                  Full Edit
                </Button>
              </div>
            </div>
          )}
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default ProductManagement;