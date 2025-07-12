import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { Progress } from '@/components/ui/progress';
import { 
  TrendingUp, 
  DollarSign, 
  Clock, 
  Users, 
  Crown, 
  Download, 
  Check,
  Zap,
  Shield,
  Globe,
  Smartphone,
  Star,
  ArrowRight
} from 'lucide-react';
import { OnboardingData } from '@/pages/OnboardingJourney';

interface TrialSuccessDashboardProps {
  data: OnboardingData;
}

const performanceMetrics = [
  {
    icon: DollarSign,
    label: 'Simulated Revenue',
    value: '$15,350',
    change: '+127%',
    color: 'text-green-600'
  },
  {
    icon: Clock,
    label: 'Time Saved',
    value: '6 hours',
    change: 'with automation',
    color: 'text-blue-600'
  },
  {
    icon: Users,
    label: 'Records Created',
    value: '23',
    change: 'products & customers',
    color: 'text-purple-600'
  }
];

const features = [
  { name: 'Advanced Reporting', included: true },
  { name: 'Multi-location Support', included: true },
  { name: 'API Access', included: true },
  { name: 'Priority Support', included: true },
  { name: 'Custom Integrations', included: true },
  { name: 'Advanced Permissions', included: true }
];

const pricingPlans = [
  {
    name: 'Professional',
    monthlyPrice: 49,
    annualPrice: 39,
    features: ['Up to 5 users', 'Basic reporting', 'Email support']
  },
  {
    name: 'Business',
    monthlyPrice: 99,
    annualPrice: 79,
    features: ['Up to 25 users', 'Advanced reporting', 'Priority support'],
    popular: true
  },
  {
    name: 'Enterprise',
    monthlyPrice: 199,
    annualPrice: 159,
    features: ['Unlimited users', 'Custom integrations', 'Dedicated support']
  }
];

