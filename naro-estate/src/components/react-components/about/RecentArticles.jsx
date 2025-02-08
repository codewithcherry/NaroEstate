import React from "react";
import { Card, CardHeader, CardContent, CardFooter } from "@/components/ui/card";
import { ArrowRight } from "lucide-react";
import Image from "next/image";

const articles = [
  {
    id: 1,
    title: "Housing Markets That Changed the Most This Week",
    category: "Apartment",
    date: "March 19, 2024",
    image: "/images/article1.jpg",
  },
  {
    id: 2,
    title: "Read Unveils the Best Canadian Cities for Biking",
    category: "Apartment",
    date: "March 19, 2024",
    image: "/images/article2.jpg",
  },
  {
    id: 3,
    title: "10 Walkable Cities Where You Can Live Affordably",
    category: "Office",
    date: "March 19, 2024",
    image: "/images/article3.avif",
  },
  {
    id: 4,
    title: "New Apartment Nice in the Best Canadian Cities",
    category: "Shop",
    date: "March 19, 2024",
    image: "/images/article4.jpg",
  },
];

const RecentArticles = () => {
  return (
    <section className="py-16 px-4 lg:px-20 bg-[hsl(var(--background))]">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-2xl lg:text-3xl font-bold text-[hsl(var(--foreground))] mb-4">
          Recent Articles & News
        </h2>
        <p className="text-lg text-[hsl(var(--muted-foreground))] mb-8">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {articles.map((article) => (
            <Card key={article.id} className="overflow-hidden">
              <CardHeader className="p-0">
                <div className="relative h-48">
                  <Image
                    src={article.image}
                    alt={article.title}
                    layout="fill"
                    objectFit="cover"
                  />
                </div>
              </CardHeader>
              <CardContent className="p-4">
                <p className="text-sm text-[hsl(var(--muted-foreground))] mb-1">
                  {article.category} • {article.date}
                </p>
                <h3 className="text-lg font-semibold text-[hsl(var(--foreground))] mb-2">
                  {article.title}
                </h3>
              </CardContent>
              <CardFooter className="p-4 pt-0">
                <a
                  href="#"
                  className="text-sm font-medium text-[hsl(var(--primary))] flex items-center group"
                >
                  Read More{" "}
                  <ArrowRight className="ml-1 w-4 h-4 transition-transform group-hover:translate-x-1" />
                </a>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default RecentArticles;
