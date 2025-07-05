import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export const SalesChampions = () => (
  <Card className="bg-white shadow-sm h-full">
    <CardHeader className="pb-3">
      <CardTitle className="text-lg flex items-center">
        🏆 Sales Champions
      </CardTitle>
    </CardHeader>
    <CardContent className="space-y-3">
      <div className="flex items-center justify-between p-3 bg-gradient-to-r from-yellow-50 to-yellow-100 rounded-lg border border-yellow-200">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-yellow-500 rounded-full flex items-center justify-center text-white font-bold text-sm">1</div>
          <div>
            <p className="font-semibold text-sm">Grace Wanjiku</p>
            <p className="text-xs text-gray-600">KES 15,400 • ⭐⭐⭐⭐⭐</p>
          </div>
        </div>
        <div className="text-right">
          <p className="text-xs text-gray-500">8 orders</p>
          <p className="text-xs text-green-600">95% rate</p>
        </div>
      </div>

      <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-gray-400 rounded-full flex items-center justify-center text-white font-bold text-sm">2</div>
          <div>
            <p className="font-semibold text-sm">John Mwangi</p>
            <p className="text-xs text-gray-600">KES 12,200 • ⭐⭐⭐⭐</p>
          </div>
        </div>
        <div className="text-right">
          <p className="text-xs text-gray-500">6 orders</p>
          <p className="text-xs text-green-600">88% rate</p>
        </div>
      </div>

      <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-orange-400 rounded-full flex items-center justify-center text-white font-bold text-sm">3</div>
          <div>
            <p className="font-semibold text-sm">Mary Akinyi</p>
            <p className="text-xs text-gray-600">KES 9,800 • ⭐⭐⭐⭐</p>
          </div>
        </div>
        <div className="text-right">
          <p className="text-xs text-gray-500">5 orders</p>
          <p className="text-xs text-green-600">82% rate</p>
        </div>
      </div>
    </CardContent>
  </Card>
);