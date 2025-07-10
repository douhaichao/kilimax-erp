
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  ChevronDown, 
  ChevronRight, 
  Check, 
  Circle, 
  Minus,
  Building2,
  Package,
  Receipt,
  Palette,
  Bot,
  HelpCircle,
  ArrowRight,
  Zap
} from 'lucide-react';
import { cn } from "@/lib/utils";

interface SetupItem {
  id: string;
  title: string;
  description: string;
  status: 'completed' | 'in-progress' | 'pending';
  helpText?: string;
}

interface SetupCategory {
  id: string;
  title: string;
  icon: React.ReactNode;
  items: SetupItem[];
  isExpanded: boolean;
}

const SetupGuide = () => {
  const [categories, setCategories] = useState<SetupCategory[]>([
    {
      id: 'company',
      title: 'Company Information',
      icon: <Building2 className="w-5 h-5" />,
      isExpanded: false,
      items: [
        {
          id: 'basic-profile',
          title: 'Basic Profile',
          description: 'Name, Address & Currency',
          status: 'completed',
        },
        {
          id: 'tax-registration',
          title: 'Tax Registration',
          description: 'VAT/TIN Numbers',
          status: 'in-progress',
          helpText: 'Most Nigerian businesses use 7.5% VAT rate'
        },
        {
          id: 'business-type',
          title: 'Business Type',
          description: 'Retail/Wholesale/Manufacturing',
          status: 'pending',
        },
        {
          id: 'logo-branding',
          title: 'Logo & Branding',
          description: 'Upload company logo',
          status: 'pending',
        }
      ]
    },
    {
      id: 'foundation',
      title: 'Foundation Data',
      icon: <Package className="w-5 h-5" />,
      isExpanded: false,
      items: [
        {
          id: 'add-products',
          title: 'Add Products',
          description: 'With barcode scanner support',
          status: 'pending',
          helpText: 'Jabali can auto-generate sample products for your industry'
        },
        {
          id: 'warehouses',
          title: 'Add Warehouses/Locations',
          description: 'Setup storage locations',
          status: 'pending',
        },
        {
          id: 'customers',
          title: 'Create Customer Database',
          description: 'Import or add customers',
          status: 'pending',
        },
        {
          id: 'suppliers',
          title: 'Setup Suppliers',
          description: 'Add vendor information',
          status: 'pending',
        },
        {
          id: 'units',
          title: 'Define Units of Measure',
          description: 'Kg, pieces, liters, etc.',
          status: 'pending',
        }
      ]
    },
    {
      id: 'retail',
      title: 'Retail Configuration',
      icon: <Receipt className="w-5 h-5" />,
      isExpanded: false,
      items: [
        {
          id: 'pos-settings',
          title: 'POS Settings',
          description: 'Receipt template, Cash drawer',
          status: 'pending',
        },
        {
          id: 'payment-methods',
          title: 'Payment Methods',
          description: 'M-Pesa/MTN Mobile Money',
          status: 'pending',
          helpText: 'Enable mobile money for African markets'
        },
        {
          id: 'tax-groups',
          title: 'Tax Groups',
          description: 'Setup tax categories',
          status: 'pending',
        },
        {
          id: 'discount-rules',
          title: 'Discount Rules',
          description: 'Bulk & loyalty discounts',
          status: 'pending',
        },
        {
          id: 'loyalty-programs',
          title: 'Loyalty Programs',
          description: 'Customer rewards system',
          status: 'pending',
        }
      ]
    },
    {
      id: 'personalization',
      title: 'Personalization',
      icon: <Palette className="w-5 h-5" />,
      isExpanded: false,
      items: [
        {
          id: 'dashboard-widgets',
          title: 'Dashboard Widgets',
          description: 'Customize your homepage',
          status: 'pending',
        },
        {
          id: 'notifications',
          title: 'Notification Preferences',
          description: 'SMS/WhatsApp/Email alerts',
          status: 'pending',
        },
        {
          id: 'theme-colors',
          title: 'Theme & Color Scheme',
          description: 'African-inspired themes',
          status: 'pending',
        },
        {
          id: 'language-pack',
          title: 'Language Pack',
          description: 'Swahili/French/English',
          status: 'pending',
        },
        {
          id: 'default-reports',
          title: 'Default Reports',
          description: 'Setup automated reports',
          status: 'pending',
        }
      ]
    }
  ]);

  const [showAIAssistant, setShowAIAssistant] = useState(false);

  const calculateProgress = () => {
    const totalItems = categories.reduce((acc, cat) => acc + cat.items.length, 0);
    const completedItems = categories.reduce((acc, cat) => 
      acc + cat.items.filter(item => item.status === 'completed').length, 0
    );
    return Math.round((completedItems / totalItems) * 100);
  };

  const toggleCategory = (categoryId: string) => {
    setCategories(prev => prev.map(cat => 
      cat.id === categoryId ? { ...cat, isExpanded: !cat.isExpanded } : cat
    ));
  };

  const getStatusIcon = (status: SetupItem['status']) => {
    switch (status) {
      case 'completed':
        return <Check className="w-5 h-5 text-green-600" />;
      case 'in-progress':
        return <Circle className="w-5 h-5 text-orange-500 fill-current" />;
      case 'pending':
        return <Minus className="w-5 h-5 text-gray-400" />;
    }
  };

  const getCategoryProgress = (category: SetupCategory) => {
    const total = category.items.length;
    const completed = category.items.filter(item => item.status === 'completed').length;
    return (completed / total) * 100;
  };

  const progress = calculateProgress();
  const isSetupComplete = progress === 100;

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      {/* Header Section */}
      <div className="bg-gradient-to-r from-orange-50 to-green-50 p-6 rounded-xl border border-orange-200">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-4">
            <div className="relative">
              <div className="w-20 h-20 rounded-full border-4 border-gray-200 flex items-center justify-center">
                <div 
                  className="absolute inset-0 rounded-full border-4 border-orange-500 transition-all duration-500"
                  style={{
                    background: `conic-gradient(#E2725B ${progress * 3.6}deg, transparent 0deg)`
                  }}
                />
                <span className="text-lg font-bold text-gray-800 relative z-10">
                  {progress}%
                </span>
              </div>
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-900">Setup Guide</h2>
              <p className="text-gray-600">Complete setup to unlock all features</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-3">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowAIAssistant(!showAIAssistant)}
              className="bg-white border-orange-300 hover:bg-orange-50 text-orange-700"
            >
              <Bot className="w-4 h-4 mr-2 animate-pulse" />
              Ask Jabali
            </Button>
            
            <Button
              disabled={!isSetupComplete}
              className={cn(
                "bg-green-600 hover:bg-green-700 text-white",
                isSetupComplete && "animate-pulse"
              )}
            >
              {isSetupComplete ? (
                <>
                  <Check className="w-4 h-4 mr-2" />
                  Setup Complete!
                </>
              ) : (
                <>
                  Finish Setup
                  <ArrowRight className="w-4 h-4 ml-2" />
                </>
              )}
            </Button>
          </div>
        </div>

        {/* Progress Bar */}
        <Progress value={progress} className="h-2 bg-gray-200" />
      </div>

      {/* AI Assistant Panel */}
      {showAIAssistant && (
        <Card className="border-orange-200 bg-orange-50">
          <CardContent className="p-4">
            <div className="flex items-start space-x-3">
              <div className="w-10 h-10 rounded-full bg-orange-500 flex items-center justify-center">
                <Bot className="w-5 h-5 text-white" />
              </div>
              <div className="flex-1">
                <h4 className="font-semibold text-gray-900">Jabali AI Assistant</h4>
                <p className="text-sm text-gray-600 mt-1">
                  I can help you complete your setup faster! I can auto-generate sample data, 
                  explain complex settings, and guide you through each step.
                </p>
                <div className="flex space-x-2 mt-3">
                  <Button size="sm" variant="outline" className="text-xs">
                    <Zap className="w-3 h-3 mr-1" />
                    Auto-generate data
                  </Button>
                  <Button size="sm" variant="outline" className="text-xs">
                    Voice guide
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Category Cards */}
      <div className="space-y-4">
        {categories.map((category) => (
          <Card key={category.id} className="border-gray-200 hover:shadow-lg transition-shadow">
            <CardHeader 
              className="cursor-pointer hover:bg-gray-50 transition-colors"
              onClick={() => toggleCategory(category.id)}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="text-orange-600">
                    {category.icon}
                  </div>
                  <div className="flex-1">
                    <CardTitle className="text-lg text-gray-900">{category.title}</CardTitle>
                    <div className="flex items-center space-x-2 mt-1">
                      <Progress 
                        value={getCategoryProgress(category)} 
                        className="h-1 flex-1 max-w-32"
                      />
                      <span className="text-xs text-gray-500">
                        {category.items.filter(item => item.status === 'completed').length}/
                        {category.items.length}
                      </span>
                    </div>
                  </div>
                </div>
                {category.isExpanded ? (
                  <ChevronDown className="w-5 h-5 text-gray-400" />
                ) : (
                  <ChevronRight className="w-5 h-5 text-gray-400" />
                )}
              </div>
            </CardHeader>

            {category.isExpanded && (
              <CardContent className="pt-0">
                <div className="space-y-3">
                  {category.items.map((item) => (
                    <div
                      key={item.id}
                      className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                    >
                      <div className="flex items-center space-x-3">
                        {getStatusIcon(item.status)}
                        <div>
                          <h5 className="font-medium text-gray-900">{item.title}</h5>
                          <p className="text-sm text-gray-600">{item.description}</p>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        {item.helpText && (
                          <Button
                            variant="ghost"
                            size="sm"
                            className="text-orange-600 hover:text-orange-700 hover:bg-orange-50"
                          >
                            <HelpCircle className="w-4 h-4" />
                          </Button>
                        )}
                        
                        {item.status === 'pending' && (
                          <Button size="sm" variant="outline" className="text-xs">
                            Start Setup
                          </Button>
                        )}
                        
                        {item.status === 'in-progress' && (
                          <Badge variant="secondary" className="bg-orange-100 text-orange-700">
                            In Progress
                          </Badge>
                        )}
                        
                        {item.status === 'completed' && (
                          <Badge className="bg-green-100 text-green-700">
                            Complete
                          </Badge>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
                
                {category.id === 'foundation' && (
                  <div className="mt-4 p-3 bg-blue-50 rounded-lg border border-blue-200">
                    <div className="flex items-center space-x-2">
                      <Zap className="w-4 h-4 text-blue-600" />
                      <span className="text-sm font-medium text-blue-900">
                        AI Quick Setup
                      </span>
                    </div>
                    <p className="text-xs text-blue-700 mt-1">
                      Let Jabali auto-generate sample data based on your industry
                    </p>
                    <Button size="sm" className="mt-2 bg-blue-600 hover:bg-blue-700 text-white">
                      Generate Sample Data
                    </Button>
                  </div>
                )}
              </CardContent>
            )}
          </Card>
        ))}
      </div>

      {/* Offline Mode Badge */}
      <div className="flex justify-center">
        <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
          <Circle className="w-3 h-3 mr-1 fill-current" />
          Setup available offline
        </Badge>
      </div>
    </div>
  );
};

export default SetupGuide;
