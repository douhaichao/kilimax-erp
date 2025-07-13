import React, { useState, useRef } from 'react';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { ArrowRight, MapPin, Globe, Upload, FileImage, Eye } from 'lucide-react';
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
  const [showPreview, setShowPreview] = useState(false);
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
      {/* World Map Background */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <Globe className="w-96 h-96 text-primary" />
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
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-foreground mb-2">
              Let's set up your business hub
            </h1>
            <p className="text-muted-foreground">
              Add your company details and branding to personalize your experience
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {/* Form Section */}
            <div className="space-y-6">

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Globe className="w-5 h-5" />
                    Company Information
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-4">
                    {/* Company Name */}
                    <div className="space-y-2">
                      <Label htmlFor="companyName" className="text-sm font-medium">
                        Company Name *
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

                    {/* Country Selector */}
                    <div className="space-y-2">
                      <Label htmlFor="country" className="text-sm font-medium">
                        Country *
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

                    {/* Industry Selector */}
                    <div className="space-y-2">
                      <Label htmlFor="industry" className="text-sm font-medium">
                        Industry *
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
                      <p className="text-xs text-muted-foreground">
                        This customizes your workflow templates
                      </p>
                    </div>

                    {/* Company Address */}
                    <div className="space-y-2">
                      <Label htmlFor="address" className="text-sm font-medium">
                        Business Address
                      </Label>
                      <Textarea
                        id="address"
                        placeholder="Enter your business address"
                        value={formData.address}
                        onChange={(e) => setFormData(prev => ({ ...prev, address: e.target.value }))}
                        className="min-h-[80px]"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      {/* Phone */}
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
                        />
                      </div>

                      {/* Email */}
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
                        />
                      </div>
                    </div>
                  </form>
                </CardContent>
              </Card>

              {/* Company Branding */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <FileImage className="w-5 h-5" />
                    Company Branding
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* Logo Upload */}
                  <div className="space-y-2">
                    <Label htmlFor="logo" className="text-sm font-medium">
                      Company Logo
                    </Label>
                    <div className="flex items-center gap-4">
                      {formData.logo && (
                        <div className="w-16 h-16 rounded-lg border bg-muted flex items-center justify-center overflow-hidden">
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
                          onClick={() => fileInputRef.current?.click()}
                          className="w-full h-12"
                        >
                          <Upload className="w-4 h-4 mr-2" />
                          {formData.logo ? 'Change Logo' : 'Upload Logo'}
                        </Button>
                      </div>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      Recommended: PNG or JPG, max 2MB
                    </p>
                  </div>

                  {/* Preview Toggle */}
                  <Button
                    type="button"
                    variant="secondary"
                    onClick={() => setShowPreview(!showPreview)}
                    className="w-full"
                  >
                    <Eye className="w-4 h-4 mr-2" />
                    {showPreview ? 'Hide Preview' : 'Show Live Preview'}
                  </Button>
                </CardContent>
              </Card>

              {/* Smart Suggestion */}
              {showVATSuggestion && (
                <div className="bg-secondary/10 border border-secondary/20 rounded-lg p-4 flex items-start space-x-3">
                  <MapPin className="w-5 h-5 text-secondary mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-sm font-medium text-secondary">Smart Suggestion</p>
                    <p className="text-sm text-muted-foreground">
                      Based in Germany? We recommend EU VAT settings for your business.
                    </p>
                  </div>
                </div>
              )}

              {/* Continue Button */}
              <Button 
                onClick={handleSubmit}
                className="w-full h-12 text-lg"
                disabled={!formData.companyName || !formData.country || !formData.industry}
              >
                Continue
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </div>

            {/* Live Preview Section */}
            {showPreview && (
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Eye className="w-5 h-5" />
                      Live Preview - Invoice Template
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
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
                          <div className="flex justify-between py-2 text-lg font-bold border-t border-gray-300">
                            <span className="text-gray-900">Total:</span>
                            <span className="text-gray-900">$108.00</span>
                          </div>
                        </div>
                      </div>

                      {/* Footer */}
                      <div className="mt-8 text-center text-xs text-gray-500">
                        <p>Thank you for your business!</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};