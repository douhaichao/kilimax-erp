import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export const CustomerFollowups = () => (
  <Card className="bg-white shadow-sm h-full">
    <CardHeader className="pb-3">
      <CardTitle className="text-lg flex items-center">
        💬 Customer Follow-ups
      </CardTitle>
    </CardHeader>
    <CardContent className="space-y-3">
      <div className="p-3 bg-yellow-50 rounded-lg border border-yellow-200">
        <div className="flex justify-between items-start mb-2">
          <div>
            <p className="font-semibold text-sm">Moses Kiprotich</p>
            <p className="text-xs text-red-600">Owes KES 1,500</p>
          </div>
          <Badge className="bg-yellow-100 text-yellow-800">Overdue</Badge>
        </div>
        <Button size="sm" className="bg-green-500 hover:bg-green-600 text-white rounded-full w-full">
          💬 Send WhatsApp Reminder
        </Button>
      </div>

      <div className="p-3 bg-blue-50 rounded-lg">
        <div className="flex justify-between items-center mb-2">
          <div>
            <p className="font-semibold text-sm">Pending Orders</p>
            <p className="text-xs text-gray-600">3 orders waiting</p>
          </div>
          <Badge className="bg-blue-100 text-blue-800">3</Badge>
        </div>
        <Button size="sm" variant="outline" className="w-full rounded-full">
          View Orders
        </Button>
      </div>

      <div className="p-3 bg-purple-50 rounded-lg">
        <div className="flex justify-between items-center mb-2">
          <div>
            <p className="font-semibold text-sm">Unpaid Invoices</p>
            <p className="text-xs text-gray-600">KES 4,200 total</p>
          </div>
          <Badge className="bg-purple-100 text-purple-800">5</Badge>
        </div>
        <Button size="sm" variant="outline" className="w-full rounded-full">
          Send Reminders
        </Button>
      </div>
    </CardContent>
  </Card>
);