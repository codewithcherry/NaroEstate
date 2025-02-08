import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Home, Building2, Repeat, CheckCircle } from "lucide-react";

const stats = [
  {
    id: 1,
    value: "5.2M",
    label: "Owned from properties transactions",
    description: "Pellentesque egestas elementum egestas faucibus sem.",
    icon: Home,
  },
  {
    id: 2,
    value: "7K+",
    label: "Properties For Buy",
    description: "Pellentesque egestas elementum egestas faucibus sem.",
    icon: Building2,
  },
  {
    id: 3,
    value: "4K+",
    label: "Properties Buy Sell",
    description: "Pellentesque egestas elementum egestas faucibus sem.",
    icon: Repeat,
  },
  {
    id: 4,
    value: "221+",
    label: "Daily Completed Transactions",
    description: "Pellentesque egestas elementum egestas faucibus sem.",
    icon: CheckCircle,
  },
];

const StatsSection = () => {
  return (
    <section className="py-16 px-4 lg:px-20 bg-[hsl(var(--background))]">
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="text-2xl lg:text-3xl font-bold text-[hsl(var(--foreground))] mb-4">
          Our mission is to redefine real estate in the customer's favor.
        </h2>
        <p className="text-lg text-[hsl(var(--muted-foreground))] mb-12">
          Lorem ipsum dolor sit amet
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat) => (
            <Card key={stat.id} className="bg-[hsl(var(--card))] border-[hsl(var(--border))] shadow-sm rounded-lg">
              <CardContent className="p-6 text-center">
                <div className="flex justify-center items-center mb-4">
                  <stat.icon className="w-8 h-8 text-[hsl(var(--primary))]" />
                </div>
                <h3 className="text-3xl font-bold text-[hsl(var(--primary))]">{stat.value}</h3>
                <p className="text-lg font-medium text-[hsl(var(--foreground))] mt-2">{stat.label}</p>
                <p className="text-[hsl(var(--muted-foreground))] mt-2">{stat.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsSection;
