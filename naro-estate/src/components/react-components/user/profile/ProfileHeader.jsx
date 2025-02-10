import React, { useState } from 'react';
import Image from 'next/image';
import { Mail, Phone, MapPin, Calendar, Home, ShieldCheck } from 'lucide-react';
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

const ProfileHeaderWithPanel = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState({
    name: "Prashanth Naroju",
    username: "@prashanth_naroju",
    bio: "Passionate about real estate with over 5 years of experience.",
    email: "narojuprashanth1234@gmail.com",
    phone: "3242454355",
    location: "Hyderabad, India",
    memberSince: "January 2018",
    propertiesListed: 15,
  });

  const [tempProfile, setTempProfile] = useState(profile);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTempProfile({ ...tempProfile, [name]: value });
  };

  const handleSave = () => {
    setProfile(tempProfile);
    setIsEditing(false);
  };

  return (
    <>
      <Card className="max-w-2xl mx-auto p-6 rounded-xl shadow-lg bg-gradient-to-r from-teal-500 to-blue-500 text-white">
        <CardHeader className="flex flex-col items-center">
          <div className="relative">
            <Image
              src="/path/to/profile.jpg" // Replace with the correct path
              alt="Profile Picture"
              width={100}
              height={100}
              className="rounded-full border-4 border-white shadow-lg"
            />
          </div>
          <div className="flex items-center space-x-2 mt-4">
            <h2 className="text-2xl font-bold">{profile.name}</h2>
            <ShieldCheck className="h-5 w-5 text-green-400" title="Verified Estate Owner" />
          </div>
          <p className="text-lg text-gray-200">{profile.username}</p>
          <p className="text-sm mt-2 text-center text-gray-300">{profile.bio}</p>
        </CardHeader>

        <CardContent className="mt-4 space-y-4">
          <div className="flex items-center space-x-2">
            <Mail className="h-5 w-5 text-gray-200" />
            <span>{profile.email}</span>
          </div>
          <div className="flex items-center space-x-2">
            <Phone className="h-5 w-5 text-gray-200" />
            <span>{profile.phone}</span>
          </div>
          <div className="flex items-center space-x-2">
            <MapPin className="h-5 w-5 text-gray-200" />
            <span>{profile.location}</span>
          </div>
          <div className="flex items-center space-x-2">
            <Calendar className="h-5 w-5 text-gray-200" />
            <span>Member since: {profile.memberSince}</span>
          </div>
          <div className="flex items-center space-x-2">
            <Home className="h-5 w-5 text-gray-200" />
            <span>Properties Listed: {profile.propertiesListed}</span>
          </div>
        </CardContent>

        <div className="mt-6 flex justify-center">
          <Button onClick={() => setIsEditing(true)} className="bg-white text-teal-600 hover:bg-gray-100">
            Edit Profile
          </Button>
        </div>
      </Card>

      <Dialog open={isEditing} onOpenChange={setIsEditing}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Profile</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Name</label>
              <Input name="name" value={tempProfile.name} onChange={handleChange} />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Bio</label>
              <Textarea name="bio" value={tempProfile.bio} onChange={handleChange} />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Email</label>
              <Input name="email" value={tempProfile.email} onChange={handleChange} />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Phone</label>
              <Input name="phone" value={tempProfile.phone} onChange={handleChange} />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Location</label>
              <Input name="location" value={tempProfile.location} onChange={handleChange} />
            </div>
          </div>
          <DialogFooter className="mt-4">
            <Button onClick={handleSave} className="bg-green-500 text-white hover:bg-green-600">
              Save
            </Button>
            <Button onClick={() => setIsEditing(false)} className="bg-gray-300 text-gray-700 hover:bg-gray-400">
              Cancel
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default ProfileHeaderWithPanel;
