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
  const modules: TutorialModule[] = [{
    id: 'setup',
    title: 'Initial Setup',
    description: 'Configure your business profile and basic settings',
    isActive: false,
    isCompleted: false,
    steps: [{
      id: 'profile',
      title: 'Business Profile',
      description: 'Set up your company information, logo, and contact details to create a professional identity',
      isCompleted: true
    }, {
      id: 'users',
      title: 'User Accounts',
      description: 'Add team members and configure user roles and permissions',
      isCompleted: false
    }, {
      id: 'settings',
      title: 'System Settings',
      description: 'Configure currencies, tax rates, and business preferences',
      isCompleted: false
    }, {
      id: 'templates',
      title: 'Document Templates',
      description: 'Customize invoice and document templates with your branding',
      isCompleted: false
    }]
  }, {
    id: 'inventory',
    title: 'Inventory Setup',
    description: 'Add your products and manage inventory',
    isActive: false,
    isCompleted: false,
    steps: [{
      id: 'categories',
      title: 'Product Categories',
      description: 'Create categories to organize your products effectively',
      isCompleted: false
    }, {
      id: 'products',
      title: 'Add Products',
      description: 'Create your product catalog with prices, descriptions, and images',
      isCompleted: true
    }, {
      id: 'suppliers',
      title: 'Supplier Setup',
      description: 'Add supplier information for purchase order management',
      isCompleted: false
    }, {
      id: 'warehouse',
      title: 'Warehouse Setup',
      description: 'Configure storage locations and inventory tracking',
      isCompleted: false
    }]
  }, {
    id: 'operations',
    title: 'Business Operations',
    description: 'Learn core business transactions',
    isActive: true,
    isCompleted: false,
    steps: [{
      id: 'purchase',
      title: 'Purchase Orders',
      description: 'When you purchase goods from suppliers, you need to record the purchase. This maintains your inventory and financial records!',
      isCompleted: false
    }, {
      id: 'sales',
      title: 'Sales Orders',
      description: 'Create and manage customer sales orders',
      isCompleted: false
    }, {
      id: 'receipts',
      title: 'Payment Receipts',
      description: 'Record customer payments and receipts',
      isCompleted: false
    }, {
      id: 'invoices',
      title: 'Create Invoices',
      description: 'Generate professional invoices for customers',
      isCompleted: false
    }]
  }, {
    id: 'reports',
    title: 'Reports & Analytics',
    description: 'View business insights and generate reports',
    isActive: false,
    isCompleted: false,
    steps: [{
      id: 'dashboard',
      title: 'Business Dashboard',
      description: 'Monitor key business metrics',
      isCompleted: false
    }, {
      id: 'financial',
      title: 'Financial Reports',
      description: 'Generate financial statements',
      isCompleted: false
    }]
  }];
  const currentModule = modules[currentModuleIndex];
  const currentStep = currentModule.steps[currentStepIndex];
  const getStepIcon = (stepId: string) => {
    switch (stepId) {
      case 'purchase':
        return Package;
      case 'sales':
        return FileText;
      case 'receipts':
        return CreditCard;
      case 'invoices':
        return Receipt;
      default:
        return FileText;
    }
  };
  const getStepImage = (stepId: string) => {
    switch (stepId) {
      case 'purchase':
        return 'photo-1488590528505-98d2b5aba04b';
      case 'sales':
        return 'photo-1461749280684-dccba630e2f6';
      case 'receipts':
        return 'photo-1486312338219-ce68d2c6f44d';
      case 'invoices':
        return 'photo-1531297484001-80022131f5a1';
      case 'profile':
        return 'photo-1487058792275-0ad4aaf24ca7';
      case 'products':
        return 'photo-1488590528505-98d2b5aba04b';
      case 'dashboard':
        return 'photo-1461749280684-dccba630e2f6';
      default:
        return 'photo-1486312338219-ce68d2c6f44d';
    }
  };
  const getStepFeatures = (stepId: string) => {
    switch (stepId) {
      case 'purchase':
        return ['Track supplier orders and deliveries', 'Automatic inventory updates', 'Cost tracking and reporting', 'Supplier performance analytics'];
      case 'sales':
        return ['Create professional sales orders', 'Customer management integration', 'Real-time inventory checking', 'Order status tracking'];
      case 'receipts':
        return ['Record customer payments', 'Multiple payment methods support', 'Automatic receipt generation', 'Payment history tracking'];
      case 'invoices':
        return ['Professional invoice templates', 'Automated calculations', 'Custom branding options', 'PDF generation and email delivery'];
      default:
        return ['Easy to use interface', 'Real-time updates', 'Professional features', 'Comprehensive reporting'];
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
    return completedSteps / module.steps.length * 100;
  };
  return <div className="min-h-screen bg-background p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">Welcome to KiliMax</h1>
          <p className="text-muted-foreground">Follow this step-by-step guide to set up your business</p>
        </div>

        {/* Progress Steps */}
        <div className="flex items-center justify-between mb-8 relative">
          {modules.map((module, index) => <button key={module.id} onClick={() => {
          setCurrentModuleIndex(index);
          setCurrentStepIndex(0);
        }} className="flex flex-col items-center relative z-10 group">
              <div className={`
                w-12 h-12 rounded-full flex items-center justify-center text-sm font-medium transition-all
                ${index === currentModuleIndex ? 'bg-primary text-primary-foreground' : module.isCompleted ? 'bg-green-500 text-white' : 'bg-muted text-muted-foreground group-hover:bg-muted-foreground/20'}
              `}>
                {module.isCompleted ? <CheckCircle className="w-5 h-5" /> : index + 1}
              </div>
              <div className="mt-2 text-center max-w-24">
                <div className="text-sm font-medium text-foreground">{module.title}</div>
                {module.isCompleted && <div className="text-xs text-green-600 font-medium">Completed</div>}
              </div>
              {index === currentModuleIndex && <Badge variant="secondary" className="mt-1 bg-primary/10 text-primary">
                  Active
                </Badge>}
            </button>)}
          <div className="absolute top-6 left-0 right-0 h-0.5 bg-muted -z-0">
            <div className="h-full bg-primary transition-all duration-500" style={{
            width: `${currentModuleIndex / (modules.length - 1) * 100}%`
          }} />
          </div>
        </div>

        {/* Sub-steps for current module */}
        <div className="flex justify-center mb-8">
          <div className="flex space-x-8">
            {currentModule.steps.map((step, index) => <button key={step.id} onClick={() => handleStepClick(index)} className={`
                  flex flex-col items-center p-4 rounded-lg transition-all
                  ${index === currentStepIndex ? 'bg-primary/10 border-2 border-primary' : 'bg-muted/50 border border-border hover:bg-muted'}
                `}>
                <div className={`
                  w-8 h-8 rounded-full flex items-center justify-center mb-2 transition-all
                  ${step.isCompleted ? 'bg-green-500 text-white' : 'bg-muted text-muted-foreground'}
                `}>
                  {step.isCompleted ? <CheckCircle className="w-4 h-4" /> : <Circle className="w-4 h-4" />}
                </div>
                <div className="flex flex-col items-center">
                  <span className="text-sm font-medium text-center">{step.title}</span>
                  {step.isCompleted && <span className="text-xs text-green-600 font-medium mt-1">✓ Done</span>}
                </div>
                {index === currentStepIndex && <div className="w-full h-0.5 bg-primary mt-2 rounded"></div>}
              </button>)}
          </div>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Tutorial Content */}
          <Card className="h-fit">
            <CardHeader>
              <div className="flex items-center gap-3">
                {React.createElement(getStepIcon(currentStep.id), {
                className: "w-6 h-6 text-primary"
              })}
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <CardTitle className="text-xl">{currentStep.title}</CardTitle>
                    {currentStep.isCompleted && <Badge variant="secondary" className="bg-green-100 text-green-700 border-green-200">
                        <CheckCircle className="w-3 h-3 mr-1" />
                        Completed
                      </Badge>}
                  </div>
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
                {currentStep.isCompleted ? <div className="space-y-3">
                    <Button variant="outline" className="w-full">
                      View Details
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                    <Button className="w-full">
                      Edit Configuration
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </div> : <Button className="w-full">
                    Add New
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>}
              </div>
            </CardContent>
          </Card>

          {/* Feature Demo */}
          <Card>
            <CardHeader>
              <CardTitle>How It Works</CardTitle>
              <CardDescription>See {currentStep.title} in action</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {/* Main Demo Image */}
                <div className="relative bg-muted rounded-lg overflow-hidden aspect-video">
                  <img src={`https://images.unsplash.com/${getStepImage(currentStep.id)}?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80`} alt={`${currentStep.title} demonstration`} className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
                    <div className="bg-white/90 rounded-full p-3">
                      <div className="w-6 h-6 bg-primary rounded-full animate-pulse"></div>
                    </div>
                  </div>
                </div>
                
                {/* Step Features */}
                <div className="space-y-3">
                  <h4 className="font-medium">Key Features:</h4>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    {getStepFeatures(currentStep.id).map((feature, index) => <li key={index} className="flex items-start gap-2">
                        <CheckCircle className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                        <span>{feature}</span>
                      </li>)}
                  </ul>
                </div>
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

        {/* Third-party Platform Integrations */}
        <div className="mt-12">
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-foreground mb-2">Third-party Platform Integrations</h2>
            <p className="text-muted-foreground">Connect your business with popular platforms to expand your reach</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* WhatsApp Integration */}
            <Card className="border-2 border-dashed border-border hover:border-primary/50 transition-colors">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-green-500 rounded-lg flex items-center justify-center">
                    <svg viewBox="0 0 24 24" className="w-6 h-6 text-white" fill="currentColor">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488"/>
                    </svg>
                  </div>
                  <div>
                    <CardTitle className="text-lg">WhatsApp Business</CardTitle>
                    <CardDescription>Connect with customers via WhatsApp</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="text-sm text-muted-foreground">
                    <p className="mb-3">Enable WhatsApp integration to:</p>
                    <ul className="space-y-2">
                      <li className="flex items-start gap-2">
                        <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                        <span>Send order confirmations and updates</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                        <span>Receive customer inquiries</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                        <span>Share product catalogs</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                        <span>Process payments via WhatsApp</span>
                      </li>
                    </ul>
                  </div>
                  <div className="flex gap-2">
                    <Button className="flex-1">
                      Configure WhatsApp
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                    <Button variant="outline" size="default">
                      Learn More
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Mpesa Integration */}
            <Card className="border-2 border-dashed border-border hover:border-primary/50 transition-colors">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-green-600 rounded-lg flex items-center justify-center">
                    <CreditCard className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <CardTitle className="text-lg">M-Pesa Payments</CardTitle>
                    <CardDescription>Accept mobile money payments</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="text-sm text-muted-foreground">
                    <p className="mb-3">Enable M-Pesa integration to:</p>
                    <ul className="space-y-2">
                      <li className="flex items-start gap-2">
                        <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                        <span>Accept instant mobile payments</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                        <span>Automatic payment verification</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                        <span>Real-time transaction notifications</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                        <span>Generate payment receipts</span>
                      </li>
                    </ul>
                  </div>
                  <div className="flex gap-2">
                    <Button className="flex-1">
                      Setup M-Pesa
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                    <Button variant="outline" size="default">
                      Learn More
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Additional Integration Options */}
          <div className="mt-8 p-6 bg-muted/50 rounded-lg">
            <h3 className="font-medium mb-3">More Integration Options</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="flex items-center gap-3 p-3 bg-background rounded-lg">
                <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                  <span className="text-white text-sm font-bold">A</span>
                </div>
                <div>
                  <div className="text-sm font-medium">Airtel Money</div>
                  <div className="text-xs text-muted-foreground">Coming Soon</div>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 bg-background rounded-lg">
                <div className="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center">
                  <span className="text-white text-sm font-bold">T</span>
                </div>
                <div>
                  <div className="text-sm font-medium">Tigo Pesa</div>
                  <div className="text-xs text-muted-foreground">Coming Soon</div>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 bg-background rounded-lg">
                <div className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center">
                  <span className="text-white text-sm font-bold">E</span>
                </div>
                <div>
                  <div className="text-sm font-medium">Email Marketing</div>
                  <div className="text-xs text-muted-foreground">Coming Soon</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>;
};
export default GuidedTutorial;