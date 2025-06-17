
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { 
  User, 
  Shield, 
  Link, 
  Monitor,
  ArrowLeft,
  Edit,
  Save,
  X,
  Eye,
  EyeOff,
  Smartphone,
  Mail,
  Phone,
  Chrome,
  Laptop,
  LogOut
} from 'lucide-react';

interface ProfileProps {
  onBack: () => void;
}

const Profile = ({ onBack }: ProfileProps) => {
  const [editingProfile, setEditingProfile] = useState(false);
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [profileData, setProfileData] = useState({
    name: 'Admin User',
    email: 'admin@company.com',
    phone: '+1 (555) 123-4567'
  });

  const [tempProfileData, setTempProfileData] = useState(profileData);

  const handleSaveProfile = () => {
    setProfileData(tempProfileData);
    setEditingProfile(false);
  };

  const handleCancelEdit = () => {
    setTempProfileData(profileData);
    setEditingProfile(false);
  };

  const activeSessions = [
    {
      id: 1,
      device: 'Chrome on Windows',
      icon: Chrome,
      ip: '192.168.1.100',
      location: 'New York, US',
      lastActive: '2 minutes ago',
      current: true
    },
    {
      id: 2,
      device: 'Safari on MacBook Pro',
      icon: Laptop,
      ip: '192.168.1.105',
      location: 'New York, US',
      lastActive: '1 hour ago',
      current: false
    },
    {
      id: 3,
      device: 'Chrome on iPhone',
      icon: Smartphone,
      ip: '10.0.0.45',
      location: 'New York, US',
      lastActive: '3 hours ago',
      current: false
    }
  ];

  const linkedAccounts = [
    {
      provider: 'Google',
      email: 'admin@gmail.com',
      connected: true,
      icon: Chrome
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center h-16">
            <Button 
              variant="ghost" 
              size="sm"
              onClick={onBack}
              className="mr-4"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Dashboard
            </Button>
            <h1 className="text-xl font-semibold text-gray-900">Account Settings</h1>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Tabs defaultValue="profile" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="profile" className="flex items-center gap-2">
              <User className="h-4 w-4" />
              Profile
            </TabsTrigger>
            <TabsTrigger value="security" className="flex items-center gap-2">
              <Shield className="h-4 w-4" />
              Security
            </TabsTrigger>
            <TabsTrigger value="linked" className="flex items-center gap-2">
              <Link className="h-4 w-4" />
              Linked Accounts
            </TabsTrigger>
            <TabsTrigger value="sessions" className="flex items-center gap-2">
              <Monitor className="h-4 w-4" />
              Sessions
            </TabsTrigger>
          </TabsList>

          {/* Profile Tab */}
          <TabsContent value="profile">
            <Card>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <div>
                    <CardTitle>Profile Information</CardTitle>
                    <CardDescription>Update your account details and personal information</CardDescription>
                  </div>
                  {!editingProfile ? (
                    <Button onClick={() => setEditingProfile(true)} variant="outline" size="sm">
                      <Edit className="h-4 w-4 mr-2" />
                      Edit
                    </Button>
                  ) : (
                    <div className="flex gap-2">
                      <Button onClick={handleSaveProfile} size="sm">
                        <Save className="h-4 w-4 mr-2" />
                        Save
                      </Button>
                      <Button onClick={handleCancelEdit} variant="outline" size="sm">
                        <X className="h-4 w-4 mr-2" />
                        Cancel
                      </Button>
                    </div>
                  )}
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid gap-4">
                  <div>
                    <Label htmlFor="name">Full Name</Label>
                    <Input
                      id="name"
                      value={editingProfile ? tempProfileData.name : profileData.name}
                      onChange={(e) => setTempProfileData({...tempProfileData, name: e.target.value})}
                      disabled={!editingProfile}
                      className={!editingProfile ? "bg-gray-50" : ""}
                    />
                  </div>
                  <div>
                    <Label htmlFor="email">Email Address</Label>
                    <Input
                      id="email"
                      type="email"
                      value={editingProfile ? tempProfileData.email : profileData.email}
                      onChange={(e) => setTempProfileData({...tempProfileData, email: e.target.value})}
                      disabled={!editingProfile}
                      className={!editingProfile ? "bg-gray-50" : ""}
                    />
                  </div>
                  <div>
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input
                      id="phone"
                      value={editingProfile ? tempProfileData.phone : profileData.phone}
                      onChange={(e) => setTempProfileData({...tempProfileData, phone: e.target.value})}
                      disabled={!editingProfile}
                      className={!editingProfile ? "bg-gray-50" : ""}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Security Tab */}
          <TabsContent value="security">
            <div className="space-y-6">
              {/* Login Information */}
              <Card>
                <CardHeader>
                  <CardTitle>Login Information</CardTitle>
                  <CardDescription>View your login details and activity</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-4">
                    <div className="flex justify-between items-center py-2">
                      <div>
                        <p className="font-medium">Last Login</p>
                        <p className="text-sm text-gray-500">December 17, 2025 at 2:30 PM</p>
                      </div>
                    </div>
                    <div className="flex justify-between items-center py-2">
                      <div>
                        <p className="font-medium">Login Location</p>
                        <p className="text-sm text-gray-500">New York, United States</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Change Password */}
              <Card>
                <CardHeader>
                  <CardTitle>Change Password</CardTitle>
                  <CardDescription>Update your password to keep your account secure</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="current-password">Current Password</Label>
                    <div className="relative">
                      <Input
                        id="current-password"
                        type={showCurrentPassword ? "text" : "password"}
                        placeholder="Enter current password"
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="absolute right-2 top-1/2 transform -translate-y-1/2"
                        onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                      >
                        {showCurrentPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </Button>
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="new-password">New Password</Label>
                    <div className="relative">
                      <Input
                        id="new-password"
                        type={showNewPassword ? "text" : "password"}
                        placeholder="Enter new password"
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="absolute right-2 top-1/2 transform -translate-y-1/2"
                        onClick={() => setShowNewPassword(!showNewPassword)}
                      >
                        {showNewPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </Button>
                    </div>
                    <p className="text-sm text-gray-500 mt-1">At least 8 characters long</p>
                  </div>
                  <div>
                    <Label htmlFor="confirm-password">Confirm New Password</Label>
                    <div className="relative">
                      <Input
                        id="confirm-password"
                        type={showConfirmPassword ? "text" : "password"}
                        placeholder="Confirm new password"
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="absolute right-2 top-1/2 transform -translate-y-1/2"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      >
                        {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </Button>
                    </div>
                  </div>
                  <Button>Update Password</Button>
                </CardContent>
              </Card>

              {/* Email & Phone Verification */}
              <Card>
                <CardHeader>
                  <CardTitle>Verification</CardTitle>
                  <CardDescription>Manage your email and phone verification</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between items-center py-2">
                    <div className="flex items-center gap-3">
                      <Mail className="h-4 w-4 text-gray-500" />
                      <div>
                        <p className="font-medium">Email Verification</p>
                        <p className="text-sm text-gray-500">{profileData.email}</p>
                      </div>
                    </div>
                    <Badge variant="secondary" className="bg-green-100 text-green-800">Verified</Badge>
                  </div>
                  <div className="flex justify-between items-center py-2">
                    <div className="flex items-center gap-3">
                      <Phone className="h-4 w-4 text-gray-500" />
                      <div>
                        <p className="font-medium">Phone Verification</p>
                        <p className="text-sm text-gray-500">{profileData.phone}</p>
                      </div>
                    </div>
                    <Button variant="outline" size="sm">Verify</Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Linked Accounts Tab */}
          <TabsContent value="linked">
            <Card>
              <CardHeader>
                <CardTitle>Linked Accounts</CardTitle>
                <CardDescription>Manage your connected social media and third-party accounts</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {linkedAccounts.map((account, index) => (
                    <div key={index} className="flex justify-between items-center py-3 border-b last:border-b-0">
                      <div className="flex items-center gap-3">
                        <account.icon className="h-5 w-5" />
                        <div>
                          <p className="font-medium">{account.provider}</p>
                          <p className="text-sm text-gray-500">{account.email}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge variant={account.connected ? "default" : "secondary"}>
                          {account.connected ? "Connected" : "Not Connected"}
                        </Badge>
                        <Button variant="outline" size="sm">
                          {account.connected ? "Disconnect" : "Connect"}
                        </Button>
                      </div>
                    </div>
                  ))}
                  <div className="pt-4">
                    <Button variant="outline">
                      <Link className="h-4 w-4 mr-2" />
                      Add Account
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Sessions Tab */}
          <TabsContent value="sessions">
            <Card>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <div>
                    <CardTitle>Active Sessions</CardTitle>
                    <CardDescription>Manage your active login sessions across devices</CardDescription>
                  </div>
                  <Button variant="outline" className="text-red-600 hover:text-red-700">
                    <LogOut className="h-4 w-4 mr-2" />
                    Sign out other devices
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {activeSessions.map((session) => (
                    <div key={session.id} className="flex justify-between items-center p-4 border rounded-lg">
                      <div className="flex items-center gap-4">
                        <session.icon className="h-8 w-8 text-gray-600" />
                        <div>
                          <div className="flex items-center gap-2">
                            <p className="font-medium">{session.device}</p>
                            {session.current && (
                              <Badge variant="secondary" className="bg-green-100 text-green-800">Current</Badge>
                            )}
                          </div>
                          <p className="text-sm text-gray-500">{session.ip} • {session.location}</p>
                          <p className="text-sm text-gray-500">Last active: {session.lastActive}</p>
                        </div>
                      </div>
                      {!session.current && (
                        <Button variant="outline" size="sm" className="text-red-600 hover:text-red-700">
                          Sign out
                        </Button>
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default Profile;
