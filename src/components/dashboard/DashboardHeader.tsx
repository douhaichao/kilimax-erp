import React from 'react';
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Bell,
  Search,
  Mail,
  User,
  Settings,
  LogOut
} from 'lucide-react';
import { SidebarTrigger } from "@/components/ui/sidebar";
import { sidebarMenuItems } from './AppSidebar';

interface DashboardHeaderProps {
  currentModule: string;
  onLogout: () => void;
  onProfileClick: () => void;
}

export const DashboardHeader = ({ currentModule, onLogout, onProfileClick }: DashboardHeaderProps) => (
  <header className="bg-white shadow-sm border-b border-green-200 sticky top-0 z-10">
    <div className="flex justify-between items-center h-16 px-6">
      <div className="flex items-center space-x-4">
        <SidebarTrigger className="text-green-600 hover:text-green-800" />
        <div className="text-lg font-semibold text-green-800">
          {sidebarMenuItems.find(item => item.key === currentModule)?.title || 
           sidebarMenuItems.find(item => item.submenu?.some(sub => sub.key === currentModule))?.submenu?.find(sub => sub.key === currentModule)?.title ||
           'Dashboard'}
        </div>
      </div>
      
      <div className="flex items-center space-x-4">
        <div className="relative">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-green-400" />
          <input
            type="text"
            placeholder="Search..."
            className="pl-10 pr-4 py-2 border border-green-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
          />
        </div>
        
        <Button variant="ghost" size="sm" className="relative text-green-600 hover:text-green-800 hover:bg-green-50">
          <Bell className="h-4 w-4" />
          <Badge className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center text-xs bg-green-500 text-white">
            3
          </Badge>
        </Button>
        
        <Button variant="ghost" size="sm" className="text-green-600 hover:text-green-800 hover:bg-green-50">
          <Mail className="h-4 w-4" />
        </Button>
        
        <Button 
          variant="ghost" 
          size="sm"
          onClick={onProfileClick}
          className="text-green-600 hover:text-green-800 hover:bg-green-50"
        >
          <User className="h-4 w-4" />
        </Button>
        
        <Button variant="ghost" size="sm" className="text-green-600 hover:text-green-800 hover:bg-green-50">
          <Settings className="h-4 w-4" />
        </Button>
        
        <Button 
          variant="outline" 
          size="sm"
          onClick={onLogout}
          className="text-green-600 hover:text-green-800 border-green-300 hover:bg-green-50"
        >
          <LogOut className="h-4 w-4 mr-2" />
          Logout
        </Button>
      </div>
    </div>
  </header>
);