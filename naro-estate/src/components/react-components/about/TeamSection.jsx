import React from "react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import Image from "next/image";

const teamMembers = [
  {
    id: 1,
    name: "John Powell",
    role: "Service Support",
    image: "/images/team1.avif", // Replace with actual image path
  },
  {
    id: 2,
    name: "Thomas Powell",
    role: "Marketing",
    image: "/images/team2.jpg", // Replace with actual image path
  },
  {
    id: 3,
    name: "Tom Wilson",
    role: "Designer",
    image: "/images/team3.jpg", // Replace with actual image path
  },
  {
    id: 4,
    name: "Samuel Palmer",
    role: "Marketing",
    image: "/images/team4.avif", // Replace with actual image path
  },
];

const TeamSection = () => {
  return (
    <section className="container mx-auto py-16 px-4 lg:px-20">
      <div className=" mx-auto text-center mb-12">
        <h2 className="text-2xl lg:text-3xl font-bold text-[hsl(var(--foreground))] mb-2">
          Meet Our Team Of Experts
        </h2>
        <p className="text-lg text-[hsl(var(--muted-foreground))]">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {teamMembers.map((member) => (
          <Card key={member.id} className="rounded-lg overflow-hidden">
            <div className="relative w-full h-48">
              <Image
                src={member.image}
                alt={member.name}
                layout="fill"
                objectFit="cover"
              />
            </div>
            <CardContent className="p-4">
              <h3 className="text-lg font-semibold text-[hsl(var(--foreground))]">
                {member.name}
              </h3>
              <p className="text-[hsl(var(--muted-foreground))]">{member.role}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
};

export default TeamSection;
