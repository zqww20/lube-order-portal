import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { QuoteProvider } from "@/contexts/QuoteContext";
import { CartProvider } from "@/contexts/CartContext";
import { ErrorBoundary } from "@/components/ui/error-boundary";
import { GlobalDesignRefresh } from "@/components/ui/global-design-refresh";
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
import GuestProductDetail from "./pages/guest/ProductDetail";
import GuestCart from "./pages/guest/Cart";
import GuestQuotesPage from "./pages/guest/Quotes";
import GuestLocation from "./pages/guest/Location";
import EmployeeLayout from "./components/EmployeeLayout";
import EmployeeDashboard from "./pages/employee/Dashboard";
import QuotingWorkbench from "./pages/employee/Workbench";
import EmployeeQuotes from "./pages/employee/Quotes";
import EmployeeOrders from "./pages/employee/Orders";
import EmployeeOrderDetail from "./pages/employee/OrderDetail";
import AdminLogistics from "./pages/employee/AdminLogistics";
import EmployeePromotions from "./pages/employee/Promotions";
import DesignNavigator from "./components/DesignNavigator";

const queryClient = new QueryClient();

const App = () => (
  <ErrorBoundary>
    <QueryClientProvider client={queryClient}>
      <CartProvider>
        <QuoteProvider>
          <TooltipProvider>
          <GlobalDesignRefresh />
          <Toaster />
          <Sonner />
          <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          
          {/* Guest Routes - Separate Portal */}
          <Route path="/guest" element={<GuestLayout />}>
            <Route path="dashboard" element={<GuestDashboard />} />
            <Route path="products" element={<GuestProducts />} />
            <Route path="products/:id" element={<GuestProductDetail />} />
            <Route path="cart" element={<GuestCart />} />
            <Route path="quotes" element={<GuestQuotesPage />} />
            <Route path="location" element={<GuestLocation />} />
          </Route>
          
          {/* Employee Routes - Secure and Separate */}
          <Route path="/employee" element={<EmployeeLayout />}>
            <Route path="dashboard" element={<EmployeeDashboard />} />
            <Route path="promotions" element={<EmployeePromotions />} />
            <Route path="workbench/:quoteId" element={<QuotingWorkbench />} />
            <Route path="quotes" element={<EmployeeQuotes />} />
            <Route path="orders" element={<EmployeeOrders />} />
            <Route path="orders/:orderId" element={<EmployeeOrderDetail />} />
            <Route path="admin/logistics" element={<AdminLogistics />} />
            <Route path="erp-integration" element={<ERPIntegration />} />
          </Route>

          {/* Customer Routes */}
          <Route path="/" element={
            <div className="min-h-screen bg-gradient-subtle">
              <Header />
              <main className="pt-16">
                <Index />
              </main>
            </div>
          } />
          <Route path="/products" element={
            <div className="min-h-screen bg-gradient-subtle">
              <Header />
              <main className="pt-16">
                <Products />
              </main>
            </div>
          } />
          <Route path="/products/:id" element={
            <div className="min-h-screen bg-gradient-subtle">
              <Header />
              <main className="pt-16">
                <ProductDetail />
              </main>
            </div>
          } />
          <Route path="/cart" element={
            <div className="min-h-screen bg-gradient-subtle">
              <Header />
              <main className="pt-16">
                <Cart />
              </main>
            </div>
          } />
          <Route path="/orders" element={
            <div className="min-h-screen bg-gradient-subtle">
              <Header />
              <main className="pt-16">
                <Orders />
              </main>
            </div>
          } />
          <Route path="/orders/:id" element={
            <div className="min-h-screen bg-gradient-subtle">
              <Header />
              <main className="pt-16">
                <OrderDetail />
              </main>
            </div>
          } />
          <Route path="/quotes" element={
            <div className="min-h-screen bg-gradient-subtle">
              <Header />
              <main className="pt-16">
                <CustomerQuotes />
              </main>
            </div>
          } />
          <Route path="/employee" element={<Employee />} />
          <Route path="*" element={<NotFound />} />
          </Routes>
          <DesignNavigator />
        </BrowserRouter>
          </TooltipProvider>
        </QuoteProvider>
      </CartProvider>
    </QueryClientProvider>
  </ErrorBoundary>
);

export default App;
