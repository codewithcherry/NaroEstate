import Image from "next/image"; // Import Image from Next.js

const TrustedCompanies = () => {
  const companies = [
    { name: "Amazon", logo: "/images/amazon.svg" },
    { name: "AMD", logo: "/images/amd.svg" },
    { name: "Cisco", logo: "/images/cisco.svg" },
    { name: "Netflix", logo: "/images/netflix.svg" },
    { name: "Logitech", logo: "/images/logotech.svg" },
    { name: "Spotify", logo: "/images/spotify.svg" },
  ];

  return (
    <section className="py-12 bg-foreground text-background rounded-xl mx-10 my-8">
      <div className="max-w-6xl mx-auto text-center">
        <p className="mb-8 text-muted-foreground">
          Thousands of the world's leading companies trust us
        </p>
        <div className="flex flex-wrap justify-center gap-8">
          {companies.map((company, index) => (
            <div key={index} className="w-32 h-14 flex items-center justify-center">
              <Image
                src={company.logo}
                alt={company.name}
                width={96}  // Ensure you provide width and height props
                height={40}
                className="max-h-full object-contain"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TrustedCompanies;
