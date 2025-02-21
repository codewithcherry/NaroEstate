import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BadgeCheck, MessageCircle, ShieldCheck, Globe, Briefcase } from "lucide-react";

const HostProfileCard = ({ host = {} }) => {
  return (
    <div className="container mx-auto p-6">
      <h2 className="text-2xl font-semibold mb-6">Meet your host</h2>
      <div className="grid md:grid-cols-2 gap-6">
        
        {/* Host Profile Card */}
        <Card className="p-6 gap-10 items-center text-center shadow-lg rounded-xl border bg-white">
          <div className="flex flex-col md:flex-row justify-around items-center">
            <div>
              <img
                src={host?.imageUrl ?? "/default-avatar.png"} 
                alt="Host"
                className="w-32 h-32 rounded-full object-cover border-4 border-gray-200"
              />
              <div className="flex items-center gap-2">
                <h3 className="text-xl font-semibold mt-3">
                  {host?.firstname ?? "Unknown"} {host?.lastname ?? ""}
                </h3>
                <div className="flex items-center mt-3">
                  <ShieldCheck className={`w-6 h-6 ${host?.isVerified ? "text-pink-500" : "text-gray-600"}`} />
                  {host?.isVerified ? "Verified" : "Not Verified"}
                </div>
              </div>
              {host?.isSuperhost && (
                <p className="text-gray-500 flex items-center gap-1 text-sm">
                  <BadgeCheck className="w-4 h-4 text-gray-700" /> Superhost
                </p>
              )}
            </div>

            {/* Host Statistics */}
            <div className="flex flex-col mt-4 text-gray-700 gap-y-2 text-sm">
              <div className="text-center border-b py-2">
                <p className="font-semibold text-lg">{host?.properties ?? 0}</p>
                <p className="text-gray-500">Properties</p>
              </div>
              <div className="text-center border-b py-2">
                <p className="font-semibold text-lg">{host?.bookings ?? 0}</p>
                <p className="text-gray-500">Bookings</p>
              </div>
              <div className="text-center">
                <p className="font-semibold text-lg">{host?.guests ?? 0}</p>
                <p className="text-gray-500">Guests</p>
              </div>
            </div>
          </div>

          {/* Additional Info */}
          <div className="mt-6 border-t pt-4 text-gray-700 text-sm space-y-2">
            <p className="flex items-center gap-2">
              <Briefcase className="w-4 h-4" /> My work: {host?.work ?? "Self-employed"}
            </p>
            <p className="flex items-center gap-2">
              <Globe className="w-4 h-4" /> Speaks: {host?.languages ?? "English"}
            </p>
            <p className="flex items-center gap-2">
              <MessageCircle className="w-4 h-4" /> Lives in {host?.city ?? "Unknown"}, {host?.country ?? ""}
            </p>
            <p className="mt-4 text-gray-600 text-sm">{host?.bio ?? "No bio available."}</p>
            <button className="text-black font-semibold text-sm mt-2">Show more &gt;</button>
          </div>
        </Card>

        {/* Host Details */}
        <div className="flex flex-col max-w-md justify-between">
          <div>
            <h3 className="text-lg font-semibold">{host?.firstname ?? "The host"} is a Superhost</h3>
            <p className="text-gray-600 mt-2 text-sm">
              Superhosts are experienced, highly rated hosts who are committed to providing great stays for guests.
            </p>
            <div className="mt-4">
              <h4 className="font-semibold text-sm">Host details</h4>
              <p className="text-gray-600 text-sm">Response rate: {host?.responseRate ?? "N/A"}%</p>
              <p className="text-gray-600 text-sm">Responds within {host?.responseTime ?? "a few hours"}</p>
            </div>
          </div>
          <Button className="mt-4 w-full md:w-auto text-base px-6 py-2">Message Host</Button>
          <p className="text-xs text-gray-500 mt-2">
            You can message the host in {host?.languages ?? "English"}, and Airbnb provides a translation function.
          </p>

          {/* Security Warning */}
          <div className="mt-6 p-4 bg-gray-100 rounded-md text-xs text-gray-700 flex items-start gap-2 border">
            <ShieldCheck className="w-4 h-4 text-pink-500" />
            <p>To help protect your payment, always use Airbnb to send money and communicate with hosts.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HostProfileCard;
