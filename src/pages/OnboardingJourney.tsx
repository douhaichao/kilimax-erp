import React, { useState } from 'react';
import { CompanyProfileSurvey } from '@/components/onboarding/CompanyProfileSurvey';
import { InvoiceTemplateConfiguration } from '@/components/onboarding/InvoiceTemplateConfiguration';
import { AIIndustrySetup } from '@/components/onboarding/AIIndustrySetup';
import { GuidedTourDashboard } from '@/components/onboarding/GuidedTourDashboard';
import { MissionControl } from '@/components/onboarding/MissionControl';
import { FirstCustomerCreation } from '@/components/onboarding/FirstCustomerCreation';
import { PersonalizedLearningHub } from '@/components/onboarding/PersonalizedLearningHub';
import { TrialSuccessDashboard } from '@/components/onboarding/TrialSuccessDashboard';

export type OnboardingStep = 
  | 'company-profile'
  | 'invoice-config'
  | 'industry-setup' 
  | 'guided-tour'
  | 'mission-control'
  | 'customer-creation'
  | 'learning-hub'
  | 'trial-success';

export interface OnboardingData {
  companyName: string;
  country: string;
  industry: string;
  completedTasks: string[];
  customerData?: any;
  logo?: string;
  address?: string;
  phone?: string;
  email?: string;
  employeeCount?: string;
  userRole?: string;
  businessDescription?: string;
  invoiceSettings?: {
    invoicePrefix: string;
    invoiceStartNumber: string;
    paymentTerms: string;
    taxRate: string;
    customTaxRate: string;
    taxLabel: string;
    showTax: boolean;
    showDiscount: boolean;
    showNotes: boolean;
    templateStyle: string;
    primaryColor: string;
    footerText: string;
    bankDetails: string;
    paymentInstructions: string;
  };
}

const OnboardingJourney = () => {
  const [currentStep, setCurrentStep] = useState<OnboardingStep>('company-profile');
  const [onboardingData, setOnboardingData] = useState<OnboardingData>({
    companyName: '',
    country: '',
    industry: '',
    completedTasks: [],
  });

  const nextStep = (data?: Partial<OnboardingData>) => {
    if (data) {
      setOnboardingData(prev => ({ ...prev, ...data }));
    }

    const stepOrder: OnboardingStep[] = [
      'company-profile',
      'invoice-config',
      'industry-setup', 
      'guided-tour',
      'mission-control',
      'customer-creation',
      'learning-hub',
      'trial-success'
    ];

    const currentIndex = stepOrder.indexOf(currentStep);
    if (currentIndex < stepOrder.length - 1) {
      setCurrentStep(stepOrder[currentIndex + 1]);
    }
  };

  const goToStep = (step: OnboardingStep) => {
    setCurrentStep(step);
  };

  const goBack = () => {
    const stepOrder: OnboardingStep[] = [
      'company-profile',
      'invoice-config',
      'industry-setup', 
      'guided-tour',
      'mission-control',
      'customer-creation',
      'learning-hub',
      'trial-success'
    ];

    const currentIndex = stepOrder.indexOf(currentStep);
    if (currentIndex > 0) {
      setCurrentStep(stepOrder[currentIndex - 1]);
    }
  };

  const renderCurrentStep = () => {
    switch (currentStep) {
      case 'company-profile':
        return <CompanyProfileSurvey onNext={nextStep} data={onboardingData} />;
      case 'invoice-config':
        return <InvoiceTemplateConfiguration onNext={nextStep} onBack={goBack} data={onboardingData} />;
      case 'industry-setup':
        return <AIIndustrySetup onNext={nextStep} data={onboardingData} />;
      case 'guided-tour':
        return <GuidedTourDashboard onNext={nextStep} data={onboardingData} />;
      case 'mission-control':
        return <MissionControl onNext={nextStep} onGoToStep={goToStep} data={onboardingData} />;
      case 'customer-creation':
        return <FirstCustomerCreation onNext={nextStep} data={onboardingData} />;
      case 'learning-hub':
        return <PersonalizedLearningHub onNext={nextStep} data={onboardingData} />;
      case 'trial-success':
        return <TrialSuccessDashboard data={onboardingData} />;
      default:
        return <CompanyProfileSurvey onNext={nextStep} data={onboardingData} />;
    }
  };

  return (
    <div className="min-h-screen bg-background font-inter">
      {renderCurrentStep()}
    </div>
  );
};

export default OnboardingJourney;