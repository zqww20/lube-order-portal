import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Plus, Edit2, Trash2, Save, MapPin, Clock, Truck } from 'lucide-react';

interface Zone {
  id: string;
  name: string;
  towns: string[];
  warehouse: 'Dartmouth' | 'Moncton';
  deliveryDay: string;
  cutoffTime: string;
}

interface TransferSchedule {
  from: string;
  to: string;
  frequency: string;
  nextTransfer: string;
}

const AdminLogistics = () => {
  const [activeTab, setActiveTab] = useState<'zones' | 'schedule' | 'transfers'>('zones');
  const [editingZone, setEditingZone] = useState<string | null>(null);

  // Mock data - would be fetched from API
  const [zones, setZones] = useState<Zone[]>([
    {
      id: '1',
      name: 'Halifax Metro',
      towns: ['Halifax', 'Dartmouth', 'Bedford', 'Sackville'],
      warehouse: 'Dartmouth',
      deliveryDay: 'Tuesday',
      cutoffTime: '2:00 PM'
    },
    {
      id: '2',
      name: 'South Shore',
      towns: ['Bridgewater', 'Liverpool', 'Lunenburg', 'Mahone Bay'],
      warehouse: 'Dartmouth',
      deliveryDay: 'Wednesday',
      cutoffTime: '12:00 PM'
    },
    {
      id: '3',
      name: 'Moncton Area',
      towns: ['Moncton', 'Dieppe', 'Riverview'],
      warehouse: 'Moncton',
      deliveryDay: 'Thursday',
      cutoffTime: '1:00 PM'
    }
  ]);

  const transferSchedules: TransferSchedule[] = [
    {
      from: 'Dartmouth',
      to: 'Moncton',
      frequency: 'Weekly - Monday',
      nextTransfer: '2024-01-22'
    },
    {
      from: 'Moncton',
      to: 'Dartmouth',
      frequency: 'Weekly - Friday',
      nextTransfer: '2024-01-19'
    }
  ];

  const TabButton = ({ id, label, active }: { id: string; label: string; active: boolean }) => (
    <Button
      variant={active ? "default" : "outline"}
      onClick={() => setActiveTab(id as any)}
      className="flex-1"
    >
      {label}
    </Button>
  );

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground">Logistics Administration</h1>
        <p className="text-muted-foreground">Manage delivery zones, schedules, and warehouse transfers</p>
      </div>

      {/* Tab Navigation */}
      <div className="flex gap-2 mb-6">
        <TabButton id="zones" label="Zone Management" active={activeTab === 'zones'} />
        <TabButton id="schedule" label="Delivery Schedule" active={activeTab === 'schedule'} />
        <TabButton id="transfers" label="Transfer Management" active={activeTab === 'transfers'} />
      </div>

      {/* Zone Management */}
      {activeTab === 'zones' && (
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold">Delivery Zones</h2>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Add New Zone
            </Button>
          </div>

          <Card>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Zone Name</TableHead>
                    <TableHead>Towns</TableHead>
                    <TableHead>Warehouse</TableHead>
                    <TableHead>Delivery Day</TableHead>
                    <TableHead>Cutoff Time</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {zones.map((zone) => (
                    <TableRow key={zone.id}>
                      <TableCell className="font-medium">
                        <div className="flex items-center gap-2">
                          <MapPin className="h-4 w-4 text-muted-foreground" />
                          {zone.name}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex flex-wrap gap-1">
                          {zone.towns.map((town, idx) => (
                            <Badge key={idx} variant="outline" className="text-xs">
                              {town}
                            </Badge>
                          ))}
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="secondary">{zone.warehouse}</Badge>
                      </TableCell>
                      <TableCell>{zone.deliveryDay}</TableCell>
                      <TableCell>{zone.cutoffTime}</TableCell>
                      <TableCell>
                        <div className="flex gap-2">
                          <Button size="sm" variant="outline">
                            <Edit2 className="h-4 w-4" />
                          </Button>
                          <Button size="sm" variant="outline">
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Delivery Schedule */}
      {activeTab === 'schedule' && (
        <div className="space-y-6">
          <h2 className="text-xl font-semibold">Delivery Schedule Management</h2>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {zones.map((zone) => (
              <Card key={zone.id}>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Clock className="h-5 w-5" />
                    {zone.name}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label>Delivery Day</Label>
                      <Select defaultValue={zone.deliveryDay.toLowerCase()}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="monday">Monday</SelectItem>
                          <SelectItem value="tuesday">Tuesday</SelectItem>
                          <SelectItem value="wednesday">Wednesday</SelectItem>
                          <SelectItem value="thursday">Thursday</SelectItem>
                          <SelectItem value="friday">Friday</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label>Cutoff Time</Label>
                      <Input defaultValue={zone.cutoffTime} />
                    </div>
                  </div>
                  <Button className="w-full" variant="outline">
                    <Save className="h-4 w-4 mr-2" />
                    Update Schedule
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* Transfer Management */}
      {activeTab === 'transfers' && (
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold">Warehouse Transfer Schedule</h2>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Add Transfer Route
            </Button>
          </div>

          <Card>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>From Warehouse</TableHead>
                    <TableHead>To Warehouse</TableHead>
                    <TableHead>Frequency</TableHead>
                    <TableHead>Next Transfer</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {transferSchedules.map((transfer, idx) => (
                    <TableRow key={idx}>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Truck className="h-4 w-4 text-muted-foreground" />
                          {transfer.from}
                        </div>
                      </TableCell>
                      <TableCell>{transfer.to}</TableCell>
                      <TableCell>{transfer.frequency}</TableCell>
                      <TableCell>{transfer.nextTransfer}</TableCell>
                      <TableCell>
                        <div className="flex gap-2">
                          <Button size="sm" variant="outline">
                            <Edit2 className="h-4 w-4" />
                          </Button>
                          <Button size="sm" variant="outline">
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};

export default AdminLogistics;