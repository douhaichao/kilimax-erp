
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Currency, ExchangeRate, CurrencyGainLoss } from '@/types/currency';
import { formatCurrency } from '@/utils/currencyUtils';
import { TrendingUp, TrendingDown, DollarSign, RefreshCw } from 'lucide-react';

interface CurrencyStatsProps {
  currencies: Currency[];
  exchangeRates: ExchangeRate[];
  baseCurrency: Currency;
  totalGainLoss?: number;
}

const CurrencyStats = ({ 
  currencies, 
  exchangeRates, 
  baseCurrency,
  totalGainLoss = 0 
}: CurrencyStatsProps) => {
  const activeCurrencies = currencies.filter(c => c.isActive);
  const manualRates = exchangeRates.filter(r => r.isManual);
  const autoRates = exchangeRates.filter(r => !r.isManual);

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center space-x-2">
            <DollarSign className="h-8 w-8 text-blue-500" />
            <div>
              <div className="text-2xl font-bold">{activeCurrencies.length}</div>
              <div className="text-sm text-gray-500">Active Currencies</div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-6">
          <div className="flex items-center space-x-2">
            <RefreshCw className="h-8 w-8 text-green-500" />
            <div>
              <div className="text-2xl font-bold">{autoRates.length}</div>
              <div className="text-sm text-gray-500">Auto Exchange Rates</div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-6">
          <div className="flex items-center space-x-2">
            <TrendingUp className="h-8 w-8 text-orange-500" />
            <div>
              <div className="text-2xl font-bold">{manualRates.length}</div>
              <div className="text-sm text-gray-500">Manual Rates</div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-6">
          <div className="flex items-center space-x-2">
            {totalGainLoss >= 0 ? (
              <TrendingUp className="h-8 w-8 text-green-500" />
            ) : (
              <TrendingDown className="h-8 w-8 text-red-500" />
            )}
            <div>
              <div className={`text-2xl font-bold ${totalGainLoss >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                {formatCurrency(Math.abs(totalGainLoss), baseCurrency)}
              </div>
              <div className="text-sm text-gray-500">
                Currency {totalGainLoss >= 0 ? 'Gains' : 'Losses'}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CurrencyStats;
