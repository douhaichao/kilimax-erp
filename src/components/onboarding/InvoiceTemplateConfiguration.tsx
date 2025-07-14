import React, { useState } from 'react';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { ArrowRight, ArrowLeft, Eye, Bot, Sparkles, Zap, FileText, Palette, Settings, CreditCard } from 'lucide-react';
import { OnboardingData } from '@/pages/OnboardingJourney';

interface InvoiceTemplateConfigurationProps {
  onNext: (data: Partial<OnboardingData>) => void;
  onBack: () => void;
  data: OnboardingData;
}

const paymentTerms = [
  'Net 30',
  'Net 15',
  'Due on receipt',
  'Net 60',
  'Net 90',
  'Custom',
];

const taxRates = [
  { label: 'No Tax', value: '0' },
  { label: '5%', value: '5' },
  { label: '7%', value: '7' },
  { label: '8.25%', value: '8.25' },
  { label: '10%', value: '10' },
  { label: '15%', value: '15' },
  { label: '20%', value: '20' },
  { label: 'Custom', value: 'custom' },
];

const templateStyles = [
  { id: 'modern', name: 'Modern', preview: 'Clean lines, bold headers' },
  { id: 'classic', name: 'Classic', preview: 'Traditional business style' },
  { id: 'minimal', name: 'Minimal', preview: 'Simple and elegant' },
  { id: 'colorful', name: 'Colorful', preview: 'Brand-focused design' },
];

