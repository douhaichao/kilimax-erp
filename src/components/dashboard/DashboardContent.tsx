import React from 'react';
import { DashboardGreeting } from './DashboardGreeting';
import { DashboardStats } from './DashboardStats';
import { HotProducts } from './HotProducts';
import { CustomerFollowups } from './CustomerFollowups';
import { SalesChampions } from './SalesChampions';
import { SmartSuggestions } from './SmartSuggestions';
import { QuickActions } from './QuickActions';

export const DashboardContent = () => (
  <>
    <DashboardGreeting />
    <DashboardStats />
    
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
      <div className="lg:col-span-1">
        <HotProducts />
      </div>
      <div className="lg:col-span-1">
        <CustomerFollowups />
      </div>
      <div className="lg:col-span-1">
        <SalesChampions />
      </div>
    </div>

    <SmartSuggestions />
    <QuickActions />
  </>
);