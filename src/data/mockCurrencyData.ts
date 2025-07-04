
import { Currency, ExchangeRate, CurrencyGainLoss, EntityCurrencySettings } from '@/types/currency';

export const mockCurrencies: Currency[] = [
  {
    id: '1',
    code: 'USD',
    name: 'US Dollar',
    symbol: '$',
    decimalPlaces: 2,
    isActive: true,
    isBaseCurrency: true,
    roundingRule: 'standard',
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z'
  },
  {
    id: '2',
    code: 'EUR',
    name: 'Euro',
    symbol: '€',
    decimalPlaces: 2,
    isActive: true,
    isBaseCurrency: false,
    roundingRule: 'standard',
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z'
  },
  {
    id: '3',
    code: 'GBP',
    name: 'British Pound',
    symbol: '£',
    decimalPlaces: 2,
    isActive: true,
    isBaseCurrency: false,
    roundingRule: 'standard',
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z'
  },
  {
    id: '4',
    code: 'JPY',
    name: 'Japanese Yen',
    symbol: '¥',
    decimalPlaces: 0,
    isActive: true,
    isBaseCurrency: false,
    roundingRule: 'standard',
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z'
  }
];

export const mockExchangeRates: ExchangeRate[] = [
  {
    id: '1',
    fromCurrencyId: '1',
    toCurrencyId: '2',
    rate: 0.85,
    isManual: false,
    effectiveDate: '2024-01-15T00:00:00Z',
    source: 'api',
    createdAt: '2024-01-15T00:00:00Z'
  },
  {
    id: '2',
    fromCurrencyId: '1',
    toCurrencyId: '3',
    rate: 0.78,
    isManual: false,
    effectiveDate: '2024-01-15T00:00:00Z',
    source: 'api',
    createdAt: '2024-01-15T00:00:00Z'
  },
  {
    id: '3',
    fromCurrencyId: '1',
    toCurrencyId: '4',
    rate: 150.25,
    isManual: true,
    effectiveDate: '2024-01-15T00:00:00Z',
    source: 'manual',
    createdBy: 'admin',
    createdAt: '2024-01-15T00:00:00Z'
  }
];

export const mockEntitySettings: EntityCurrencySettings[] = [
  {
    id: '1',
    entityId: 'company-1',
    entityType: 'company',
    baseCurrencyId: '1',
    allowedCurrencies: ['1', '2', '3', '4'],
    defaultRoundingRule: 'standard',
    autoConvertToBase: true,
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z'
  }
];
