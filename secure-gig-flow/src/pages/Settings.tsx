import React, { useState, useEffect } from 'react';
import { DashboardLayout } from '@/components/ui/DashboardLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { 
  User, 
  Mail, 
  Phone,
  Edit3,
  Check,
  X,
  Save,
  Briefcase,
  FileText,
  Shield,
  MessageSquare,
  Settings as SettingsIcon,
  LayoutDashboard,
  Trash2
} from 'lucide-react';

const Settings = () => {
  const { toast } = useToast();
  const [isEditing, setIsEditing] = useState(false);
  const [newSkill, setNewSkill] = useState('');
  
  // Load user data from localStorage
  const loadUserData = () => {
    const userData = localStorage.getItem('userData');
    if (userData) {
      const data = JSON.parse(userData);
      return {
        name: data.name || 'User',
        email: data.email || '',
        whatsappNumber: data.whatsappNumber || '',
        bio: data.bio || '',
        avatar: data.avatar || '🤴',
        role: data.role || 'client',
        skills: data.skills || [],
        hourlyRate: data.hourlyRate || '',
        address: data.address || ''
      };
    }
    return {
      name: 'User',
      email: '',
      whatsappNumber: '',
      bio: '',
      avatar: '🤴',
      role: 'client',
      skills: [],
      hourlyRate: '',
      address: ''
    };
  };

  const [profile, setProfile] = useState(loadUserData());

  const userRole = profile.role === 'client' ? 'Client' : 'Freelancer';
  const dashboardHome = userRole === 'Client' ? '/client-dashboard' : '/freelancer-dashboard';

  const navLinks = [
    { href: dashboardHome, label: 'Dashboard', icon: LayoutDashboard },
    { href: '/my-gigs', label: 'My Gigs', icon: Briefcase },
    { href: '/proposals', label: 'Proposals', icon: FileText },
    { href: '/contracts', label: 'Contracts', icon: Shield },
    { href: '/settings', label: 'Settings', icon: SettingsIcon },
  ];

  const avatarOptions = ['🤴', '👑', '🚀', '💎', '🔥', '⚡', '🌟', '🎯', '🛡️', '🎪', '🎨', '🎭'];

  const handleProfileUpdate = async () => {
    try {
      // Update user data in backend
      const response = await fetch(`http://localhost:3001/api/users/${profile.address}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: profile.name,
          email: profile.email,
          whatsappNumber: profile.whatsappNumber,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to update profile');
      }

      // Update localStorage
      const userData = {
        ...profile,
        updatedAt: new Date().toISOString()
      };
      localStorage.setItem('userData', JSON.stringify(userData));
      
      setIsEditing(false);
      toast({
        title: "Profile Updated",
        description: "Your profile has been successfully updated.",
      });
    } catch (error) {
      toast({
        title: "Update Failed",
        description: "There was an error updating your profile. Please try again.",
        variant: "destructive"
      });
    }
  };

  const addSkill = () => {
    if (newSkill.trim() && !profile.skills.includes(newSkill.trim())) {
      setProfile(prev => ({
        ...prev,
        skills: [...prev.skills, newSkill.trim()]
      }));
      setNewSkill('');
    }
  };

  const removeSkill = (skillToRemove: string) => {
    setProfile(prev => ({
      ...prev,
      skills: prev.skills.filter(skill => skill !== skillToRemove)
    }));
  };

  const handleInputChange = (field: string, value: string) => {
    setProfile(prev => ({ ...prev, [field]: value }));
  };

  return (
    <DashboardLayout navLinks={navLinks} userName={profile.name} userRole={userRole} userAvatar={profile.avatar}>
      <div className="space-y-8">
        <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold">Profile Settings</h1>
            <p className="text-muted-foreground">Manage your profile information and preferences</p>
          </div>
          <div className="flex gap-2">
            {isEditing ? (
              <>
                <Button variant="outline" onClick={() => setIsEditing(false)}>
                  <X className="h-4 w-4 mr-2" />
                  Cancel
                </Button>
                <Button onClick={handleProfileUpdate}>
                  <Check className="h-4 w-4 mr-2" />
                  Save Changes
                </Button>
              </>
            ) : (
              <Button onClick={() => setIsEditing(true)}>
                <Edit3 className="h-4 w-4 mr-2" />
                Edit Profile
              </Button>
            )}
          </div>
        </div>

        {/* Profile Information Card */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <User className="h-5 w-5" />
              Profile Information
            </CardTitle>
            <CardDescription>
              {isEditing ? 'Update your personal information' : 'Your profile details'}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Avatar Selection */}
            <div className="space-y-3">
              <Label>Avatar</Label>
              <div className="flex items-center gap-4">
                <div className="text-4xl">{profile.avatar}</div>
                {isEditing && (
                  <div className="grid grid-cols-6 gap-2">
                    {avatarOptions.map((avatar) => (
                      <button
                        key={avatar}
                        type="button"
                        onClick={() => handleInputChange('avatar', avatar)}
                        className={`text-2xl p-2 rounded-lg border-2 hover:bg-gray-100 transition-colors ${
                          profile.avatar === avatar ? 'border-purple-500 bg-purple-50' : 'border-gray-200'
                        }`}
                      >
                        {avatar}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Basic Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <Input
                  id="name"
                  value={profile.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  placeholder="Your full name"
                  disabled={!isEditing}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={profile.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  placeholder="your@email.com"
                  disabled={!isEditing}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="whatsappNumber">WhatsApp Number</Label>
              <div className="relative">
                <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  id="whatsappNumber"
                  value={profile.whatsappNumber}
                  onChange={(e) => handleInputChange('whatsappNumber', e.target.value)}
                  placeholder="+1234567890"
                  className="pl-10"
                  disabled={!isEditing}
                />
              </div>
              <p className="text-xs text-muted-foreground">
                Enter in international format (e.g., +91XXXXXXXXXX) for WhatsApp chat functionality
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="bio">Bio</Label>
              <Textarea
                id="bio"
                rows={3}
                value={profile.bio}
                onChange={(e) => handleInputChange('bio', e.target.value)}
                placeholder="Tell others about yourself..."
                disabled={!isEditing}
              />
            </div>

            {/* Role-specific fields for Freelancers */}
            {userRole === 'Freelancer' && (
              <>
                <div className="space-y-2">
                  <Label htmlFor="hourlyRate">Hourly Rate (AVAX)</Label>
                  <Input
                    id="hourlyRate"
                    type="number"
                    step="0.001"
                    value={profile.hourlyRate}
                    onChange={(e) => handleInputChange('hourlyRate', e.target.value)}
                    placeholder="0.050"
                    disabled={!isEditing}
                  />
                </div>

                {/* Skills */}
                <div className="space-y-3">
                  <Label>Skills</Label>
                  <div className="flex flex-wrap gap-2 mb-3">
                    {profile.skills.map((skill: string) => (
                      <Badge key={skill} variant="secondary" className="flex items-center gap-1">
                        {skill}
                        {isEditing && (
                          <button
                            type="button"
                            onClick={() => removeSkill(skill)}
                            className="ml-1 hover:text-red-500"
                          >
                            <Trash2 className="h-3 w-3" />
                          </button>
                        )}
                      </Badge>
                    ))}
                  </div>
                  {isEditing && (
                    <div className="flex gap-2">
                      <Input
                        placeholder="Add a skill (e.g., React, Solidity, Web3)"
                        value={newSkill}
                        onChange={(e) => setNewSkill(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addSkill())}
                      />
                      <Button type="button" onClick={addSkill} variant="outline">
                        Add
                      </Button>
                    </div>
                  )}
                </div>
              </>
            )}

            {/* Account Information */}
            <div className="space-y-2">
              <Label>Account Details</Label>
              <div className="bg-muted p-4 rounded-lg space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm font-medium">Role:</span>
                  <Badge variant={userRole === 'Client' ? 'default' : 'secondary'}>
                    {userRole}
                  </Badge>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm font-medium">Wallet Address:</span>
                  <span className="text-sm font-mono">
                    {profile.address ? `${profile.address.slice(0, 6)}...${profile.address.slice(-4)}` : 'Not connected'}
                  </span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

      </div>
    </DashboardLayout>
  );
};

export default Settings;
