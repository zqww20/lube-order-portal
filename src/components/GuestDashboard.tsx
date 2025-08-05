import React from 'react';
import GuestAccountSummary from '@/components/guest/GuestAccountSummary';
import GuestActionCards from '@/components/guest/GuestActionCards';
import GuestQuickOrder from '@/components/guest/GuestQuickOrder';

const GuestDashboard = () => {
  return (
    <div className="space-y-3">
      {/* Dashboard Header */}
      <div className="mb-4 text-center lg:text-left">
        <h1 className="text-4xl font-bold text-gradient mb-2">Welcome, Guest!</h1>
        <p className="text-muted-foreground text-lg">Browse and order products for cash pickup</p>
      </div>

      <GuestAccountSummary />

      <GuestActionCards />

      <GuestQuickOrder />
    </div>
  );
};

export default GuestDashboard;