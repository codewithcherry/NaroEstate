import AnimatedSection from '@/components/react-components/about/AnimatedSection';
import HowItWorks from '@/components/react-components/about/HowItWorks';
import OfferCards from '@/components/react-components/about/OfferCards';
import RecentArticles from '@/components/react-components/about/RecentArticles';
import StatsSection from '@/components/react-components/about/StatsSection';
import TeamSection from '@/components/react-components/about/TeamSection';
import React from 'react';


const Page = () => {
  return (
    <div>
      <AnimatedSection>
        <StatsSection />
      </AnimatedSection>

      <AnimatedSection>
        <HowItWorks />
      </AnimatedSection>

      <AnimatedSection>
        <RecentArticles />
      </AnimatedSection>

      <AnimatedSection>
        <TeamSection />
      </AnimatedSection>

      <AnimatedSection>
        <OfferCards />
      </AnimatedSection>
    </div>
  );
};

export default Page;