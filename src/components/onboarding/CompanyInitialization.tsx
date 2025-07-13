import React, { useState, useRef } from 'react';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { ArrowRight, MapPin, Globe, Upload, FileImage, Eye, Bot, Sparkles, Zap } from 'lucide-react';
import { OnboardingData } from '@/pages/OnboardingJourney';

interface CompanyInitializationProps {
  onNext: (data: Partial<OnboardingData>) => void;
  data: OnboardingData;
}

const countries = [
  { code: 'US', name: 'United States', flag: '🇺🇸', currency: 'USD', timezone: 'EST' },
  { code: 'DE', name: 'Germany', flag: '🇩🇪', currency: 'EUR', timezone: 'CET' },
  { code: 'GB', name: 'United Kingdom', flag: '🇬🇧', currency: 'GBP', timezone: 'GMT' },
  { code: 'FR', name: 'France', flag: '🇫🇷', currency: 'EUR', timezone: 'CET' },
  { code: 'CA', name: 'Canada', flag: '🇨🇦', currency: 'CAD', timezone: 'EST' },
  { code: 'AU', name: 'Australia', flag: '🇦🇺', currency: 'AUD', timezone: 'AEST' },
];

const industries = [
  'Manufacturing',
  'Wholesale Distribution',
  'Professional Services',
  'Technology',
  'Healthcare',
  'Retail',
  'Construction',
  'Food & Beverage',
];

