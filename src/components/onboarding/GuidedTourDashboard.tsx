
import React, { useState, useEffect } from 'react';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  ArrowLeft, 
  ArrowRight, 
  SkipForward,
  Settings,
  BarChart3,
  Users,
  Package,
  ShoppingCart
} from 'lucide-react';
import { OnboardingData } from '@/pages/OnboardingJourney';

interface GuidedTourDashboardProps {
  onNext: (data: Partial<OnboardingData>) => void;
  data: OnboardingData;
}

interface TourStep {
  id: string;
  title: string;
  description: string;
  content: string;
}

const tourSteps: TourStep[] = [
  {
    id: 'welcome',
    title: 'Welcome to Your Dashboard',
    description: 'This is your central hub for managing your business operations.',
    content: 'From here, you can access all modules, view key metrics, and get insights into your business performance.'
  },
  {
    id: 'navigation',
    title: 'Navigation Menu',
    description: 'Use the sidebar to navigate between different modules.',
    content: 'The navigation menu gives you quick access to Products, Customers, Orders, and Reports. Each module is designed to streamline your workflow.'
  },
  {
    id: 'metrics',
    title: 'Key Performance Indicators',
    description: 'Monitor your business health with real-time KPIs.',
    content: 'Track revenue, orders, and customer growth at a glance. These metrics update automatically as you work with your data.'
  },
  {
    id: 'quick-actions',
    title: 'Quick Actions',
    description: 'Create new records with one-click buttons.',
    content: 'Add products, create orders, or register customers instantly without navigating through multiple pages.'
  },
  {
    id: 'settings',
    title: 'Settings',
    description: 'Explore the settings to customize your workspace and configure business rules.',
    content: 'Access company settings, user preferences, and system configurations to tailor the platform to your needs.'
  }
];

export const GuidedTourDashboard: React.FC<GuidedTourDashboardProps> = ({ onNext, data }) => {
  const [currentStep, setCurrentStep] = useState(0);

  const currentTourStep = tourSteps[currentStep];
  const isLastStep = currentStep === tourSteps.length - 1;

  const handleNext = () => {
    if (isLastStep) {
      onNext({});
    } else {
      setCurrentStep(prev => prev + 1);
    }
  };

  const handlePrev = () => {
    if (currentStep > 0) {
      setCurrentStep(prev => prev - 1);
    }
  };

  const handleSkip = () => {
    onNext({});
  };

  const progressValue = ((currentStep + 1) / tourSteps.length) * 100;

  return (
    <div className="min-h-screen bg-background relative">
      {/* Progress Bar */}
      <div className="absolute top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="max-w-md mx-auto">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-muted-foreground">Step {currentStep + 1} of {tourSteps.length}</span>
              <span className="text-sm font-medium text-primary">{Math.round(progressValue)}% Complete</span>
            </div>
            <Progress value={progressValue} className="h-2" />
          </div>
        </div>
      </div>

      {/* Mock Dashboard Background */}
      <div className="pt-20 min-h-screen bg-muted/20">
        {/* Sidebar Mock */}
        <div className="fixed left-0 top-20 bottom-0 w-64 bg-card border-r z-10">
          <div className="p-6">
            <h2 className="text-lg font-semibold mb-6">ERP System</h2>
            <nav className="space-y-2">
              {[
                { icon: BarChart3, label: 'Dashboard', active: true },
                { icon: Package, label: 'Products' },
                { icon: Users, label: 'Customers' },
                { icon: ShoppingCart, label: 'Orders' },
                { icon: Settings, label: 'Settings' }
              ].map((item, index) => {
                const Icon = item.icon;
                return (
                  <div
                    key={index}
                    className={`flex items-center space-x-3 px-3 py-2 rounded-lg ${
                      item.active 
                        ? 'bg-primary text-primary-foreground' 
                        : 'text-muted-foreground hover:bg-muted'
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                    <span>{item.label}</span>
                  </div>
                );
              })}
            </nav>
          </div>
        </div>

        {/* Main Content Area */}
        <div className="ml-64 p-6">
          <div className="grid grid-cols-3 gap-6 mb-6">
            {[
              { title: 'Total Revenue', value: '$45,231.89', change: '+20.1%' },
              { title: 'Active Orders', value: '142', change: '+5 today' },
              { title: 'Customers', value: '1,234', change: '+12% growth' }
            ].map((stat, index) => (
              <Card key={index} className="opacity-60">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stat.value}</div>
                  <p className="text-xs text-muted-foreground">{stat.change}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>

      {/* Tour Content Overlay */}
      <div className="fixed inset-0 bg-black/60 z-40 flex items-center justify-center">
        <Card className="max-w-lg mx-4 w-full">
          <CardHeader className="text-center">
            <div className="flex items-center justify-center mb-4">
              {currentStep === 4 ? (
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                  <Settings className="w-6 h-6 text-primary" />
                </div>
              ) : (
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                  <span className="text-primary font-semibold">{currentStep + 1/7}</span>
                </div>
              )}
            </div>
            <CardTitle className="text-2xl mb-2">{currentTourStep.title}</CardTitle>
            <CardDescription className="text-base">
              {currentTourStep.description}
            </CardDescription>
          </CardHeader>
          
          <CardContent className="space-y-6">
            <p className="text-muted-foreground leading-relaxed">
              {currentTourStep.content}
            </p>
            
            {/* Navigation */}
            <div className="flex items-center justify-between pt-4">
              <div className="flex items-center space-x-2">
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={handlePrev}
                  disabled={currentStep === 0}
                  className="h-9"
                >
                  <ArrowLeft className="w-4 h-4 mr-1" />
                  Previous
                </Button>
                
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={handleSkip}
                  className="h-9"
                >
                  <SkipForward className="w-4 h-4 mr-1" />
                  Skip
                </Button>
              </div>
              
              <Button 
                onClick={handleNext}
                size="sm"
                className="h-9"
              >
                {isLastStep ? 'Complete Tour' : 'Next'}
                <ArrowRight className="w-4 h-4 ml-1" />
              </Button>
            </div>
            
            {/* Step Indicator */}
            <div className="flex justify-center space-x-2 pt-2">
              {tourSteps.map((_, index) => (
                <div
                  key={index}
                  className={`w-2 h-2 rounded-full transition-colors ${
                    index === currentStep 
                      ? 'bg-primary' 
                      : index < currentStep 
                        ? 'bg-primary/60' 
                        : 'bg-muted'
                  }`}
                />
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