export const InvoiceTemplateConfiguration: React.FC<InvoiceTemplateConfigurationProps> = ({ onNext, onBack, data }) => {
  const [formData, setFormData] = useState({
    invoicePrefix: 'INV',
    invoiceStartNumber: '1001',
    paymentTerms: 'Net 30',
    taxRate: '0',
    customTaxRate: '',
    taxLabel: 'Tax',
    showTax: true,
    showDiscount: true,
    showNotes: true,
    templateStyle: 'modern',
    primaryColor: '#059669',
    footerText: 'Thank you for your business!',
    bankDetails: '',
    paymentInstructions: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onNext({ 
      ...data,
      invoiceSettings: formData 
    });
  };

  const selectedCountry = data.country;
  const isEU = ['DE', 'FR', 'IT', 'ES', 'NL', 'BE', 'AT'].includes(selectedCountry);

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
            <span className="text-sm text-muted-foreground">Step 2 of 2</span>
            <span className="text-sm font-medium text-primary">100% Complete</span>
          </div>
          <Progress value={100} className="h-2" />
        </div>

        {/* Main Content */}
        <div className="max-w-6xl mx-auto">
          {/* AI Assistant Introduction */}
          <div className="text-center mb-8">
            <div className="flex items-center justify-center mb-4">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center animate-pulse">
                <FileText className="w-8 h-8 text-primary" />
              </div>
            </div>
            <h1 className="text-3xl font-bold text-foreground mb-2 flex items-center justify-center gap-2">
              <Sparkles className="w-6 h-6 text-primary animate-pulse" />
              Invoice Template Configuration
              <Sparkles className="w-6 h-6 text-primary animate-pulse" />
            </h1>
            <p className="text-muted-foreground">
              Customize your invoice template with your company details
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {/* Configuration Section */}
            <div className="space-y-6">
              <Card className="hover:shadow-lg transition-shadow duration-300">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Settings className="w-5 h-5 text-primary" />
                    Invoice Settings
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Invoice Numbering */}
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="invoicePrefix" className="text-sm font-medium">
                          Invoice Prefix
                        </Label>
                        <Input
                          id="invoicePrefix"
                          type="text"
                          placeholder="INV"
                          value={formData.invoicePrefix}
                          onChange={(e) => setFormData(prev => ({ ...prev, invoicePrefix: e.target.value }))}
                          className="h-10"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="invoiceStartNumber" className="text-sm font-medium">
                          Start Number
                        </Label>
                        <Input
                          id="invoiceStartNumber"
                          type="text"
                          placeholder="1001"
                          value={formData.invoiceStartNumber}
                          onChange={(e) => setFormData(prev => ({ ...prev, invoiceStartNumber: e.target.value }))}
                          className="h-10"
                        />
                      </div>
                    </div>

                    {/* Payment Terms */}
                    <div className="space-y-2">
                      <Label htmlFor="paymentTerms" className="text-sm font-medium">
                        Payment Terms
                      </Label>
                      <Select value={formData.paymentTerms} onValueChange={(value) => setFormData(prev => ({ ...prev, paymentTerms: value }))}>
                        <SelectTrigger className="h-10">
                          <SelectValue placeholder="Select payment terms" />
                        </SelectTrigger>
                        <SelectContent>
                          {paymentTerms.map((term) => (
                            <SelectItem key={term} value={term}>
                              {term}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    {/* Tax Configuration */}
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <Label htmlFor="showTax" className="text-sm font-medium">
                          Show Tax on Invoice
                        </Label>
                        <Switch
                          id="showTax"
                          checked={formData.showTax}
                          onCheckedChange={(checked) => setFormData(prev => ({ ...prev, showTax: checked }))}
                        />
                      </div>
                      
                      {formData.showTax && (
                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="taxRate" className="text-sm font-medium">
                              Tax Rate
                            </Label>
                            <Select value={formData.taxRate} onValueChange={(value) => setFormData(prev => ({ ...prev, taxRate: value }))}>
                              <SelectTrigger className="h-10">
                                <SelectValue placeholder="Select tax rate" />
                              </SelectTrigger>
                              <SelectContent>
                                {taxRates.map((rate) => (
                                  <SelectItem key={rate.value} value={rate.value}>
                                    {rate.label}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="taxLabel" className="text-sm font-medium">
                              Tax Label
                            </Label>
                            <Input
                              id="taxLabel"
                              type="text"
                              placeholder={isEU ? "VAT" : "Tax"}
                              value={formData.taxLabel}
                              onChange={(e) => setFormData(prev => ({ ...prev, taxLabel: e.target.value }))}
                              className="h-10"
                            />
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Additional Options */}
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <Label htmlFor="showDiscount" className="text-sm font-medium">
                          Show Discount Field
                        </Label>
                        <Switch
                          id="showDiscount"
                          checked={formData.showDiscount}
                          onCheckedChange={(checked) => setFormData(prev => ({ ...prev, showDiscount: checked }))}
                        />
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <Label htmlFor="showNotes" className="text-sm font-medium">
                          Show Notes Section
                        </Label>
                        <Switch
                          id="showNotes"
                          checked={formData.showNotes}
                          onCheckedChange={(checked) => setFormData(prev => ({ ...prev, showNotes: checked }))}
                        />
                      </div>
                    </div>

                    {/* Footer Text */}
                    <div className="space-y-2">
                      <Label htmlFor="footerText" className="text-sm font-medium">
                        Footer Message
                      </Label>
                      <Textarea
                        id="footerText"
                        placeholder="Thank you for your business!"
                        value={formData.footerText}
                        onChange={(e) => setFormData(prev => ({ ...prev, footerText: e.target.value }))}
                        className="min-h-[60px]"
                      />
                    </div>

                    {/* Payment Instructions */}
                    <div className="space-y-2">
                      <Label htmlFor="paymentInstructions" className="text-sm font-medium">
                        Payment Instructions
                      </Label>
                      <Textarea
                        id="paymentInstructions"
                        placeholder="Please remit payment within 30 days..."
                        value={formData.paymentInstructions}
                        onChange={(e) => setFormData(prev => ({ ...prev, paymentInstructions: e.target.value }))}
                        className="min-h-[60px]"
                      />
                    </div>
                  </form>
                </CardContent>
              </Card>

              {/* Template Style */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Palette className="w-5 h-5 text-primary" />
                    Template Style
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-3">
                    {templateStyles.map((style) => (
                      <div
                        key={style.id}
                        className={`border rounded-lg p-3 cursor-pointer transition-all hover:shadow-md ${
                          formData.templateStyle === style.id 
                            ? 'border-primary bg-primary/5' 
                            : 'border-border hover:border-primary/50'
                        }`}
                        onClick={() => setFormData(prev => ({ ...prev, templateStyle: style.id }))}
                      >
                        <h4 className="font-medium text-sm">{style.name}</h4>
                        <p className="text-xs text-muted-foreground mt-1">{style.preview}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Navigation Buttons */}
              <div className="flex gap-4">
                <Button 
                  type="button"
                  variant="outline"
                  onClick={onBack}
                  className="flex-1 h-12"
                >
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back to Profile
                </Button>
                <Button 
                  onClick={handleSubmit}
                  className="flex-1 h-12 bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70"
                >
                  <Bot className="w-4 h-4 mr-2 animate-pulse" />
                  Complete Setup
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </div>
            </div>

            {/* Live Preview Section */}
            <div className="space-y-6">
              <Card className="border-primary/20 shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Eye className="w-5 h-5" />
                    Live Preview
                    <Sparkles className="w-4 h-4 text-primary animate-pulse" />
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="bg-white text-black p-6 rounded-lg border shadow-sm">
                    {/* Invoice Header */}
                    <div className="flex justify-between items-start mb-6">
                      <div>
                        {data.logo && (
                          <div className="w-16 h-16 rounded overflow-hidden mb-3">
                            <img 
                              src={data.logo} 
                              alt="Company logo" 
                              className="w-full h-full object-contain"
                            />
                          </div>
                        )}
                        <h1 className="text-xl font-bold text-gray-900">
                          {data.companyName || 'Your Company Name'}
                        </h1>
                        {data.address && (
                          <p className="text-sm text-gray-600 mt-1 whitespace-pre-line">
                            {data.address}
                          </p>
                        )}
                        <div className="text-sm text-gray-600 mt-1">
                          {data.phone && <div>Tel: {data.phone}</div>}
                          {data.email && <div>Email: {data.email}</div>}
                        </div>
                      </div>
                      <div className="text-right">
                        <h2 className="text-2xl font-bold text-gray-900">INVOICE</h2>
                        <p className="text-sm text-gray-600 mt-2">
                          #{formData.invoicePrefix}-{formData.invoiceStartNumber}
                        </p>
                        <p className="text-sm text-gray-600">
                          Date: {new Date().toLocaleDateString()}
                        </p>
                        <p className="text-sm text-gray-600">
                          Due: {formData.paymentTerms}
                        </p>
                      </div>
                    </div>

                    {/* Customer Info */}
                    <div className="mb-6">
                      <h3 className="font-medium text-gray-900 mb-2">Bill To:</h3>
                      <div className="text-sm text-gray-600">
                        <p>Sample Customer</p>
                        <p>123 Customer Street</p>
                        <p>Customer City, State 12345</p>
                      </div>
                    </div>

                    {/* Items */}
                    <div className="mb-6">
                      <table className="w-full text-sm">
                        <thead>
                          <tr className="border-b">
                            <th className="text-left py-2">Description</th>
                            <th className="text-right py-2">Qty</th>
                            <th className="text-right py-2">Rate</th>
                            <th className="text-right py-2">Amount</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr className="border-b">
                            <td className="py-2">Sample Product/Service</td>
                            <td className="text-right py-2">1</td>
                            <td className="text-right py-2">$100.00</td>
                            <td className="text-right py-2">$100.00</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>

                    {/* Totals */}
                    <div className="mb-6">
                      <div className="flex justify-end">
                        <div className="w-48 space-y-2">
                          <div className="flex justify-between text-sm">
                            <span>Subtotal:</span>
                            <span>$100.00</span>
                          </div>
                          {formData.showDiscount && (
                            <div className="flex justify-between text-sm">
                              <span>Discount:</span>
                              <span>-$0.00</span>
                            </div>
                          )}
                          {formData.showTax && formData.taxRate !== '0' && (
                            <div className="flex justify-between text-sm">
                              <span>{formData.taxLabel || (isEU ? 'VAT' : 'Tax')} ({formData.taxRate}%):</span>
                              <span>${(100 * parseFloat(formData.taxRate) / 100).toFixed(2)}</span>
                            </div>
                          )}
                          <div className="flex justify-between font-bold border-t pt-2">
                            <span>Total:</span>
                            <span>${formData.showTax && formData.taxRate !== '0' ? (100 + (100 * parseFloat(formData.taxRate) / 100)).toFixed(2) : '100.00'}</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Payment Instructions */}
                    {formData.paymentInstructions && (
                      <div className="mb-4">
                        <h4 className="font-medium text-gray-900 mb-2">Payment Instructions:</h4>
                        <p className="text-sm text-gray-600 whitespace-pre-line">
                          {formData.paymentInstructions}
                        </p>
                      </div>
                    )}

                    {/* Footer */}
                    {formData.footerText && (
                      <div className="text-center border-t pt-4">
                        <p className="text-sm text-gray-600">
                          {formData.footerText}
                        </p>
                      </div>
                    )}
                  </div>

                  {/* AI Enhancement Notice */}
                  <div className="mt-4 p-3 bg-primary/10 rounded-lg border border-primary/20">
                    <p className="text-xs text-primary font-medium flex items-center gap-1">
                      <Bot className="w-3 h-3 animate-pulse" />
                      AI Enhanced: Template auto-populated with your company details
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