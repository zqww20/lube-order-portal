import React from 'react';
import GuestDashboard from '@/components/GuestDashboard';
import SAPConnectionStatus from '@/components/SAPConnectionStatus';
import RealTimeDataSync from '@/components/RealTimeDataSync';

const GuestDashboardPage = () => {
  return (
    <div className="space-y-6">
      <GuestDashboard />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <SAPConnectionStatus />
        <RealTimeDataSync />
      </div>
    </div>
  );
};

export default GuestDashboardPage;