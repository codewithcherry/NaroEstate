'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Edit, Mail, Phone, MapPin, Calendar, BadgeCheck } from 'lucide-react';
import EditProfileForm from './EditProfileForm';
import ProfilePictureDialog from './ProfilePictureDialog';

const ProfileHeader = ({ user }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [open, setOpen] = useState(false);
  const [profile, setProfile] = useState({
    firstname: user?.firstname || '',
    lastname: user?.lastname || '',
    username: user?.username || '',
    imageUrl: user?.imageUrl || '',
    isVerified: user?.isVerified || false,
    email: user?.email || '',
    phone: user?.phone || '',
    city: user?.city || 'NA',
    country: user?.country || 'NA',
    joinedDate: user?.createdAt || '',
    bio: user?.bio || 'NA',
    languages: user?.languages || ['NA'],
    properties: user?.properties || 0,
    bookings: user?.bookings || 0,
    guests: user?.guests || 0,
  });

  const onImageUpload=(newProfileUrl)=>{
    if (newProfileUrl) {
      setProfile({...profile,imageUrl:newProfileUrl})
    } else {
      return 
    }
    
  }

  return (
    <div className="text-primary p-4">
      <Card className="max-w-6xl mx-auto p-6 lg:p-8 rounded-2xl shadow-xl bg-white">
        <div className="flex flex-col lg:flex-row lg:space-x-10 space-y-8 lg:space-y-0">
          <div className="lg:w-1/3 text-center">
            <div className="relative w-40 h-40 mx-auto rounded-full border-2 border-gray-300">
              <img
                src={profile.imageUrl}
                alt="Profile Picture"
                className="object-cover rounded-full w-full h-full"
              />
              <button
                className="absolute bottom-1 right-1 bg-blue-600 text-white p-1.5 rounded-full hover:bg-blue-700 z-10"
                onClick={() => setOpen(true)}
              >
                <Edit className="h-5 w-5" />
              </button>
              {/* Dialog Component */}
              <ProfilePictureDialog open={open} setOpen={setOpen} onImageUpload={onImageUpload}/>
            </div>
            <div className="mt-6 space-y-3">
              <div className="flex items-center justify-center text-xl font-semibold">
                @{profile.username}
                {profile.isVerified && (
                  <BadgeCheck className="h-5 w-5 text-blue-500 ml-2" title="Verified User" />
                )}
              </div>
              <div className="flex items-center justify-center text-gray-500">
                <MapPin className="h-5 w-5 mr-2" /> {`${profile.city}, ${profile.country}`}
              </div>
              <div className="flex items-center justify-center text-gray-500">
                <Calendar className="h-5 w-5 mr-2" /> Joined on{' '}
                {new Date(profile.joinedDate).toLocaleDateString()}
              </div>
            </div>
          </div>

          <div className="flex-1 space-y-6 overflow-y-auto">
            <div className="flex justify-between p-4 bg-gray-100 rounded-lg">
              <div className="text-center">
                <div className="text-2xl font-bold">{profile.properties}</div>
                <div className="text-gray-600 text-sm">Properties</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold">{profile.bookings}</div>
                <div className="text-gray-600 text-sm">Bookings</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold">{profile.guests}</div>
                <div className="text-gray-600 text-sm">Guests</div>
              </div>
            </div>

            <div>
              <h2 className="text-2xl font-bold">{`${profile.firstname} ${profile.lastname}`}</h2>
              <div className="flex items-center text-gray-500 mt-2">
                <Mail className="h-5 w-5 mr-2" /> {profile.email}
              </div>
              <div className="flex items-center text-gray-500 mt-1">
                <Phone className="h-5 w-5 mr-2" /> {profile.phone}
              </div>
              <div className="mt-6">
                <h3 className="text-lg font-medium">Languages</h3>
                <div className="flex flex-wrap gap-2">
                  {profile.languages.map((lang, index) => (
                    <span key={index} className="bg-gray-200 text-gray-800 px-3 py-1 rounded-full text-sm">
                      {lang}
                    </span>
                  ))}
                </div>
              </div>
              <div className="mt-6">
                <h3 className="text-lg font-medium">Bio</h3>
                <p className="text-gray-600">{profile.bio}</p>
              </div>
            </div>

            {isEditing ? (
              <EditProfileForm
                formData={
                  {firstname:profile.firstname,
                   lastname:profile.lastname,
                   email:profile.email,
                   phone:profile.phone,
                   city:profile.city,
                   country:profile.country ,
                   bio:profile.bio || "",
                   languages:profile.languages
                }}
                setProfile={setProfile}
                setIsEditing={setIsEditing}
              />
            ) : (
              <div className="mt-8">
                <Button onClick={() => setIsEditing(true)} className="bg-muted text-white hover:bg-primary">
                  Edit Profile
                </Button>
              </div>
            )}
          </div>
        </div>
      </Card>
    </div>
  );
};

export default ProfileHeader;
