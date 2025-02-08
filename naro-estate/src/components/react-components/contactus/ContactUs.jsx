import React from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Mail, Phone, MapPin } from "lucide-react";
import Image from "next/image";

const ContactUs = () => {
  return (
    <section className="py-16 px-4 lg:px-20 bg-[hsl(var(--background))]">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold text-center text-primary mb-2">
          Contact Us
        </h2>
        <p className="text-center text-lg text-[hsl(var(--muted-foreground))] mb-12">
          Any question or remarks? Just write us a message!
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Improved Contact Information Block */}
          <div className="p-8 rounded-lg shadow-lg bg-primary text-[hsl(var(--primary-foreground))] relative">
            <h3 className="text-2xl font-semibold mb-4">Contact Information</h3>
            <p className="mb-6">Say something to start a live chat!</p>
            <div className="space-y-6">
              <div className="flex items-center space-x-4">
                <div className="p-3 bg-[hsl(var(--primary-dark))] rounded-full">
                  <Phone className="w-5 h-5 text-white" />
                </div>
                <span className="text-lg font-medium">+1 012 3456 789</span>
              </div>
              <div className="flex items-center space-x-4">
                <div className="p-3 bg-[hsl(var(--primary-dark))] rounded-full">
                  <Mail className="w-5 h-5 text-white" />
                </div>
                <span className="text-lg font-medium">demo@gmail.com</span>
              </div>
              <div className="flex items-start space-x-4">
                <div className="p-3 bg-[hsl(var(--primary-dark))] rounded-full">
                  <MapPin className="w-5 h-5 text-white" />
                </div>
                <span className="text-lg font-medium">
                  132 Dartmouth Street Boston, <br /> Massachusetts 02156 United States
                </span>
              </div>
            </div>
            <div className="absolute bottom-4 right-4">
              <Image src="/images/support-person.svg" height={150} width={150} alt="Contact Illustration" className="w-24 opacity-50" />
            </div>
          </div>

          {/* Contact Form */}
          <form className="p-8 bg-white rounded-lg shadow-md">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">First Name</label>
                <Input placeholder="First Name" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Last Name</label>
                <Input placeholder="Last Name" />
              </div>
            </div>

            <div className="mt-4">
              <label className="block text-sm font-medium mb-1">Email</label>
              <Input placeholder="Email" />
            </div>

            <div className="mt-4">
              <label className="block text-sm font-medium mb-1">Phone Number</label>
              <Input placeholder="+1 012 3456 789" />
            </div>

            <div className="mt-4">
              <label className="block text-sm font-medium mb-1">Select Subject</label>
              <div className="flex space-x-4">
                <label className="flex items-center space-x-2">
                  <input type="radio" name="subject" />
                  <span>General Inquiry</span>
                </label>
                <label className="flex items-center space-x-2">
                  <input type="radio" name="subject" />
                  <span>Support</span>
                </label>
                <label className="flex items-center space-x-2">
                  <input type="radio" name="subject" />
                  <span>Feedback</span>
                </label>
              </div>
            </div>

            <div className="mt-4">
              <label className="block text-sm font-medium mb-1">Message</label>
              <Textarea placeholder="Write your message..." />
            </div>

            <div className="mt-6">
              <Button className="w-full bg-[hsl(var(--accent))] text-white hover:bg-[hsl(var(--accent-hover))]">
                Send Message
              </Button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default ContactUs;
