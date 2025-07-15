import React, { useState } from 'react';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { OnboardingData } from '@/pages/OnboardingJourney';

interface PersonalProfileSurveyProps {
  onNext: (data: Partial<OnboardingData>) => void;
  data: OnboardingData;
}

const countries = [
  'United States', 'Canada', 'United Kingdom', 'Australia', 'Germany', 'France',
  'Japan', 'China', 'India', 'Brazil', 'Mexico', 'Other'
];

export const PersonalProfileSurvey: React.FC<PersonalProfileSurveyProps> = ({ onNext, data }) => {
  const [firstName, setFirstName] = useState(data.firstName || '');
  const [lastName, setLastName] = useState(data.lastName || '');

  const handleNext = () => {
    onNext({
      firstName,
      lastName,
    });
  };

  const isFormValid = firstName && lastName;

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-primary/5 to-secondary/5 relative overflow-hidden">
      <div className="relative z-10 container mx-auto px-4 py-8">
        {/* Progress Bar */}
        <div className="max-w-md mx-auto mb-8">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-muted-foreground">Personal Profile</span>
            <span className="text-sm text-muted-foreground">→ Company Info → Invoice Setup</span>
          </div>
          <Progress value={33} className="h-2" />
        </div>

        <div className="max-w-2xl mx-auto">
          <Card className="w-full">
            <CardHeader className="text-center">
              <CardTitle className="text-3xl font-bold text-gray-900">Welcome! Let's start with you</CardTitle>
              <CardDescription className="text-lg text-gray-600">
                Tell us about yourself to personalize your experience
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="firstName">What's your first name?</Label>
                  <Input
                    id="firstName"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    placeholder="Enter your first name"
                    className="h-12"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName">What's your last name?</Label>
                  <Input
                    id="lastName"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    placeholder="Enter your last name"
                    className="h-12"
                  />
                </div>
              </div>

              <Button 
                onClick={handleNext} 
                disabled={!isFormValid}
                className="w-full h-12 text-lg font-semibold"
              >
                Continue to Company Information
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};