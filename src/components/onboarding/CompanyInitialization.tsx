import React, { useState } from 'react';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ArrowRight, MapPin, Globe } from 'lucide-react';
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
  });

  const selectedCountry = countries.find(c => c.code === formData.country);
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onNext(formData);
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

        {/* Main Form */}
        <div className="max-w-md mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-foreground mb-2">
              Let's set up your business hub
            </h1>
            <p className="text-muted-foreground">
              We'll customize your experience based on your business needs
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Company Name */}
            <div className="space-y-2">
              <Label htmlFor="companyName" className="text-sm font-medium">
                Company Name
              </Label>
              <Input
                id="companyName"
                type="text"
                placeholder="Enter your company name"
                value={formData.companyName}
                onChange={(e) => setFormData(prev => ({ ...prev, companyName: e.target.value }))}
                className="h-12 text-lg"
                required
              />
            </div>

            {/* Country Selector */}
            <div className="space-y-2">
              <Label htmlFor="country" className="text-sm font-medium">
                Country
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
                Industry
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
              type="submit" 
              className="w-full h-12 text-lg"
              disabled={!formData.companyName || !formData.country || !formData.industry}
            >
              Continue
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};