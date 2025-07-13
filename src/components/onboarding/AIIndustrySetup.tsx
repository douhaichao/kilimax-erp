import React, { useState } from 'react';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { Factory, Truck, Briefcase, ChevronDown, Check, Bot, Sparkles, Zap, Brain } from 'lucide-react';
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
    <div className="min-h-screen bg-gradient-to-br from-background via-primary/5 to-secondary/5 relative overflow-hidden">
      {/* AI-Enhanced Background */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-1/3 left-1/3 transform -translate-x-1/2 -translate-y-1/2">
          <Brain className="w-64 h-64 text-primary animate-pulse" />
        </div>
        <div className="absolute top-1/4 right-1/4 transform translate-x-1/2 -translate-y-1/2">
          <Sparkles className="w-32 h-32 text-primary/30 animate-pulse" style={{ animationDelay: '1.5s' }} />
        </div>
        <div className="absolute bottom-1/3 left-1/2 transform -translate-x-1/2 translate-y-1/2">
          <Zap className="w-40 h-40 text-primary/20 animate-pulse" style={{ animationDelay: '0.5s' }} />
        </div>
      </div>
      
      <div className="relative z-10 container mx-auto px-4 py-8">
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
          <div className="flex items-start space-x-4 bg-gradient-to-r from-card to-card/80 border border-primary/20 rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300">
            <div className="w-12 h-12 bg-gradient-to-br from-primary/20 to-primary/10 rounded-full flex items-center justify-center flex-shrink-0 animate-pulse">
              <Bot className="w-6 h-6 text-primary" />
            </div>
            <div>
              <p className="text-lg font-medium mb-2 flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-primary animate-pulse" />
                I'm analyzing your business needs!
              </p>
              <p className="text-muted-foreground">
                Select your industry and I'll instantly customize workflows, templates, and features just for you.
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
                  className={`cursor-pointer transition-all duration-300 hover:shadow-lg hover:-translate-y-1 relative group ${
                    isSelected 
                      ? 'ring-2 ring-primary shadow-lg scale-105 bg-gradient-to-br from-card to-primary/5' 
                      : 'hover:shadow-md hover:bg-gradient-to-br hover:from-card hover:to-primary/5'
                  }`}
                  onClick={() => setSelectedIndustry(option.id)}
                >
                  {isSelected && (
                    <div className="absolute -top-2 -right-2 w-8 h-8 bg-gradient-to-br from-primary to-primary/80 rounded-full flex items-center justify-center animate-pulse">
                      <Check className="w-5 h-5 text-white" />
                    </div>
                  )}
                  
                  <CardHeader className="text-center pb-4">
                    <div className={`w-16 h-16 bg-gradient-to-br ${
                      isSelected 
                        ? 'from-primary/20 to-primary/10' 
                        : 'from-primary/10 to-primary/5'
                    } rounded-full flex items-center justify-center mx-auto mb-4 group-hover:animate-pulse transition-all duration-300`}>
                      <Icon className={`w-8 h-8 text-primary ${isSelected ? 'animate-pulse' : ''}`} />
                    </div>
                    <CardTitle className="text-xl flex items-center justify-center gap-2">
                      {option.title}
                      {isSelected && <Sparkles className="w-4 h-4 text-primary animate-pulse" />}
                    </CardTitle>
                    <CardDescription className="text-sm">
                      {option.description}
                    </CardDescription>
                  </CardHeader>
                  
                  <CardContent>
                    <div className="space-y-2">
                      {option.features.map((feature, index) => (
                        <div key={index} className="flex items-center space-x-2">
                          <div className={`w-1.5 h-1.5 rounded-full transition-colors duration-300 ${
                            isSelected ? 'bg-primary animate-pulse' : 'bg-primary'
                          }`}></div>
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
              <Button variant="ghost" className="w-full flex items-center justify-center space-x-2 hover:bg-primary/5 transition-colors">
                <Brain className="w-4 h-4 text-primary" />
                <span>Not sure? Let AI help you choose</span>
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

        {/* AI-Enhanced Continue Button */}
        <div className="max-w-md mx-auto">
          <Button 
            onClick={handleContinue}
            className="w-full h-12 text-lg bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 transform hover:scale-[1.02] transition-all duration-200 shadow-lg"
            disabled={!selectedIndustry}
          >
            <Bot className="w-5 h-5 mr-2 animate-pulse" />
            AI Setup Complete - Continue
            <Sparkles className="w-5 h-5 ml-2 animate-pulse" />
          </Button>
          {selectedIndustry && (
            <p className="text-center text-xs text-muted-foreground mt-2 flex items-center justify-center gap-1">
              <Zap className="w-3 h-3 text-primary" />
              AI is customizing templates for {industryOptions.find(opt => opt.id === selectedIndustry)?.title}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};