
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, Mail, Shield, Key, CheckCircle } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";

interface ForgotPasswordFormProps {
  onBack: () => void;
}

const ForgotPasswordForm = ({ onBack }: ForgotPasswordFormProps) => {
  const [step, setStep] = useState<'email' | 'otp' | 'newPassword' | 'success'>('email');
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleSendOTP = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      setStep('otp');
      toast({
        title: "OTP Sent",
        description: `Verification code sent to ${email}`,
      });
    }, 2000);
  };

  const handleVerifyOTP = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate OTP verification
    setTimeout(() => {
      setIsLoading(false);
      if (otp === '123456') { // Demo OTP
        setStep('newPassword');
      } else {
        toast({
          title: "Invalid OTP",
          description: "Please check the code and try again.",
          variant: "destructive",
        });
      }
    }, 1500);
  };

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (newPassword !== confirmPassword) {
      toast({
        title: "Passwords don't match",
        description: "Please ensure both passwords are identical.",
        variant: "destructive",
      });
      return;
    }

    if (newPassword.length < 8) {
      toast({
        title: "Password too short",
        description: "Password must be at least 8 characters long.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    
    // Simulate password reset
    setTimeout(() => {
      setIsLoading(false);
      setStep('success');
      toast({
        title: "Password Reset Successful",
        description: "Your password has been updated successfully.",
      });
    }, 2000);
  };

  const renderEmailStep = () => (
    <form onSubmit={handleSendOTP} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="reset-email" className="text-sm font-medium text-gray-700">
          Email Address
        </Label>
        <div className="relative">
          <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
          <Input
            id="reset-email"
            type="email"
            placeholder="Enter your registered email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="pl-10 h-11 border-gray-300 focus:border-blue-500 focus:ring-blue-500"
            required
          />
        </div>
        <p className="text-xs text-gray-500">
          We'll send a verification code to this email address
        </p>
      </div>
      
      <Button 
        type="submit" 
        className="w-full h-11 bg-blue-600 hover:bg-blue-700 text-white font-medium"
        disabled={isLoading}
      >
        {isLoading ? (
          <div className="flex items-center space-x-2">
            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
            <span>Sending OTP...</span>
          </div>
        ) : (
          'Send Verification Code'
        )}
      </Button>
    </form>
  );

  const renderOTPStep = () => (
    <form onSubmit={handleVerifyOTP} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="otp" className="text-sm font-medium text-gray-700">
          Verification Code
        </Label>
        <div className="relative">
          <Shield className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
          <Input
            id="otp"
            type="text"
            placeholder="Enter 6-digit code"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            className="pl-10 h-11 text-center text-lg font-mono border-gray-300 focus:border-blue-500 focus:ring-blue-500"
            maxLength={6}
            required
          />
        </div>
        <p className="text-xs text-gray-500">
          Code sent to {email}. For demo, use: <span className="font-mono font-semibold">123456</span>
        </p>
      </div>
      
      <Button 
        type="submit" 
        className="w-full h-11 bg-blue-600 hover:bg-blue-700 text-white font-medium"
        disabled={isLoading}
      >
        {isLoading ? (
          <div className="flex items-center space-x-2">
            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
            <span>Verifying...</span>
          </div>
        ) : (
          'Verify Code'
        )}
      </Button>
      
      <Button 
        type="button" 
        variant="outline"
        className="w-full h-11"
        onClick={() => handleSendOTP(new Event('submit') as any)}
      >
        Resend Code
      </Button>
    </form>
  );

  const renderNewPasswordStep = () => (
    <form onSubmit={handleResetPassword} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="new-password" className="text-sm font-medium text-gray-700">
          New Password
        </Label>
        <div className="relative">
          <Key className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
          <Input
            id="new-password"
            type="password"
            placeholder="Enter new password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            className="pl-10 h-11 border-gray-300 focus:border-blue-500 focus:ring-blue-500"
            required
          />
        </div>
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="confirm-password" className="text-sm font-medium text-gray-700">
          Confirm Password
        </Label>
        <div className="relative">
          <Key className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
          <Input
            id="confirm-password"
            type="password"
            placeholder="Confirm new password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="pl-10 h-11 border-gray-300 focus:border-blue-500 focus:ring-blue-500"
            required
          />
        </div>
      </div>
      
      <div className="text-xs text-gray-500 space-y-1">
        <p>Password requirements:</p>
        <ul className="list-disc list-inside space-y-1 ml-2">
          <li>At least 8 characters long</li>
          <li>Include uppercase and lowercase letters</li>
          <li>Include at least one number</li>
          <li>Include at least one special character</li>
        </ul>
      </div>
      
      <Button 
        type="submit" 
        className="w-full h-11 bg-blue-600 hover:bg-blue-700 text-white font-medium"
        disabled={isLoading}
      >
        {isLoading ? (
          <div className="flex items-center space-x-2">
            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
            <span>Resetting Password...</span>
          </div>
        ) : (
          'Reset Password'
        )}
      </Button>
    </form>
  );

  const renderSuccessStep = () => (
    <div className="text-center space-y-4">
      <div className="flex justify-center">
        <CheckCircle className="h-16 w-16 text-green-500" />
      </div>
      <div>
        <h3 className="text-lg font-semibold text-gray-900">Password Reset Successful!</h3>
        <p className="text-gray-600 mt-2">
          Your password has been updated successfully. You can now sign in with your new password.
        </p>
      </div>
      <Button 
        onClick={onBack}
        className="w-full h-11 bg-blue-600 hover:bg-blue-700 text-white font-medium"
      >
        Back to Sign In
      </Button>
    </div>
  );

  const getStepTitle = () => {
    switch (step) {
      case 'email': return 'Reset Password';
      case 'otp': return 'Verify Your Identity';
      case 'newPassword': return 'Create New Password';
      case 'success': return 'All Set!';
      default: return 'Reset Password';
    }
  };

  const getStepDescription = () => {
    switch (step) {
      case 'email': return 'Enter your email address to receive a verification code';
      case 'otp': return 'Enter the verification code sent to your email';
      case 'newPassword': return 'Choose a strong password for your account';
      case 'success': return 'Your password has been successfully updated';
      default: return '';
    }
  };

  return (
    <Card className="w-full max-w-md mx-auto shadow-xl border-0 bg-white/95 backdrop-blur-sm">
      <CardHeader className="space-y-4 pb-6">
        <button
          onClick={step === 'success' ? onBack : () => {
            if (step === 'email') {
              onBack();
            } else if (step === 'otp') {
              setStep('email');
            } else if (step === 'newPassword') {
              setStep('otp');
            }
          }}
          className="flex items-center space-x-2 text-gray-600 hover:text-gray-800 transition-colors self-start"
        >
          <ArrowLeft className="h-4 w-4" />
          <span className="text-sm">Back</span>
        </button>
        
        <div className="text-center">
          <CardTitle className="text-2xl font-semibold text-gray-900">
            {getStepTitle()}
          </CardTitle>
          <CardDescription className="text-gray-600 mt-1">
            {getStepDescription()}
          </CardDescription>
        </div>
      </CardHeader>
      
      <CardContent>
        {step === 'email' && renderEmailStep()}
        {step === 'otp' && renderOTPStep()}
        {step === 'newPassword' && renderNewPasswordStep()}
        {step === 'success' && renderSuccessStep()}
      </CardContent>
    </Card>
  );
};

export default ForgotPasswordForm;
