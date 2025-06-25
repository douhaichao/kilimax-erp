
import React, { useState } from 'react';
import LoginForm from '@/components/LoginForm';
import ForgotPasswordForm from '@/components/ForgotPasswordForm';
import Dashboard from '@/components/Dashboard';
import Profile from '@/pages/Profile';
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Shield, 
  Zap, 
  BarChart3, 
  Users, 
  Globe, 
  CheckCircle, 
  TrendingUp,
  Package,
  CreditCard,
  Settings
} from 'lucide-react';

const Index = () => {
  const [currentView, setCurrentView] = useState<'login' | 'forgotPassword' | 'dashboard' | 'profile'>('login');

  const handleForgotPassword = () => {
    setCurrentView('forgotPassword');
  };

  const handleBackToLogin = () => {
    setCurrentView('login');
  };

  const handleLogin = () => {
    setCurrentView('dashboard');
  };

  const handleLogout = () => {
    setCurrentView('login');
  };

  const handleProfileClick = () => {
    setCurrentView('profile');
  };

  const handleBackToDashboard = () => {
    setCurrentView('dashboard');
  };

  if (currentView === 'dashboard') {
    return <Dashboard onLogout={handleLogout} onProfileClick={handleProfileClick} />;
  }

  if (currentView === 'profile') {
    return <Profile onBack={handleBackToDashboard} />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 relative overflow-hidden">
      {/* Enhanced Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-full h-full bg-grid-pattern opacity-5"></div>
        <div className="absolute top-20 left-20 w-72 h-72 bg-blue-200 rounded-full opacity-10 animate-pulse blur-3xl"></div>
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-indigo-200 rounded-full opacity-10 animate-pulse delay-300 blur-3xl"></div>
        <div className="absolute top-1/3 right-1/4 w-48 h-48 bg-green-200 rounded-full opacity-10 animate-pulse delay-500 blur-2xl"></div>
      </div>
      
      <div className="relative z-10 min-h-screen flex">
        {/* Left Side - Product Value Proposition */}
        <div className="hidden lg:flex lg:w-1/2 flex-col justify-center p-12 xl:p-16">
          <div className="max-w-xl">
            {/* Logo and Brand */}
            <div className="mb-8">
              <div className="flex items-center space-x-3 mb-6">
                <div className="p-3 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-xl shadow-lg">
                  <div className="w-8 h-8 bg-white rounded-lg text-blue-600 flex items-center justify-center text-xl font-bold">K</div>
                </div>
                <div>
                  <h1 className="text-3xl font-bold text-gray-900">Kilimax</h1>
                  <p className="text-gray-600">Enterprise Resource Planning</p>
                </div>
              </div>
              <Badge variant="secondary" className="bg-blue-100 text-blue-700 border-blue-200">
                Modern Enterprise Management
              </Badge>
            </div>

            {/* Value Proposition */}
            <div className="space-y-8">
              <div>
                <h2 className="text-4xl font-bold text-gray-900 mb-4 leading-tight">
                  Make Business Management
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">
                    Smarter
                  </span>
                </h2>
                <p className="text-xl text-gray-600 leading-relaxed">
                  Comprehensive ERP system integrating inventory management, sales analytics, and operations control in one powerful platform.
                </p>
              </div>

              {/* Key Features */}
              <div className="grid grid-cols-1 gap-5">
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                    <Package className="w-5 h-5 text-green-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">Smart Inventory</h3>
                    <p className="text-gray-600 text-sm">Multi-unit support with automated stock alerts</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                    <BarChart3 className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">Real-time Analytics</h3>
                    <p className="text-gray-600 text-sm">Visual reports and trend analysis</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                    <Zap className="w-5 h-5 text-purple-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">Process Automation</h3>
                    <p className="text-gray-600 text-sm">Reduce manual work and errors</p>
                  </div>
                </div>
              </div>

              {/* Statistics */}
              <div className="mt-8 pt-6 border-t border-gray-200">
                <div className="grid grid-cols-3 gap-4">
                  <div className="text-center">
                    <div className="text-xl font-bold text-blue-600">10K+</div>
                    <div className="text-xs text-gray-600">Businesses</div>
                  </div>
                  <div className="text-center">
                    <div className="text-xl font-bold text-green-600">99.9%</div>
                    <div className="text-xs text-gray-600">Uptime</div>
                  </div>
                  <div className="text-center">
                    <div className="text-xl font-bold text-purple-600">24/7</div>
                    <div className="text-xs text-gray-600">Support</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side - Login Form */}
        <div className="w-full lg:w-1/2 flex items-center justify-center p-4 lg:p-8">
          <div className="w-full max-w-md">
            {currentView === 'login' && (
              <div className="animate-fadeIn">
                <LoginForm 
                  onForgotPassword={handleForgotPassword}
                  onLogin={handleLogin}
                />
                
                {/* Additional Features Preview */}
                <Card className="mt-4 bg-white/80 backdrop-blur-sm border-gray-200">
                  <CardContent className="p-3">
                    <div className="text-center mb-2">
                      <h4 className="text-sm font-semibold text-gray-900 mb-2">Core Modules</h4>
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      <div className="flex items-center space-x-2 text-xs text-gray-600">
                        <Package className="w-3 h-3 text-blue-600" />
                        <span>Inventory</span>
                      </div>
                      <div className="flex items-center space-x-2 text-xs text-gray-600">
                        <CreditCard className="w-3 h-3 text-green-600" />
                        <span>Sales</span>
                      </div>
                      <div className="flex items-center space-x-2 text-xs text-gray-600">
                        <BarChart3 className="w-3 h-3 text-purple-600" />
                        <span>Analytics</span>
                      </div>
                      <div className="flex items-center space-x-2 text-xs text-gray-600">
                        <Settings className="w-3 h-3 text-orange-600" />
                        <span>Settings</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}
            
            {currentView === 'forgotPassword' && (
              <div className="animate-fadeIn">
                <ForgotPasswordForm onBack={handleBackToLogin} />
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Trust Indicators */}
      <div className="absolute bottom-0 left-0 right-0 bg-white/80 backdrop-blur-sm border-t border-gray-200 py-3 px-6">
        <div className="flex items-center justify-center space-x-6 text-xs text-gray-600">
          <div className="flex items-center space-x-1">
            <Shield className="w-3 h-3 text-green-600" />
            <span>Bank-level Security</span>
          </div>
          <div className="flex items-center space-x-1">
            <Globe className="w-3 h-3 text-blue-600" />
            <span>Cloud-based</span>
          </div>
          <div className="flex items-center space-x-1">
            <Users className="w-3 h-3 text-purple-600" />
            <span>Team Collaboration</span>
          </div>
          <div className="flex items-center space-x-1">
            <TrendingUp className="w-3 h-3 text-orange-600" />
            <span>Continuous Updates</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
