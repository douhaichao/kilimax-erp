import React from 'react';
import { DashboardContent } from './DashboardContent';

interface DashboardTabsProps {
  onGetStarted?: () => void;
}

export const DashboardTabs = ({ onGetStarted }: DashboardTabsProps) => {
  return <DashboardContent onGetStarted={onGetStarted} />;
};