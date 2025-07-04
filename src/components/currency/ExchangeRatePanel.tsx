
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { RefreshCw, Edit, Save, X, TrendingUp, TrendingDown } from 'lucide-react';
import { Currency, ExchangeRate } from '@/types/currency';

interface ExchangeRatePanelProps {
  currencies: Currency[];
  exchangeRates: ExchangeRate[];
  onRateUpdate: (rateId: string, newRate: number) => void;
  onRefreshRates: () => void;
}

const ExchangeRatePanel = ({
  currencies,
  exchangeRates,
  onRateUpdate,
  onRefreshRates
}: ExchangeRatePanelProps) => {
  const [editingRateId, setEditingRateId] = useState<string | null>(null);
  const [editRate, setEditRate] = useState<string>('');

  const getCurrencyByCode = (id: string) => currencies.find(c => c.id === id);

  const handleEditStart = (rate: ExchangeRate) => {
    setEditingRateId(rate.id);
    setEditRate(rate.rate.toString());
  };

  const handleEditSave = (rateId: string) => {
    const newRate = parseFloat(editRate);
    if (!isNaN(newRate) && newRate > 0) {
      onRateUpdate(rateId, newRate);
    }
    setEditingRateId(null);
    setEditRate('');
  };

  const handleEditCancel = () => {
    setEditingRateId(null);
    setEditRate('');
  };

  const getRateChangeIndicator = (rate: ExchangeRate) => {
    // Mock previous rate for demonstration
    const mockPreviousRate = rate.rate * 0.98;
    const change = ((rate.rate - mockPreviousRate) / mockPreviousRate) * 100;
    
    if (Math.abs(change) < 0.01) return null;
    
    return (
      <div className={`flex items-center space-x-1 ${change > 0 ? 'text-green-600' : 'text-red-600'}`}>
        {change > 0 ? <TrendingUp className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />}
        <span className="text-xs">{Math.abs(change).toFixed(2)}%</span>
      </div>
    );
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle>Exchange Rates</CardTitle>
          <Button onClick={onRefreshRates} size="sm" variant="outline">
            <RefreshCw className="h-4 w-4 mr-2" />
            Refresh Rates
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Currency Pair</TableHead>
                <TableHead>Rate</TableHead>
                <TableHead>Change</TableHead>
                <TableHead>Source</TableHead>
                <TableHead>Last Updated</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {exchangeRates.map((rate) => {
                const fromCurrency = getCurrencyByCode(rate.fromCurrencyId);
                const toCurrency = getCurrencyByCode(rate.toCurrencyId);
                
                if (!fromCurrency || !toCurrency) return null;

                return (
                  <TableRow key={rate.id}>
                    <TableCell className="font-medium">
                      {fromCurrency.code}/{toCurrency.code}
                    </TableCell>
                    <TableCell>
                      {editingRateId === rate.id ? (
                        <div className="flex items-center space-x-2">
                          <Input
                            type="number"
                            value={editRate}
                            onChange={(e) => setEditRate(e.target.value)}
                            className="w-24"
                            step="0.0001"
                            min="0"
                          />
                          <Button
                            size="sm"
                            onClick={() => handleEditSave(rate.id)}
                            className="h-8 w-8 p-0"
                          >
                            <Save className="h-4 w-4" />
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={handleEditCancel}
                            className="h-8 w-8 p-0"
                          >
                            <X className="h-4 w-4" />
                          </Button>
                        </div>
                      ) : (
                        <span className="font-mono">{rate.rate.toFixed(4)}</span>
                      )}
                    </TableCell>
                    <TableCell>
                      {getRateChangeIndicator(rate)}
                    </TableCell>
                    <TableCell>
                      <Badge variant={rate.isManual ? 'secondary' : 'default'}>
                        {rate.source}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-sm text-gray-500">
                      {new Date(rate.createdAt).toLocaleDateString()}
                    </TableCell>
                    <TableCell>
                      {editingRateId !== rate.id && (
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => handleEditStart(rate)}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                      )}
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
};

export default ExchangeRatePanel;
