import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export const HotProducts = () => (
  <Card className="bg-white shadow-sm h-full">
    <CardHeader className="pb-3">
      <CardTitle className="text-lg flex items-center">
        🔥 Hot Products
      </CardTitle>
    </CardHeader>
    <CardContent className="space-y-3">
      <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gray-200 rounded-lg"></div>
          <div>
            <p className="font-semibold text-sm">Samsung Galaxy A14</p>
            <p className="text-xs text-gray-600">15 sold today</p>
          </div>
        </div>
        <Badge className="bg-green-100 text-green-800">Hot</Badge>
      </div>

      <div className="flex items-center justify-between p-3 bg-red-50 rounded-lg border border-red-200">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gray-200 rounded-lg"></div>
          <div>
            <p className="font-semibold text-sm">iPhone 13</p>
            <p className="text-xs text-red-600">🔴 Only 2 left!</p>
          </div>
        </div>
        <Button size="sm" className="bg-red-500 hover:bg-red-600 text-white rounded-full px-3 py-1 text-xs">
          Reorder
        </Button>
      </div>

      <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gray-200 rounded-lg"></div>
          <div>
            <p className="font-semibold text-sm">Tecno Spark 10</p>
            <p className="text-xs text-gray-600">8 sold today</p>
          </div>
        </div>
        <Badge variant="secondary">Good</Badge>
      </div>
    </CardContent>
  </Card>
);