export const CompanyInitialization: React.FC<CompanyInitializationProps> = ({ onNext, data }) => {
  const [formData, setFormData] = useState({
    companyName: data.companyName || '',
    country: data.country || '',
    industry: data.industry || '',
    logo: data.logo || '',
    address: data.address || '',
    phone: data.phone || '',
    email: data.email || '',
  });
  
  const fileInputRef = useRef<HTMLInputElement>(null);

  const selectedCountry = countries.find(c => c.code === formData.country);
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onNext(formData);
  };

  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const result = event.target?.result as string;
        setFormData(prev => ({ ...prev, logo: result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const showVATSuggestion = formData.country === 'DE';

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-primary/5 to-secondary/5 relative overflow-hidden">
      {/* AI-Enhanced Background */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <Bot className="w-96 h-96 text-primary animate-pulse" />
        </div>
        <div className="absolute top-1/4 left-1/4 transform -translate-x-1/2 -translate-y-1/2">
          <Sparkles className="w-24 h-24 text-primary/30 animate-pulse" style={{ animationDelay: '1s' }} />
        </div>
        <div className="absolute bottom-1/4 right-1/4 transform translate-x-1/2 translate-y-1/2">
          <Zap className="w-32 h-32 text-primary/20 animate-pulse" style={{ animationDelay: '2s' }} />
        </div>
      </div>

      <div className="relative z-10 container mx-auto px-4 py-8">
        {/* Progress Bar */}
        <div className="max-w-md mx-auto mb-8">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-muted-foreground">Step 1 of 7</span>
            <span className="text-sm font-medium text-primary">20% Complete</span>
          </div>
          <Progress value={20} className="h-2" />
        </div>

        {/* Main Content */}
        <div className="max-w-6xl mx-auto">
          {/* AI Assistant Introduction */}
          <div className="text-center mb-8">
            <div className="flex items-center justify-center mb-4">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center animate-pulse">
                <Bot className="w-8 h-8 text-primary" />
              </div>
            </div>
            <h1 className="text-3xl font-bold text-foreground mb-2 flex items-center justify-center gap-2">
              <Sparkles className="w-6 h-6 text-primary animate-pulse" />
              AI-Powered Business Setup
              <Sparkles className="w-6 h-6 text-primary animate-pulse" />
            </h1>
            <p className="text-muted-foreground">
              I'll help you configure your business hub with intelligent recommendations
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {/* Form Section */}
            <div className="space-y-6">

              <Card className="hover:shadow-lg transition-shadow duration-300">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Bot className="w-5 h-5 text-primary animate-pulse" />
                    Company Information & Branding
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Company Name and Logo Row */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
                      <div className="md:col-span-2 space-y-2">
                        <Label htmlFor="companyName" className="text-sm font-medium flex items-center gap-1">
                          Company Name *
                          <Sparkles className="w-3 h-3 text-primary" />
                        </Label>
                        <Input
                          id="companyName"
                          type="text"
                          placeholder="Enter your company name"
                          value={formData.companyName}
                          onChange={(e) => setFormData(prev => ({ ...prev, companyName: e.target.value }))}
                          className="h-12"
                          required
                        />
                      </div>
                      
                      {/* Compact Logo Section */}
                      <div className="space-y-2">
                        <Label htmlFor="logo" className="text-sm font-medium flex items-center gap-1">
                          Logo
                          <FileImage className="w-3 h-3 text-primary" />
                        </Label>
                        <div className="flex items-center gap-2">
                          {formData.logo && (
                            <div className="w-12 h-12 rounded-lg border bg-muted flex items-center justify-center overflow-hidden">
                              <img 
                                src={formData.logo} 
                                alt="Company logo" 
                                className="w-full h-full object-contain"
                              />
                            </div>
                          )}
                          <div className="flex-1">
                            <input
                              ref={fileInputRef}
                              type="file"
                              accept="image/*"
                              onChange={handleLogoUpload}
                              className="hidden"
                            />
                            <Button
                              type="button"
                              variant="outline"
                              size="sm"
                              onClick={() => fileInputRef.current?.click()}
                              className="w-full h-12"
                            >
                              <Upload className="w-4 h-4 mr-1" />
                              {formData.logo ? 'Change' : 'Upload'}
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Country and Industry Row */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="country" className="text-sm font-medium flex items-center gap-1">
                          Country *
                          <Globe className="w-3 h-3 text-primary" />
                        </Label>
                        <Select value={formData.country} onValueChange={(value) => setFormData(prev => ({ ...prev, country: value }))}>
                          <SelectTrigger className="h-12">
                            <SelectValue placeholder="Select your country" />
                          </SelectTrigger>
                          <SelectContent>
                            {countries.map((country) => (
                              <SelectItem key={country.code} value={country.code}>
                                <div className="flex items-center space-x-2">
                                  <span className="text-lg">{country.flag}</span>
                                  <span>{country.name}</span>
                                </div>
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        {selectedCountry && (
                          <p className="text-xs text-muted-foreground">
                            Currency: {selectedCountry.currency} • Timezone: {selectedCountry.timezone}
                          </p>
                        )}
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="industry" className="text-sm font-medium flex items-center gap-1">
                          Industry *
                          <Zap className="w-3 h-3 text-primary" />
                        </Label>
                        <Select value={formData.industry} onValueChange={(value) => setFormData(prev => ({ ...prev, industry: value }))}>
                          <SelectTrigger className="h-12">
                            <SelectValue placeholder="Select your industry" />
                          </SelectTrigger>
                          <SelectContent>
                            {industries.map((industry) => (
                              <SelectItem key={industry} value={industry}>
                                {industry}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <p className="text-xs text-muted-foreground flex items-center gap-1">
                          <Bot className="w-3 h-3" />
                          AI will customize your templates
                        </p>
                      </div>
                    </div>

                    {/* Address */}
                    <div className="space-y-2">
                      <Label htmlFor="address" className="text-sm font-medium flex items-center gap-1">
                        Business Address
                        <MapPin className="w-3 h-3 text-primary" />
                      </Label>
                      <Textarea
                        id="address"
                        placeholder="Enter your business address"
                        value={formData.address}
                        onChange={(e) => setFormData(prev => ({ ...prev, address: e.target.value }))}
                        className="min-h-[80px]"
                      />
                    </div>

                    {/* Contact Info Row */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="phone" className="text-sm font-medium">
                          Phone Number
                        </Label>
                        <Input
                          id="phone"
                          type="tel"
                          placeholder="+1 (555) 123-4567"
                          value={formData.phone}
                          onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                          className="h-12"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="email" className="text-sm font-medium">
                          Business Email
                        </Label>
                        <Input
                          id="email"
                          type="email"
                          placeholder="hello@company.com"
                          value={formData.email}
                          onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                          className="h-12"
                        />
                      </div>
                    </div>

                  </form>
                </CardContent>
              </Card>

              {/* AI Smart Suggestion */}
              {showVATSuggestion && (
                <div className="bg-gradient-to-r from-primary/10 to-secondary/10 border border-primary/20 rounded-lg p-4 flex items-start space-x-3 animate-fade-in">
                  <div className="w-8 h-8 bg-primary/20 rounded-full flex items-center justify-center animate-pulse">
                    <Bot className="w-4 h-4 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-primary flex items-center gap-1">
                      <Sparkles className="w-3 h-3" />
                      AI Suggestion
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Based in Germany? I recommend EU VAT settings for your business.
                    </p>
                  </div>
                </div>
              )}

              {/* AI-Enhanced Continue Button */}
              <Button 
                onClick={handleSubmit}
                className="w-full h-12 text-lg bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 transform hover:scale-[1.02] transition-all duration-200 shadow-lg"
                disabled={!formData.companyName || !formData.country || !formData.industry}
              >
                <Bot className="w-5 h-5 mr-2 animate-pulse" />
                Continue with AI Setup
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </div>

            {/* AI-Enhanced Live Preview Section */}
            <div className="space-y-6 animate-fade-in">
              <Card className="border-primary/20 shadow-lg">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Bot className="w-5 h-5 text-primary animate-pulse" />
                      <Eye className="w-5 h-5" />
                      AI Live Preview - {formData.industry === 'Retail' ? 'Receipt' : 'Invoice'} Template
                      <Sparkles className="w-4 h-4 text-primary animate-pulse" />
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    {formData.industry === 'Retail' ? (
                      // Receipt-style format for Retail
                      <div className="bg-white text-black p-6 rounded-lg border shadow-sm max-w-sm mx-auto">
                        {/* Receipt Header */}
                        <div className="text-center mb-6">
                          {formData.logo && (
                            <div className="w-16 h-16 rounded overflow-hidden mx-auto mb-2">
                              <img 
                                src={formData.logo} 
                                alt="Company logo" 
                                className="w-full h-full object-contain"
                              />
                            </div>
                          )}
                          <h1 className="text-lg font-bold text-gray-900">
                            {formData.companyName || 'Your Store Name'}
                          </h1>
                          {formData.address && (
                            <p className="text-xs text-gray-600 mt-1 whitespace-pre-line">
                              {formData.address}
                            </p>
                          )}
                          <div className="text-xs text-gray-600 mt-1">
                            {formData.phone && <div>Tel: {formData.phone}</div>}
                            {formData.email && <div>Email: {formData.email}</div>}
                          </div>
                        </div>

                        <div className="border-t border-dashed border-gray-400 pt-4 mb-4">
                          <div className="text-center text-xs text-gray-600 mb-2">
                            {new Date().toLocaleDateString()} {new Date().toLocaleTimeString()}
                          </div>
                          <div className="text-center text-xs text-gray-600 mb-4">
                            Receipt #: RCP-001
                          </div>
                        </div>

                        {/* Receipt Items */}
                        <div className="space-y-2 mb-4">
                          <div className="flex justify-between text-sm">
                            <span className="text-gray-900">Sample Item</span>
                            <span className="text-gray-900">$25.99</span>
                          </div>
                          <div className="flex justify-between text-xs text-gray-600">
                            <span>Qty: 1 @ $25.99</span>
                            <span></span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span className="text-gray-900">Another Item</span>
                            <span className="text-gray-900">$15.00</span>
                          </div>
                          <div className="flex justify-between text-xs text-gray-600">
                            <span>Qty: 2 @ $7.50</span>
                            <span></span>
                          </div>
                        </div>

                        <div className="border-t border-dashed border-gray-400 pt-2">
                          <div className="flex justify-between text-sm">
                            <span className="text-gray-600">Subtotal:</span>
                            <span className="text-gray-900">$40.99</span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span className="text-gray-600">Tax:</span>
                            <span className="text-gray-900">$3.28</span>
                          </div>
                          <div className="flex justify-between text-lg font-bold border-t pt-2">
                            <span className="text-gray-900">Total:</span>
                            <span className="text-gray-900">$44.27</span>
                          </div>
                        </div>

                        <div className="text-center mt-6 text-xs text-gray-600">
                          <p>Thank you for shopping with us!</p>
                          <p>Return Policy: 30 days</p>
                        </div>
                      </div>
                    ) : (
                      // Traditional invoice format for other industries
                      <div className="bg-white text-black p-6 rounded-lg border shadow-sm min-h-[600px]">
                        {/* Invoice Header */}
                        <div className="flex justify-between items-start mb-8">
                          <div className="flex items-center gap-4">
                            {formData.logo && (
                              <div className="w-16 h-16 rounded overflow-hidden">
                                <img 
                                  src={formData.logo} 
                                  alt="Company logo" 
                                  className="w-full h-full object-contain"
                                />
                              </div>
                            )}
                            <div>
                              <h1 className="text-2xl font-bold text-gray-900">
                                {formData.companyName || 'Your Company Name'}
                              </h1>
                              {formData.address && (
                                <p className="text-sm text-gray-600 mt-1 whitespace-pre-line">
                                  {formData.address}
                                </p>
                              )}
                              <div className="flex gap-4 mt-2 text-sm text-gray-600">
                                {formData.phone && <span>Tel: {formData.phone}</span>}
                                {formData.email && <span>Email: {formData.email}</span>}
                              </div>
                            </div>
                          </div>
                          <div className="text-right">
                            <h2 className="text-xl font-bold text-gray-900">INVOICE</h2>
                            <p className="text-sm text-gray-600">Invoice #: INV-001</p>
                            <p className="text-sm text-gray-600">Date: {new Date().toLocaleDateString()}</p>
                          </div>
                        </div>

                        {/* Bill To Section */}
                        <div className="mb-6">
                          <h3 className="font-semibold text-gray-900 mb-2">Bill To:</h3>
                          <div className="text-sm text-gray-600">
                            <p>Sample Customer</p>
                            <p>123 Customer Street</p>
                            <p>City, State 12345</p>
                          </div>
                        </div>

                        {/* Invoice Items */}
                        <div className="mb-8">
                          <table className="w-full">
                            <thead>
                              <tr className="border-b border-gray-300">
                                <th className="text-left py-2 text-sm font-semibold text-gray-900">Description</th>
                                <th className="text-center py-2 text-sm font-semibold text-gray-900">Qty</th>
                                <th className="text-right py-2 text-sm font-semibold text-gray-900">Rate</th>
                                <th className="text-right py-2 text-sm font-semibold text-gray-900">Amount</th>
                              </tr>
                            </thead>
                            <tbody>
                              <tr className="border-b border-gray-200">
                                <td className="py-2 text-sm text-gray-600">Sample Product/Service</td>
                                <td className="text-center py-2 text-sm text-gray-600">1</td>
                                <td className="text-right py-2 text-sm text-gray-600">$100.00</td>
                                <td className="text-right py-2 text-sm text-gray-600">$100.00</td>
                              </tr>
                            </tbody>
                          </table>
                        </div>

                        {/* Total Section */}
                        <div className="flex justify-end">
                          <div className="w-48">
                            <div className="flex justify-between py-1 text-sm">
                              <span className="text-gray-600">Subtotal:</span>
                              <span className="text-gray-900">$100.00</span>
                            </div>
                            <div className="flex justify-between py-1 text-sm">
                              <span className="text-gray-600">Tax:</span>
                              <span className="text-gray-900">$8.00</span>
                            </div>
                            <div className="flex justify-between py-2 text-base font-bold border-t border-gray-300">
                              <span className="text-gray-900">Total:</span>
                              <span className="text-gray-900">$108.00</span>
                            </div>
                          </div>
                        </div>

                        {/* Terms */}
                        <div className="mt-8 pt-6 border-t border-gray-200">
                          <h4 className="font-medium text-gray-900 mb-2">Terms & Conditions</h4>
                          <p className="text-xs text-gray-600">
                            Payment is due within 30 days. Thank you for your business!
                          </p>
                        </div>
                      </div>
                    )}
                    
                    {/* AI Enhancement Notice */}
                    <div className="mt-4 p-3 bg-primary/5 rounded-lg border border-primary/20">
                      <p className="text-xs text-muted-foreground flex items-center gap-2">
                        <Bot className="w-3 h-3 text-primary" />
                        AI automatically selected the best template format for your {formData.industry || 'business'} industry
                      </p>
                    </div>
                  </CardContent>
                </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};