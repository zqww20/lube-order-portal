import React from 'react';
import GuestAccountSummary from '@/components/guest/GuestAccountSummary';
import GuestActionCards from '@/components/guest/GuestActionCards';
import GuestQuickOrder from '@/components/guest/GuestQuickOrder';
import GuestHeroSection from '@/components/guest/GuestHeroSection';
import GuestValueProposition from '@/components/guest/GuestValueProposition';

const GuestDashboard = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/20 to-background">
      <GuestHeroSection />
      
      <div className="container mx-auto px-4 pb-8 space-y-8">
        <GuestValueProposition />
        
        <GuestAccountSummary />

        <GuestActionCards />

        <GuestQuickOrder />
      </div>
    </div>
  );
};

export default GuestDashboard;