import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { QuoteProvider } from "@/contexts/QuoteContext";
import { CartProvider } from "@/contexts/CartContext";
import { UserProvider } from "@/contexts/UserContext";
import { ErrorBoundary } from "@/components/ui/error-boundary";
import AppShell from "@/components/AppShell";
import SimpleHeader from "@/components/SimpleHeader";
import Index from "./pages/Index";
import Products from "./pages/Products";
import ProductDetail from "./pages/ProductDetail";
import Cart from "./pages/Cart";
import Orders from "./pages/Orders";
import OrderDetail from "./pages/OrderDetail";
import ERPIntegration from "./components/ERPIntegration";
import NotFound from "./pages/NotFound";
import CustomerQuotes from "./components/CustomerQuotes";
import Login from "./pages/Login";
import GuestDashboard from "./pages/guest/Dashboard";
import GuestProducts from "./pages/guest/Products";
import GuestProductDetail from "./pages/guest/ProductDetail";
import GuestCart from "./pages/guest/Cart";
import GuestQuotesPage from "./pages/guest/Quotes";
import GuestLocation from "./pages/guest/Location";
import EmployeeDashboard from "./pages/employee/Dashboard";
import QuotingWorkbench from "./pages/employee/Workbench";
import EmployeeQuotes from "./pages/employee/Quotes";
import EmployeeOrders from "./pages/employee/Orders";
import EmployeeOrderDetail from "./pages/employee/OrderDetail";
import AdminLogistics from "./pages/employee/AdminLogistics";

const queryClient = new QueryClient();

const App = () => (
  <ErrorBoundary>
    <QueryClientProvider client={queryClient}>
      <UserProvider>
        <CartProvider>
          <QuoteProvider>
            <TooltipProvider>
              <Toaster />
              <Sonner />
              <BrowserRouter>
                <Routes>
                  {/* Login with simple header */}
                  <Route path="/login" element={
                    <div className="min-h-screen bg-gradient-subtle">
                      <SimpleHeader />
                      <main className="pt-16">
                        <Login />
                      </main>
                    </div>
                  } />
                  
                  {/* All other routes use unified AppShell */}
                  <Route path="/" element={<AppShell />}>
                    {/* Guest Routes */}
                    <Route path="guest/dashboard" element={<GuestDashboard />} />
                    <Route path="guest/products" element={<GuestProducts />} />
                    <Route path="guest/products/:id" element={<GuestProductDetail />} />
                    <Route path="guest/cart" element={<GuestCart />} />
                    <Route path="guest/quotes" element={<GuestQuotesPage />} />
                    <Route path="guest/location" element={<GuestLocation />} />
                    
                    {/* Employee Routes */}
                    <Route path="employee/dashboard" element={<EmployeeDashboard />} />
                    <Route path="employee/workbench/:quoteId" element={<QuotingWorkbench />} />
                    <Route path="employee/quotes" element={<EmployeeQuotes />} />
                    <Route path="employee/orders" element={<EmployeeOrders />} />
                    <Route path="employee/orders/:orderId" element={<EmployeeOrderDetail />} />
                    <Route path="employee/admin/logistics" element={<AdminLogistics />} />
                    <Route path="employee/erp-integration" element={<ERPIntegration />} />

                    {/* Customer Routes */}
                    <Route index element={<Index />} />
                    <Route path="products" element={<Products />} />
                    <Route path="products/:id" element={<ProductDetail />} />
                    <Route path="cart" element={<Cart />} />
                    <Route path="orders" element={<Orders />} />
                    <Route path="orders/:id" element={<OrderDetail />} />
                    <Route path="quotes" element={<CustomerQuotes />} />
                  </Route>
                  
                  {/* 404 */}
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </BrowserRouter>
            </TooltipProvider>
          </QuoteProvider>
        </CartProvider>
      </UserProvider>
    </QueryClientProvider>
  </ErrorBoundary>
);

export default App;
