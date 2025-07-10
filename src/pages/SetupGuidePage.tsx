
import React from 'react';
import SetupGuide from '@/components/setup/SetupGuide';

const SetupGuidePage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-green-50">
      <div className="container mx-auto py-8">
        <SetupGuide />
      </div>
    </div>
  );
};

export default SetupGuidePage;
