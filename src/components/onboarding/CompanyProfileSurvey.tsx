import React, { useState } from 'react';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { ArrowRight, MapPin, Globe, Bot, Sparkles, Zap, Users, Briefcase } from 'lucide-react';
import { OnboardingData } from '@/pages/OnboardingJourney';
interface CompanyProfileSurveyProps {
  onNext: (data: Partial<OnboardingData>) => void;
  data: OnboardingData;
}
const countries = [{
  code: 'US',
  name: 'United States',
  flag: '🇺🇸',
  currency: 'USD',
  timezone: 'EST'
}, {
  code: 'DE',
  name: 'Germany',
  flag: '🇩🇪',
  currency: 'EUR',
  timezone: 'CET'
}, {
  code: 'GB',
  name: 'United Kingdom',
  flag: '🇬🇧',
  currency: 'GBP',
  timezone: 'GMT'
}, {
  code: 'FR',
  name: 'France',
  flag: '🇫🇷',
  currency: 'EUR',
  timezone: 'CET'
}, {
  code: 'CA',
  name: 'Canada',
  flag: '🇨🇦',
  currency: 'CAD',
  timezone: 'EST'
}, {
  code: 'AU',
  name: 'Australia',
  flag: '🇦🇺',
  currency: 'AUD',
  timezone: 'AEST'
}];
const industries = ['Manufacturing', 'Wholesale Distribution', 'Professional Services', 'Technology', 'Healthcare', 'Retail', 'Construction', 'Food & Beverage'];
const employeeCounts = ['1-5 employees', '6-20 employees', '21-50 employees', '51-100 employees', '101-500 employees', '500+ employees'];
const userRoles = ['Owner/Founder', 'CEO/President', 'CFO', 'Operations Manager', 'Finance Manager', 'Accountant', 'Administrator', 'Other'];
export const CompanyProfileSurvey: React.FC<CompanyProfileSurveyProps> = ({
  onNext,
  data
}) => {
  const [formData, setFormData] = useState({
    companyName: data.companyName || '',
    country: data.country || '',
    industry: data.industry || '',
    address: data.address || '',
    phone: data.phone || '',
    email: data.email || '',
    employeeCount: (data as any).employeeCount || '',
    userRole: (data as any).userRole || ''
  });
  const selectedCountry = countries.find(c => c.code === formData.country);
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onNext(formData);
  };
  const showVATSuggestion = formData.country === 'DE';
  return <div className="min-h-screen bg-gradient-to-br from-background via-primary/5 to-secondary/5 relative overflow-hidden">
      {/* AI-Enhanced Background */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <Bot className="w-96 h-96 text-primary animate-pulse" />
        </div>
        <div className="absolute top-1/4 left-1/4 transform -translate-x-1/2 -translate-y-1/2">
          <Sparkles className="w-24 h-24 text-primary/30 animate-pulse" style={{
          animationDelay: '1s'
        }} />
        </div>
        <div className="absolute bottom-1/4 right-1/4 transform translate-x-1/2 translate-y-1/2">
          <Zap className="w-32 h-32 text-primary/20 animate-pulse" style={{
          animationDelay: '2s'
        }} />
        </div>
      </div>

      <div className="relative z-10 container mx-auto px-4 py-8">
        {/* Progress Bar */}
        <div className="max-w-md mx-auto mb-8">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-muted-foreground">Step 1 of 2</span>
            <span className="text-sm font-medium text-primary">50% Complete</span>
          </div>
          <Progress value={50} className="h-2" />
        </div>

        {/* Main Content */}
        <div className="max-w-4xl mx-auto">
          {/* AI Assistant Introduction */}
          <div className="text-center mb-8">
            <div className="flex items-center justify-center mb-4">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center animate-pulse">
                <Bot className="w-8 h-8 text-primary" />
              </div>
            </div>
            <h1 className="text-3xl font-bold text-foreground mb-2 flex items-center justify-center gap-2">
              <Sparkles className="w-6 h-6 text-primary animate-pulse" />
              Tell Us About Your Company
              <Sparkles className="w-6 h-6 text-primary animate-pulse" />
            </h1>
            <p className="text-muted-foreground">
              Help us personalize your experience with a few quick questions
            </p>
          </div>

          <Card className="hover:shadow-lg transition-shadow duration-300">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bot className="w-5 h-5 text-primary animate-pulse" />
                Company Information
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Company Name */}
                <div className="space-y-2">
                  <Label htmlFor="companyName" className="text-base font-medium text-foreground flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-primary" />
                    What's your company name? *
                  </Label>
                  <Input id="companyName" type="text" placeholder="Enter your company name" value={formData.companyName} onChange={e => setFormData(prev => ({
                  ...prev,
                  companyName: e.target.value
                }))} className="h-12" required />
                </div>

                {/* Country and Industry Row */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="country" className="text-base font-medium text-foreground flex items-center gap-2">
                      <Globe className="w-4 h-4 text-primary" />
                      Which country is your business located in? *
                    </Label>
                    <Select value={formData.country} onValueChange={value => setFormData(prev => ({
                    ...prev,
                    country: value
                  }))}>
                      <SelectTrigger className="h-12">
                        <SelectValue placeholder="Select your country" />
                      </SelectTrigger>
                      <SelectContent>
                        {countries.map(country => <SelectItem key={country.code} value={country.code}>
                            <div className="flex items-center space-x-2">
                              <span className="text-lg">{country.flag}</span>
                              <span>{country.name}</span>
                            </div>
                          </SelectItem>)}
                      </SelectContent>
                    </Select>
                    {selectedCountry && <p className="text-xs text-muted-foreground">
                        Currency: {selectedCountry.currency} • Timezone: {selectedCountry.timezone}
                      </p>}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="industry" className="text-base font-medium text-foreground flex items-center gap-2">
                      <Zap className="w-4 h-4 text-primary" />
                      What industry are you in? *
                    </Label>
                    <Select value={formData.industry} onValueChange={value => setFormData(prev => ({
                    ...prev,
                    industry: value
                  }))}>
                      <SelectTrigger className="h-12">
                        <SelectValue placeholder="Select your industry" />
                      </SelectTrigger>
                      <SelectContent>
                        {industries.map(industry => <SelectItem key={industry} value={industry}>
                            {industry}
                          </SelectItem>)}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {/* Employee Count and Role Row */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="employeeCount" className="text-base font-medium text-foreground flex items-center gap-2">
                      <Users className="w-4 h-4 text-primary" />
                      How many people work at your company? *
                    </Label>
                    <Select value={formData.employeeCount} onValueChange={value => setFormData(prev => ({
                    ...prev,
                    employeeCount: value
                  }))}>
                      <SelectTrigger className="h-12">
                        <SelectValue placeholder="Number of employees" />
                      </SelectTrigger>
                      <SelectContent>
                        {employeeCounts.map(count => <SelectItem key={count} value={count}>
                            {count}
                          </SelectItem>)}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="userRole" className="text-base font-medium text-foreground flex items-center gap-2">
                      <Briefcase className="w-4 h-4 text-primary" />
                      What's your role in the company? *
                    </Label>
                    <Select value={formData.userRole} onValueChange={value => setFormData(prev => ({
                    ...prev,
                    userRole: value
                  }))}>
                      <SelectTrigger className="h-12">
                        <SelectValue placeholder="Select your role" />
                      </SelectTrigger>
                      <SelectContent>
                        {userRoles.map(role => <SelectItem key={role} value={role}>
                            {role}
                          </SelectItem>)}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {/* Address */}
                <div className="space-y-2">
                  <Label htmlFor="address" className="text-base font-medium text-foreground flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-primary" />
                    What's your business address?
                  </Label>
                  <Textarea id="address" placeholder="Enter your business address" value={formData.address} onChange={e => setFormData(prev => ({
                  ...prev,
                  address: e.target.value
                }))} className="min-h-[80px]" />
                </div>

                {/* Contact Info Row */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    
                    
                  </div>

                  <div className="space-y-2">
                    
                    <Input id="email" type="email" placeholder="hello@company.com" value={formData.email} onChange={e => setFormData(prev => ({
                    ...prev,
                    email: e.target.value
                  }))} className="h-12" />
                  </div>
                </div>

                {/* AI Smart Suggestion */}
                {showVATSuggestion && <div className="bg-gradient-to-r from-primary/10 to-secondary/10 border border-primary/20 rounded-lg p-4 flex items-start space-x-3 animate-fade-in">
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
                  </div>}

                {/* Continue Button */}
                <Button type="submit" className="w-full h-12 text-lg bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 transform hover:scale-[1.02] transition-all duration-200 shadow-lg" disabled={!formData.companyName || !formData.country || !formData.industry || !formData.employeeCount || !formData.userRole}>
                  <Bot className="w-5 h-5 mr-2 animate-pulse" />
                  Continue to Invoice Setup
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>;
};