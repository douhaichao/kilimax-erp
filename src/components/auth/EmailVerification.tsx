import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Mail, CheckCircle, ArrowRight, RotateCcw } from 'lucide-react';

interface EmailVerificationProps {
  email: string;
  onVerificationComplete: () => void;
}

export default function EmailVerification({ email, onVerificationComplete }: EmailVerificationProps) {
  const [countdown, setCountdown] = useState(60);
  const [canResend, setCanResend] = useState(false);

  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    } else {
      setCanResend(true);
    }
  }, [countdown]);

  const handleResendEmail = () => {
    setCountdown(60);
    setCanResend(false);
    // Simulate resending email
  };

  const handleContinue = () => {
    // Simulate email verification
    onVerificationComplete();
  };

  return (
    <Card className="w-full max-w-md mx-auto shadow-xl border-0 bg-white/95 backdrop-blur-sm">
      <CardHeader className="space-y-4 pb-6 text-center">
        <div className="flex items-center justify-center mb-2">
          <div className="p-3 bg-primary/10 rounded-full">
            <Mail className="w-8 h-8 text-primary" />
          </div>
        </div>
        <CardTitle className="text-2xl font-bold text-gray-900">
          Check Your Email
        </CardTitle>
        <CardDescription className="text-gray-600 leading-relaxed">
          We've sent a verification link to{' '}
          <span className="font-medium text-primary">{email}</span>
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-6">
        {/* Instructions */}
        <div className="space-y-4">
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <h3 className="font-medium text-blue-900 mb-2">Next Steps:</h3>
            <ul className="space-y-1 text-sm text-blue-800">
              <li className="flex items-center space-x-2">
                <CheckCircle className="w-4 h-4 text-blue-600" />
                <span>Check your inbox (and spam folder)</span>
              </li>
              <li className="flex items-center space-x-2">
                <CheckCircle className="w-4 h-4 text-blue-600" />
                <span>Click the verification link</span>
              </li>
              <li className="flex items-center space-x-2">
                <CheckCircle className="w-4 h-4 text-blue-600" />
                <span>Complete your account setup</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Resend Email */}
        <div className="text-center space-y-3">
          <p className="text-sm text-gray-600">
            Didn't receive the email?
          </p>
          
          {canResend ? (
            <Button
              variant="outline"
              onClick={handleResendEmail}
              className="w-full border-primary text-primary hover:bg-primary/5"
            >
              <RotateCcw className="mr-2 w-4 h-4" />
              Resend Verification Email
            </Button>
          ) : (
            <Button
              variant="outline"
              disabled
              className="w-full"
            >
              Resend in {countdown}s
            </Button>
          )}
        </div>

        {/* Demo Continue Button */}
        <div className="pt-4 border-t border-gray-100">
          <p className="text-xs text-gray-500 text-center mb-3">
            For demo purposes, you can continue without verification
          </p>
          <Button
            onClick={handleContinue}
            className="w-full bg-primary hover:bg-primary/90 text-white font-medium"
          >
            Continue to Setup
            <ArrowRight className="ml-2 w-4 h-4" />
          </Button>
        </div>

        {/* Support */}
        <div className="text-center">
          <p className="text-xs text-gray-500">
            Need help?{' '}
            <a href="#" className="text-primary hover:underline">
              Contact Support
            </a>
          </p>
        </div>
      </CardContent>
    </Card>
  );
}