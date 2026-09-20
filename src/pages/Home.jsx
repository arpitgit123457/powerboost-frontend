import HeroSection from '../components/home/HeroSection'
import FeaturedProducts from '../components/products/FeaturedProducts'
import CategoryGrid from '../components/sections/CategoryGrid'
import Stats from '../components/sections/Stats'
import Marquee from '../components/sections/Marquee'
import WhyUs from '../components/sections/WhyUs'
import Testimonials from '../components/sections/Testimonials'
import FaqSection from '../components/sections/FaqSection'
import CTABanner from '../components/sections/CTABanner'
import WhyChooseUs from '../components/sections/WhyChooseUs'
import GenuineCheck from '../components/sections/GenuineCheck'
import HowToUse from '../components/sections/HowToUse'

function Home() {
  return (
    <>
      <HeroSection />
      <Stats />
      <Marquee />
      <FeaturedProducts />
      <CategoryGrid />
      <WhyChooseUs />
      <GenuineCheck />
      <HowToUse />
      <WhyUs />
      <Testimonials />
      <FaqSection />
      <CTABanner />
    </>
  )
}

export default Home
