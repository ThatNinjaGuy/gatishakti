import { getFeaturedRooms, getFeaturedServices } from "@/libs/apis";
import Gallery from "../components/Gallery/Gallery";
import HeroSection from "../components/HeroSection/HeroSection";
import NewsLetter from "../components/NewsLetter/NewsLetter";
import PageSearch from "../components/PageSearch/PageSearch";
import RawMaterials from "../components/FeaturedRooms/RawMaterials";
import HireBuilders from "../components/FeaturedRooms/HireBuilders";
import HireProfessionals from "../components/FeaturedRooms/HireProfessionals";
import FeaturedServices from "../components/FeaturedRooms/FeaturedServices";

// Central part of the screen for Homepage
const Home = async () => {
  const featuredRoom = await getFeaturedRooms();
  const featuredServices = await getFeaturedServices();

  return (
    <>
      <HeroSection />
      <PageSearch />
      <FeaturedServices featuredServices={featuredServices} />
      <RawMaterials featuredRoom={featuredRoom} />
      <HireBuilders featuredRoom={featuredRoom} />
      <HireProfessionals
        featuredRoom={featuredRoom}
        featuredServices={featuredServices[0]}
      />
      <Gallery />
      <NewsLetter />
    </>
  );
};

export default Home;
