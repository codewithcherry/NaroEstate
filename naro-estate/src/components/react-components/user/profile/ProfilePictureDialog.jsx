'use client';

import React, { useState, useRef } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Upload, Trash, Loader2 } from "lucide-react";
import axios from "axios";
import { useToast } from "@/hooks/use-toast";

const ProfilePictureDialog = ({ open, setOpen, onImageUpload }) => {
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [previewUrl, setPreviewUrl] = useState("");
  const fileInputRef = useRef(null);
  const { toast } = useToast();

  const token=localStorage.getItem('authToken');

  const handleFileChange = (e) => {
    const selectedFile = e.target.files?.[0];
    if (!selectedFile) return; // Handle when no file is selected
    if (!selectedFile.type.startsWith("image/")) {
      toast({
        title: "Invalid File Type",
        description: "Please select a valid image file.",
        variant: "destructive",
      });
      return;
    }
    if (selectedFile.size > 5 * 1024 * 1024) {
      // 5MB limit
      toast({
        title: "File Too Large",
        description: "Please select a file smaller than 5MB.",
        variant: "destructive",
      });
      return;
    }
    setFile(selectedFile);
    setPreviewUrl(URL.createObjectURL(selectedFile));
  };

  const handleUpload = async () => {
    if (!file) {
      toast({
        title: "No File Selected",
        description: "Please select a file before uploading.",
        variant: "destructive",
      });
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    setUploading(true);
    try {
      const response = await axios.post("/api/upload/profile-image", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          'Authorization':`Bearer ${token}`
        },
      });
      const data = response.data;
      console.log(data)
        setPreviewUrl(data.imageUrl);
        onImageUpload(data.imageUrl);
        setOpen(false);
        setFile(null);
        toast({
          title: "Success",
          description: "Profile image updated successfully!",
        });
    } catch (error) {
        console.log(error)
      toast({
        title: "Error",
        description: `Error uploading file: ${error.response?.status || "Network Error"}`,
        variant: "destructive",
      });
    } finally {
      setUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = ""; // Reset the input
    }
  };

  const handleRemoveImage = () => {
    setFile(null);
    setPreviewUrl("");
    onImageUpload(null);
    toast({
      title: "Profile Image Removed",
      description: "Your profile image has been removed.",
      variant: "info",
    });
  };

  const RemoveProfileImage = async () => {
    setUploading(true);
    try {
      // Simulate a request to remove the profile image
      await new Promise((resolve) => setTimeout(resolve, 1000)); // Mock delay
      handleRemoveImage();
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to remove profile image. Please try again.",
        variant: "destructive",
      });
    } finally {
      setUploading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="max-w-md rounded-lg p-6 shadow-lg">
        <DialogHeader>
          <DialogTitle className="text-lg font-semibold">Change Profile Picture</DialogTitle>
          <DialogDescription className="text-sm text-gray-500">
            Choose how you want to update your profile picture.
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4 mt-4">
          {previewUrl ? (
            <div className="relative w-40 h-40 mx-auto rounded-full border border-gray-300 bg-gray-100 shadow-sm">
              <img
                src={previewUrl}
                alt="Preview"
                className="object-cover w-full h-full rounded-full"
              />
              <Button
                variant="destructive"
                className="absolute top-2 right-2 w-6 h-6 text-white rounded-full bg-red-600 hover:bg-red-700"
                onClick={handleRemoveImage}
              >
                <Trash className="h-4 w-4" />
              </Button>
            </div>
          ) : (
            <p className="text-gray-500 text-center">No image selected.</p>
          )}
          <input
            type="file"
            accept="image/*"
            ref={fileInputRef}
            className="hidden"
            onChange={handleFileChange}
          />
          <Button
            variant="outline"
            className="w-full flex items-center justify-start gap-2 hover:bg-gray-100 transition"
            onClick={() => fileInputRef.current.click()}
            disabled={uploading}
          >
            <Upload className="h-5 w-5 text-green-600" />
            <span className="text-gray-800">Select Image</span>
          </Button>
          {file && (
            <Button
              variant="primary"
              className="mx-auto flex items-center justify-center gap-2 bg-blue-400 text-white hover:bg-blue-500"
              onClick={handleUpload}
              disabled={uploading}
            >
              {uploading ? (
                <>
                  <Loader2 className="h-5 w-5 animate-spin" />
                  Uploading...
                </>
              ) : (
                "Upload Image"
              )}
            </Button>
          )}
          <Button
            variant="destructive"
            className="w-full flex items-center justify-start gap-2 hover:bg-red-100 transition"
            onClick={RemoveProfileImage}
            disabled={uploading}
          >
            <Trash className="h-5 w-5 text-red-600" />
            <span className="text-gray-800">Remove Profile Image</span>
          </Button>
        </div>

        <DialogFooter className="mt-6">
          <Button variant="secondary" className="w-full" onClick={() => setOpen(false)}>
            Cancel
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ProfilePictureDialog;
