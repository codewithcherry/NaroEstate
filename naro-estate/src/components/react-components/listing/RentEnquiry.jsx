import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Mail, Phone, User } from "lucide-react";
import axios from "axios";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/context/AuthContext";

const RentEnquiry = ({ propertyId }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    moveInDate: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(null);

  const [isSubmitDisable,setIsSubmitDisable]= useState(false);
  const token = localStorage.getItem("authToken");
  const { toast } = useToast();

  const {isLoggedIn}=useAuth();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSuccess(null);

    try {
      const enquiry = {
        listingId: propertyId,
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        moveInDate: formData.moveInDate,
        message: formData.message,
      };

      const response = await axios.post("/api/rent-enquiry", enquiry, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "Application/json",
        },
      });

      const data = response.data;
      toast({
        title: data.type,
        description: data.message,
      });

      setSuccess(
        "Your enquiry is registered. The owner and agent will contact you to move your application forward!"
      );

      // Clear form fields after successful submission
      setFormData({
        name: "",
        email: "",
        phone: "",
        moveInDate: "",
        message: "",
      });
    } catch (error) {
      console.log(error);
      toast({
        title: error?.response?.data?.type || "Error",
        description: error?.response?.data?.message || "Something went wrong! Please try again later.",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(()=>{
    if(!isLoggedIn){
      setIsSubmitDisable(true)
    }
  },[isLoggedIn])

  return (
    <div className="max-w-lg mx-auto bg-background border p-6 rounded-xl shadow-lg">
      <h2 className="text-xl font-semibold mb-4 text-center">Rental Enquiry</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-2 gap-2">
          <div className="relative">
            <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <Input
              type="text"
              name="name"
              placeholder="Your Name"
              value={formData.name}
              onChange={handleChange}
              required
              disabled={success}
              className="pl-10 bg-slate-50 shadow-md"
            />
          </div>
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <Input
              type="email"
              name="email"
              placeholder="Your Email"
              value={formData.email}
              onChange={handleChange}
              required
              disabled={success}
              className="pl-10 bg-slate-50 shadow-md"
            />
          </div>
          <div className="relative">
            <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <Input
              type="tel"
              name="phone"
              placeholder="Your Phone Number"
              value={formData.phone}
              onChange={handleChange}
              required
              disabled={success}
              className="pl-10 bg-slate-50 shadow-md"
            />
          </div>
          <Input
            type="date"
            name="moveInDate"
            value={formData.moveInDate}
            onChange={handleChange}
            required
            disabled={success}
            className="w-full bg-slate-50 shadow-md"
          />
        </div>
        <p className="text-xs text-red-500 px-1">Enter any queries within the message section.</p>
        <Textarea
          name="message"
          placeholder="Additional Message (Optional)"
          value={formData.message}
          onChange={handleChange}
          disabled={success}
          className="w-full bg-slate-50 shadow-md"
        />

        {/* Hide Submit Button After Success */}
        {!success && (
          <Button type="submit" disabled={loading || isSubmitDisable}  className="w-full">
            {loading ? "Submitting..." : "Submit Enquiry"}
          </Button>
        )}

        {success && <p className="text-center text-sm mt-2 text-green-600">{success}</p>}

        <p className="max-w-md text-center text-xs text-red-400">
          Fill in your details and submit. You will receive a rental form, and the owner will contact you to discuss the rental contract and additional details.
        </p>
      </form>
    </div>
  );
};

export default RentEnquiry;
