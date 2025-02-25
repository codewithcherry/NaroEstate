import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Mail, Phone, User } from "lucide-react";

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

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSuccess(null);
    
    try {
      const response = await fetch("/api/rent-enquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...formData, propertyId }),
      });

      if (response.ok) {
        setSuccess("Your enquiry has been sent successfully.");
        setFormData({ name: "", email: "", phone: "", moveInDate: "", message: "" });
      } else {
        throw new Error("Failed to send enquiry");
      }
    } catch (error) {
      setSuccess("Error: Unable to send your enquiry. Try again later.");
    }
    
    setLoading(false);
  };

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
            className="pl-10 bg-slate-50 shadow-md"
          />
        </div>
        <Input
          type="date"
          name="moveInDate"
          value={formData.moveInDate}
          onChange={handleChange}
          className="w-full bg-slate-50 shadow-md"
        />
        </div>
        <p className="text-xs text-red-500 px-1">Enter any queries within the message section.</p>
        <Textarea
          name="message"
          placeholder="Additional Message (Optional)"
          value={formData.message}
          onChange={handleChange}
          className="w-full bg-slate-50 shadow-md"
        />
        <Button type="submit" disabled={loading} className="w-full">
          {loading ? "Submitting..." : "Submit Enquiry"}
        </Button>
        {success && <p className="text-center text-sm mt-2 text-gray-700">{success}</p>}
        <p className="max-w-md text-center text-xs text-red-400">Fill your details here and submit, you will be sent a rental form and owner of the property will contact and dicuss the rental contract and for any additional information.</p>
      </form>
    </div>
  );
};

export default RentEnquiry;
