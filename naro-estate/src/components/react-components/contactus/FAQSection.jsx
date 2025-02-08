import React from "react";
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion";

const faqs = [
  {
    question: "What is your refund policy?",
    answer:
      "We offer a full refund within 30 days of purchase if you're not satisfied with our service. No questions asked!",
  },
  {
    question: "How do I change my account details?",
    answer:
      "To change your account details, go to the account settings page and update your information.",
  },
  {
    question: "Can I upgrade my plan later?",
    answer:
      "Yes, you can upgrade your plan at any time from your account dashboard.",
  },
  {
    question: "Is customer support available 24/7?",
    answer:
      "Our support team is available 24/7 to help you with any questions or issues.",
  },
];

const FAQSection = () => {
  return (
    <section className="py-16 px-4 lg:px-20 bg-[hsl(var(--background))]">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold text-center text-[hsl(var(--foreground))] mb-2">
          Frequently Asked Questions
        </h2>
        <p className="text-center text-lg text-[hsl(var(--muted-foreground))] mb-8">
          Find answers to common questions below. Still need help? Contact our support team.
        </p>

        <Accordion type="single" collapsible className="space-y-4">
          {faqs.map((faq, index) => (
            <AccordionItem key={index} value={`item-${index}`}>
              <AccordionTrigger className="text-[hsl(var(--foreground))] font-medium">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="text-[hsl(var(--muted-foreground))]">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
};

export default FAQSection;
