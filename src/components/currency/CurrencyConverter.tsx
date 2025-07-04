
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { ArrowRightLeft } from 'lucide-react';
import { Currency, ExchangeRate } from '@/types/currency';
import { convertCurrency, formatCurrency } from '@/utils/currencyUtils';
import CurrencySelector from './CurrencySelector';

interface CurrencyConverterProps {
  currencies: Currency[];
  exchangeRates: ExchangeRate[];
}

const CurrencyConverter = ({ currencies, exchangeRates }: CurrencyConverterProps) => {
  const [amount, setAmount] = useState<string>('100');
  const [fromCurrencyId, setFromCurrencyId] = useState<string>(currencies[0]?.id || '');
  const [toCurrencyId, setToCurrencyId] = useState<string>(currencies[1]?.id || '');

  const getExchangeRate = (from: string, to: string): ExchangeRate | null => {
    return exchangeRates.find(rate => 
      rate.fromCurrencyId === from && rate.toCurrencyId === to
    ) || null;
  };

  const swapCurrencies = () => {
    const temp = fromCurrencyId;
    setFromCurrencyId(toCurrencyId);
    setToCurrencyId(temp);
  };

  const convertAmount = (): string => {
    const inputAmount = parseFloat(amount);
    if (isNaN(inputAmount) || inputAmount <= 0) return '0.00';

    const rate = getExchangeRate(fromCurrencyId, toCurrencyId);
    if (!rate) return 'Rate not available';

    const toCurrency = currencies.find(c => c.id === toCurrencyId);
    if (!toCurrency) return 'Currency not found';

    const converted = convertCurrency(inputAmount, rate, toCurrency);
    return formatCurrency(converted, toCurrency, false);
  };

  const fromCurrency = currencies.find(c => c.id === fromCurrencyId);
  const toCurrency = currencies.find(c => c.id === toCurrencyId);
  const currentRate = getExchangeRate(fromCurrencyId, toCurrencyId);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Currency Converter</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label>From</Label>
            <CurrencySelector
              currencies={currencies}
              selectedCurrencyId={fromCurrencyId}
              onCurrencyChange={setFromCurrencyId}
            />
            <Input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="Enter amount"
              min="0"
              step="0.01"
            />
          </div>

          <div className="space-y-2">
            <Label>To</Label>
            <CurrencySelector
              currencies={currencies}
              selectedCurrencyId={toCurrencyId}
              onCurrencyChange={setToCurrencyId}
            />
            <div className="p-3 bg-gray-50 rounded-md">
              <div className="text-2xl font-bold text-green-600">
                {convertAmount()}
              </div>
              {toCurrency && (
                <div className="text-sm text-gray-500">
                  {toCurrency.code}
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="flex justify-center">
          <Button
            variant="outline"
            size="sm"
            onClick={swapCurrencies}
            className="flex items-center space-x-2"
          >
            <ArrowRightLeft className="h-4 w-4" />
            <span>Swap</span>
          </Button>
        </div>

        {currentRate && fromCurrency && toCurrency && (
          <div className="p-4 bg-blue-50 rounded-lg">
            <div className="text-sm text-blue-800">
              <strong>Exchange Rate:</strong> 1 {fromCurrency.code} = {currentRate.rate.toFixed(4)} {toCurrency.code}
            </div>
            <div className="text-xs text-blue-600 mt-1">
              Last updated: {new Date(currentRate.createdAt).toLocaleString()}
              {currentRate.isManual && ' (Manual Rate)'}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default CurrencyConverter;
