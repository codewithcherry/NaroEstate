import React from "react";
import { ArrowRight, Home, Building } from "lucide-react";

const offers = [
  {
    id: 1,
    title: "Looking for the new home?",
    description: "10 new offers every day. 350 offers on site, trusted by a community of thousands of users.",
    buttonText: "Get Started",
    bgColor: "bg-green-100", // Light green background
    iconColor: "text-green-600",
    icon: Home,
  },
  {
    id: 2,
    title: "Want to sell your home?",
    description: "10 new offers every day. 350 offers on site, trusted by a community of thousands of users.",
    buttonText: "Get Started",
    bgColor: "bg-pink-100", // Light pink background
    iconColor: "text-pink-600",
    icon: Building,
  },
];

const OfferCards = () => {
  return (
    <section className="py-16 px-4 lg:px-20">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
        {offers.map((offer) => (
          <div
            key={offer.id}
            className={`p-6 rounded-lg shadow-md ${offer.bgColor} flex items-center justify-between`}
          >
            <div>
              <h3 className="text-xl font-semibold text-[hsl(var(--foreground))] mb-2">
                {offer.title}
              </h3>
              <p className="text-[hsl(var(--muted-foreground))] mb-4">
                {offer.description}
              </p>
              <a
                href="#"
                className="inline-flex items-center font-medium text-[hsl(var(--primary))] group"
              >
                {offer.buttonText}{" "}
                <ArrowRight className="ml-1 w-4 h-4 transition-transform group-hover:translate-x-1" />
              </a>
            </div>
            <div className={`w-16 h-16 flex-shrink-0 ${offer.iconColor}`}>
              <offer.icon className="w-full h-full" />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default OfferCards;
