import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Eye, EyeOff, ArrowRight, Mail, User, Globe } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
interface RegistrationFormProps {
  onRegistrationComplete: () => void;
  onBackToLogin: () => void;
}
export default function RegistrationForm({
  onRegistrationComplete,
  onBackToLogin
}: RegistrationFormProps) {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    acceptTerms: false,
    acceptMarketing: false
  });
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate registration process
    setTimeout(() => {
      onRegistrationComplete();
    }, 1000);
  };
  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };
  const handleGoogleSignUp = () => {
    // Simulate Google OAuth process
    setTimeout(() => {
      onRegistrationComplete();
    }, 1000);
  };
  const isFormValid = () => {
    return formData.firstName && formData.lastName && formData.email && formData.password.length >= 8 && formData.acceptTerms;
  };
  return <Card className="w-full max-w-md mx-auto shadow-xl border-0 bg-white/95 backdrop-blur-sm">
      <CardHeader className="space-y-2 pb-6">
        <div className="flex items-center justify-center mb-2">
          <div className="p-2 bg-gradient-to-br from-primary/20 to-primary/10 rounded-xl">
            <User className="w-6 h-6 text-primary" />
          </div>
        </div>
        <CardTitle className="text-2xl font-bold text-center text-gray-900">
          Create Your Account
        </CardTitle>
        <CardDescription className="text-center text-gray-600">
          Join thousands of businesses streamlining their operations
        </CardDescription>
        <div className="flex justify-center">
          <Badge variant="secondary" className="bg-primary/10 text-primary border-primary/20">Free 14-day trial</Badge>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Name Fields */}
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-2">
              <Label htmlFor="firstName" className="text-sm font-medium text-gray-700">
                First Name
              </Label>
              <Input id="firstName" type="text" placeholder="John" value={formData.firstName} onChange={e => handleInputChange('firstName', e.target.value)} className="border-gray-200 focus:border-primary focus:ring-primary/20" required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="lastName" className="text-sm font-medium text-gray-700">
                Last Name
              </Label>
              <Input id="lastName" type="text" placeholder="Doe" value={formData.lastName} onChange={e => handleInputChange('lastName', e.target.value)} className="border-gray-200 focus:border-primary focus:ring-primary/20" required />
            </div>
          </div>

          {/* Email */}
          <div className="space-y-2">
            <Label htmlFor="email" className="text-sm font-medium text-gray-700">Email</Label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input id="email" type="email" placeholder="john@company.com" value={formData.email} onChange={e => handleInputChange('email', e.target.value)} className="pl-10 border-gray-200 focus:border-primary focus:ring-primary/20" required />
            </div>
          </div>


          {/* Password */}
          <div className="space-y-2">
            <Label htmlFor="password" className="text-sm font-medium text-gray-700">
              Password
            </Label>
            <div className="relative">
              <Input id="password" type={showPassword ? 'text' : 'password'} placeholder="Minimum 8 characters" value={formData.password} onChange={e => handleInputChange('password', e.target.value)} className="pr-10 border-gray-200 focus:border-primary focus:ring-primary/20" minLength={8} required />
              <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600">
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
            <p className="text-xs text-gray-500">
              Password must be at least 8 characters long
            </p>
          </div>

          {/* Terms and Conditions */}
          <div className="space-y-3">
            <div className="flex items-start space-x-2">
              <Checkbox id="terms" checked={formData.acceptTerms} onCheckedChange={checked => handleInputChange('acceptTerms', !!checked)} className="mt-1" required />
              <Label htmlFor="terms" className="text-sm text-gray-600 leading-relaxed">
                I agree to the{' '}
                <a href="#" className="text-primary hover:underline font-medium">
                  Terms of Service
                </a>{' '}
                and{' '}
                <a href="#" className="text-primary hover:underline font-medium">
                  Privacy Policy
                </a>
              </Label>
            </div>

            
          </div>

          {/* Submit Button */}
          <Button type="submit" className="w-full bg-primary hover:bg-primary/90 text-white font-medium py-2.5" disabled={!isFormValid()}>
            Create Account & Start Trial
            <ArrowRight className="ml-2 w-4 h-4" />
          </Button>
        </form>

        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t border-gray-200" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-white px-2 text-gray-500">OR</span>
          </div>
        </div>

        {/* Google Sign Up */}
        <Button type="button" variant="outline" className="w-full border-gray-200 hover:bg-gray-50 py-2.5" onClick={handleGoogleSignUp}>
          <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
            <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
            <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
            <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
            <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
          </svg>
          Continue with Google
        </Button>

        {/* Alternative Login */}
        <div className="text-center pt-4 border-t border-gray-100">
          <p className="text-sm text-gray-600">
            Already have an account?{' '}
            <button type="button" onClick={onBackToLogin} className="text-primary hover:underline font-medium">
              Sign in
            </button>
          </p>
        </div>

        {/* Security Notice */}
        <div className="mt-6 p-3 bg-gray-50 rounded-lg">
          <div className="flex items-center space-x-2 text-sm text-gray-600">
            <Globe className="w-4 h-4 text-primary" />
            <span>Your data is protected with enterprise-grade security</span>
          </div>
        </div>
      </CardContent>
    </Card>;
}