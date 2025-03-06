'use client';
import { useState, useEffect } from "react";
import axios from "axios";
import { format } from "date-fns";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { PhoneCall, CalendarIcon } from "lucide-react";
import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";
import { useAuth } from "@/context/AuthContext";
import { useToast } from "@/hooks/use-toast";

const RequestAgentCall = ({ listingId }) => {
  const [availability, setAvailability] = useState({
    userAvailableDate: null,
    userAvailableTime: "",
    notes: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [token, setToken] = useState(null);

  const { isLoggedIn } = useAuth();
  const { toast } = useToast();

  useEffect(() => {
    if (typeof window !== "undefined") {
      const authToken = localStorage.getItem('authToken');
      setToken(authToken);
    }
  }, []);

  // Disable submission if user is not logged in
  const isSubmitDisabled = !isLoggedIn;

  const handleChange = (e) => {
    setAvailability({ ...availability, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axios.post(
        "/api/sale-enquiry",
        {
          listingId,
          userAvailableDate: availability.userAvailableDate,
          userAvailableTime: availability.userAvailableTime,
          preferredContactMethod: "Phone",
          notes: availability.notes,
          dealStatus: "Enquiry Received",
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (response.data.type === "success") {
        setSubmitted(true);
      }

      toast({
        title: response.data.type || "Success",
        description:
          response.data.message || "Your enquiry has been submitted!",
      });
    } catch (error) {
      console.error("Error submitting sale enquiry:", error);
      toast({
        title: error?.response?.data?.type || "Error",
        description:
          error?.response?.data?.message ||
          "Something went wrong! Please try again later.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="border rounded-xl shadow-lg p-6">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-lg font-semibold text-gray-800">
          <PhoneCall className="w-6 h-6 text-blue-600" /> Request a Call from an
          Agent
        </CardTitle>
      </CardHeader>
      <p className="text-sm text-blue-700 text-center mb-4">
        Please provide your availability, and our agent will contact you!
      </p>
      <CardContent>
        {!submitted ? (
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-2">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Preferred Date
                </label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={`w-[240px] justify-start text-left font-normal ${
                        !availability.userAvailableDate
                          ? "text-muted-foreground"
                          : ""
                      }`}
                    >
                      <CalendarIcon className="mr-2 h-5 w-5" />
                      {availability.userAvailableDate
                        ? format(availability.userAvailableDate, "PPP")
                        : "Pick a date"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-2 bg-white shadow-lg rounded-md">
                    <DayPicker
                      mode="single"
                      selected={availability.userAvailableDate}
                      onSelect={(date) =>
                        setAvailability({
                          ...availability,
                          userAvailableDate: date,
                        })
                      }
                      disabled={{ before: new Date() }} // Disable past dates
                    />
                  </PopoverContent>
                </Popover>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Preferred Time
                </label>
                <Input
                  type="time"
                  name="userAvailableTime"
                  value={availability.userAvailableTime}
                  onChange={handleChange}
                  className="border p-2 rounded-md w-full"
                  required
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Additional Notes
              </label>
              <Textarea
                name="notes"
                value={availability.notes}
                onChange={handleChange}
                placeholder="Mention any specific details or requests."
                className="border p-2 rounded-md w-full"
              />
            </div>
            <Button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 rounded-md"
              disabled={loading || isSubmitDisabled}
            >
              {loading ? "Submitting..." : "Submit Availability"}
            </Button>
            {isSubmitDisabled && (
              <p className="text-red-500 text-sm text-center mt-2">
                Please log in to submit your availability.
              </p>
            )}
          </form>
        ) : (
          <div className="text-center">
            <h2 className="text-xl font-semibold text-green-600">
              Request Submitted!
            </h2>
            <p className="text-gray-600 mt-2">
              An agent will contact you within your preferred time range.
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default RequestAgentCall;