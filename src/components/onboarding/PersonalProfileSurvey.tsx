import React, { useState } from 'react';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Briefcase } from 'lucide-react';
import { OnboardingData } from '@/pages/OnboardingJourney';
interface PersonalProfileSurveyProps {
  onNext: (data: Partial<OnboardingData>) => void;
  data: OnboardingData;
}
const userRoles = ['Owner/Founder', 'CEO/President', 'CFO', 'Operations Manager', 'Finance Manager', 'Accountant', 'Administrator', 'Other'];
export const PersonalProfileSurvey: React.FC<PersonalProfileSurveyProps> = ({
  onNext,
  data
}) => {
  const [firstName, setFirstName] = useState(data.firstName || '');
  const [lastName, setLastName] = useState(data.lastName || '');
  const [userRole, setUserRole] = useState((data as any).userRole || '');
  const handleNext = () => {
    onNext({
      firstName,
      lastName,
      userRole
    });
  };
  const isFormValid = firstName && lastName && userRole;
  return <div className="min-h-screen bg-gradient-to-br from-background via-primary/5 to-secondary/5 relative overflow-hidden">
      <div className="relative z-10 container mx-auto px-4 py-8">
        {/* Progress Bar */}
        <div className="max-w-md mx-auto mb-8">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-muted-foreground">Personal Profile</span>
            <span className="text-sm text-muted-foreground">→ Company Info</span>
          </div>
          <Progress value={50} className="h-2" />
        </div>

        <div className="max-w-2xl mx-auto">
          <Card className="w-full">
            <CardHeader className="text-center">
              <CardTitle className="text-3xl font-bold text-gray-900">Welcome! Let's start with you</CardTitle>
              <CardDescription className="text-lg text-gray-600">Help us personalize your experience with a few quick questions</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="firstName">First Name *</Label>
                  <Input id="firstName" value={firstName} onChange={e => setFirstName(e.target.value)} placeholder="Enter your first name" className="h-12" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName">Last Name *</Label>
                  <Input id="lastName" value={lastName} onChange={e => setLastName(e.target.value)} placeholder="Enter your last name" className="h-12" />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="userRole" className="text-base font-medium text-foreground flex items-center gap-2">
                  <Briefcase className="w-4 h-4 text-primary" />
                  What's your role? *
                </Label>
                <Select value={userRole} onValueChange={setUserRole}>
                  <SelectTrigger className="h-12">
                    <SelectValue placeholder="Select your role" />
                  </SelectTrigger>
                  <SelectContent>
                    {userRoles.map(role => <SelectItem key={role} value={role}>
                        {role}
                      </SelectItem>)}
                  </SelectContent>
                </Select>
              </div>

              <Button onClick={handleNext} disabled={!isFormValid} className="w-full h-12 text-lg font-semibold">
                Next
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>;
};