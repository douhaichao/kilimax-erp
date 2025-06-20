import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Building, 
  Users, 
  ShoppingCart, 
  DollarSign, 
  TrendingUp, 
  Package, 
  FileText, 
  Settings,
  Bell,
  Search,
  LogOut,
  BarChart3,
  Calendar,
  Mail,
  User,
  Menu,
  Home,
  ShoppingBag,
  Truck,
  Receipt,
  UserCheck,
  Warehouse,
  Mountain
} from 'lucide-react';
import { SidebarProvider, Sidebar, SidebarContent, SidebarHeader, SidebarMenu, SidebarMenuItem, SidebarMenuButton, SidebarGroup, SidebarGroupLabel, SidebarGroupContent, SidebarTrigger, SidebarInset } from "@/components/ui/sidebar";
import SalesOrderList from '@/pages/SalesOrderList';

interface DashboardProps {
  onLogout: () => void;
  onProfileClick: () => void;
}

const Dashboard = ({ onLogout, onProfileClick }: DashboardProps) => {
  const [currentModule, setCurrentModule] = useState<string>('dashboard');

  const stats = [
    { title: 'Total Revenue', value: '$124,563', change: '+12.3%', icon: DollarSign, trend: 'up' },
    { title: 'Active Orders', value: '89', change: '+5.2%', icon: ShoppingCart, trend: 'up' },
    { title: 'Total Customers', value: '2,847', change: '+8.1%', icon: Users, trend: 'up' },
    { title: 'Inventory Items', value: '1,243', change: '-2.4%', icon: Package, trend: 'down' },
  ];

  const modules = [
    { name: 'Sales & CRM', description: 'Manage customers and sales pipeline', icon: TrendingUp, color: 'bg-green-500' },
    { name: 'Inventory', description: 'Track stock levels and orders', icon: Package, color: 'bg-emerald-500' },
    { name: 'Finance', description: 'Accounting and financial reports', icon: DollarSign, color: 'bg-teal-500' },
    { name: 'HR & Payroll', description: 'Employee management system', icon: Users, color: 'bg-green-600' },
    { name: 'Reports', description: 'Analytics and business intelligence', icon: BarChart3, color: 'bg-lime-500' },
    { name: 'Documents', description: 'Document management system', icon: FileText, color: 'bg-emerald-600' },
  ];

  const recentActivities = [
    { action: 'New order received', detail: 'Order #12547 from Acme Corp', time: '2 min ago' },
    { action: 'Invoice generated', detail: 'INV-2024-001 for $2,450', time: '15 min ago' },
    { action: 'Stock alert', detail: 'Low inventory: Widget A', time: '1 hour ago' },
    { action: 'Payment received', detail: '$5,200 from TechStart Inc', time: '2 hours ago' },
  ];

  const sidebarMenuItems = [
    {
      title: "Dashboard",
      icon: Home,
      key: "dashboard"
    },
    {
      title: "Purchase Orders",
      icon: ShoppingBag,
      key: "purchase-orders"
    },
    {
      title: "Sales Orders",
      icon: ShoppingCart,
      key: "sales-orders"
    },
    {
      title: "Inventory Management",
      icon: Warehouse,
      key: "inventory"
    },
    {
      title: "Customer Management",
      icon: UserCheck,
      key: "customers"
    },
    {
      title: "Supplier Management",
      icon: Truck,
      key: "suppliers"
    },
    {
      title: "Financial Management",
      icon: Receipt,
      key: "finance"
    },
    {
      title: "Report Analysis",
      icon: BarChart3,
      key: "reports"
    }
  ];

  const AppSidebar = () => (
    <Sidebar>
      <SidebarHeader className="border-b border-green-200">
        <div className="flex items-center space-x-3 px-2">
          <div className="p-2 bg-gradient-to-br from-green-600 to-emerald-700 rounded-xl shadow-lg">
            <Mountain className="h-6 w-6 text-white" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-green-800">Kilimax</h1>
            <p className="text-xs text-green-600">Enterprise Management System</p>
          </div>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="text-green-700">Main Modules</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {sidebarMenuItems.map((item) => (
                <SidebarMenuItem key={item.key}>
                  <SidebarMenuButton 
                    isActive={currentModule === item.key}
                    onClick={() => setCurrentModule(item.key)}
                    className={currentModule === item.key ? 'bg-green-100 text-green-800 hover:bg-green-150' : 'hover:bg-green-50 hover:text-green-700'}
                  >
                    <item.icon className="h-4 w-4" />
                    <span>{item.title}</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );

  const renderDashboardContent = () => (
    <>
      {/* Welcome Section */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Welcome back, Admin</h2>
        <p className="text-gray-600">Here's what's happening with your business today.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => (
          <Card key={index} className="bg-white shadow-sm hover:shadow-md transition-shadow border-green-100">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                  <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                  <p className={`text-sm ${stat.trend === 'up' ? 'text-green-600' : 'text-red-600'} flex items-center mt-1`}>
                    <TrendingUp className={`h-3 w-3 mr-1 ${stat.trend === 'down' ? 'rotate-180' : ''}`} />
                    {stat.change}
                  </p>
                </div>
                <div className="p-3 bg-green-100 rounded-full">
                  <stat.icon className="h-6 w-6 text-green-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Main Dashboard Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* ERP Modules */}
        <div className="lg:col-span-2">
          <Card className="bg-white shadow-sm border-green-100">
            <CardHeader>
              <CardTitle className="text-lg font-semibold text-gray-900">ERP Modules</CardTitle>
              <CardDescription>Access your business management tools</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {modules.map((module, index) => (
                  <div
                    key={index}
                    className="p-4 border border-green-200 rounded-lg hover:border-green-300 hover:shadow-sm transition-all cursor-pointer group"
                  >
                    <div className="flex items-start space-x-3">
                      <div className={`p-2 ${module.color} rounded-lg group-hover:scale-110 transition-transform`}>
                        <module.icon className="h-5 w-5 text-white" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-medium text-gray-900 group-hover:text-green-600 transition-colors">
                          {module.name}
                        </h3>
                        <p className="text-sm text-gray-500 mt-1">{module.description}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Recent Activities */}
        <div>
          <Card className="bg-white shadow-sm border-green-100">
            <CardHeader>
              <CardTitle className="text-lg font-semibold text-gray-900">Recent Activities</CardTitle>
              <CardDescription>Latest system updates and notifications</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentActivities.map((activity, index) => (
                  <div key={index} className="flex items-start space-x-3 p-3 hover:bg-green-50 rounded-lg transition-colors">
                    <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900">{activity.action}</p>
                      <p className="text-sm text-gray-500 truncate">{activity.detail}</p>
                      <p className="text-xs text-gray-400 mt-1">{activity.time}</p>
                    </div>
                  </div>
                ))}
              </div>
              <Button variant="outline" className="w-full mt-4 border-green-300 text-green-700 hover:bg-green-50">
                View All Activities
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="mt-8">
        <Card className="bg-white shadow-sm border-green-100">
          <CardHeader>
            <CardTitle className="text-lg font-semibold text-gray-900">Quick Actions</CardTitle>
            <CardDescription>Frequently used operations</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-3">
              <Button className="bg-green-600 hover:bg-green-700 text-white">
                <ShoppingCart className="h-4 w-4 mr-2" />
                New Order
              </Button>
              <Button variant="outline" className="border-green-300 text-green-700 hover:bg-green-50">
                <Users className="h-4 w-4 mr-2" />
                Add Customer
              </Button>
              <Button variant="outline" className="border-green-300 text-green-700 hover:bg-green-50">
                <FileText className="h-4 w-4 mr-2" />
                Generate Report
              </Button>
              <Button variant="outline" className="border-green-300 text-green-700 hover:bg-green-50">
                <Package className="h-4 w-4 mr-2" />
                Update Inventory
              </Button>
              <Button variant="outline" className="border-green-300 text-green-700 hover:bg-green-50">
                <Calendar className="h-4 w-4 mr-2" />
                Schedule Meeting
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  );

  const renderModuleContent = () => {
    switch (currentModule) {
      case 'sales-orders':
        return <SalesOrderList />;
      case 'purchase-orders':
        return (
          <div className="p-6">
            <h2 className="text-2xl font-bold mb-4">Purchase Orders</h2>
            <p className="text-gray-600">Purchase order management feature is under development...</p>
          </div>
        );
      case 'inventory':
        return (
          <div className="p-6">
            <h2 className="text-2xl font-bold mb-4">Inventory Management</h2>
            <p className="text-gray-600">Inventory management feature is under development...</p>
          </div>
        );
      case 'customers':
        return (
          <div className="p-6">
            <h2 className="text-2xl font-bold mb-4">Customer Management</h2>
            <p className="text-gray-600">Customer management feature is under development...</p>
          </div>
        );
      case 'suppliers':
        return (
          <div className="p-6">
            <h2 className="text-2xl font-bold mb-4">Supplier Management</h2>
            <p className="text-gray-600">Supplier management feature is under development...</p>
          </div>
        );
      case 'finance':
        return (
          <div className="p-6">
            <h2 className="text-2xl font-bold mb-4">Financial Management</h2>
            <p className="text-gray-600">Financial management feature is under development...</p>
          </div>
        );
      case 'reports':
        return (
          <div className="p-6">
            <h2 className="text-2xl font-bold mb-4">Report Analysis</h2>
            <p className="text-gray-600">Report analysis feature is under development...</p>
          </div>
        );
      default:
        return renderDashboardContent();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-50">
      <SidebarProvider>
        <div className="min-h-screen flex w-full">
          <AppSidebar />
          <SidebarInset className="flex-1">
            {/* Header */}
            <header className="bg-white shadow-sm border-b border-green-200 sticky top-0 z-10">
              <div className="flex justify-between items-center h-16 px-6">
                <div className="flex items-center space-x-4">
                  <SidebarTrigger className="text-green-600 hover:text-green-800" />
                  <div className="text-lg font-semibold text-green-800">
                    {sidebarMenuItems.find(item => item.key === currentModule)?.title || 'Dashboard'}
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

            {/* Main Content */}
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
