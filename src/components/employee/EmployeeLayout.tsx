import React from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import { SidebarProvider } from '@/components/ui/sidebar';
import EmployeeSidebar from './EmployeeSidebar';
import EmployeeHeader from './EmployeeHeader';

const EmployeeLayout = () => {
  // Mock authentication check - replace with real auth
  const isEmployeeAuthenticated = true; // Would check for @bluewatergroup.ca email
  
  if (!isEmployeeAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-background">
        <EmployeeSidebar />
        
        <div className="flex-1 flex flex-col overflow-hidden">
          <EmployeeHeader />
          
          <main className="flex-1 overflow-auto">
            <Outlet />
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default EmployeeLayout;