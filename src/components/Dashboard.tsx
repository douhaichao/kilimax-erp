import React, { useState } from 'react';
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
import { AppSidebar } from './dashboard/AppSidebar';
import { DashboardHeader } from './dashboard/DashboardHeader';
import { DashboardContent } from './dashboard/DashboardContent';
import { ModuleContent } from './dashboard/ModuleContent';

interface DashboardProps {
  onLogout: () => void;
  onProfileClick: () => void;
}

const Dashboard = ({ onLogout, onProfileClick }: DashboardProps) => {
  const [currentModule, setCurrentModule] = useState<string>('dashboard');
  const [expandedMenus, setExpandedMenus] = useState<string[]>(['inventory']);

  const toggleSubmenu = (key: string) => {
    setExpandedMenus(prev => 
      prev.includes(key) 
        ? prev.filter(item => item !== key)
        : [...prev, key]
    );
  };

  const renderModuleContent = () => {
    if (currentModule === 'dashboard') {
      return <DashboardContent />;
    }
    return <ModuleContent currentModule={currentModule} />;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-50">
      <SidebarProvider>
        <div className="min-h-screen flex w-full">
          <AppSidebar 
            currentModule={currentModule}
            expandedMenus={expandedMenus}
            onModuleChange={setCurrentModule}
            onToggleSubmenu={toggleSubmenu}
          />
          <SidebarInset className="flex-1">
            <DashboardHeader 
              currentModule={currentModule}
              onLogout={onLogout}
              onProfileClick={onProfileClick}
            />
            <main className="flex-1 overflow-auto">
              <div className="max-w-7xl mx-auto px-6 py-8">
                {renderModuleContent()}
              </div>
            </main>
          </SidebarInset>
        </div>
      </SidebarProvider>
    </div>
  );
};

export default Dashboard;
