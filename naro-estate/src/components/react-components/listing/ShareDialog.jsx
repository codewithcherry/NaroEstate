'use client';

import React, { useState } from 'react';
import { Clipboard, Mail, Share2 ,PhoneCall } from 'lucide-react';
import { Button } from '@/components/ui/button'; // Adjust the import according to your shadcn setup
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { FaTwitter,FaInstagram } from 'react-icons/fa';
import { Input } from '@/components/ui/input';

const ShareDialog = () => {
  const [link, setLink] = useState(window.location.href);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(link);
    alert('Link copied to clipboard!');
  };

  const shareViaWhatsApp = () => {
    window.open(`https://wa.me/?text=${encodeURIComponent(link)}`, '_blank');
  };

  const shareViaEmail = () => {
    window.open(`mailto:?body=${encodeURIComponent(link)}`, '_blank');
  };

  const shareViaTwitter = () => {
    window.open(`https://twitter.com/intent/tweet?url=${encodeURIComponent(link)}`, '_blank');
  };

  const shareViaInstagram = () => {
    // Instagram does not support direct sharing of links, so we just open the main page
    window.open('https://instagram.com', '_blank');
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="ghost" className="p-2">
          <Share2 className="h-6 w-6" />Share
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Share Link</DialogTitle>
          <DialogDescription>
            Share this link via your preferred platform.
          </DialogDescription>
        </DialogHeader>
        <div className="flex items-center space-x-2">
          <div className="grid flex-1 gap-2">
            <Input
              value={link}
              readOnly
              className="w-full"
            />
          </div>
          <Button type="submit" size="sm" className="px-3" onClick={copyToClipboard}>
            <span className="sr-only">Copy</span>
            <Clipboard className="h-4 w-4" />
          </Button>
        </div>
        <div className='text-primary' >
            <h2>share via</h2>
        </div>
        <div className="flex justify-evenly  gap-4 mt-4">
          <div onClick={()=>shareViaWhatsApp} className="flex flex-col items-center bg-background text-primary rounded-md shadow-md p-2 hover:bg-muted hover:cursor-pointer">
            <PhoneCall className="h-6 w-6"/>
            <span className='text-sm'>WhatsApp</span>
          </div>
          <div onClick={()=>shareViaEmail} className="flex flex-col items-center bg-background text-primary rounded-md shadow-md p-2 hover:bg-muted hover:cursor-pointer">
            <Mail className="h-6 w-6" />
            <span className='text-sm'>Email</span>
          </div>
          <div onClick={()=>shareViaTwitter} className="flex flex-col items-center bg-background text-primary rounded-md shadow-md p-2 hover:bg-muted hover:cursor-pointer">
            <FaTwitter className="h-6 w-6" />
            <span className='text-sm'>X</span>
          </div>
          <div onClick={()=>shareViaInstagram} className="flex flex-col items-center bg-background text-primary rounded-md shadow-md p-2 hover:bg-muted hover:cursor-pointer">
            <FaInstagram className="h-6 w-6 " />
            <span className='text-sm'>Instagram</span>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ShareDialog;