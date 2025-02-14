import React from "react";
import { Dialog, DialogContent, DialogHeader, DialogFooter, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Camera, Upload, Trash } from "lucide-react";

const ProfilePictureDialog = ({ open, setOpen }) => {
  const handleCameraCapture = () => alert("Camera capture not implemented yet!");
  const handleFileUpload = () => alert("Upload from files");
  const handleRemoveImage = () => alert("Image removed!");

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
          <Button
            variant="outline"
            className="w-full flex items-center justify-start gap-2 hover:bg-gray-100 transition"
            onClick={handleCameraCapture}
          >
            <Camera className="h-5 w-5 text-blue-600" />
            <span className="text-gray-800">Capture from Camera</span>
          </Button>
          <Button
            variant="outline"
            className="w-full flex items-center justify-start gap-2 hover:bg-gray-100 transition"
            onClick={handleFileUpload}
          >
            <Upload className="h-5 w-5 text-green-600" />
            <span className="text-gray-800">Upload from Files</span>
          </Button>
          <Button
            variant="destructive"
            className="w-full flex items-center justify-start gap-2 hover:bg-red-100 transition"
            onClick={handleRemoveImage}
          >
            <Trash className="h-5 w-5 text-black hover:text-red-500" />
            <span className="text-gray-800">Remove Image</span>
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
