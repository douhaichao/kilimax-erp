
import React, { useState, useEffect } from 'react';
import { DashboardGreeting } from './DashboardGreeting';
import { DashboardStats } from './DashboardStats';
import { HotProducts } from './HotProducts';
import { CustomerFollowups } from './CustomerFollowups';
import { SalesChampions } from './SalesChampions';
import { SmartSuggestions } from './SmartSuggestions';
import { QuickActions } from './QuickActions';
import { GettingStartedBanner } from './GettingStartedBanner';
import { DashboardCardConfig } from './DashboardCardConfig';

export const DashboardContent = () => {
  const [cardVisibility, setCardVisibility] = useState({
    stats: true,
    hotProducts: true,
    customerFollowups: true,
    salesChampions: true,
    smartSuggestions: true,
    quickActions: true
  });

  useEffect(() => {
    const saved = localStorage.getItem('dashboard-card-visibility');
    if (saved) {
      setCardVisibility(JSON.parse(saved));
    }
  }, []);

  const handleCardToggle = (cardId: string) => {
    const newVisibility = { ...cardVisibility, [cardId]: !cardVisibility[cardId] };
    setCardVisibility(newVisibility);
    localStorage.setItem('dashboard-card-visibility', JSON.stringify(newVisibility));
  };

  return (
    <>
      <GettingStartedBanner />
      <DashboardGreeting />
      <DashboardCardConfig cardVisibility={cardVisibility} onCardToggle={handleCardToggle} />
      
      {cardVisibility.stats && <DashboardStats />}
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        {cardVisibility.hotProducts && (
          <div className="lg:col-span-1">
            <HotProducts />
          </div>
        )}
        {cardVisibility.customerFollowups && (
          <div className="lg:col-span-1">
            <CustomerFollowups />
          </div>
        )}
        {cardVisibility.salesChampions && (
          <div className="lg:col-span-1">
            <SalesChampions />
          </div>
        )}
      </div>

      {cardVisibility.smartSuggestions && <SmartSuggestions />}
      {cardVisibility.quickActions && <QuickActions />}
    </>
  );
};
