import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { QuoteProvider } from "@/contexts/QuoteContext";
import Header from "@/components/Header";
import Index from "./pages/Index";
import Products from "./pages/Products";
import ProductDetail from "./pages/ProductDetail";
import Cart from "./pages/Cart";
import Orders from "./pages/Orders";
import OrderDetail from "./pages/OrderDetail";
import ERPIntegration from "./components/ERPIntegration";
import NotFound from "./pages/NotFound";
import CustomerQuotes from "./components/CustomerQuotes";
import Employee from "./pages/Employee";
import Guest from "./pages/Guest";
import Login from "./pages/Login";
import GuestLayout from "./components/GuestLayout";
import GuestDashboard from "./pages/guest/Dashboard";
import GuestProducts from "./pages/guest/Products";
import GuestCart from "./pages/guest/Cart";
import GuestLocation from "./pages/guest/Location";
import EmployeeLayout from "./components/EmployeeLayout";
import EmployeeDashboard from "./pages/employee/Dashboard";
import QuotingWorkbench from "./pages/employee/Workbench";
import EmployeeQuotes from "./pages/employee/Quotes";
import EmployeeOrders from "./pages/employee/Orders";
import AdminLogistics from "./pages/employee/AdminLogistics";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <QuoteProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/login" element={<Login />} />
            
            {/* Guest Routes - Separate Portal */}
            <Route path="/guest" element={<GuestLayout />}>
              <Route path="dashboard" element={<GuestDashboard />} />
              <Route path="products" element={<GuestProducts />} />
              <Route path="cart" element={<GuestCart />} />
              <Route path="location" element={<GuestLocation />} />
            </Route>
            
            {/* Employee Routes - Secure and Separate */}
            <Route path="/employee" element={<EmployeeLayout />}>
              <Route path="dashboard" element={<EmployeeDashboard />} />
              <Route path="workbench/:quoteId" element={<QuotingWorkbench />} />
              <Route path="quotes" element={<EmployeeQuotes />} />
              <Route path="orders" element={<EmployeeOrders />} />
              <Route path="admin/logistics" element={<AdminLogistics />} />
              <Route path="erp-integration" element={<ERPIntegration />} />
            </Route>

            {/* Customer Routes */}
            <Route path="*" element={
              <div className="min-h-screen bg-background">
                <Header />
                <main className="pt-16">
                  <Routes>
                    <Route path="/" element={<Index />} />
                    <Route path="/products" element={<Products />} />
                    <Route path="/products/:id" element={<ProductDetail />} />
                    <Route path="/cart" element={<Cart />} />
                    <Route path="/orders" element={<Orders />} />
                    <Route path="/orders/:id" element={<OrderDetail />} />
                    <Route path="/quotes" element={<CustomerQuotes />} />
                    <Route path="/employee" element={<Employee />} />
                    {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
                    <Route path="*" element={<NotFound />} />
                  </Routes>
                </main>
              </div>
            } />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QuoteProvider>
  </QueryClientProvider>
);

export default App;