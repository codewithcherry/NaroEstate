"use client"; // Ensure this is a client component in Next.js 13+ App Directory

import React, { useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Edit, Mail, Phone, MapPin, Calendar, BadgeCheck } from "lucide-react";

const ProfileHeader = ({user}) => {

  const {
    firstname,
    lastname,
    username,
    email,
    phone,
    isVerified,
    city,
    country,
    createdAt,
    bio,
    languages,
    imageUrl,
    properties,
    bookings,
    guests
  } = user || {};  // Ensure user is defined to avoid errors

  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState({
    firstname: firstname || "",
    lastname: lastname || "",
    username: username || "",
    imageUrl: imageUrl || "",
    isVerified: isVerified || false,
    useremail: email || "",
    phone: phone || "",
    city: city || "NA",
    country: country || "NA",
    joinedDate: createdAt || "",
    bio: bio || "NA",
    languages: languages || ["NA"],
    properties:properties,
    bookings:bookings,
    guests:guests
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

  const handleDiscard = () => {
    setTempProfile(profile);
    setIsEditing(false);
  };

  const FormInput = ({ label, name, value, onChange }) => (
    <div>
      <label className="block text-sm font-medium text-primary mb-1">{label}</label>
      <Input name={name} value={value} onChange={onChange} />
    </div>
  );

  return (
    <div className="text-primary p-4">
      <Card className="max-w-6xl mx-auto p-6 lg:p-8 rounded-2xl shadow-xl bg-white">
        <div className="flex flex-col lg:flex-row lg:space-x-10 space-y-8 lg:space-y-0">
          {/* Profile Picture and Basic Info */}
          <div className="lg:w-1/3 text-center">
          <div className="relative w-40 h-40 mx-auto rounded-full border-2 border-gray-300">
              <img
                src={profile.imageUrl}
                alt="Profile Picture"
                className="object-cover rounded-full w-full h-full"
              />
              <button
                className="absolute bottom-1 right-1 bg-blue-600 text-white p-1.5 rounded-full hover:bg-blue-700 z-10"
                onClick={() => alert("Change Profile Picture")}
              >
                <Edit className="h-5 w-5" />
              </button>
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
                <Calendar className="h-5 w-5 mr-2" /> Joined on {new Date(profile.joinedDate).toLocaleDateString()}
              </div>
            </div>
          </div>

          {/* Profile Details */}
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
                <Mail className="h-5 w-5 mr-2" /> {profile.useremail}
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
              <form className="space-y-6 mt-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 p-2">
                  <FormInput label="Firstname" name="firstname" value={tempProfile.firstname} onChange={handleChange} />
                  <FormInput label="Lastname" name="lastname" value={tempProfile.lastname} onChange={handleChange} />
                  <FormInput label="Email" name="useremail" value={tempProfile.useremail} onChange={handleChange} />
                  <FormInput label="Phone" name="phone" value={tempProfile.phone} onChange={handleChange} />
                  <FormInput label="City" name="city" value={tempProfile.city} onChange={handleChange} />
                  <FormInput label="Country" name="country" value={tempProfile.country} onChange={handleChange} />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Bio</label>
                  <textarea
                    name="bio"
                    value={tempProfile.bio}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded-md p-2"
                    rows={3}
                  />
                </div>
                <div className="flex justify-end space-x-4">
                  <Button variant="ghost" className='bg-muted text-primary text-white hover:bg-primary hover:text-white' onClick={handleDiscard}>
                    Discard
                  </Button>
                  <Button onClick={handleSave} className="bg-blue-600 text-white hover:bg-blue-700">
                    Save
                  </Button>
                </div>
              </form>
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
