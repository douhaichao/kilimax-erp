import React, { useState } from 'react';
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
  const [country, setCountry] = useState(data.country || '');
  const [phoneNumber, setPhoneNumber] = useState(data.phoneNumber || '');

  const handleNext = () => {
    onNext({
      firstName,
      lastName,
      country,
      phoneNumber,
    });
  };

  const isFormValid = firstName && lastName && country && phoneNumber;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <Card className="w-full max-w-2xl">
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

          <div className="space-y-2">
            <Label htmlFor="country">Which country are you based in?</Label>
            <Select value={country} onValueChange={setCountry}>
              <SelectTrigger className="h-12">
                <SelectValue placeholder="Select your country" />
              </SelectTrigger>
              <SelectContent>
                {countries.map((countryOption) => (
                  <SelectItem key={countryOption} value={countryOption}>
                    {countryOption}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="phoneNumber">What's your phone number?</Label>
            <Input
              id="phoneNumber"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              placeholder="Enter your phone number"
              className="h-12"
            />
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
  );
};