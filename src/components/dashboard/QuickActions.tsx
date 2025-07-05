import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Package, Bell, ShoppingCart, TrendingUp } from 'lucide-react';

export const QuickActions = () => (
  <Card className="bg-white shadow-sm">
    <CardHeader>
      <CardTitle className="text-lg">Quick Actions</CardTitle>
    </CardHeader>
    <CardContent>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <Button className="bg-green-500 hover:bg-green-600 text-white rounded-xl h-16 flex flex-col items-center justify-center space-y-1">
          <Package className="h-5 w-5" />
          <span className="text-xs">Upload Products</span>
        </Button>
        <Button className="bg-blue-500 hover:bg-blue-600 text-white rounded-xl h-16 flex flex-col items-center justify-center space-y-1">
          <Bell className="h-5 w-5" />
          <span className="text-xs">Send Promotion</span>
        </Button>
        <Button className="bg-purple-500 hover:bg-purple-600 text-white rounded-xl h-16 flex flex-col items-center justify-center space-y-1">
          <ShoppingCart className="h-5 w-5" />
          <span className="text-xs">View Orders</span>
        </Button>
        <Button className="bg-orange-500 hover:bg-orange-600 text-white rounded-xl h-16 flex flex-col items-center justify-center space-y-1">
          <TrendingUp className="h-5 w-5" />
          <span className="text-xs">Reorder Top Product</span>
        </Button>
      </div>
    </CardContent>
  </Card>
);