export const TrialSuccessDashboard: React.FC<TrialSuccessDashboardProps> = ({ data }) => {
  const [isAnnual, setIsAnnual] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState('Business');

  const handleSubscribe = () => {
    // In a real app, this would integrate with payment processing
    alert(`Starting ${selectedPlan} subscription!`);
  };

  const handleExportData = () => {
    // In a real app, this would trigger data export
    alert('Data export started! You will receive an email with your data.');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-primary/5 to-secondary/5">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="w-20 h-20 bg-secondary/10 rounded-full flex items-center justify-center mx-auto mb-4">
            <Crown className="w-10 h-10 text-secondary" />
          </div>
          <h1 className="text-3xl font-bold text-foreground mb-2">
            Congratulations, {data.companyName}!
          </h1>
          <p className="text-muted-foreground text-lg">
            You've successfully completed your ERP setup journey
          </p>
        </div>

        {/* Trial Progress */}
        <div className="max-w-md mx-auto mb-8">
          <Card>
            <CardHeader className="text-center pb-4">
              <CardTitle className="text-lg">Trial Progress</CardTitle>
              <div className="text-3xl font-bold text-secondary">100%</div>
            </CardHeader>
            <CardContent>
              <Progress value={100} className="h-3 mb-2" />
              <p className="text-sm text-muted-foreground text-center">
                All setup tasks completed!
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Performance Summary */}
        <div className="max-w-4xl mx-auto mb-8">
          <h2 className="text-2xl font-semibold text-center mb-6">Your Trial Success Story</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {performanceMetrics.map((metric, index) => {
              const Icon = metric.icon;
              return (
                <Card key={index} className="text-center">
                  <CardHeader className="pb-4">
                    <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3">
                      <Icon className="w-6 h-6 text-primary" />
                    </div>
                    <CardTitle className="text-2xl font-bold">{metric.value}</CardTitle>
                    <CardDescription className={`font-medium ${metric.color}`}>
                      {metric.change}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">{metric.label}</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>

        {/* Upgrade Section */}
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Pricing Plans */}
            <div className="lg:col-span-2">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-semibold">Unlock Full Potential</h2>
                <div className="flex items-center space-x-2">
                  <span className="text-sm">Monthly</span>
                  <Switch 
                    checked={isAnnual} 
                    onCheckedChange={setIsAnnual}
                  />
                  <span className="text-sm">Annual</span>
                  <Badge variant="secondary" className="text-xs">20% off</Badge>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {pricingPlans.map((plan) => (
                  <Card 
                    key={plan.name}
                    className={`cursor-pointer transition-all duration-300 ${
                      selectedPlan === plan.name 
                        ? 'ring-2 ring-primary shadow-lg scale-105' 
                        : 'hover:shadow-md'
                    } ${plan.popular ? 'border-secondary' : ''}`}
                    onClick={() => setSelectedPlan(plan.name)}
                  >
                    {plan.popular && (
                      <div className="bg-secondary text-white text-xs font-medium text-center py-2 rounded-t-lg">
                        Most Popular
                      </div>
                    )}
                    
                    <CardHeader className="text-center">
                      <CardTitle className="text-lg">{plan.name}</CardTitle>
                      <div className="text-3xl font-bold">
                        ${isAnnual ? plan.annualPrice : plan.monthlyPrice}
                        <span className="text-sm font-normal text-muted-foreground">/month</span>
                      </div>
                      {isAnnual && (
                        <p className="text-sm text-green-600">
                          Save ${(plan.monthlyPrice - plan.annualPrice) * 12}/year
                        </p>
                      )}
                    </CardHeader>
                    
                    <CardContent>
                      <ul className="space-y-2">
                        {plan.features.map((feature, index) => (
                          <li key={index} className="flex items-center space-x-2 text-sm">
                            <Check className="w-4 h-4 text-green-600" />
                            <span>{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Urgency Element */}
              <Card className="border-orange-200 bg-orange-50">
                <CardHeader>
                  <CardTitle className="text-lg text-orange-800">Limited Time Offer</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center mb-4">
                    <div className="text-2xl font-bold text-orange-600">3 days left</div>
                    <p className="text-sm text-orange-700">in your trial</p>
                  </div>
                  <div className="bg-orange-100 rounded-lg p-3 text-center">
                    <p className="text-sm font-medium text-orange-800 mb-1">Special Offer</p>
                    <p className="text-xs text-orange-700">First 3 months 40% off</p>
                  </div>
                </CardContent>
              </Card>

              {/* Features List */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Full Version Includes</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {features.map((feature, index) => (
                      <li key={index} className="flex items-center space-x-2">
                        <div className="w-5 h-5 bg-green-100 rounded-full flex items-center justify-center">
                          <Check className="w-3 h-3 text-green-600" />
                        </div>
                        <span className="text-sm">{feature.name}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>

              {/* Social Proof */}
              <Card>
                <CardContent className="p-4 text-center">
                  <div className="flex items-center justify-center space-x-1 mb-2">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                    ))}
                  </div>
                  <p className="text-sm font-medium mb-1">Join 15,000+ businesses</p>
                  <p className="text-xs text-muted-foreground">like yours using our platform</p>
                </CardContent>
              </Card>

              {/* Action Buttons */}
              <div className="space-y-3">
                <Button 
                  onClick={handleSubscribe}
                  className="w-full h-12 text-lg"
                  size="lg"
                >
                  Start Full Subscription
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
                
                <Button 
                  variant="outline" 
                  onClick={handleExportData}
                  className="w-full"
                >
                  <Download className="w-4 h-4 mr-2" />
                  Export My Data
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Trust Indicators */}
        <div className="max-w-4xl mx-auto mt-12 pt-8 border-t">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div className="flex flex-col items-center space-y-2">
              <Shield className="w-8 h-8 text-muted-foreground" />
              <span className="text-sm text-muted-foreground">Enterprise Security</span>
            </div>
            <div className="flex flex-col items-center space-y-2">
              <Globe className="w-8 h-8 text-muted-foreground" />
              <span className="text-sm text-muted-foreground">Global Compliance</span>
            </div>
            <div className="flex flex-col items-center space-y-2">
              <Smartphone className="w-8 h-8 text-muted-foreground" />
              <span className="text-sm text-muted-foreground">Mobile Ready</span>
            </div>
            <div className="flex flex-col items-center space-y-2">
              <Zap className="w-8 h-8 text-muted-foreground" />
              <span className="text-sm text-muted-foreground">99.9% Uptime</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};