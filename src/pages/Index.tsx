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
                现代化企业管理解决方案
              </Badge>
            </div>

            {/* Value Proposition */}
            <div className="space-y-8">
              <div>
                <h2 className="text-4xl font-bold text-gray-900 mb-4 leading-tight">
                  让企业管理
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">
                    更智能
                  </span>
                </h2>
                <p className="text-xl text-gray-600 leading-relaxed">
                  集成商品管理、库存控制、销售分析于一体的全功能ERP系统，助您轻松管理企业运营的每一个环节。
                </p>
              </div>

              {/* Key Features */}
              <div className="grid grid-cols-1 gap-6">
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                    <Package className="w-6 h-6 text-green-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">智能商品管理</h3>
                    <p className="text-gray-600">多单位支持、批量操作、自动库存预警，让商品管理变得简单高效</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                    <BarChart3 className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">实时数据分析</h3>
                    <p className="text-gray-600">可视化报表、趋势分析、关键指标监控，数据驱动决策</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
                    <Zap className="w-6 h-6 text-purple-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">自动化流程</h3>
                    <p className="text-gray-600">减少重复工作、提升效率、降低人为错误，专注核心业务</p>
                  </div>
                </div>
              </div>

              {/* Statistics */}
              <div className="mt-12 pt-8 border-t border-gray-200">
                <div className="grid grid-cols-3 gap-6">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-blue-600">10,000+</div>
                    <div className="text-sm text-gray-600">企业用户</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-green-600">99.9%</div>
                    <div className="text-sm text-gray-600">系统稳定性</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-purple-600">24/7</div>
                    <div className="text-sm text-gray-600">技术支持</div>
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
                <Card className="mt-6 bg-white/80 backdrop-blur-sm border-gray-200">
                  <CardContent className="p-4">
                    <div className="text-center mb-3">
                      <h4 className="text-sm font-semibold text-gray-900 mb-2">核心功能模块</h4>
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <div className="flex items-center space-x-2 text-sm text-gray-600">
                        <Package className="w-4 h-4 text-blue-600" />
                        <span>商品管理</span>
                      </div>
                      <div className="flex items-center space-x-2 text-sm text-gray-600">
                        <CreditCard className="w-4 h-4 text-green-600" />
                        <span>销售订单</span>
                      </div>
                      <div className="flex items-center space-x-2 text-sm text-gray-600">
                        <BarChart3 className="w-4 h-4 text-purple-600" />
                        <span>数据分析</span>
                      </div>
                      <div className="flex items-center space-x-2 text-sm text-gray-600">
                        <Settings className="w-4 h-4 text-orange-600" />
                        <span>系统设置</span>
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
      <div className="absolute bottom-0 left-0 right-0 bg-white/80 backdrop-blur-sm border-t border-gray-200 py-4 px-6">
        <div className="flex items-center justify-center space-x-8 text-sm text-gray-600">
          <div className="flex items-center space-x-2">
            <Shield className="w-4 h-4 text-green-600" />
            <span>银行级安全</span>
          </div>
          <div className="flex items-center space-x-2">
            <Globe className="w-4 h-4 text-blue-600" />
            <span>云端部署</span>
          </div>
          <div className="flex items-center space-x-2">
            <Users className="w-4 h-4 text-purple-600" />
            <span>团队协作</span>
          </div>
          <div className="flex items-center space-x-2">
            <TrendingUp className="w-4 h-4 text-orange-600" />
            <span>持续升级</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
