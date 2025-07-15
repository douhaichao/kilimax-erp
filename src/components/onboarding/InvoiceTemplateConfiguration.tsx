
import React, { useState, useRef } from 'react';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowRight, ArrowLeft, Eye, Bot, Sparkles, Zap, FileText, Settings, Upload, FileImage } from 'lucide-react';
import { OnboardingData } from '@/pages/OnboardingJourney';

interface InvoiceTemplateConfigurationProps {
  onNext: (data: Partial<OnboardingData>) => void;
  onBack: () => void;
  data: OnboardingData;
}


const themeColors = [
  { name: 'Professional Blue', value: '#3B82F6', preview: 'bg-blue-500' },
  { name: 'Forest Green', value: '#059669', preview: 'bg-emerald-600' },
  { name: 'Royal Purple', value: '#7C3AED', preview: 'bg-violet-600' },
  { name: 'Crimson Red', value: '#DC2626', preview: 'bg-red-600' },
  { name: 'Sunset Orange', value: '#EA580C', preview: 'bg-orange-600' },
  { name: 'Deep Slate', value: '#475569', preview: 'bg-slate-600' },
];

export const InvoiceTemplateConfiguration: React.FC<InvoiceTemplateConfigurationProps> = ({ onNext, onBack, data }) => {
  const [formData, setFormData] = useState({
    primaryColor: '#3B82F6',
  });

  const [logo, setLogo] = useState(data.logo || '');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onNext({ 
      ...data,
      logo,
      invoiceSettings: {
        invoicePrefix: 'INV',
        invoiceStartNumber: '1001',
        paymentTerms: 'Net 30',
        taxRate: '0',
        taxLabel: 'Tax',
        showTax: true,
        primaryColor: formData.primaryColor,
        footerText: 'Thank you for your business!'
      }
    });
  };

  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const result = event.target?.result as string;
        setLogo(result);
      };
      reader.readAsDataURL(file);
    }
  };


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
            <span className="text-sm text-muted-foreground">Personal Profile → Company Info → Invoice Setup</span>
            <span className="text-sm font-medium text-primary">Optional</span>
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
              Customize your invoice template with your company details (Optional - can be configured later in settings)
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
                    {/* Company Logo */}
                    <div className="space-y-2">
                      <Label htmlFor="logo" className="text-sm font-medium flex items-center gap-2">
                        <FileImage className="w-4 h-4 text-primary" />
                        Company Logo
                      </Label>
                      <div className="flex items-center gap-4">
                        {logo && (
                          <div className="w-16 h-16 rounded-lg border bg-muted flex items-center justify-center overflow-hidden">
                            <img 
                              src={logo} 
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
                            className="w-full h-10"
                          >
                            <Upload className="w-4 h-4 mr-2" />
                            {logo ? 'Change Logo' : 'Upload Logo'}
                          </Button>
                        </div>
                      </div>
                    </div>

                  </form>
                </CardContent>
              </Card>

              {/* Theme Color */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Sparkles className="w-5 h-5 text-primary" />
                    Theme Color
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-3">
                    {themeColors.map((color) => (
                      <div
                        key={color.value}
                        className={`border rounded-lg p-3 cursor-pointer transition-all hover:shadow-md ${
                          formData.primaryColor === color.value 
                            ? 'border-primary bg-primary/5' 
                            : 'border-border hover:border-primary/50'
                        }`}
                        onClick={() => setFormData(prev => ({ ...prev, primaryColor: color.value }))}
                      >
                        <div className="flex items-center gap-2 mb-1">
                          <div className={`w-4 h-4 rounded-full ${color.preview}`}></div>
                          <h4 className="font-medium text-sm">{color.name}</h4>
                        </div>
                        <p className="text-xs text-muted-foreground">{color.value}</p>
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
                  type="button"
                  variant="outline"
                  onClick={() => onNext(data)}
                  className="flex-1 h-12"
                >
                  Skip for Now
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
                        {logo && (
                          <div className="w-16 h-16 rounded overflow-hidden mb-3">
                            <img 
                              src={logo} 
                              alt="Company logo" 
                              className="w-full h-full object-contain"
                            />
                          </div>
                        )}
                         <h1 className="text-xl font-bold text-gray-900">
                           {data.companyName || 'Your Company Name'}
                         </h1>
                         {data.phoneNumber && (
                           <p className="text-sm text-gray-600 mt-1">
                             Phone: {data.phoneNumber}
                           </p>
                         )}
                         {data.email && (
                           <p className="text-sm text-gray-600">
                             Email: {data.email}
                           </p>
                         )}
                      </div>
                       <div className="text-right">
                         <h2 className="text-2xl font-bold text-gray-900">INVOICE</h2>
                         <p className="text-sm text-gray-600 mt-2">
                           #INV-1001
                         </p>
                         <p className="text-sm text-gray-600">
                           Date: {new Date().toLocaleDateString()}
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
                           <div className="flex justify-between font-bold border-t pt-2">
                             <span>Total:</span>
                             <span>$100.00</span>
                           </div>
                         </div>
                       </div>
                     </div>

                     {/* Footer */}
                     <div className="text-center border-t pt-4">
                       <p className="text-sm text-gray-600">
                         Thank you for your business!
                       </p>
                     </div>
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
