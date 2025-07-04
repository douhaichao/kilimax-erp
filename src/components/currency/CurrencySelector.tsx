
import React from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Currency } from '@/types/currency';
import { formatCurrency } from '@/utils/currencyUtils';

interface CurrencySelectorProps {
  currencies: Currency[];
  selectedCurrencyId?: string;
  onCurrencyChange: (currencyId: string) => void;
  placeholder?: string;
  disabled?: boolean;
}

const CurrencySelector = ({
  currencies,
  selectedCurrencyId,
  onCurrencyChange,
  placeholder = "Select currency",
  disabled = false
}: CurrencySelectorProps) => {
  const activeCurrencies = currencies.filter(c => c.isActive);

  return (
    <Select
      value={selectedCurrencyId}
      onValueChange={onCurrencyChange}
      disabled={disabled}
    >
      <SelectTrigger className="w-full">
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent>
        {activeCurrencies.map((currency) => (
          <SelectItem key={currency.id} value={currency.id}>
            <div className="flex items-center space-x-2">
              <span className="font-medium">{currency.code}</span>
              <span className="text-gray-500">({currency.symbol})</span>
              <span className="text-sm text-gray-400">{currency.name}</span>
              {currency.isBaseCurrency && (
                <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">
                  Base
                </span>
              )}
            </div>
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export default CurrencySelector;
