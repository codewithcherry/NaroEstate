import React from "react";
import { Home, Users, Key } from "lucide-react";
import Image from "next/image";

const steps = [
  {
    id: 1,
    title: "Find Real Estate",
    description: "Sumo petentium ut per, at his wisi utinam adipiscing. Est ei graeco lorem ipsum dolor sit amet, consectetur adipiscing.",
    icon: Home,
  },
  {
    id: 2,
    title: "Meet Realtor",
    description: "Sumo petentium ut per, at his wisi utinam adipiscing. Est ei graeco lorem ipsum dolor sit amet, consectetur adipiscing.",
    icon: Users,
  },
  {
    id: 3,
    title: "Take The Keys",
    description: "Sumo petentium ut per, at his wisi utinam adipiscing. Est ei graeco lorem ipsum dolor sit amet, consectetur adipiscing.",
    icon: Key,
  },
];

const HowItWorks = () => {
  return (
    <section className="py-12 px-4 lg:px-20 bg-[hsl(var(--background))]">
      <div className="max-w-6xl mx-auto flex flex-col lg:flex-row lg:items-center lg:space-x-12">
        {/* Text Section */}
        <div className="order-2 lg:order-1 w-full lg:w-1/2">
          <h2 className="text-2xl lg:text-3xl font-bold text-[hsl(var(--foreground))] mb-4">
            How It Works? Find a perfect home
          </h2>
          <p className="text-base lg:text-lg text-[hsl(var(--muted-foreground))] mb-8">
            Lorem ipsum dolor sit amet
          </p>
          <div className="space-y-8">
            {steps.map((step) => (
              <div key={step.id} className="flex items-start space-x-4">
                <div className="p-3 bg-[hsl(var(--card))] rounded-lg border border-[hsl(var(--border))]">
                  <step.icon className="w-6 h-6 text-[hsl(var(--primary))]" />
                </div>
                <div>
                  <h3 className="text-base lg:text-lg font-semibold text-[hsl(var(--foreground))]">
                    {step.title}
                  </h3>
                  <p className="text-sm lg:text-base text-[hsl(var(--muted-foreground))]">
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Image Section */}
        <div className="order-1 lg:order-2 w-full h-64 lg:h-[400px] relative rounded-lg overflow-hidden shadow-lg">
          <Image
            src="/images/howitworks.jpg"
            alt="Modern real estate building"
            layout="fill"
            objectFit="cover"
            className="rounded-lg"
          />
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
