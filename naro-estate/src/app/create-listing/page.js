"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { useToast } from "@/hooks/use-toast";
import { Loader2 ,PlusSquare} from "lucide-react";
import CreateListingForm from "@/components/react-components/listing/CreateListingForm";

const CreateListingPage = () => {
  const [profileLoading, setProfileLoading] = useState(true);
  const router = useRouter();
  const { toast } = useToast();
  const { isLoggedIn, loading } = useAuth();

  useEffect(() => {
    if (loading) return;

    if (!isLoggedIn) {
      toast({
        title: "Error",
        description: "Please login to your account to view the profile.",
      });
      router.push("/login");
    } else {
      // Ensure this runs only on client side
      if (typeof window !== "undefined") {
        const token = localStorage.getItem("authToken");
        setProfileLoading(false);
      }
    }
  }, [isLoggedIn, loading, router, toast]);

  if (loading || profileLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="h-12 w-12 animate-spin text-gray-500" />
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl text-center font-bold text-primary mb-6 flex items-center justify-center gap-2">
        <PlusSquare className="w-6 h-6 text-primary" />
        Create a New Listing
      </h1>
      <div className="">
        <CreateListingForm />
      </div>
    </div>
  );
};

export default CreateListingPage;
