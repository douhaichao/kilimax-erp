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
  const [showTrialDialog, setShowTrialDialog] = useState(false);
  const [hasAgreedToTrial, setHasAgreedToTrial] = useState(false);

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

  const handleTrialAgreement = () => {
    setHasAgreedToTrial(true);
    // 这里可以添加更多逻辑，比如更新用户状态、发送通知等
    console.log('用户已同意试用协议');
  };

  const renderDashboardContent = () => (
    <>
      {/* Trial Agreement Banner */}
      {!hasAgreedToTrial && (
        <div className="mb-6">
          <Card className="border-orange-200 bg-gradient-to-r from-orange-50 to-amber-50">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="p-3 bg-orange-100 rounded-full">
                    <Zap className="h-6 w-6 text-orange-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-orange-800 text-lg">开启 Kilimax ERP 试用之旅</h3>
                    <p className="text-orange-600 mt-1">
                      体验完整的企业资源规划系统，30天试用期，功能全开放
                    </p>
                    <div className="flex items-center space-x-4 mt-2">
                      <Badge className="bg-orange-100 text-orange-800 border-orange-300">
                        30天试用
                      </Badge>
                      <Badge className="bg-green-100 text-green-800 border-green-300">
                        全功能开放
                      </Badge>
                      <Badge className="bg-blue-100 text-blue-800 border-blue-300">
                        专业支持
                      </Badge>
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="text-right">
                    <p className="text-2xl font-bold text-orange-600">¥9,999</p>
                    <p className="text-sm text-orange-500">试用费用</p>
                  </div>
                  <Button 
                    onClick={() => setShowTrialDialog(true)}
                    className="bg-orange-600 hover:bg-orange-700 text-white px-6 py-2"
                  >
                    查看协议并开始试用
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Success Banner for Agreed Users */}
      {hasAgreedToTrial && (
        <div className="mb-6">
          <Card className="border-green-200 bg-gradient-to-r from-green-50 to-emerald-50">
            <CardContent className="p-4">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-green-100 rounded-full">
                  <FileText className="h-5 w-5 text-green-600" />
                </div>
                <div>
                  <h3 className="font-medium text-green-800">试用协议已确认</h3>
                  <p className="text-green-600 text-sm">
                    感谢您的信任！请按照收款信息完成转账，我们将在收到款项后激活您的试用账户。
                  </p>
                </div>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => setShowTrialDialog(true)}
                  className="border-green-300 text-green-700 hover:bg-green-50"
                >
                  查看收款信息
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

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

      {/* Trial Agreement Dialog */}
      <TrialAgreementDialog 
        isOpen={showTrialDialog}
        onClose={() => setShowTrialDialog(false)}
        onAgreementAccepted={handleTrialAgreement}
      />
    </div>
  );
};

export default Dashboard;
