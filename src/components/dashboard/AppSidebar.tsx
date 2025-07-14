import React from 'react';
import { Home, Package, ShoppingBag, ShoppingCart, Warehouse, UserCheck, Truck, Receipt, BarChart3, Mountain, ArrowRightLeft, ChevronDown, ChevronRight } from 'lucide-react';
import { Sidebar, SidebarContent, SidebarHeader, SidebarMenu, SidebarMenuItem, SidebarMenuButton, SidebarGroup, SidebarGroupLabel, SidebarGroupContent } from "@/components/ui/sidebar";
interface SidebarMenuItem {
  title: string;
  icon: any;
  key: string;
  url?: string;
  hasSubmenu?: boolean;
  submenu?: Array<{
    title: string;
    key: string;
  }>;
}
interface AppSidebarProps {
  currentModule: string;
  expandedMenus: string[];
  onModuleChange: (key: string) => void;
  onToggleSubmenu: (key: string) => void;
}
const sidebarMenuItems: SidebarMenuItem[] = [{
  title: "Dashboard",
  icon: Home,
  key: "dashboard"
}, {
  title: "Product Management",
  icon: Package,
  key: "product-management",
  url: "/products"
}, {
  title: "Purchase Orders",
  icon: ShoppingBag,
  key: "purchase-orders"
}, {
  title: "Sales",
  icon: ShoppingCart,
  key: "sales",
  hasSubmenu: true,
  submenu: [{
    title: "Quotations",
    key: "quotations"
  }, {
    title: "Sales Orders",
    key: "sales-orders"
  }]
}, {
  title: "Inventory Management",
  icon: Warehouse,
  key: "inventory",
  hasSubmenu: true,
  submenu: [{
    title: "Stock Overview",
    key: "inventory-overview"
  }, {
    title: "Transfer Orders",
    key: "transfer-orders"
  }, {
    title: "Stock Adjustments",
    key: "stock-adjustments"
  }]
}, {
  title: "Customer Management",
  icon: UserCheck,
  key: "customers"
}, {
  title: "Supplier Management",
  icon: Truck,
  key: "suppliers"
}, {
  title: "Financial Management",
  icon: Receipt,
  key: "finance"
}, {
  title: "Report Analysis",
  icon: BarChart3,
  key: "reports"
}];
export const AppSidebar = ({
  currentModule,
  expandedMenus,
  onModuleChange,
  onToggleSubmenu
}: AppSidebarProps) => <Sidebar>
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
        
        <SidebarGroupContent>
          <SidebarMenu>
            {sidebarMenuItems.map(item => <div key={item.key}>
                <SidebarMenuItem>
                  <SidebarMenuButton isActive={currentModule === item.key} onClick={() => {
                if (item.url) {
                  window.location.href = item.url;
                } else if (item.hasSubmenu) {
                  onToggleSubmenu(item.key);
                } else {
                  onModuleChange(item.key);
                }
              }} className={currentModule === item.key ? 'bg-green-100 text-green-800 hover:bg-green-150' : 'hover:bg-green-50 hover:text-green-700'}>
                    <item.icon className="h-4 w-4" />
                    <span>{item.title}</span>
                    {item.hasSubmenu && (expandedMenus.includes(item.key) ? <ChevronDown className="h-3 w-3 ml-auto" /> : <ChevronRight className="h-3 w-3 ml-auto" />)}
                  </SidebarMenuButton>
                </SidebarMenuItem>
                
                {/* Submenu */}
                {item.hasSubmenu && expandedMenus.includes(item.key) && <div className="ml-6 mt-1 space-y-1">
                    {item.submenu?.map(subItem => <SidebarMenuItem key={subItem.key}>
                        <SidebarMenuButton isActive={currentModule === subItem.key} onClick={() => onModuleChange(subItem.key)} className={`text-sm ${currentModule === subItem.key ? 'bg-green-100 text-green-800' : 'text-green-600 hover:bg-green-50 hover:text-green-700'}`}>
                          {subItem.key === 'transfer-orders' && <ArrowRightLeft className="h-3 w-3" />}
                          <span>{subItem.title}</span>
                        </SidebarMenuButton>
                      </SidebarMenuItem>)}
                  </div>}
              </div>)}
          </SidebarMenu>
        </SidebarGroupContent>
      </SidebarGroup>
    </SidebarContent>
  </Sidebar>;
export { sidebarMenuItems };