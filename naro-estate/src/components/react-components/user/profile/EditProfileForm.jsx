'use client';

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { Loader2 } from 'lucide-react';

const EditProfileForm = ({ formData, setProfile, setIsEditing }) => {
  const [tempProfile, setTempProfile] = useState(formData);
  const [languageInput, setLanguageInput] = useState('');
  const [token, setToken] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { toast } = useToast();

  // Fetch the token once when the component mounts
  useEffect(() => {
    const storedToken = localStorage.getItem('authToken');
    if (storedToken) setToken(storedToken);
  }, []);

  const updateUserInfo = async (updatedData) => {
    try {
      setLoading(true);
      setError(null);

      const response = await axios.put('/api/user/update-user', updatedData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setProfile(response.data.user);
      toast({
        title: response.data.type,
        description: response.data.message,
        duration: 5000,
      });
      setIsEditing(false);
    } catch (err) {
      console.error('Failed to update user info:', err);
      setError('Failed to update profile. Please try again.');
      toast({
        title: err.response?.data?.type || 'Error',
        description: err.response?.data?.message || 'An unexpected error occurred.',
        duration: 5000,
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSave = (e) => {
    e.preventDefault();
    updateUserInfo(tempProfile);
  };

  const handleDiscard = () => {
    setTempProfile(formData);
    setIsEditing(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTempProfile((prevProfile) => ({
      ...prevProfile,
      [name]: value,
    }));
  };

  const handleAddLanguage = () => {
    if (
      languageInput.trim() &&
      !tempProfile.languages.some((lang) => lang.toLowerCase() === languageInput.trim().toLowerCase())
    ) {
      setTempProfile((prevProfile) => ({
        ...prevProfile,
        languages: [...(prevProfile.languages || []), languageInput.trim()],
      }));
      setLanguageInput('');
    }
  };

  const handleRemoveLanguage = (language) => {
    setTempProfile((prevProfile) => ({
      ...prevProfile,
      languages: prevProfile.languages.filter((lang) => lang !== language),
    }));
  };

  return (
    <div>
      <form className="space-y-6 mt-6" onSubmit={handleSave}>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 p-2">
          {/* Firstname and Lastname */}
          <div>
            <label htmlFor="firstname" className="block text-sm font-medium text-gray-700">
              Firstname
            </label>
            <Input
              id="firstname"
              name="firstname"
              value={tempProfile.firstname || ''}
              onChange={handleChange}
              className="w-full"
            />
          </div>
          <div>
            <label htmlFor="lastname" className="block text-sm font-medium text-gray-700">
              Lastname
            </label>
            <Input
              id="lastname"
              name="lastname"
              value={tempProfile.lastname || ''}
              onChange={handleChange}
              className="w-full"
            />
          </div>
          
          {/* Email */}
          <div className="sm:col-span-2">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <Input
              id="email"
              name="email"
              type="email"
              value={tempProfile.email || ''}
              onChange={handleChange}
              className="w-full"
            />
          </div>

          {/* Phone */}
          <div className="sm:col-span-2">
            <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
              Phone
            </label>
            <Input
              id="phone"
              name="phone"
              value={tempProfile.phone || ''}
              onChange={handleChange}
              className="w-full"
            />
          </div>

          {/* City and Country */}
          <div>
            <label htmlFor="city" className="block text-sm font-medium text-gray-700">
              City
            </label>
            <Input
              id="city"
              name="city"
              value={tempProfile.city || ''}
              onChange={handleChange}
              className="w-full"
            />
          </div>
          <div>
            <label htmlFor="country" className="block text-sm font-medium text-gray-700">
              Country
            </label>
            <Input
              id="country"
              name="country"
              value={tempProfile.country || ''}
              onChange={handleChange}
              className="w-full"
            />
          </div>

          {/* Languages */}
          <div className="sm:col-span-2">
            <label htmlFor="languages" className="block text-sm font-medium text-gray-700">
              Languages
            </label>
            <div className="flex items-center space-x-2">
              <Input
                id="languages"
                name="language"
                value={languageInput}
                onChange={(e) => setLanguageInput(e.target.value)}
                className="w-full"
                placeholder="Enter a language and press Add"
              />
              <Button type="button" onClick={handleAddLanguage}>
                Add
              </Button>
            </div>
            <div className="mt-2 grid grid-cols-2 sm:grid-cols-4 gap-2">
              {tempProfile.languages && tempProfile.languages.length > 0 ? (
                tempProfile.languages.map((language, index) => (
                  <div
                    key={index}
                    className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full flex items-center justify-between"
                  >
                    <span>{language}</span>
                    <button
                      type="button"
                      onClick={() => handleRemoveLanguage(language)}
                      className="text-red-500 ml-2"
                    >
                      &times;
                    </button>
                  </div>
                ))
              ) : (
                <p className="text-sm text-gray-500 col-span-4">No languages added yet.</p>
              )}
            </div>
          </div>

          {/* Bio */}
          <div className="sm:col-span-2">
            <label htmlFor="bio" className="block text-sm font-medium text-gray-700">
              Bio
            </label>
            <textarea
              id="bio"
              name="bio"
              value={tempProfile.bio || ''}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-md p-2"
              rows={3}
            />
          </div>
        </div>

        {/* Error message */}
        {error && <p className="text-red-500">{error}</p>}

        <div className="flex justify-end space-x-4">
          <Button type="button" variant="ghost" onClick={handleDiscard} disabled={loading}>
            Discard
          </Button>
          <Button type="submit" className="bg-blue-600 text-white hover:bg-blue-700" disabled={loading}>
            {loading ? (
              <div className="flex items-center space-x-2">
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Saving...</span>
              </div>
            ) : (
              'Save'
            )}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default EditProfileForm;
