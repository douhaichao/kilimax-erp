import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { DollarSign, ShoppingCart, TrendingUp, Users } from 'lucide-react';

export const DashboardStats = () => (
  <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4 mb-6">
    <Card className="bg-gradient-to-r from-green-500 to-green-600 text-white border-0">
      <CardContent className="p-4">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-green-100 text-sm">Today's Sales</p>
            <p className="text-2xl font-bold">KES 8,250</p>
            <p className="text-green-200 text-sm flex items-center">
              <TrendingUp className="h-3 w-3 mr-1" />
              +24% from yesterday
            </p>
          </div>
          <DollarSign className="h-8 w-8 text-green-200" />
        </div>
      </CardContent>
    </Card>

    <Card className="bg-white shadow-sm">
      <CardContent className="p-4">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-gray-600 text-sm">Orders Today</p>
            <p className="text-2xl font-bold text-gray-900">12</p>
            <p className="text-green-600 text-sm">+3 pending</p>
          </div>
          <ShoppingCart className="h-8 w-8 text-blue-500" />
        </div>
      </CardContent>
    </Card>

    <Card className="bg-white shadow-sm">
      <CardContent className="p-4">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-gray-600 text-sm">Profit Today</p>
            <p className="text-2xl font-bold text-gray-900">KES 2,475</p>
            <p className="text-gray-500 text-sm">30% margin</p>
          </div>
          <TrendingUp className="h-8 w-8 text-green-500" />
        </div>
      </CardContent>
    </Card>

    <Card className="bg-white shadow-sm">
      <CardContent className="p-4">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-gray-600 text-sm">Customers</p>
            <p className="text-2xl font-bold text-gray-900">89</p>
            <p className="text-blue-600 text-sm">5 new today</p>
          </div>
          <Users className="h-8 w-8 text-purple-500" />
        </div>
      </CardContent>
    </Card>
  </div>
);