import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Mail, Lock, Eye, EyeOff, ArrowRight } from 'lucide-react';
import Captcha from './Captcha';

interface LoginFormProps {
  onForgotPassword: () => void;
  onLogin: () => void;
}

const LoginForm = ({ onForgotPassword, onLogin }: LoginFormProps) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);
  const [isCaptchaValid, setIsCaptchaValid] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!isCaptchaValid) {
      alert('Please complete the captcha verification');
      return;
    }
    
    setIsLoading(true);
    
    // Simulate login process
    setTimeout(() => {
      setIsLoading(false);
      onLogin();
    }, 1500);
  };

  const handleGoogleLogin = async () => {
    setIsGoogleLoading(true);
    
    // Simulate Google login process
    setTimeout(() => {
      setIsGoogleLoading(false);
      onLogin();
    }, 2000);
  };

  return (
    <Card className="w-full shadow-2xl border-0 bg-white/95 backdrop-blur-md overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-blue-600/5 via-transparent to-indigo-600/5"></div>
      
      <CardHeader className="space-y-4 pb-6 relative">
        <div className="flex items-center justify-center mb-4">
          <div className="flex items-center space-x-3">
            <div className="p-3 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-xl shadow-lg">
              <div className="w-7 h-7 bg-white rounded-lg text-blue-600 flex items-center justify-center text-lg font-bold">K</div>
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Kilimax</h1>
              <p className="text-xs text-gray-500">Enterprise Resource Planning</p>
            </div>
          </div>
        </div>
        <div className="text-center">
          <CardTitle className="text-3xl font-bold text-gray-900">欢迎回来</CardTitle>
          <CardDescription className="text-gray-600 mt-2 text-base">
            登录您的 Kilimax ERP 管理系统
          </CardDescription>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-6 relative">
        {/* Google Login Button */}
        <Button 
          type="button"
          variant="outline"
          onClick={handleGoogleLogin}
          disabled={isGoogleLoading || isLoading}
          className="w-full h-12 border-gray-300 hover:bg-gray-50 transition-all duration-200 hover:shadow-md"
        >
          {isGoogleLoading ? (
            <div className="flex items-center space-x-3">
              <div className="w-5 h-5 border-2 border-gray-400 border-t-transparent rounded-full animate-spin"></div>
              <span>正在通过 Google 登录...</span>
            </div>
          ) : (
            <div className="flex items-center space-x-3">
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
              <span>使用 Google 账户登录</span>
            </div>
          )}
        </Button>
        
        <div className="relative">
          <Separator />
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="bg-white px-3 text-sm text-gray-500">或使用邮箱登录</span>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="space-y-2">
            <Label htmlFor="email" className="text-sm font-medium text-gray-700">
              邮箱地址
            </Label>
            <div className="relative group">
              <Mail className="absolute left-3 top-3.5 h-5 w-5 text-gray-400 group-focus-within:text-blue-600 transition-colors" />
              <Input
                id="email"
                type="email"
                placeholder="输入您的邮箱地址"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="pl-11 h-12 border-gray-300 focus:border-blue-500 focus:ring-blue-500 transition-all duration-200"
                required
              />
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="password" className="text-sm font-medium text-gray-700">
              密码
            </Label>
            <div className="relative group">
              <Lock className="absolute left-3 top-3.5 h-5 w-5 text-gray-400 group-focus-within:text-blue-600 transition-colors" />
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="输入您的密码"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="pl-11 pr-11 h-12 border-gray-300 focus:border-blue-500 focus:ring-blue-500 transition-all duration-200"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-3.5 text-gray-400 hover:text-gray-600 transition-colors"
              >
                {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
              </button>
            </div>
          </div>

          <Captcha onVerify={setIsCaptchaValid} />
          
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <input
                id="remember"
                type="checkbox"
                className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              <Label htmlFor="remember" className="text-sm text-gray-600">
                记住我
              </Label>
            </div>
            <button
              type="button"
              onClick={onForgotPassword}
              className="text-sm text-blue-600 hover:text-blue-500 font-medium transition-colors"
            >
              忘记密码？
            </button>
          </div>
          
          <Button 
            type="submit" 
            className="w-full h-12 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-medium transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
            disabled={isLoading || !isCaptchaValid}
          >
            {isLoading ? (
              <div className="flex items-center space-x-3">
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                <span>正在登录...</span>
              </div>
            ) : (
              <div className="flex items-center space-x-2">
                <span>立即登录</span>
                <ArrowRight className="w-4 h-4" />
              </div>
            )}
          </Button>
        </form>

        {/* Demo Account Hint */}
        <div className="text-center pt-4 border-t border-gray-100">
          <p className="text-xs text-gray-500 mb-2">演示账户</p>
          <div className="text-xs text-gray-400 space-y-1">
            <div>邮箱: demo@kilimax.com</div>
            <div>密码: demo123</div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default LoginForm;
