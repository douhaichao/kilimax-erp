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
  Mountain,
  ArrowRightLeft,
  ChevronDown,
  ChevronRight,
  Zap
} from 'lucide-react';
import { SidebarProvider, Sidebar, SidebarContent, SidebarHeader, SidebarMenu, SidebarMenuItem, SidebarMenuButton, SidebarGroup, SidebarGroupLabel, SidebarGroupContent, SidebarTrigger, SidebarInset } from "@/components/ui/sidebar";
import SalesOrderList from '@/pages/SalesOrderList';
import TransferOrderList from '@/pages/TransferOrderList';
import TrialAgreementDialog from '@/components/TrialAgreementDialog';

interface DashboardProps {
  onLogout: () => void;
  onProfileClick: () => void;
}

const Dashboard = ({ onLogout, onProfileClick }: DashboardProps) => {
  const [currentModule, setCurrentModule] = useState<string>('dashboard');
  const [expandedMenus, setExpandedMenus] = useState<string[]>(['inventory']);
  const [hasSubscribed, setHasSubscribed] = useState(false);

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
      title: "Product Management",
      icon: Package,
      key: "product-management",
      url: "/products"
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
      key: "inventory",
      hasSubmenu: true,
      submenu: [
        {
          title: "Stock Overview",
          key: "inventory-overview"
        },
        {
          title: "Transfer Orders",
          key: "transfer-orders"
        },
        {
          title: "Stock Adjustments",
          key: "stock-adjustments"
        }
      ]
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

  const toggleSubmenu = (key: string) => {
    setExpandedMenus(prev => 
      prev.includes(key) 
        ? prev.filter(item => item !== key)
        : [...prev, key]
    );
  };

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
                <div key={item.key}>
                  <SidebarMenuItem>
                    <SidebarMenuButton 
                      isActive={currentModule === item.key}
                      onClick={() => {
                        if (item.url) {
                          window.location.href = item.url;
                        } else if (item.hasSubmenu) {
                          toggleSubmenu(item.key);
                        } else {
                          setCurrentModule(item.key);
                        }
                      }}
                      className={currentModule === item.key ? 'bg-green-100 text-green-800 hover:bg-green-150' : 'hover:bg-green-50 hover:text-green-700'}
                    >
                      <item.icon className="h-4 w-4" />
                      <span>{item.title}</span>
                      {item.hasSubmenu && (
                        expandedMenus.includes(item.key) ? 
                          <ChevronDown className="h-3 w-3 ml-auto" /> : 
                          <ChevronRight className="h-3 w-3 ml-auto" />
                      )}
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  
                  {/* Submenu */}
                  {item.hasSubmenu && expandedMenus.includes(item.key) && (
                    <div className="ml-6 mt-1 space-y-1">
                      {item.submenu?.map((subItem) => (
                        <SidebarMenuItem key={subItem.key}>
                          <SidebarMenuButton
                            isActive={currentModule === subItem.key}
                            onClick={() => setCurrentModule(subItem.key)}
                            className={`text-sm ${currentModule === subItem.key ? 'bg-green-100 text-green-800' : 'text-green-600 hover:bg-green-50 hover:text-green-700'}`}
                          >
                            {subItem.key === 'transfer-orders' && <ArrowRightLeft className="h-3 w-3" />}
                            <span>{subItem.title}</span>
                          </SidebarMenuButton>
                        </SidebarMenuItem>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );

  const handleOpenSubscriptionAgreement = () => {
    window.open('/subscription-agreement', '_blank');
  };

  const renderModuleContent = () => {
    switch (currentModule) {
      case 'sales-orders':
        return <SalesOrderList />;
      case 'transfer-orders':
        return <TransferOrderList />;
      case 'inventory-overview':
        return (
          <div className="p-6">
            <h2 className="text-2xl font-bold mb-4">Stock Overview</h2>
            <p className="text-gray-600">Stock overview feature is under development...</p>
          </div>
        );
      case 'stock-adjustments':
        return (
          <div className="p-6">
            <h2 className="text-2xl font-bold mb-4">Stock Adjustments</h2>
            <p className="text-gray-600">Stock adjustment feature is under development...</p>
          </div>
        );
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

  const renderDashboardContent = () => (
    <>
      {/* Greeting */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-1">Karibu Boss! 👋</h1>
        <p className="text-gray-600">Let's make some money today</p>
      </div>

      {/* Daily Sales Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4 mb-6">
        <Card className="bg-gradient-to-r from-green-500 to-green-600 text-white border-0">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-green-100 text-sm">Today's Sales</p>
                <p className="text-2xl font-bold">KES 8,250</p>
                <p className="text-green-200 text-sm flex items-center">
                  <TrendingUp className="h-3 w-3 mr-1" />
                  +24% from yesterday
                </p>
              </div>
              <DollarSign className="h-8 w-8 text-green-200" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white shadow-sm">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Orders Today</p>
                <p className="text-2xl font-bold text-gray-900">12</p>
                <p className="text-green-600 text-sm">+3 pending</p>
              </div>
              <ShoppingCart className="h-8 w-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white shadow-sm">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Profit Today</p>
                <p className="text-2xl font-bold text-gray-900">KES 2,475</p>
                <p className="text-gray-500 text-sm">30% margin</p>
              </div>
              <TrendingUp className="h-8 w-8 text-green-500" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white shadow-sm">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Customers</p>
                <p className="text-2xl font-bold text-gray-900">89</p>
                <p className="text-blue-600 text-sm">5 new today</p>
              </div>
              <Users className="h-8 w-8 text-purple-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        {/* Hot Products & Stock Alerts */}
        <div className="lg:col-span-1">
          <Card className="bg-white shadow-sm h-full">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg flex items-center">
                🔥 Hot Products
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-gray-200 rounded-lg"></div>
                  <div>
                    <p className="font-semibold text-sm">Samsung Galaxy A14</p>
                    <p className="text-xs text-gray-600">15 sold today</p>
                  </div>
                </div>
                <Badge className="bg-green-100 text-green-800">Hot</Badge>
              </div>

              <div className="flex items-center justify-between p-3 bg-red-50 rounded-lg border border-red-200">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-gray-200 rounded-lg"></div>
                  <div>
                    <p className="font-semibold text-sm">iPhone 13</p>
                    <p className="text-xs text-red-600">🔴 Only 2 left!</p>
                  </div>
                </div>
                <Button size="sm" className="bg-red-500 hover:bg-red-600 text-white rounded-full px-3 py-1 text-xs">
                  Reorder
                </Button>
              </div>

              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-gray-200 rounded-lg"></div>
                  <div>
                    <p className="font-semibold text-sm">Tecno Spark 10</p>
                    <p className="text-xs text-gray-600">8 sold today</p>
                  </div>
                </div>
                <Badge variant="secondary">Good</Badge>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Customer Engagement */}
        <div className="lg:col-span-1">
          <Card className="bg-white shadow-sm h-full">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg flex items-center">
                💬 Customer Follow-ups
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="p-3 bg-yellow-50 rounded-lg border border-yellow-200">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <p className="font-semibold text-sm">Moses Kiprotich</p>
                    <p className="text-xs text-red-600">Owes KES 1,500</p>
                  </div>
                  <Badge className="bg-yellow-100 text-yellow-800">Overdue</Badge>
                </div>
                <Button size="sm" className="bg-green-500 hover:bg-green-600 text-white rounded-full w-full">
                  💬 Send WhatsApp Reminder
                </Button>
              </div>

              <div className="p-3 bg-blue-50 rounded-lg">
                <div className="flex justify-between items-center mb-2">
                  <div>
                    <p className="font-semibold text-sm">Pending Orders</p>
                    <p className="text-xs text-gray-600">3 orders waiting</p>
                  </div>
                  <Badge className="bg-blue-100 text-blue-800">3</Badge>
                </div>
                <Button size="sm" variant="outline" className="w-full rounded-full">
                  View Orders
                </Button>
              </div>

              <div className="p-3 bg-purple-50 rounded-lg">
                <div className="flex justify-between items-center mb-2">
                  <div>
                    <p className="font-semibold text-sm">Unpaid Invoices</p>
                    <p className="text-xs text-gray-600">KES 4,200 total</p>
                  </div>
                  <Badge className="bg-purple-100 text-purple-800">5</Badge>
                </div>
                <Button size="sm" variant="outline" className="w-full rounded-full">
                  Send Reminders
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sales Agent Performance */}
        <div className="lg:col-span-1">
          <Card className="bg-white shadow-sm h-full">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg flex items-center">
                🏆 Sales Champions
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center justify-between p-3 bg-gradient-to-r from-yellow-50 to-yellow-100 rounded-lg border border-yellow-200">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-yellow-500 rounded-full flex items-center justify-center text-white font-bold text-sm">1</div>
                  <div>
                    <p className="font-semibold text-sm">Grace Wanjiku</p>
                    <p className="text-xs text-gray-600">KES 15,400 • ⭐⭐⭐⭐⭐</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-xs text-gray-500">8 orders</p>
                  <p className="text-xs text-green-600">95% rate</p>
                </div>
              </div>

              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-gray-400 rounded-full flex items-center justify-center text-white font-bold text-sm">2</div>
                  <div>
                    <p className="font-semibold text-sm">John Mwangi</p>
                    <p className="text-xs text-gray-600">KES 12,200 • ⭐⭐⭐⭐</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-xs text-gray-500">6 orders</p>
                  <p className="text-xs text-green-600">88% rate</p>
                </div>
              </div>

              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-orange-400 rounded-full flex items-center justify-center text-white font-bold text-sm">3</div>
                  <div>
                    <p className="font-semibold text-sm">Mary Akinyi</p>
                    <p className="text-xs text-gray-600">KES 9,800 • ⭐⭐⭐⭐</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-xs text-gray-500">5 orders</p>
                  <p className="text-xs text-green-600">82% rate</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* AI Action Suggestions */}
      <Card className="bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200 mb-6">
        <CardHeader>
          <CardTitle className="text-lg flex items-center">
            🤖 Smart Suggestions
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 bg-white rounded-lg shadow-sm">
              <div className="flex items-center space-x-2 mb-2">
                <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                  <TrendingUp className="h-4 w-4 text-green-600" />
                </div>
                <p className="font-semibold text-sm">Boost Sales</p>
              </div>
              <p className="text-xs text-gray-600 mb-3">Send 20% off promo to customers who bought Samsung phones</p>
              <Button size="sm" className="bg-green-500 hover:bg-green-600 text-white rounded-full w-full">
                Send Promotion
              </Button>
            </div>

            <div className="p-4 bg-white rounded-lg shadow-sm">
              <div className="flex items-center space-x-2 mb-2">
                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                  <Users className="h-4 w-4 text-blue-600" />
                </div>
                <p className="font-semibold text-sm">Re-engage</p>
              </div>
              <p className="text-xs text-gray-600 mb-3">12 customers haven't bought in 30 days. Time to reach out!</p>
              <Button size="sm" className="bg-blue-500 hover:bg-blue-600 text-white rounded-full w-full">
                Follow Up
              </Button>
            </div>

            <div className="p-4 bg-white rounded-lg shadow-sm">
              <div className="flex items-center space-x-2 mb-2">
                <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center">
                  <Package className="h-4 w-4 text-orange-600" />
                </div>
                <p className="font-semibold text-sm">Restock Alert</p>
              </div>
              <p className="text-xs text-gray-600 mb-3">iPhone 13 selling fast! Reorder now to avoid stockout</p>
              <Button size="sm" className="bg-orange-500 hover:bg-orange-600 text-white rounded-full w-full">
                Reorder Now
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <Card className="bg-white shadow-sm">
        <CardHeader>
          <CardTitle className="text-lg">Quick Actions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            <Button className="bg-green-500 hover:bg-green-600 text-white rounded-xl h-16 flex flex-col items-center justify-center space-y-1">
              <Package className="h-5 w-5" />
              <span className="text-xs">Upload Products</span>
            </Button>
            <Button className="bg-blue-500 hover:bg-blue-600 text-white rounded-xl h-16 flex flex-col items-center justify-center space-y-1">
              <Bell className="h-5 w-5" />
              <span className="text-xs">Send Promotion</span>
            </Button>
            <Button className="bg-purple-500 hover:bg-purple-600 text-white rounded-xl h-16 flex flex-col items-center justify-center space-y-1">
              <ShoppingCart className="h-5 w-5" />
              <span className="text-xs">View Orders</span>
            </Button>
            <Button className="bg-orange-500 hover:bg-orange-600 text-white rounded-xl h-16 flex flex-col items-center justify-center space-y-1">
              <TrendingUp className="h-5 w-5" />
              <span className="text-xs">Reorder Top Product</span>
            </Button>
          </div>
        </CardContent>
      </Card>
    </>
  );

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
