"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import axios from "axios";


const ForgotPasswordForm = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const {toast}=useToast();

  const handleSubmit = async (e) => {
    e.preventDefault();
    

    setLoading(true);
    try {

        const response=await axios.post('/api/user/forgot-password',{
            email
        },{
            headers:{
                "Content-Type":'application/json'
            }
        })

        toast({
            title:response.data.type,
            description:response.data.message,
        })
      
    } catch (error) {
      console.log(error);
      toast({
        title:error.response.data?.type,
        description:error.response.data?.message
      })
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="w-full max-w-md mx-auto mt-10 p-6 shadow-md">
      <CardHeader>
        <CardTitle className="text-center text-lg">Forgot Password</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? "Sending..." : "Send Reset Link"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default ForgotPasswordForm;
