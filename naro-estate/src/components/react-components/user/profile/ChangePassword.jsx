'use client';

import React, { useState, useEffect } from 'react';
import { Lock, Loader2 } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import axios from 'axios';

const ChangePassword = () => {
  const [isToggle, setIsToggle] = useState(false);
  const [formData, setFormData] = useState({ oldPassword: '', newPassword: '' });
  const [changeLoading, setChangeLoading] = useState(false);
  const [token, setToken] = useState(null);

  const { toast } = useToast();

  useEffect(() => {
    const storedToken = localStorage.getItem('authToken');
    if (storedToken) setToken(storedToken);
  }, []);

  const handleToggle = () => setIsToggle(!isToggle);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleChangePassword = async (e) => {
    e.preventDefault();
    const { oldPassword, newPassword } = formData;

    if (!oldPassword || !newPassword) {
      toast({
        title: 'Error',
        description: 'Both fields are required',
      });
      return;
    }

    try {
      setChangeLoading(true);
      const response = await axios.post(
        '/api/user/change-password',
        { oldPassword, newPassword },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        }
      );

      toast({
        title: response.data.type,
        description: response.data.message,
      });

      setFormData({ oldPassword: '', newPassword: '' });
      setIsToggle(false);
    } catch (error) {
      console.error('API Error:', error);
      toast({
        title: error.response?.data?.type || 'Error',
        description: error.response?.data?.message || 'Something went wrong. Please try again later.',
      });
    } finally {
      setChangeLoading(false);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <div className="max-w-6xl mx-auto p-6 lg:p-8 rounded-2xl shadow-xl bg-white overflow-hidden">
        <div
          className="flex items-center justify-between p-4 cursor-pointer"
          onClick={handleToggle}
        >
          <div className="flex items-center space-x-2">
            <Lock className="h-5 w-5 text-primary" />
            <h2 className="text-lg font-semibold text-gray-800">Change Password</h2>
          </div>
          <span className="text-sm text-gray-500">
            {isToggle ? 'Hide' : 'Show'}
          </span>
        </div>

        {isToggle && (
          <div className="p-6">
            <form onSubmit={handleChangePassword} className="space-y-4">
              <div className='max-w-sm'>
                <label htmlFor="oldPassword" className="block text-sm font-medium text-gray-700">
                  Old Password
                </label>
                <Input
                  id="oldPassword"
                  name="oldPassword"
                  type="password"
                  placeholder="Enter old password"
                  value={formData.oldPassword}
                  onChange={handleInputChange}
                  className="mt-1 w-full"
                />
              </div>
              <div className='max-w-sm'>
                <label htmlFor="newPassword" className="block text-sm font-medium text-gray-700">
                  New Password
                </label>
                <Input
                  id="newPassword"
                  name="newPassword"
                  type="password"
                  placeholder="Enter new password"
                  value={formData.newPassword}
                  onChange={handleInputChange}
                  className="mt-1 w-full"
                />
              </div>
              <Button
                type="submit"
                className="max-w-sm w-full bg-primary text-white hover:bg-primary-dark"
                disabled={changeLoading}
              >
                {changeLoading ? (
                  <Loader2 className="animate-spin mr-2 h-5 w-5" />
                ) : (
                  'Change Password'
                )}
              </Button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default ChangePassword;
