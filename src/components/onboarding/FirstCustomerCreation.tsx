import React, { useState } from 'react';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  CheckCircle2, 
  Circle, 
  Users, 
  Building, 
  CreditCard, 
  Truck,
  Info,
  ArrowRight
} from 'lucide-react';
import { OnboardingData } from '@/pages/OnboardingJourney';

interface FirstCustomerCreationProps {
  onNext: (data: Partial<OnboardingData>) => void;
  data: OnboardingData;
}

interface FormStep {
  id: string;
  title: string;
  icon: any;
  status: 'completed' | 'active' | 'inactive';
}

const formSteps: FormStep[] = [
  { id: 'basic', title: 'Basic Info', icon: Building, status: 'active' },
  { id: 'payment', title: 'Payment Terms', icon: CreditCard, status: 'inactive' },
  { id: 'shipping', title: 'Shipping', icon: Truck, status: 'inactive' },
];

const companyPredictions = [
  'Amazon Inc',
  'Microsoft Corporation',
  'Apple Inc',
  'Google LLC',
  'Meta Platforms Inc'
];

export const FirstCustomerCreation: React.FC<FirstCustomerCreationProps> = ({ onNext, data }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState({
    companyName: '',
    contactName: '',
    email: '',
    phone: '',
    vatId: '',
    country: '',
    address: '',
    postalCode: '',
    city: '',
    paymentTerms: '',
    creditLimit: '',
    shippingMethod: ''
  });
  
  const [showPredictions, setShowPredictions] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
    
    // Show predictions for company name
    if (field === 'companyName') {
      setShowPredictions(value.length > 2);
    }
  };

  const selectPrediction = (prediction: string) => {
    setFormData(prev => ({ ...prev, companyName: prediction }));
    setShowPredictions(false);
    
    // Auto-fill based on company
    if (prediction === 'Amazon Inc') {
      setFormData(prev => ({
        ...prev,
        contactName: 'Jeff Bezos',
        email: 'contact@amazon.com',
        country: 'US',
        vatId: 'US123456789'
      }));
    }
  };

  const validateStep = (step: number): boolean => {
    const newErrors: Record<string, string> = {};
    
    if (step === 0) {
      if (!formData.companyName) newErrors.companyName = 'Company name is required';
      if (!formData.contactName) newErrors.contactName = 'Contact name is required';
      if (!formData.email) newErrors.email = 'Email is required';
      if (!formData.country) newErrors.country = 'Country is required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const nextStep = () => {
    if (validateStep(currentStep)) {
      if (currentStep < formSteps.length - 1) {
        setCurrentStep(prev => prev + 1);
      } else {
        // Complete the form
        onNext({ 
          customerData: formData,
          completedTasks: [...(data.completedTasks || []), 'create-customer']
        });
      }
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(prev => prev - 1);
    }
  };

  const getStepStatus = (index: number): 'completed' | 'active' | 'inactive' => {
    if (index < currentStep) return 'completed';
    if (index === currentStep) return 'active';
    return 'inactive';
  };

  const showEUVATHelp = data.country === 'DE' || formData.country === 'DE';

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-primary/5 to-secondary/5">
      <div className="container mx-auto px-4 py-8">
        {/* Progress Bar */}
        <div className="max-w-2xl mx-auto mb-8">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-muted-foreground">Step 5 of 7</span>
            <span className="text-sm font-medium text-primary">70% Complete</span>
          </div>
          <Progress value={70} className="h-2" />
        </div>

        {/* Step Indicator */}
        <div className="max-w-2xl mx-auto mb-8">
          <div className="flex items-center justify-between">
            {formSteps.map((step, index) => {
              const Icon = step.icon;
              const status = getStepStatus(index);
              
              return (
                <div key={step.id} className="flex items-center">
                  <div className="flex flex-col items-center">
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center mb-2 ${
                      status === 'completed' 
                        ? 'bg-secondary text-white' 
                        : status === 'active'
                        ? 'bg-primary text-white'
                        : 'bg-muted text-muted-foreground'
                    }`}>
                      {status === 'completed' ? (
                        <CheckCircle2 className="w-6 h-6" />
                      ) : (
                        <Icon className="w-6 h-6" />
                      )}
                    </div>
                    <span className={`text-sm font-medium ${
                      status === 'active' ? 'text-primary' : 'text-muted-foreground'
                    }`}>
                      {step.title}
                    </span>
                  </div>
                  
                  {index < formSteps.length - 1 && (
                    <div className={`h-0.5 w-24 mx-4 ${
                      index < currentStep ? 'bg-secondary' : 'bg-muted'
                    }`} />
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Main Content */}
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-8">
            {/* Form Section */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Users className="w-5 h-5" />
                  <span>Create Your First Customer</span>
                </CardTitle>
                <CardDescription>
                  Add a customer profile to start managing your business relationships
                </CardDescription>
              </CardHeader>
              
              <CardContent className="space-y-6">
                {/* Basic Info Step */}
                {currentStep === 0 && (
                  <div className="space-y-4">
                    {/* Company Name with Predictions */}
                    <div className="space-y-2 relative">
                      <Label htmlFor="companyName">Company Name *</Label>
                      <Input
                        id="companyName"
                        placeholder="Enter company name"
                        value={formData.companyName}
                        onChange={(e) => handleInputChange('companyName', e.target.value)}
                        className={errors.companyName ? 'border-red-500' : ''}
                      />
                      {errors.companyName && (
                        <p className="text-red-500 text-sm">{errors.companyName}</p>
                      )}
                      
                      {/* Predictions Dropdown */}
                      {showPredictions && (
                        <div className="absolute top-full left-0 right-0 bg-card border rounded-md shadow-lg z-10 mt-1">
                          {companyPredictions
                            .filter(prediction => 
                              prediction.toLowerCase().includes(formData.companyName.toLowerCase())
                            )
                            .slice(0, 3)
                            .map((prediction, index) => (
                              <div
                                key={index}
                                className="px-3 py-2 hover:bg-muted cursor-pointer text-sm"
                                onClick={() => selectPrediction(prediction)}
                              >
                                {prediction}
                              </div>
                            ))}
                        </div>
                      )}
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="contactName">Contact Name *</Label>
                        <Input
                          id="contactName"
                          placeholder="Enter contact name"
                          value={formData.contactName}
                          onChange={(e) => handleInputChange('contactName', e.target.value)}
                          className={errors.contactName ? 'border-red-500' : ''}
                        />
                        {errors.contactName && (
                          <p className="text-red-500 text-sm">{errors.contactName}</p>
                        )}
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="email">Email *</Label>
                        <Input
                          id="email"
                          type="email"
                          placeholder="Enter email"
                          value={formData.email}
                          onChange={(e) => handleInputChange('email', e.target.value)}
                          className={errors.email ? 'border-red-500' : ''}
                        />
                        {errors.email && (
                          <p className="text-red-500 text-sm">{errors.email}</p>
                        )}
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="phone">Phone Number</Label>
                        <Input
                          id="phone"
                          placeholder="Enter phone number"
                          value={formData.phone}
                          onChange={(e) => handleInputChange('phone', e.target.value)}
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="country">Country *</Label>
                        <Select value={formData.country} onValueChange={(value) => handleInputChange('country', value)}>
                          <SelectTrigger className={errors.country ? 'border-red-500' : ''}>
                            <SelectValue placeholder="Select country" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="US">🇺🇸 United States</SelectItem>
                            <SelectItem value="DE">🇩🇪 Germany</SelectItem>
                            <SelectItem value="GB">🇬🇧 United Kingdom</SelectItem>
                            <SelectItem value="FR">🇫🇷 France</SelectItem>
                            <SelectItem value="CA">🇨🇦 Canada</SelectItem>
                          </SelectContent>
                        </Select>
                        {errors.country && (
                          <p className="text-red-500 text-sm">{errors.country}</p>
                        )}
                      </div>
                    </div>

                    {/* EU VAT Help */}
                    {showEUVATHelp && (
                      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 flex items-start space-x-3">
                        <Info className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                        <div>
                          <p className="text-sm font-medium text-blue-800">Context Help</p>
                          <p className="text-sm text-blue-700">
                            EU businesses need VAT ID for tax compliance and invoicing.
                          </p>
                        </div>
                      </div>
                    )}

                    <div className="space-y-2">
                      <Label htmlFor="vatId">VAT ID {showEUVATHelp && '*'}</Label>
                      <Input
                        id="vatId"
                        placeholder="Enter VAT ID"
                        value={formData.vatId}
                        onChange={(e) => handleInputChange('vatId', e.target.value)}
                      />
                    </div>
                  </div>
                )}

                {/* Payment Terms Step */}
                {currentStep === 1 && (
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="paymentTerms">Payment Terms</Label>
                      <Select value={formData.paymentTerms} onValueChange={(value) => handleInputChange('paymentTerms', value)}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select payment terms" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="net30">Net 30 days</SelectItem>
                          <SelectItem value="net15">Net 15 days</SelectItem>
                          <SelectItem value="immediate">Immediate</SelectItem>
                          <SelectItem value="cod">Cash on Delivery</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="creditLimit">Credit Limit</Label>
                      <Input
                        id="creditLimit"
                        type="number"
                        placeholder="Enter credit limit"
                        value={formData.creditLimit}
                        onChange={(e) => handleInputChange('creditLimit', e.target.value)}
                      />
                    </div>
                  </div>
                )}

                {/* Shipping Step */}
                {currentStep === 2 && (
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="address">Shipping Address</Label>
                      <Input
                        id="address"
                        placeholder="Enter shipping address"
                        value={formData.address}
                        onChange={(e) => handleInputChange('address', e.target.value)}
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="postalCode">Postal Code</Label>
                        <Input
                          id="postalCode"
                          placeholder="Enter postal code"
                          value={formData.postalCode}
                          onChange={(e) => handleInputChange('postalCode', e.target.value)}
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="city">City</Label>
                        <Input
                          id="city"
                          placeholder="Enter city"
                          value={formData.city}
                          onChange={(e) => handleInputChange('city', e.target.value)}
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="shippingMethod">Preferred Shipping Method</Label>
                      <Select value={formData.shippingMethod} onValueChange={(value) => handleInputChange('shippingMethod', value)}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select shipping method" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="standard">Standard Shipping</SelectItem>
                          <SelectItem value="express">Express Shipping</SelectItem>
                          <SelectItem value="overnight">Overnight</SelectItem>
                          <SelectItem value="pickup">Customer Pickup</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                )}

                {/* Navigation Buttons */}
                <div className="flex justify-between pt-6">
                  <Button 
                    variant="outline" 
                    onClick={prevStep}
                    disabled={currentStep === 0}
                  >
                    Previous
                  </Button>
                  
                  <Button onClick={nextStep} className="flex items-center space-x-2">
                    <span>
                      {currentStep === formSteps.length - 1 ? 'Save & Add Order' : 'Next'}
                    </span>
                    <ArrowRight className="w-4 h-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Live System Preview */}
            <div className="space-y-6">
              <Card className="border-primary/20 shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Users className="w-5 h-5 text-primary" />
                    Live Preview - Customer in System
                  </CardTitle>
                  <CardDescription>
                    See how this customer will appear in your business interface
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {/* Customer List Preview */}
                  <div className="bg-card rounded-lg border p-4 mb-4">
                    <h4 className="text-sm font-medium mb-3 text-muted-foreground">Customer Directory</h4>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between p-3 bg-primary/5 border border-primary/20 rounded-md">
                        <div className="flex items-center space-x-3">
                          <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                            <Building className="w-5 h-5 text-primary" />
                          </div>
                          <div>
                            <p className="font-medium text-sm">
                              {formData.companyName || 'Company Name'}
                            </p>
                            <p className="text-xs text-muted-foreground">
                              {formData.contactName || 'Contact Name'} • {formData.email || 'email@company.com'}
                            </p>
                            {formData.country && (
                              <p className="text-xs text-muted-foreground">
                                {formData.country === 'US' && '🇺🇸'} 
                                {formData.country === 'DE' && '🇩🇪'} 
                                {formData.country === 'GB' && '🇬🇧'} 
                                {formData.country === 'FR' && '🇫🇷'} 
                                {formData.country === 'CA' && '🇨🇦'} 
                                {formData.vatId && ` • VAT: ${formData.vatId}`}
                              </p>
                            )}
                          </div>
                        </div>
                        <Badge variant="secondary">Active</Badge>
                      </div>
                    </div>
                  </div>

                  {/* Customer Detail Preview */}
                  <div className="bg-card rounded-lg border p-4">
                    <h4 className="text-sm font-medium mb-3 text-muted-foreground">Customer Profile</h4>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-xs text-muted-foreground mb-1">Contact Information</p>
                        <div className="space-y-1">
                          <p className="text-sm font-medium">{formData.contactName || 'Contact Name'}</p>
                          <p className="text-xs text-muted-foreground">{formData.email || 'email@company.com'}</p>
                          <p className="text-xs text-muted-foreground">{formData.phone || 'Phone number'}</p>
                        </div>
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground mb-1">Business Details</p>
                        <div className="space-y-1">
                          <p className="text-sm">{formData.paymentTerms || 'Payment terms'}</p>
                          <p className="text-xs text-muted-foreground">
                            Credit: {formData.creditLimit || '$0'} limit
                          </p>
                          <p className="text-xs text-muted-foreground">
                            Shipping: {formData.shippingMethod || 'Standard'}
                          </p>
                        </div>
                      </div>
                    </div>
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