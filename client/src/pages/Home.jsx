import React from 'react'
import HeroSection from '../components/HeroSection'
import HowItWorks from '../components/HowItWorks'
import WhyAgroConnect from '../components/WhyAgroConnect'
import FarmerBenefits from '../components/FarmerBenefits'
import ByuerBenefits from '../components/ByuerBenefits'

const Home = () => {
  return (
    <>
      <HeroSection/>
      <HowItWorks/>
      <WhyAgroConnect/>
      <FarmerBenefits/>
      <ByuerBenefits/>
    </>
  )
}

export default Home