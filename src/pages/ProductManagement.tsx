
import React, { useState, useEffect } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from 'react-router-dom';
import { Product, Category, UOM } from '@/types/product';
import { 
  Plus, 
  Send, 
  Package, 
  Scan, 
  Search, 
  Mic, 
  Flame,
  Moon,
  CheckCircle,
  AlertCircle,
  MessageCircle,
  TrendingUp,
  ShoppingCart,
  Edit3,
  Share2
} from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

const ProductManagement = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState('all');
  const [showProductDetail, setShowProductDetail] = useState(false);

  // Mock data with enhanced product info
  useEffect(() => {
    const mockProducts: Product[] = [
      {
        id: '1',
        name: 'iPhone 15 Pro',
        sku: 'IPH-15-PRO-001',
        description: 'Latest iPhone model with advanced camera and A17 chip',
        category: 'Electronics',
        categoryId: '1',
        uoms: [{ 
          id: '1', 
          name: 'Piece', 
          ratio: 1, 
          isDefault: true, 
          uomId: 'piece',
          price: 45000,
          barcode: '123456789012'
        }],
        primaryUOM: { id: 'piece', name: 'Piece', ratio: 1, isDefault: true, symbol: 'pc', type: 'piece', isActive: true, conversionFactor: 1 },
        baseUomId: 'piece',
        price: 45000,
        cost: 35000,
        status: 'active',
        supplier: 'Apple Inc.',
        stock: 25,
        safetyStock: 10,
        variants: [],
        images: ['https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=400'],
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        salesCount: 45,
        trending: 'hot'
      },
      {
        id: '2',
        name: 'Samsung Galaxy S24',
        sku: 'SAM-S24-001',
        description: 'Premium Android smartphone with AI features',
        category: 'Electronics',
        categoryId: '1',
        uoms: [{ 
          id: '2', 
          name: 'Piece', 
          ratio: 1, 
          isDefault: true, 
          uomId: 'piece',
          price: 38000,
          barcode: '123456789013'
        }],
        primaryUOM: { id: 'piece', name: 'Piece', ratio: 1, isDefault: true, symbol: 'pc', type: 'piece', isActive: true, conversionFactor: 1 },
        baseUomId: 'piece',
        price: 38000,
        cost: 28000,
        status: 'active',
        supplier: 'Samsung',
        stock: 3,
        safetyStock: 5,
        variants: [],
        images: ['https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400'],
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        salesCount: 12,
        trending: 'normal'
      },
      {
        id: '3',
        name: 'MacBook Pro 16"',
        sku: 'MBP-16-001',
        description: 'Professional laptop for creative work and development',
        category: 'Computers',
        categoryId: '2',
        uoms: [{ 
          id: '3', 
          name: 'Piece', 
          ratio: 1, 
          isDefault: true, 
          uomId: 'piece',
          price: 85000,
          barcode: '123456789014'
        }],
        primaryUOM: { id: 'piece', name: 'Piece', ratio: 1, isDefault: true, symbol: 'pc', type: 'piece', isActive: true, conversionFactor: 1 },
        baseUomId: 'piece',
        price: 85000,
        cost: 65000,
        status: 'active',
        supplier: 'Apple Inc.',
        stock: 0,
        safetyStock: 3,
        variants: [],
        images: ['https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=400'],
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        salesCount: 2,
        trending: 'slow'
      },
      {
        id: '4',
        name: 'AirPods Pro',
        sku: 'APD-PRO-001',
        description: 'Wireless earbuds with active noise cancellation',
        category: 'Accessories',
        categoryId: '3',
        uoms: [{ 
          id: '4', 
          name: 'Piece', 
          ratio: 1, 
          isDefault: true, 
          uomId: 'piece',
          price: 12000,
          barcode: '123456789015'
        }],
        primaryUOM: { id: 'piece', name: 'Piece', ratio: 1, isDefault: true, symbol: 'pc', type: 'piece', isActive: true, conversionFactor: 1 },
        baseUomId: 'piece',
        price: 12000,
        cost: 8000,
        status: 'active',
        supplier: 'Apple Inc.',
        stock: 18,
        safetyStock: 8,
        variants: [],
        images: ['https://images.unsplash.com/photo-1588423771073-23d0c2e6de18?w=400'],
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        salesCount: 67,
        trending: 'hot'
      }
    ];

    setProducts(mockProducts);
  }, []);

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesTab = 
      activeTab === 'all' ||
      (activeTab === 'in-stock' && product.stock > 0) ||
      (activeTab === 'out-of-stock' && product.stock === 0) ||
      (activeTab === 'top-selling' && product.trending === 'hot') ||
      (activeTab === 'drafts' && product.status === 'inactive');
    
    return matchesSearch && matchesTab;
  });

  const getStockStatus = (product: Product) => {
    if (product.stock === 0) return { icon: AlertCircle, color: 'text-red-500', text: 'Out of stock', bgColor: 'bg-red-50' };
    if (product.stock <= product.safetyStock) return { icon: AlertCircle, color: 'text-orange-500', text: `${product.stock} left`, bgColor: 'bg-orange-50' };
    return { icon: CheckCircle, color: 'text-green-500', text: 'In stock', bgColor: 'bg-green-50' };
  };

  const getTrendingIcon = (trending: string) => {
    switch (trending) {
      case 'hot': return <Flame className="h-4 w-4 text-red-500" />;
      case 'slow': return <Moon className="h-4 w-4 text-gray-400" />;
      default: return null;
    }
  };

  const handleProductClick = (product: Product) => {
    setSelectedProduct(product);
    setShowProductDetail(true);
  };

  const getPromoSuggestions = () => {
    return products.filter(p => p.trending === 'slow' || p.trending === 'hot').slice(0, 3);
  };

  const calculateProfitMargin = (price: number, cost: number) => {
    return ((price - cost) / price * 100).toFixed(1);
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Header */}
      <div className="bg-white border-b sticky top-0 z-10">
        <div className="px-4 py-4">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">My Products</h1>
          
          {/* Top Action Buttons */}
          <div className="grid grid-cols-2 gap-3 mb-4">
            <Button 
              onClick={() => navigate('/products/create')}
              className="bg-blue-600 hover:bg-blue-700 text-white h-12 text-sm font-medium"
            >
              <Plus className="h-5 w-5 mr-2" />
              Upload Product
            </Button>
            <Button 
              variant="outline" 
              className="border-green-300 text-green-700 hover:bg-green-50 h-12 text-sm font-medium"
            >
              <Send className="h-5 w-5 mr-2" />
              Send Promo
            </Button>
            <Button 
              variant="outline" 
              className="border-orange-300 text-orange-700 hover:bg-orange-50 h-12 text-sm font-medium"
            >
              <Package className="h-5 w-5 mr-2" />
              Reorder Stock
            </Button>
            <Button 
              variant="outline" 
              className="border-purple-300 text-purple-700 hover:bg-purple-50 h-12 text-sm font-medium"
            >
              <Scan className="h-5 w-5 mr-2" />
              Scan Barcode
            </Button>
          </div>

          {/* Search Bar */}
          <div className="relative">
            <Search className="absolute left-3 top-3.5 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search your products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-12 h-12 text-base"
            />
            <Button
              variant="ghost"
              size="sm"
              className="absolute right-2 top-2 h-8 w-8 p-0"
            >
              <Mic className="h-4 w-4 text-gray-400" />
            </Button>
          </div>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="bg-white border-b">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="px-4">
          <TabsList className="grid w-full grid-cols-5 h-12 bg-gray-100">
            <TabsTrigger value="all" className="text-xs">All</TabsTrigger>
            <TabsTrigger value="in-stock" className="text-xs">In Stock</TabsTrigger>
            <TabsTrigger value="out-of-stock" className="text-xs">Out</TabsTrigger>
            <TabsTrigger value="top-selling" className="text-xs">Top</TabsTrigger>
            <TabsTrigger value="drafts" className="text-xs">Drafts</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      <div className="p-4 space-y-6">
        {/* Smart Promo Suggestions */}
        <Card className="bg-gradient-to-r from-blue-50 to-purple-50 border-blue-200">
          <CardContent className="p-4">
            <h3 className="font-semibold text-gray-900 mb-3 flex items-center">
              <TrendingUp className="h-5 w-5 mr-2 text-blue-600" />
              Smart Promo Ideas
            </h3>
            <div className="space-y-2">
              {getPromoSuggestions().map((product) => (
                <div key={product.id} className="flex items-center justify-between p-2 bg-white rounded-lg border">
                  <div className="flex items-center space-x-3">
                    <img 
                      src={product.images[0] || '/placeholder.svg'} 
                      alt={product.name}
                      className="w-8 h-8 rounded object-cover"
                    />
                    <div>
                      <p className="font-medium text-sm">{product.name}</p>
                      <p className="text-xs text-gray-500">
                        {product.trending === 'hot' ? '🔥 Hot seller' : '💤 Slow moving'}
                      </p>
                    </div>
                  </div>
                  <Button size="sm" className="bg-green-600 hover:bg-green-700 text-white">
                    <Send className="h-3 w-3 mr-1" />
                    Promote
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Product Grid */}
        <TabsContent value={activeTab} className="mt-0">
          <div className="grid grid-cols-2 gap-4">
            {filteredProducts.map((product) => {
              const stockStatus = getStockStatus(product);
              return (
                <Card 
                  key={product.id} 
                  className="cursor-pointer hover:shadow-lg transition-shadow"
                  onClick={() => handleProductClick(product)}
                >
                  <CardContent className="p-3">
                    <div className="relative">
                      <img 
                        src={product.images[0] || '/placeholder.svg'} 
                        alt={product.name}
                        className="w-full h-32 object-cover rounded-lg mb-3"
                      />
                      <div className="absolute top-2 right-2 flex space-x-1">
                        {getTrendingIcon(product.trending)}
                        <stockStatus.icon className={`h-4 w-4 ${stockStatus.color}`} />
                      </div>
                    </div>
                    
                    <h3 className="font-semibold text-sm text-gray-900 mb-1 line-clamp-2">
                      {product.name}
                    </h3>
                    
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-lg font-bold text-green-600">
                        ₦{product.price.toLocaleString()}
                      </span>
                      <Badge 
                        variant="outline" 
                        className={`text-xs ${stockStatus.bgColor} ${stockStatus.color} border-0`}
                      >
                        {stockStatus.text}
                      </Badge>
                    </div>
                    
                    <div className="flex justify-between items-center text-xs text-gray-500">
                      <span>Stock: {product.stock}</span>
                      <span>Sold: {product.salesCount || 0}</span>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </TabsContent>
      </div>

      {/* Product Detail Drawer */}
      <Dialog open={showProductDetail} onOpenChange={setShowProductDetail}>
        <DialogContent className="max-w-md max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Product Details</DialogTitle>
          </DialogHeader>
          
          {selectedProduct && (
            <div className="space-y-4">
              <div className="relative">
                <img 
                  src={selectedProduct.images[0] || '/placeholder.svg'} 
                  alt={selectedProduct.name}
                  className="w-full h-48 object-cover rounded-lg"
                />
                <div className="absolute top-2 right-2">
                  {getTrendingIcon(selectedProduct.trending)}
                </div>
              </div>
              
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">{selectedProduct.name}</h3>
                <p className="text-gray-600 text-sm mb-4">{selectedProduct.description}</p>
                
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div className="bg-green-50 p-3 rounded-lg">
                    <p className="text-sm text-gray-600">Selling Price</p>
                    <p className="text-xl font-bold text-green-600">₦{selectedProduct.price.toLocaleString()}</p>
                  </div>
                  <div className="bg-blue-50 p-3 rounded-lg">
                    <p className="text-sm text-gray-600">Your Cost</p>
                    <p className="text-xl font-bold text-blue-600">₦{selectedProduct.cost.toLocaleString()}</p>
                  </div>
                </div>
                
                <div className="bg-purple-50 p-3 rounded-lg mb-4">
                  <p className="text-sm text-gray-600">Profit Margin</p>
                  <p className="text-xl font-bold text-purple-600">
                    {calculateProfitMargin(selectedProduct.price, selectedProduct.cost)}%
                  </p>
                  <p className="text-sm text-gray-500">
                    ₦{(selectedProduct.price - selectedProduct.cost).toLocaleString()} per sale
                  </p>
                </div>
                
                <div className="flex justify-between items-center mb-4">
                  <div>
                    <p className="text-sm text-gray-600">Available Stock</p>
                    <p className="text-lg font-semibold">{selectedProduct.stock} units</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Total Sold</p>
                    <p className="text-lg font-semibold">{selectedProduct.salesCount || 0} units</p>
                  </div>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-3">
                <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                  <Edit3 className="h-4 w-4 mr-2" />
                  Quick Edit
                </Button>
                <Button className="bg-green-600 hover:bg-green-700 text-white">
                  <MessageCircle className="h-4 w-4 mr-2" />
                  WhatsApp
                </Button>
              </div>
              
              <div className="grid grid-cols-2 gap-3">
                <Button variant="outline" className="border-orange-300 text-orange-700">
                  <ShoppingCart className="h-4 w-4 mr-2" />
                  Restock
                </Button>
                <Button variant="outline" className="border-purple-300 text-purple-700">
                  <Share2 className="h-4 w-4 mr-2" />
                  Share
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ProductManagement;
