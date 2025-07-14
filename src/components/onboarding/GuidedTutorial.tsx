import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, Circle, FileText, Package, CreditCard, Receipt, ArrowRight } from 'lucide-react';

interface TutorialStep {
  id: string;
  title: string;
  description: string;
  isCompleted: boolean;
}

interface TutorialModule {
  id: string;
  title: string;
  description: string;
  steps: TutorialStep[];
  isActive: boolean;
  isCompleted: boolean;
}

const GuidedTutorial = () => {
  const [currentModuleIndex, setCurrentModuleIndex] = useState(2); // Starting at "Business Operations" as shown in reference
  const [currentStepIndex, setCurrentStepIndex] = useState(0);

  const modules: TutorialModule[] = [
    {
      id: 'setup',
      title: 'Initial Setup',
      description: 'Configure your business profile and basic settings',
      isActive: false,
      isCompleted: true,
      steps: [
        { id: 'profile', title: 'Create Profile', description: 'Set up your business profile', isCompleted: true },
        { id: 'settings', title: 'Basic Settings', description: 'Configure initial preferences', isCompleted: true }
      ]
    },
    {
      id: 'inventory',
      title: 'Inventory Setup',
      description: 'Add your products and manage inventory',
      isActive: false,
      isCompleted: true,
      steps: [
        { id: 'products', title: 'Add Products', description: 'Create your product catalog', isCompleted: true },
        { id: 'categories', title: 'Setup Categories', description: 'Organize your products', isCompleted: true }
      ]
    },
    {
      id: 'operations',
      title: 'Business Operations',
      description: 'Learn core business transactions',
      isActive: true,
      isCompleted: false,
      steps: [
        { id: 'purchase', title: 'Purchase Orders', description: 'When you purchase goods from suppliers, you need to record the purchase. This maintains your inventory and financial records!', isCompleted: false },
        { id: 'sales', title: 'Sales Orders', description: 'Create and manage customer sales orders', isCompleted: false },
        { id: 'receipts', title: 'Payment Receipts', description: 'Record customer payments and receipts', isCompleted: false },
        { id: 'invoices', title: 'Create Invoices', description: 'Generate professional invoices for customers', isCompleted: false }
      ]
    },
    {
      id: 'reports',
      title: 'Reports & Analytics',
      description: 'View business insights and generate reports',
      isActive: false,
      isCompleted: false,
      steps: [
        { id: 'dashboard', title: 'Business Dashboard', description: 'Monitor key business metrics', isCompleted: false },
        { id: 'financial', title: 'Financial Reports', description: 'Generate financial statements', isCompleted: false }
      ]
    }
  ];

  const currentModule = modules[currentModuleIndex];
  const currentStep = currentModule.steps[currentStepIndex];

  const getStepIcon = (stepId: string) => {
    switch (stepId) {
      case 'purchase': return Package;
      case 'sales': return FileText;
      case 'receipts': return CreditCard;
      case 'invoices': return Receipt;
      default: return FileText;
    }
  };

  const handleStepClick = (stepIndex: number) => {
    setCurrentStepIndex(stepIndex);
  };

  const handleNextStep = () => {
    if (currentStepIndex < currentModule.steps.length - 1) {
      setCurrentStepIndex(currentStepIndex + 1);
    } else if (currentModuleIndex < modules.length - 1) {
      setCurrentModuleIndex(currentModuleIndex + 1);
      setCurrentStepIndex(0);
    }
  };

  const getModuleProgress = (module: TutorialModule) => {
    const completedSteps = module.steps.filter(step => step.isCompleted).length;
    return (completedSteps / module.steps.length) * 100;
  };

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">Getting Started Guide</h1>
          <p className="text-muted-foreground">Follow this step-by-step guide to set up your business</p>
        </div>

        {/* Progress Steps */}
        <div className="flex items-center justify-between mb-8 relative">
          {modules.map((module, index) => (
            <div key={module.id} className="flex flex-col items-center relative z-10">
              <div className={`
                w-12 h-12 rounded-full flex items-center justify-center text-sm font-medium
                ${index === currentModuleIndex 
                  ? 'bg-primary text-primary-foreground' 
                  : module.isCompleted 
                    ? 'bg-primary/20 text-primary' 
                    : 'bg-muted text-muted-foreground'
                }
              `}>
                {index + 1}
              </div>
              <div className="mt-2 text-center max-w-24">
                <div className="text-sm font-medium text-foreground">{module.title}</div>
              </div>
              {index === currentModuleIndex && (
                <Badge variant="secondary" className="mt-1 bg-primary/10 text-primary">
                  Active
                </Badge>
              )}
            </div>
          ))}
          <div className="absolute top-6 left-0 right-0 h-0.5 bg-muted -z-0">
            <div 
              className="h-full bg-primary transition-all duration-500"
              style={{ width: `${(currentModuleIndex / (modules.length - 1)) * 100}%` }}
            />
          </div>
        </div>

        {/* Sub-steps for current module */}
        <div className="flex justify-center mb-8">
          <div className="flex space-x-8">
            {currentModule.steps.map((step, index) => (
              <button
                key={step.id}
                onClick={() => handleStepClick(index)}
                className={`
                  flex flex-col items-center p-4 rounded-lg transition-all
                  ${index === currentStepIndex 
                    ? 'bg-primary/10 border-2 border-primary' 
                    : 'bg-muted/50 border border-border hover:bg-muted'
                  }
                `}
              >
                <div className={`
                  w-8 h-8 rounded-full flex items-center justify-center mb-2
                  ${step.isCompleted ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'}
                `}>
                  {step.isCompleted ? <CheckCircle className="w-4 h-4" /> : <Circle className="w-4 h-4" />}
                </div>
                <span className="text-sm font-medium text-center">{step.title}</span>
                {index === currentStepIndex && (
                  <div className="w-full h-0.5 bg-primary mt-2 rounded"></div>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Tutorial Content */}
          <Card className="h-fit">
            <CardHeader>
              <div className="flex items-center gap-3">
                {React.createElement(getStepIcon(currentStep.id), { className: "w-6 h-6 text-primary" })}
                <div>
                  <CardTitle className="text-xl">{currentStep.title}</CardTitle>
                  <CardDescription className="mt-1">
                    Step {currentStepIndex + 1} of {currentModule.steps.length} in {currentModule.title}
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-6 leading-relaxed">
                {currentStep.description}
              </p>
              
              <div className="space-y-4">
                <Button onClick={handleNextStep} className="w-full">
                  Get Started
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
                
                <div className="text-center">
                  <button className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                    Skip this step
                  </button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Progress Overview */}
          <Card>
            <CardHeader>
              <CardTitle>Your Progress</CardTitle>
              <CardDescription>Track your onboarding journey</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {modules.map((module, index) => (
                  <div key={module.id} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">{module.title}</span>
                      <span className="text-xs text-muted-foreground">
                        {module.steps.filter(s => s.isCompleted).length}/{module.steps.length}
                      </span>
                    </div>
                    <Progress value={getModuleProgress(module)} className="h-2" />
                  </div>
                ))}
              </div>
              
              <div className="mt-6 p-4 bg-muted/50 rounded-lg">
                <h4 className="font-medium mb-2">Need Help?</h4>
                <p className="text-sm text-muted-foreground mb-3">
                  Access our help center or contact support for assistance.
                </p>
                <Button variant="outline" size="sm" className="w-full">
                  Get Support
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default GuidedTutorial;