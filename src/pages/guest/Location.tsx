import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { MapPin, Clock, Phone, Car } from 'lucide-react';

const GuestLocation = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Store Location & Pickup</h1>
        <p className="text-muted-foreground">Visit our store to complete your guest purchase</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Store Information */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <MapPin className="h-5 w-5" />
              <span>Store Location</span>
            </CardTitle>
            <CardDescription>Our main distribution center and pickup location</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h4 className="font-medium mb-2">Address</h4>
              <p className="text-muted-foreground">
                Bluewater Group<br />
                1234 Industrial Boulevard<br />
                Suite 100<br />
                Business District, State 12345
              </p>
            </div>
            
            <div className="flex items-center space-x-2">
              <Phone className="h-4 w-4 text-muted-foreground" />
              <span>(555) 123-4567</span>
            </div>
            
            <Button className="w-full">Get Directions</Button>
          </CardContent>
        </Card>

        {/* Store Hours */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Clock className="h-5 w-5" />
              <span>Store Hours</span>
            </CardTitle>
            <CardDescription>When you can pick up your guest orders</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="font-medium">Monday - Friday</span>
                <span>8:00 AM - 6:00 PM</span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium">Saturday</span>
                <span>8:00 AM - 4:00 PM</span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium">Sunday</span>
                <span className="text-muted-foreground">Closed</span>
              </div>
              
              <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                <p className="text-sm text-yellow-800">
                  <strong>Note:</strong> Guest orders must be picked up within 48 hours of placement.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Pickup Instructions */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Car className="h-5 w-5" />
            <span>Pickup Instructions</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h4 className="font-medium mb-2">What to Bring</h4>
              <ul className="text-sm space-y-1 text-muted-foreground">
                <li>• Valid photo ID</li>
                <li>• Order confirmation number</li>
                <li>• Exact cash amount</li>
                <li>• Vehicle for larger items</li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium mb-2">Pickup Process</h4>
              <ul className="text-sm space-y-1 text-muted-foreground">
                <li>• Use loading dock entrance</li>
                <li>• Check in at counter</li>
                <li>• Payment due at pickup</li>
                <li>• We'll load your vehicle</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default GuestLocation;