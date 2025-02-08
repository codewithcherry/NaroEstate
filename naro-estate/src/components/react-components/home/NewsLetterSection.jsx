import React from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Send } from "lucide-react";

const NewsletterSection = () => {
  return (
    <section className="py-16 px-4 lg:px-20 bg-[hsl(var(--background))]">
      <div className="max-w-3xl mx-auto text-center">
        <div className="flex justify-center mb-6">
          <div className="w-12 h-12 bg-[hsl(var(--secondary))] rounded-full flex items-center justify-center">
            <Send className="w-6 h-6 text-[hsl(var(--primary))]" />
          </div>
        </div>
        <h2 className="text-2xl font-bold text-[hsl(var(--foreground))] mb-2">
          Stay Up to Date
        </h2>
        <p className="text-[hsl(var(--muted-foreground))] mb-8">
          Subscribe to our newsletter to receive our weekly feed.
        </p>
        <div className="flex items-center justify-center">
          <div className="w-full max-w-lg">
            <form className="flex overflow-hidden rounded-full border border-[hsl(var(--border))] focus-within:ring-2 focus-within:ring-[hsl(var(--ring))]">
              <Input
                type="email"
                placeholder="Your e-mail"
                className="flex-1 bg-[hsl(var(--input))] text-[hsl(var(--foreground))] border-none focus:ring-0 rounded-none"
              />
              <Button className="bg-[hsl(var(--primary))] text-[hsl(var(--primary-foreground))] hover:bg-[hsl(var(--accent))] rounded-none px-6">
                Send <Send className="w-4 h-4 ml-2" />
              </Button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default NewsletterSection;
