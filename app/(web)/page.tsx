import { getFeaturedServices } from "@/libs/apis";
import Gallery from "../components/Gallery/Gallery";
import HeroSection from "../components/HeroSection/HeroSection";
import NewsLetter from "../components/NewsLetter/NewsLetter";
import PageSearch from "../components/PageSearch/PageSearch";
import FeaturedServices from "../components/FeaturedServices/FeaturedServices";

// Central part of the screen for Homepage
const Home = async () => {
  const featuredServices = await getFeaturedServices();

  return (
    <>
      <HeroSection />
      <PageSearch />
      <FeaturedServices featuredServices={featuredServices} />
      <Gallery />
      <NewsLetter />
    </>
  );
};

export default Home;
