import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Settings, X } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

interface DashboardCardConfigProps {
  cardVisibility: Record<string, boolean>;
  onCardToggle: (cardId: string) => void;
}

export const DashboardCardConfig = ({ cardVisibility, onCardToggle }: DashboardCardConfigProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const cards = [
    { id: 'stats', name: 'Dashboard Stats', description: 'Sales, orders, profit and customer metrics' },
    { id: 'hotProducts', name: 'Hot Products', description: 'Trending and popular products' },
    { id: 'customerFollowups', name: 'Customer Follow-ups', description: 'Pending payments and orders' },
    { id: 'salesChampions', name: 'Sales Champions', description: 'Top performing sales staff' },
    { id: 'smartSuggestions', name: 'Smart Suggestions', description: 'AI-powered business insights' },
    { id: 'quickActions', name: 'Quick Actions', description: 'Common business operations' }
  ];

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm" className="mb-4">
          <Settings className="h-4 w-4 mr-2" />
          Configure Dashboard
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Configure Dashboard Cards</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          {cards.map((card) => (
            <div key={card.id} className="flex items-center justify-between space-x-4 p-3 bg-gray-50 rounded-lg">
              <div className="flex-1">
                <h4 className="font-medium text-sm">{card.name}</h4>
                <p className="text-xs text-gray-600">{card.description}</p>
              </div>
              <Switch
                checked={cardVisibility[card.id]}
                onCheckedChange={() => onCardToggle(card.id)}
              />
            </div>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
};