import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { TrendingUp, Users, Package } from 'lucide-react';

export const SmartSuggestions = () => (
  <Card className="bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200 mb-6">
    <CardHeader>
      <CardTitle className="text-lg flex items-center">
        🤖 Smart Suggestions
      </CardTitle>
    </CardHeader>
    <CardContent>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="p-4 bg-white rounded-lg shadow-sm">
          <div className="flex items-center space-x-2 mb-2">
            <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
              <TrendingUp className="h-4 w-4 text-green-600" />
            </div>
            <p className="font-semibold text-sm">Boost Sales</p>
          </div>
          <p className="text-xs text-gray-600 mb-3">Send 20% off promo to customers who bought Samsung phones</p>
          <Button size="sm" className="bg-green-500 hover:bg-green-600 text-white rounded-full w-full">
            Send Promotion
          </Button>
        </div>

        <div className="p-4 bg-white rounded-lg shadow-sm">
          <div className="flex items-center space-x-2 mb-2">
            <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
              <Users className="h-4 w-4 text-blue-600" />
            </div>
            <p className="font-semibold text-sm">Re-engage</p>
          </div>
          <p className="text-xs text-gray-600 mb-3">12 customers haven't bought in 30 days. Time to reach out!</p>
          <Button size="sm" className="bg-blue-500 hover:bg-blue-600 text-white rounded-full w-full">
            Follow Up
          </Button>
        </div>

        <div className="p-4 bg-white rounded-lg shadow-sm">
          <div className="flex items-center space-x-2 mb-2">
            <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center">
              <Package className="h-4 w-4 text-orange-600" />
            </div>
            <p className="font-semibold text-sm">Restock Alert</p>
          </div>
          <p className="text-xs text-gray-600 mb-3">iPhone 13 selling fast! Reorder now to avoid stockout</p>
          <Button size="sm" className="bg-orange-500 hover:bg-orange-600 text-white rounded-full w-full">
            Reorder Now
          </Button>
        </div>
      </div>
    </CardContent>
  </Card>
);