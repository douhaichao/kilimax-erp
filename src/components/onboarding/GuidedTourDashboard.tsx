import React, { useState, useEffect } from 'react';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Sidebar, SidebarContent, SidebarMenu, SidebarMenuItem, SidebarMenuButton } from '@/components/ui/sidebar';
import { 
  BarChart3, 
  Users, 
  Package, 
  ShoppingCart, 
  Plus, 
  TrendingUp, 
  DollarSign,
  Play,
  ArrowRight,
  SkipForward,
  Target
} from 'lucide-react';
import { OnboardingData } from '@/pages/OnboardingJourney';

interface GuidedTourDashboardProps {
  onNext: (data: Partial<OnboardingData>) => void;
  data: OnboardingData;
}

interface Hotspot {
  id: string;
  title: string;
  description: string;
  position: { top: string; left: string };
  element: string;
}

const hotspots: Hotspot[] = [
  {
    id: 'sidebar',
    title: 'Navigation Sidebar',
    description: 'Access all modules here ›',
    position: { top: '50%', left: '12%' },
    element: 'sidebar'
  },
  {
    id: 'actions',
    title: 'Quick Actions',
    description: 'Create records in 1 click ›',
    position: { top: '20%', left: '85%' },
    element: 'actions'
  },
  {
    id: 'kpis',
    title: 'KPI Summary',
    description: 'Your business health at a glance ›',
    position: { top: '35%', left: '60%' },
    element: 'kpis'
  }
];

const sidebarItems = [
  { icon: BarChart3, label: 'Dashboard', active: true },
  { icon: Package, label: 'Products' },
  { icon: Users, label: 'Customers' },
  { icon: ShoppingCart, label: 'Orders' },
];

export const GuidedTourDashboard: React.FC<GuidedTourDashboardProps> = ({ onNext, data }) => {
  const [currentHotspot, setCurrentHotspot] = useState(0);
  const [showVideo, setShowVideo] = useState(false);
  const [autoAdvance, setAutoAdvance] = useState(true);

  useEffect(() => {
    if (!autoAdvance) return;
    
    const timer = setTimeout(() => {
      if (currentHotspot < hotspots.length - 1) {
        setCurrentHotspot(prev => prev + 1);
      } else {
        setAutoAdvance(false);
      }
    }, 4000);

    return () => clearTimeout(timer);
  }, [currentHotspot, autoAdvance]);

  const nextTip = () => {
    setAutoAdvance(false);
    if (currentHotspot < hotspots.length - 1) {
      setCurrentHotspot(prev => prev + 1);
    }
  };

  const skipTour = () => {
    onNext({});
  };

  const currentSpot = hotspots[currentHotspot];

  return (
    <div className="min-h-screen bg-background relative">
      {/* Progress Bar */}
      <div className="absolute top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="max-w-md mx-auto">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-muted-foreground">Step 3 of 7</span>
              <span className="text-sm font-medium text-primary">40% Complete</span>
            </div>
            <Progress value={40} className="h-2" />
          </div>
        </div>
      </div>

      {/* Dimmed Background */}
      <div className="absolute inset-0 bg-black/60 z-10"></div>

      {/* Mock Dashboard Layout */}
      <div className="flex min-h-screen pt-20">
        {/* Sidebar */}
        <div id="sidebar" className="w-64 bg-card border-r relative z-20">
          <div className="p-6">
            <h2 className="text-lg font-semibold mb-6">ERP System</h2>
            <nav className="space-y-2">
              {sidebarItems.map((item, index) => {
                const Icon = item.icon;
                return (
                  <div
                    key={index}
                    className={`flex items-center space-x-3 px-3 py-2 rounded-lg ${
                      item.active 
                        ? 'bg-primary text-primary-foreground' 
                        : 'text-muted-foreground hover:bg-muted'
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                    <span>{item.label}</span>
                  </div>
                );
              })}
            </nav>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 relative">
          {/* Quick Actions */}
          <div id="actions" className="absolute top-6 right-6 z-20">
            <div className="flex space-x-2">
              <Button size="sm" className="h-8">
                <Plus className="w-4 h-4 mr-1" />
                Product
              </Button>
              <Button size="sm" variant="outline" className="h-8">
                <Plus className="w-4 h-4 mr-1" />
                Order
              </Button>
            </div>
          </div>

          {/* KPI Cards */}
          <div id="kpis" className="absolute top-20 left-6 right-6 z-20">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
                  <DollarSign className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">$45,231.89</div>
                  <p className="text-xs text-muted-foreground">
                    <TrendingUp className="inline w-3 h-3 mr-1" />
                    +20.1% from last month
                  </p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Active Orders</CardTitle>
                  <ShoppingCart className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">142</div>
                  <p className="text-xs text-muted-foreground">
                    +5 since yesterday
                  </p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Customers</CardTitle>
                  <Users className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">1,234</div>
                  <p className="text-xs text-muted-foreground">
                    +12% growth rate
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>

      {/* Pulsating Hotspot */}
      <div 
        className="absolute z-30 pointer-events-none"
        style={{ 
          top: currentSpot.position.top, 
          left: currentSpot.position.left,
          transform: 'translate(-50%, -50%)'
        }}
      >
        <div className="relative">
          <div className="w-6 h-6 bg-secondary rounded-full animate-ping absolute"></div>
          <div className="w-6 h-6 bg-secondary rounded-full relative flex items-center justify-center">
            <Target className="w-3 h-3 text-white" />
          </div>
        </div>
      </div>

      {/* Tooltip */}
      <div 
        className="absolute z-40 bg-white rounded-lg shadow-xl p-4 max-w-xs pointer-events-auto"
        style={{ 
          top: `calc(${currentSpot.position.top} + 30px)`, 
          left: currentSpot.position.left,
          transform: 'translateX(-50%)'
        }}
      >
        <h3 className="font-semibold text-foreground mb-2">{currentSpot.title}</h3>
        <p className="text-sm text-muted-foreground mb-4">{currentSpot.description}</p>
        
        <div className="flex items-center justify-between">
          <div className="flex space-x-2">
            <Button size="sm" onClick={nextTip} disabled={currentHotspot >= hotspots.length - 1}>
              Next Tip
              <ArrowRight className="w-3 h-3 ml-1" />
            </Button>
            <Button size="sm" variant="ghost" onClick={skipTour}>
              Skip Tour
              <SkipForward className="w-3 h-3 ml-1" />
            </Button>
          </div>
          
          <Badge variant="outline" className="text-xs">
            {currentHotspot + 1} of {hotspots.length}
          </Badge>
        </div>
      </div>

      {/* Video Thumbnail */}
      {!showVideo && (
        <div className="absolute bottom-6 right-6 z-40">
          <Card className="w-64 cursor-pointer hover:shadow-lg transition-shadow" onClick={() => setShowVideo(true)}>
            <CardContent className="p-4">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                  <Play className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <p className="font-medium text-sm">Watch 1-min overview</p>
                  <p className="text-xs text-muted-foreground">Quick intro to the platform</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Completion */}
      {currentHotspot >= hotspots.length - 1 && !autoAdvance && (
        <div className="absolute inset-0 z-50 bg-black/80 flex items-center justify-center">
          <Card className="max-w-md mx-auto">
            <CardHeader className="text-center">
              <CardTitle className="text-xl mb-2">Tour Complete!</CardTitle>
              <CardDescription>
                You're ready to start exploring your new ERP system.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button onClick={skipTour} className="w-full">
                Continue to Mission Control
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};