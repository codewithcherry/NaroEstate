import HowItWorks from '@/components/react-components/about/HowItWorks'
import OfferCards from '@/components/react-components/about/OfferCards'
import RecentArticles from '@/components/react-components/about/RecentArticles'
import StatsSection from '@/components/react-components/about/StatsSection'
import TeamSection from '@/components/react-components/about/TeamSection'
import React from 'react'

const page = () => {
  return (
    <div>
      <StatsSection />
      <HowItWorks />
      <RecentArticles />
      <TeamSection />
      <OfferCards />
    </div>
  )
}

export default page
