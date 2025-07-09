import React from 'react';
import GuestAccountSummary from '@/components/guest/GuestAccountSummary';
import GuestActionCards from '@/components/guest/GuestActionCards';
import GuestQuickOrder from '@/components/guest/GuestQuickOrder';

const GuestDashboard = () => {
  return (
    <div className="space-y-3">
      {/* Dashboard Header */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900">Welcome, Guest!</h1>
        <p className="text-gray-600 mt-2">Browse and order products for cash pickup</p>
      </div>

      <GuestAccountSummary />

      <GuestActionCards />

      <GuestQuickOrder />
    </div>
  );
};

export default GuestDashboard;