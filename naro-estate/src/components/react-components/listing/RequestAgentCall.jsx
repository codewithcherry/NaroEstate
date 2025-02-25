import { useState } from "react";
import { format } from "date-fns";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { PhoneCall, CalendarIcon } from "lucide-react";
import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";

const RequestAgentCall = () => {
  const [availability, setAvailability] = useState({
    date: null,
    time: "",
    notes: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setAvailability({ ...availability, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    // Simulate API call to submit user availability
  };

  return (
    
      <Card className="border rounded-xl shadow-lg p-6">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg font-semibold text-gray-800 whitespace-nowrap">
            <PhoneCall className="w-6 h-6 text-blue-600 " /> Request a Call from an Agent
          </CardTitle>
        </CardHeader>
        <p className="text-sm text-blue-700 text-center mb-4">Please give your availability, our agent will reachout to you!</p>
        <CardContent>
          {!submitted ? (
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="space-y-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Preferred Date
                </label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={`w-[240px] justify-start text-left font-normal ${
                        !availability.date ? "text-muted-foreground" : ""
                      }`}
                    >
                      <CalendarIcon className="mr-2 h-5 w-5" />
                      {availability.date ? format(availability.date, "PPP") : "Pick a date"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-2 bg-white shadow-lg rounded-md">
                    <DayPicker
                      mode="single"
                      selected={availability.date}
                      onSelect={(date) => setAvailability({ ...availability, date })}
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
                  name="time"
                  value={availability.time}
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
              >
                Submit Availability
              </Button>
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
