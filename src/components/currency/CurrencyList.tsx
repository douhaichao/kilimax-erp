
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Switch } from "@/components/ui/switch";
import { Search, Edit, Trash2, Star } from 'lucide-react';
import { Currency } from '@/types/currency';
import { formatCurrency } from '@/utils/currencyUtils';

interface CurrencyListProps {
  currencies: Currency[];
  onToggleActive: (currencyId: string, isActive: boolean) => void;
  onSetBaseCurrency: (currencyId: string) => void;
  onDeleteCurrency: (currencyId: string) => void;
}

const CurrencyList = ({ 
  currencies, 
  onToggleActive, 
  onSetBaseCurrency, 
  onDeleteCurrency 
}: CurrencyListProps) => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredCurrencies = currencies.filter(currency =>
    currency.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    currency.code.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const activeCurrencies = filteredCurrencies.filter(c => c.isActive);
  const inactiveCurrencies = filteredCurrencies.filter(c => !c.isActive);

  const CurrencyTable = ({ currencies, title }: { currencies: Currency[], title: string }) => (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-gray-800">{title}</h3>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Currency</TableHead>
            <TableHead>Code</TableHead>
            <TableHead>Symbol</TableHead>
            <TableHead>Decimals</TableHead>
            <TableHead>Rounding</TableHead>
            <TableHead>Base</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {currencies.map((currency) => (
            <TableRow key={currency.id}>
              <TableCell className="font-medium">{currency.name}</TableCell>
              <TableCell>
                <Badge variant="outline" className="font-mono">
                  {currency.code}
                </Badge>
              </TableCell>
              <TableCell className="text-lg">{currency.symbol}</TableCell>
              <TableCell>{currency.decimalPlaces}</TableCell>
              <TableCell className="capitalize">{currency.roundingRule}</TableCell>
              <TableCell>
                {currency.isBaseCurrency ? (
                  <Badge className="bg-yellow-100 text-yellow-800">
                    <Star className="h-3 w-3 mr-1" />
                    Base
                  </Badge>
                ) : (
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => onSetBaseCurrency(currency.id)}
                    className="text-xs"
                  >
                    Set as Base
                  </Button>
                )}
              </TableCell>
              <TableCell>
                <Switch
                  checked={currency.isActive}
                  onCheckedChange={(checked) => onToggleActive(currency.id, checked)}
                />
              </TableCell>
              <TableCell>
                <div className="flex space-x-1">
                  <Button size="sm" variant="ghost" className="h-8 w-8 p-0">
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button 
                    size="sm" 
                    variant="ghost" 
                    className="h-8 w-8 p-0 text-red-600 hover:text-red-700"
                    onClick={() => onDeleteCurrency(currency.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );

  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle>Currency Management</CardTitle>
          <div className="flex items-center space-x-2">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Search currencies..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 w-64"
              />
            </div>
          </div>
        </div>
        <div className="flex space-x-4 text-sm text-gray-600">
          <span>Total: {currencies.length}</span>
          <span>Active: {currencies.filter(c => c.isActive).length}</span>
          <span>Base: {currencies.filter(c => c.isBaseCurrency).length}</span>
        </div>
      </CardHeader>
      <CardContent className="space-y-8">
        {activeCurrencies.length > 0 && (
          <CurrencyTable currencies={activeCurrencies} title="Active Currencies" />
        )}
        {inactiveCurrencies.length > 0 && (
          <CurrencyTable currencies={inactiveCurrencies} title="Inactive Currencies" />
        )}
        {filteredCurrencies.length === 0 && (
          <div className="text-center py-8 text-gray-500">
            No currencies found matching your search.
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default CurrencyList;
