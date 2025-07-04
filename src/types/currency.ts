
export interface Currency {
  id: string;
  code: string; // ISO 4217 currency code (USD, EUR, etc.)
  name: string;
  symbol: string;
  decimalPlaces: number;
  isActive: boolean;
  isBaseCurrency: boolean;
  roundingRule: 'standard' | 'up' | 'down' | 'bankers';
  createdAt: string;
  updatedAt: string;
}

export interface ExchangeRate {
  id: string;
  fromCurrencyId: string;
  toCurrencyId: string;
  rate: number;
  isManual: boolean;
  effectiveDate: string;
  source: 'api' | 'manual' | 'bank';
  createdBy?: string;
  createdAt: string;
}

export interface CurrencyConversion {
  id: string;
  fromAmount: number;
  toAmount: number;
  fromCurrencyId: string;
  toCurrencyId: string;
  exchangeRateId: string;
  conversionDate: string;
  transactionType: 'invoice' | 'payment' | 'adjustment' | 'report';
  transactionId?: string;
}

export interface CurrencyGainLoss {
  id: string;
  transactionId: string;
  transactionType: string;
  originalAmount: number;
  settledAmount: number;
  currencyId: string;
  gainLossAmount: number;
  calculationDate: string;
  status: 'realized' | 'unrealized';
}

export interface EntityCurrencySettings {
  id: string;
  entityId: string;
  entityType: 'company' | 'region' | 'subsidiary';
  baseCurrencyId: string;
  allowedCurrencies: string[];
  defaultRoundingRule: 'standard' | 'up' | 'down' | 'bankers';
  autoConvertToBase: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface CurrencyTaxRule {
  id: string;
  currencyId: string;
  countryCode: string;
  taxType: string;
  taxRate: number;
  isActive: boolean;
  effectiveDate: string;
  expiryDate?: string;
}

export type ExchangeRateProvider = 'fixer' | 'openexchangerates' | 'currencylayer' | 'manual';
