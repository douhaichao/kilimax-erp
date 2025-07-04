
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { Plus, Save } from 'lucide-react';
import { Currency } from '@/types/currency';
import { useToast } from "@/hooks/use-toast";

interface AddCurrencyModalProps {
  onAddCurrency: (currency: Omit<Currency, 'id' | 'createdAt' | 'updatedAt'>) => void;
}

const AddCurrencyModal = ({ onAddCurrency }: AddCurrencyModalProps) => {
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    code: '',
    name: '',
    symbol: '',
    decimalPlaces: 2,
    isActive: true,
    isBaseCurrency: false,
    roundingRule: 'standard' as const
  });
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.code || !formData.name || !formData.symbol) {
      toast({
        title: "Validation Error",
        description: "Please fill in all required fields",
        variant: "destructive"
      });
      return;
    }

    if (formData.code.length !== 3) {
      toast({
        title: "Invalid Currency Code",
        description: "Currency code must be exactly 3 characters (ISO 4217 standard)",
        variant: "destructive"
      });
      return;
    }

    onAddCurrency(formData);
    
    toast({
      title: "Currency Added",
      description: `${formData.name} (${formData.code}) has been added successfully`
    });
    
    // Reset form
    setFormData({
      code: '',
      name: '',
      symbol: '',
      decimalPlaces: 2,
      isActive: true,
      isBaseCurrency: false,
      roundingRule: 'standard'
    });
    
    setOpen(false);
  };

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="bg-gradient-to-r from-blue-600 to-indigo-700 hover:from-blue-700 hover:to-indigo-800 text-white shadow-lg">
          <Plus className="h-4 w-4 mr-2" />
          Add Currency
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Add New Currency</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="code">Currency Code *</Label>
              <Input
                id="code"
                value={formData.code}
                onChange={(e) => handleInputChange('code', e.target.value.toUpperCase())}
                placeholder="USD"
                maxLength={3}
                className="uppercase"
              />
              <p className="text-xs text-gray-500">3-letter ISO 4217 code</p>
            </div>
            <div className="space-y-2">
              <Label htmlFor="symbol">Currency Symbol *</Label>
              <Input
                id="symbol"
                value={formData.symbol}
                onChange={(e) => handleInputChange('symbol', e.target.value)}
                placeholder="$"
                maxLength={5}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="name">Currency Name *</Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) => handleInputChange('name', e.target.value)}
              placeholder="US Dollar"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="decimalPlaces">Decimal Places</Label>
              <Select
                value={formData.decimalPlaces.toString()}
                onValueChange={(value) => handleInputChange('decimalPlaces', parseInt(value))}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="0">0 (e.g., JPY)</SelectItem>
                  <SelectItem value="2">2 (e.g., USD, EUR)</SelectItem>
                  <SelectItem value="3">3 (e.g., KWD)</SelectItem>
                  <SelectItem value="4">4 (e.g., CLF)</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="roundingRule">Rounding Rule</Label>
              <Select
                value={formData.roundingRule}
                onValueChange={(value) => handleInputChange('roundingRule', value)}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="standard">Standard</SelectItem>
                  <SelectItem value="up">Round Up</SelectItem>
                  <SelectItem value="down">Round Down</SelectItem>
                  <SelectItem value="bankers">Banker's Rounding</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="isActive">Active Currency</Label>
                <p className="text-sm text-gray-500">Enable this currency for transactions</p>
              </div>
              <Switch
                id="isActive"
                checked={formData.isActive}
                onCheckedChange={(checked) => handleInputChange('isActive', checked)}
              />
            </div>
            
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="isBaseCurrency">Base Currency</Label>
                <p className="text-sm text-gray-500">Set as base currency for this entity</p>
              </div>
              <Switch
                id="isBaseCurrency"
                checked={formData.isBaseCurrency}
                onCheckedChange={(checked) => handleInputChange('isBaseCurrency', checked)}
              />
            </div>
          </div>

          <div className="flex justify-end space-x-2 pt-4">
            <Button type="button" variant="outline" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button type="submit" className="bg-blue-600 hover:bg-blue-700">
              <Save className="h-4 w-4 mr-2" />
              Add Currency
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddCurrencyModal;
