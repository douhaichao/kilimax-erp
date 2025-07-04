
import { Currency, ExchangeRate } from '@/types/currency';

export const formatCurrency = (
  amount: number,
  currency: Currency,
  showSymbol: boolean = true
): string => {
  const roundedAmount = applyRounding(amount, currency);
  
  const formatter = new Intl.NumberFormat('en-US', {
    style: showSymbol ? 'currency' : 'decimal',
    currency: currency.code,
    minimumFractionDigits: currency.decimalPlaces,
    maximumFractionDigits: currency.decimalPlaces,
  });

  if (showSymbol && currency.symbol !== '$') {
    return `${currency.symbol}${roundedAmount.toFixed(currency.decimalPlaces)}`;
  }

  return formatter.format(roundedAmount);
};

export const applyRounding = (amount: number, currency: Currency): number => {
  const factor = Math.pow(10, currency.decimalPlaces);
  
  switch (currency.roundingRule) {
    case 'up':
      return Math.ceil(amount * factor) / factor;
    case 'down':
      return Math.floor(amount * factor) / factor;
    case 'bankers':
      return Math.round(amount * factor) / factor;
    default: // standard
      return Math.round(amount * factor) / factor;
  }
};

export const convertCurrency = (
  amount: number,
  exchangeRate: ExchangeRate,
  targetCurrency: Currency
): number => {
  const convertedAmount = amount * exchangeRate.rate;
  return applyRounding(convertedAmount, targetCurrency);
};

export const calculateGainLoss = (
  originalAmount: number,
  settledAmount: number,
  baseCurrency: Currency
): number => {
  const difference = settledAmount - originalAmount;
  return applyRounding(difference, baseCurrency);
};

export const getCurrencyPairs = (currencies: Currency[]): string[] => {
  const pairs: string[] = [];
  for (let i = 0; i < currencies.length; i++) {
    for (let j = 0; j < currencies.length; j++) {
      if (i !== j) {
        pairs.push(`${currencies[i].code}/${currencies[j].code}`);
      }
    }
  }
  return pairs;
};
