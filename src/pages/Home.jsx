import Hero from '../components/sections/Hero';
import FeatureCards from '../components/sections/FeatureCards';
import FeaturedProperties from '../components/sections/FeaturedProperties';
import Testimonials from '../components/sections/Testimonials';
import MediaPress from '../components/sections/MediaPress';
import CompanyOverview from '../components/sections/CompanyOverview';
import InstagramFeed from '../components/sections/InstagramFeed';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/FooterWeb';

export default function Home() {
  return (
    <div className="min-h-screen bg-navy text-white selection:bg-accent selection:text-white">
      <Navbar />

      <main>
        <Hero />
        <FeatureCards />
        <FeaturedProperties />
        <Testimonials />
        <MediaPress />
        <CompanyOverview />
        <InstagramFeed />
      </main>

      <Footer />
    </div>
  );
}
