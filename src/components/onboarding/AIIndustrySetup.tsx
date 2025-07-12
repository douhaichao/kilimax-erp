import React, { useState } from 'react';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { Factory, Truck, Briefcase, ChevronDown, Check, Bot } from 'lucide-react';
import { OnboardingData } from '@/pages/OnboardingJourney';

interface AIIndustrySetupProps {
  onNext: (data: Partial<OnboardingData>) => void;
  data: OnboardingData;
}

const industryOptions = [
  {
    id: 'manufacturing',
    title: 'Manufacturing',
    icon: Factory,
    description: 'Production, assembly, and quality control workflows',
    features: ['Bill of Materials', 'Production Planning', 'Quality Control', 'Equipment Tracking'],
  },
  {
    id: 'wholesale',
    title: 'Wholesale Distribution',
    icon: Truck,
    description: 'Procurement, inventory, and distribution management',
    features: ['Purchase Orders', 'Supplier Management', 'Warehouse Operations', 'Order Fulfillment'],
  },
  {
    id: 'services',
    title: 'Professional Services',
    icon: Briefcase,
    description: 'Project management, time tracking, and client billing',
    features: ['Project Management', 'Time Tracking', 'Client Billing', 'Resource Planning'],
  },
];

const industryExamples = {
  manufacturing: ['Automotive Parts', 'Electronics', 'Furniture', 'Food Processing'],
  wholesale: ['Office Supplies', 'Pharmaceuticals', 'Building Materials', 'Consumer Goods'],
  services: ['Consulting', 'Marketing Agency', 'Legal Services', 'Software Development'],
};

export const AIIndustrySetup: React.FC<AIIndustrySetupProps> = ({ onNext, data }) => {
  const [selectedIndustry, setSelectedIndustry] = useState<string>('');
  const [isExamplesOpen, setIsExamplesOpen] = useState(false);

  const handleContinue = () => {
    const selectedOption = industryOptions.find(option => option.id === selectedIndustry);
    onNext({ industry: selectedOption?.title || '' });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-primary/5 to-secondary/5">
      <div className="container mx-auto px-4 py-8">
        {/* Progress Bar */}
        <div className="max-w-2xl mx-auto mb-8">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-muted-foreground">Step 2 of 7</span>
            <span className="text-sm font-medium text-primary">30% Complete</span>
          </div>
          <Progress value={30} className="h-2" />
        </div>

        {/* AI Assistant Message */}
        <div className="max-w-2xl mx-auto mb-8">
          <div className="flex items-start space-x-4 bg-card border rounded-xl p-6 shadow-sm">
            <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
              <Bot className="w-6 h-6 text-primary" />
            </div>
            <div>
              <p className="text-lg font-medium mb-2">
                I'm your setup assistant! Which best describes your business?
              </p>
              <p className="text-muted-foreground">
                I'll customize your workflows and features based on your industry.
              </p>
            </div>
          </div>
        </div>

        {/* Industry Options */}
        <div className="max-w-4xl mx-auto mb-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {industryOptions.map((option) => {
              const Icon = option.icon;
              const isSelected = selectedIndustry === option.id;
              
              return (
                <Card 
                  key={option.id}
                  className={`cursor-pointer transition-all duration-300 hover:shadow-lg hover:-translate-y-1 relative ${
                    isSelected 
                      ? 'ring-2 ring-secondary shadow-lg scale-105' 
                      : 'hover:shadow-md'
                  }`}
                  onClick={() => setSelectedIndustry(option.id)}
                >
                  {isSelected && (
                    <div className="absolute -top-2 -right-2 w-8 h-8 bg-secondary rounded-full flex items-center justify-center">
                      <Check className="w-5 h-5 text-white" />
                    </div>
                  )}
                  
                  <CardHeader className="text-center pb-4">
                    <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Icon className="w-8 h-8 text-primary" />
                    </div>
                    <CardTitle className="text-xl">{option.title}</CardTitle>
                    <CardDescription className="text-sm">
                      {option.description}
                    </CardDescription>
                  </CardHeader>
                  
                  <CardContent>
                    <div className="space-y-2">
                      {option.features.map((feature, index) => (
                        <div key={index} className="flex items-center space-x-2">
                          <div className="w-1.5 h-1.5 bg-primary rounded-full"></div>
                          <span className="text-sm text-muted-foreground">{feature}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>

        {/* Not Sure Section */}
        <div className="max-w-2xl mx-auto mb-8">
          <Collapsible open={isExamplesOpen} onOpenChange={setIsExamplesOpen}>
            <CollapsibleTrigger asChild>
              <Button variant="ghost" className="w-full flex items-center justify-center space-x-2">
                <span>Not sure? See examples by industry</span>
                <ChevronDown className={`w-4 h-4 transition-transform ${isExamplesOpen ? 'rotate-180' : ''}`} />
              </Button>
            </CollapsibleTrigger>
            <CollapsibleContent className="mt-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {Object.entries(industryExamples).map(([key, examples]) => {
                  const industry = industryOptions.find(opt => opt.id === key);
                  return (
                    <div key={key} className="bg-card border rounded-lg p-4">
                      <h4 className="font-medium mb-2">{industry?.title}</h4>
                      <div className="flex flex-wrap gap-1">
                        {examples.map((example, index) => (
                          <Badge key={index} variant="secondary" className="text-xs">
                            {example}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>
            </CollapsibleContent>
          </Collapsible>
        </div>

        {/* Continue Button */}
        <div className="max-w-md mx-auto">
          <Button 
            onClick={handleContinue}
            className="w-full h-12 text-lg"
            disabled={!selectedIndustry}
          >
            Select & Continue
          </Button>
        </div>
      </div>
    </div>
  );
};