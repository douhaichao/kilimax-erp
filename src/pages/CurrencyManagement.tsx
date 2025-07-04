import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Search, Settings, BarChart3, Mountain } from 'lucide-react';
import { mockCurrencies, mockExchangeRates } from '@/data/mockCurrencyData';
import { Currency, ExchangeRate } from '@/types/currency';
import CurrencyConverter from '@/components/currency/CurrencyConverter';
import ExchangeRatePanel from '@/components/currency/ExchangeRatePanel';
import CurrencyStats from '@/components/currency/CurrencyStats';
import AddCurrencyModal from '@/components/currency/AddCurrencyModal';
import CurrencyList from '@/components/currency/CurrencyList';
import { useToast } from "@/hooks/use-toast";

const CurrencyManagement = () => {
  const [currencies, setCurrencies] = useState<Currency[]>(mockCurrencies);
  const [exchangeRates, setExchangeRates] = useState<ExchangeRate[]>(mockExchangeRates);
  const [searchTerm, setSearchTerm] = useState('');
  const { toast } = useToast();

  const baseCurrency = currencies.find(c => c.isBaseCurrency) || currencies[0];

  const handleAddCurrency = (newCurrencyData: Omit<Currency, 'id' | 'createdAt' | 'updatedAt'>) => {
    const newCurrency: Currency = {
      ...newCurrencyData,
      id: (currencies.length + 1).toString(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    // If this is set as base currency, unset all others
    if (newCurrency.isBaseCurrency) {
      setCurrencies(prev => prev.map(c => ({ ...c, isBaseCurrency: false })));
    }

    setCurrencies(prev => [...prev, newCurrency]);
    console.log('Added new currency:', newCurrency);
  };

  const handleToggleActive = (currencyId: string, isActive: boolean) => {
    setCurrencies(prev => prev.map(c => 
      c.id === currencyId ? { ...c, isActive, updatedAt: new Date().toISOString() } : c
    ));
    toast({
      title: isActive ? "Currency Activated" : "Currency Deactivated",
      description: `Currency has been ${isActive ? 'activated' : 'deactivated'} successfully`
    });
  };

  const handleSetBaseCurrency = (currencyId: string) => {
    setCurrencies(prev => prev.map(c => ({
      ...c,
      isBaseCurrency: c.id === currencyId,
      updatedAt: new Date().toISOString()
    })));
    toast({
      title: "Base Currency Updated",
      description: "Base currency has been changed successfully"
    });
  };

  const handleDeleteCurrency = (currencyId: string) => {
    const currency = currencies.find(c => c.id === currencyId);
    if (currency?.isBaseCurrency) {
      toast({
        title: "Cannot Delete Base Currency",
        description: "You cannot delete the base currency. Please set another currency as base first.",
        variant: "destructive"
      });
      return;
    }

    setCurrencies(prev => prev.filter(c => c.id !== currencyId));
    toast({
      title: "Currency Deleted",
      description: "Currency has been deleted successfully"
    });
  };

  const handleRateUpdate = (rateId: string, newRate: number) => {
    setExchangeRates(prev => prev.map(rate => 
      rate.id === rateId 
        ? { ...rate, rate: newRate, isManual: true, source: 'manual' as const }
        : rate
    ));
    console.log(`Updated exchange rate ${rateId} to ${newRate}`);
  };

  const handleRefreshRates = () => {
    console.log('Refreshing exchange rates from external sources...');
    toast({
      title: "Refreshing Rates",
      description: "Exchange rates are being updated from external sources..."
    });
  };

  return (
    <div className="space-y-6 bg-gradient-to-br from-blue-50 to-indigo-50 min-h-screen p-6">
      {/* Header */}
      <div className="flex justify-between items-center bg-white rounded-xl shadow-sm border border-blue-200 p-6">
        <div className="flex items-center space-x-4">
          <div className="p-3 bg-gradient-to-br from-blue-600 to-indigo-700 rounded-xl shadow-lg">
            <Mountain className="h-8 w-8 text-white" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-blue-800">Multi-Currency Management</h1>
            <p className="text-blue-600 mt-1">Manage currencies, exchange rates, and conversions</p>
          </div>
        </div>
        <div className="flex space-x-3">
          <Button variant="outline" size="sm" className="border-blue-300 text-blue-700 hover:bg-blue-50">
            <Settings className="h-4 w-4 mr-2" />
            Settings
          </Button>
          <AddCurrencyModal onAddCurrency={handleAddCurrency} />
        </div>
      </div>

      {/* Stats */}
      <CurrencyStats 
        currencies={currencies}
        exchangeRates={exchangeRates}
        baseCurrency={baseCurrency}
        totalGainLoss={15420.75}
      />

      {/* Main Content */}
      <Tabs defaultValue="converter" className="space-y-6">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="converter">Currency Converter</TabsTrigger>
          <TabsTrigger value="currencies">Currencies</TabsTrigger>
          <TabsTrigger value="rates">Exchange Rates</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
          <TabsTrigger value="reports">Reports</TabsTrigger>
        </TabsList>

        <TabsContent value="converter" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <CurrencyConverter 
              currencies={currencies}
              exchangeRates={exchangeRates}
            />
            
            <Card>
              <CardHeader>
                <CardTitle>Recent Conversions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between items-center p-3 bg-gray-50 rounded">
                    <div>
                      <div className="font-medium">$1,000.00 → €850.00</div>
                      <div className="text-sm text-gray-500">2 minutes ago</div>
                    </div>
                    <div className="text-sm text-gray-600">Rate: 0.8500</div>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-gray-50 rounded">
                    <div>
                      <div className="font-medium">£500.00 → $641.03</div>
                      <div className="text-sm text-gray-500">5 minutes ago</div>
                    </div>
                    <div className="text-sm text-gray-600">Rate: 1.2821</div>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-gray-50 rounded">
                    <div>
                      <div className="font-medium">$250.00 → ¥37,563</div>
                      <div className="text-sm text-gray-500">10 minutes ago</div>
                    </div>
                    <div className="text-sm text-gray-600">Rate: 150.25</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="currencies" className="space-y-6">
          <CurrencyList
            currencies={currencies}
            onToggleActive={handleToggleActive}
            onSetBaseCurrency={handleSetBaseCurrency}
            onDeleteCurrency={handleDeleteCurrency}
          />
        </TabsContent>

        <TabsContent value="rates" className="space-y-6">
          <ExchangeRatePanel
            currencies={currencies}
            exchangeRates={exchangeRates}
            onRateUpdate={handleRateUpdate}
            onRefreshRates={handleRefreshRates}
          />
        </TabsContent>

        <TabsContent value="settings" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Base Currency Settings</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Primary Base Currency</label>
                  <select className="w-full p-2 border rounded-md">
                    {currencies.map(currency => (
                      <option key={currency.id} value={currency.id}>
                        {currency.code} - {currency.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Default Rounding Rule</label>
                  <select className="w-full p-2 border rounded-md">
                    <option value="standard">Standard Rounding</option>
                    <option value="up">Round Up</option>
                    <option value="down">Round Down</option>
                    <option value="bankers">Banker's Rounding</option>
                  </select>
                </div>
                <div className="flex items-center space-x-2">
                  <input type="checkbox" id="autoConvert" className="rounded" />
                  <label htmlFor="autoConvert" className="text-sm">
                    Auto-convert to base currency
                  </label>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Exchange Rate Sources</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 border rounded">
                    <div>
                      <div className="font-medium">Fixer.io</div>
                      <div className="text-sm text-gray-500">Primary rate provider</div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                      <span className="text-sm text-green-600">Active</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between p-3 border rounded">
                    <div>
                      <div className="font-medium">Open Exchange Rates</div>
                      <div className="text-sm text-gray-500">Backup provider</div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                      <span className="text-sm text-yellow-600">Standby</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between p-3 border rounded">
                    <div>
                      <div className="font-medium">Manual Entry</div>
                      <div className="text-sm text-gray-500">Custom rates</div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                      <span className="text-sm text-blue-600">Available</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="reports" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <BarChart3 className="h-5 w-5" />
                <span>Currency Reports & Analytics</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div className="p-4 border rounded-lg">
                  <h3 className="font-semibold mb-2">Gain/Loss Report</h3>
                  <div className="text-2xl font-bold text-green-600">+$15,420.75</div>
                  <div className="text-sm text-gray-500">This month</div>
                </div>
                <div className="p-4 border rounded-lg">
                  <h3 className="font-semibold mb-2">Top Conversion Pair</h3>
                  <div className="text-lg font-medium">USD/EUR</div>
                  <div className="text-sm text-gray-500">1,247 transactions</div>
                </div>
                <div className="p-4 border rounded-lg">
                  <h3 className="font-semibold mb-2">Rate Volatility</h3>
                  <div className="text-lg font-medium text-yellow-600">Medium</div>
                  <div className="text-sm text-gray-500">7-day average</div>
                </div>
              </div>
              
              <div className="mt-8">
                <h3 className="text-lg font-semibold mb-4">Historical Exchange Rates</h3>
                <div className="h-64 bg-gray-100 rounded-lg flex items-center justify-center">
                  <div className="text-gray-500">Chart visualization would go here</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default CurrencyManagement;
