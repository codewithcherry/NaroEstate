import { Home, FileText, ShieldCheck } from "lucide-react"; // Lucide icons

const WhyWorkWithUs = () => {
  const features = [
    {
      icon: <FileText className="h-10 w-10 text-primary" />, // Using --primary for icons
      title: "Wide Range of Properties",
      description: "We offer expert legal help for all related property items in Dubai.",
    },
    {
      icon: <Home className="h-10 w-10 text-primary" />,
      title: "Buy or Rent Homes",
      description: "We sell your home at the best market price and very quickly as well.",
    },
    {
      icon: <ShieldCheck className="h-10 w-10 text-primary" />,
      title: "Trusted by Thousands",
      description: "We offer you free consultancy to get a loan for your new home.",
    },
  ];

  return (
    <section className="py-12 bg-background text-foreground">
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="text-3xl font-bold mb-2">Why You Should Work With Us</h2>
        <p className="text-muted-foreground mb-8">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <div key={index} className="text-center">
              <div className="flex justify-center mb-4">{feature.icon}</div>
              <h3 className="text-lg font-semibold text-foreground">{feature.title}</h3>
              <p className="text-muted-foreground mt-2">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyWorkWithUs;
