
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import ProductManagement from "./pages/ProductManagement";
import TransferOrderList from "./pages/TransferOrderList";
import PurchaseOrderList from "./pages/PurchaseOrderList";
import InventoryReport from "./pages/InventoryReport";
import SubscriptionAgreement from "./pages/SubscriptionAgreement";
import CurrencyManagement from "./pages/CurrencyManagement";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/products" element={<ProductManagement />} />
          <Route path="/transfer-orders" element={<TransferOrderList />} />
          <Route path="/purchase-orders" element={<PurchaseOrderList />} />
          <Route path="/inventory-report" element={<InventoryReport />} />
          <Route path="/currency" element={<CurrencyManagement />} />
          <Route path="/subscription-agreement" element={<SubscriptionAgreement />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
