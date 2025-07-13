import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Package, Bell, ShoppingCart, TrendingUp } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";
import QuickCreateForm from '../product/QuickCreateForm';
import { Category, Product } from '@/types/product';

export const QuickActions = () => {
  const [showQuickCreate, setShowQuickCreate] = useState(false);
  const { toast } = useToast();

  // Sample categories for the form
  const sampleCategories: Category[] = [
    {
      id: 'electronics',
      name: 'Electronics',
      description: 'Electronic devices and accessories',
      level: 1,
      isActive: true,
      productCount: 0,
      children: [],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    },
    {
      id: 'clothing',
      name: 'Clothing',
      description: 'Apparel and accessories',
      level: 1,
      isActive: true,
      productCount: 0,
      children: [],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    },
    {
      id: 'food',
      name: 'Food & Beverages',
      description: 'Food items and beverages',
      level: 1,
      isActive: true,
      productCount: 0,
      children: [],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }
  ];

  const handleProductSave = (product: Product) => {
    console.log('Product saved:', product);
    toast({
      title: "Product Created",
      description: `${product.name} has been successfully created.`,
    });
  };

  const handleSendPromotion = () => {
    toast({
      title: "Promotion Feature",
      description: "Send promotion functionality coming soon!",
    });
  };

  const handleViewOrders = () => {
    toast({
      title: "Orders View",
      description: "Redirecting to orders page...",
    });
    // Navigate to orders page - implement with react-router
  };

  const handleReorderProduct = () => {
    toast({
      title: "Reorder Feature",
      description: "Top product reorder functionality coming soon!",
    });
  };

  return (
    <>
      <Card className="bg-white shadow-sm">
        <CardHeader>
          <CardTitle className="text-lg">Quick Actions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            <Button 
              onClick={() => setShowQuickCreate(true)}
              className="bg-green-500 hover:bg-green-600 text-white rounded-xl h-16 flex flex-col items-center justify-center space-y-1"
            >
              <Package className="h-5 w-5" />
              <span className="text-xs">Upload Products</span>
            </Button>
            <Button 
              onClick={handleSendPromotion}
              className="bg-blue-500 hover:bg-blue-600 text-white rounded-xl h-16 flex flex-col items-center justify-center space-y-1"
            >
              <Bell className="h-5 w-5" />
              <span className="text-xs">Send Promotion</span>
            </Button>
            <Button 
              onClick={handleViewOrders}
              className="bg-purple-500 hover:bg-purple-600 text-white rounded-xl h-16 flex flex-col items-center justify-center space-y-1"
            >
              <ShoppingCart className="h-5 w-5" />
              <span className="text-xs">View Orders</span>
            </Button>
            <Button 
              onClick={handleReorderProduct}
              className="bg-orange-500 hover:bg-orange-600 text-white rounded-xl h-16 flex flex-col items-center justify-center space-y-1"
            >
              <TrendingUp className="h-5 w-5" />
              <span className="text-xs">Reorder Top Product</span>
            </Button>
          </div>
        </CardContent>
      </Card>

      {showQuickCreate && (
        <QuickCreateForm
          onClose={() => setShowQuickCreate(false)}
          onSave={handleProductSave}
          categories={sampleCategories}
        />
      )}
    </>
  );
};