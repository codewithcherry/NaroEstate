import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Star, Quote } from "lucide-react";

const testimonials = [
  {
    name: "Cameron Williamson",
    role: "Designer",
    imageUrl:
      "https://t4.ftcdn.net/jpg/06/02/80/95/360_F_602809556_HsRkD6daMX14r9JV1bL2hfZBrKm72ZlG.jpg",
    feedback:
      "Searches for multiplexes, property comparisons, and the loan estimator. Works great. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dores.",
  },
  {
    name: "Esther Howard",
    role: "Marketing",
    imageUrl:
      "https://img.freepik.com/free-photo/headshot-stylish-hipster-guy-with-bushy-hairstyle-stubble-shining-eyes-poses_273609-8521.jpg?semt=ais_hybrid",
    feedback:
      "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae.",
  },
  {
    name: "Devon Lane",
    role: "Developer",
    imageUrl: "https://d2qp0siotla746.cloudfront.net/img/headshots/sujan.jpg",
    feedback:
      "Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est.",
  },
];

const TestimonialSection = () => {
  return (
    <section className="container mx-auto py-12 px-6 lg:px-20">
      <div className="text-center mb-12">
        <div className="flex flex-col lg:flex-row lg:justify-between items-center mb-6">
          <h2 className="text-3xl font-bold mb-4 lg:mb-0">What our customers are saying about us?</h2>
          <div className="flex space-x-12">
            <div className="text-center">
              <span className="text-black text-2xl font-bold block">10M+</span>
              <span className="text-gray-600 text-sm">Happy People</span>
            </div>
            <div className="text-center">
              <span className="text-black text-2xl font-bold block">4.88</span>
              <div className="flex items-center justify-center gap-1">
                <Star className="w-5 h-5 text-yellow-500" />
                <span className="text-gray-600 text-sm">Overall rating</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="grid gap-6 lg:grid-cols-3">
        {testimonials.map((testimonial, index) => (
          <Card
            key={index}
            className="shadow-lg transition-transform transform hover:scale-105 hover:shadow-2xl"
          >
            <CardContent className="p-6 relative">
              <Quote className="w-8 h-8 text-gray-300 absolute top-4 right-4" />
              <div className="flex items-center mb-4">
                <img
                  src={testimonial.imageUrl}
                  alt={testimonial.name}
                  className="w-16 h-16 rounded-full mr-4"
                />
                <div>
                  <h3 className="text-lg font-semibold">{testimonial.name}</h3>
                  <p className="text-gray-500">{testimonial.role}</p>
                </div>
              </div>
              <p className="text-gray-700">{testimonial.feedback}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
};

export default TestimonialSection;
