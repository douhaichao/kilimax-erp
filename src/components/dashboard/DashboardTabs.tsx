
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { DashboardContent } from './DashboardContent';
import { LayoutDashboard, Settings, HelpCircle, ExternalLink } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { useNavigate } from 'react-router-dom';

export const DashboardTabs = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const navigate = useNavigate();

  const handleSetupGuideClick = () => {
    navigate('/tutorial');
  };

  return (
    <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
      <TabsList className="grid w-full grid-cols-3 mb-6">
        <TabsTrigger value="dashboard" className="flex items-center space-x-2">
          <LayoutDashboard className="w-4 h-4" />
          <span>Dashboard</span>
        </TabsTrigger>
        <TabsTrigger value="setup" className="flex items-center space-x-2">
          <Settings className="w-4 h-4" />
          <span>Setup Guide</span>
        </TabsTrigger>
        <TabsTrigger value="help" className="flex items-center space-x-2">
          <HelpCircle className="w-4 h-4" />
          <span>Help Center</span>
        </TabsTrigger>
      </TabsList>

      <TabsContent value="dashboard">
        <DashboardContent />
      </TabsContent>

      <TabsContent value="setup">
        <div className="text-center py-12">
          <Settings className="w-16 h-16 mx-auto text-gray-400 mb-4" />
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Interactive Setup Guide</h3>
          <p className="text-gray-600 mb-6">Get started with our comprehensive tutorial system</p>
          <Button onClick={handleSetupGuideClick} className="flex items-center space-x-2">
            <span>Open Setup Guide</span>
            <ExternalLink className="w-4 h-4" />
          </Button>
        </div>
      </TabsContent>

      <TabsContent value="help">
        <div className="text-center py-12">
          <HelpCircle className="w-16 h-16 mx-auto text-gray-400 mb-4" />
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Help Center</h3>
          <p className="text-gray-600">Documentation and support resources coming soon</p>
        </div>
      </TabsContent>
    </Tabs>
  );
};
