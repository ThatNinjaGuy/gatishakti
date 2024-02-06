import { getFeaturedRooms } from "@/libs/apis";
// import FeaturedRoom from "../components/FeaturedRooms/FeaturedRoom";
import Gallery from "../components/Gallery/Gallery";
import HeroSection from "../components/HeroSection/HeroSection";
import NewsLetter from "../components/NewsLetter/NewsLetter";
import PageSearch from "../components/PageSearch/PageSearch";
import RawMaterials from "../components/FeaturedRooms/RawMaterials";
import HireBuilders from "../components/FeaturedRooms/HireBuilders";
import HireProfessionals from "../components/FeaturedRooms/HireProfessionals";

// Central part of the screen for Homepage
const Home = async () => {
  const featuredRoom = await getFeaturedRooms();

  return (
    <>
      <HeroSection />
      <PageSearch />
      <RawMaterials featuredRoom={featuredRoom} />
      <HireBuilders featuredRoom={featuredRoom} />
      <HireProfessionals featuredRoom={featuredRoom} />
      {/* <FeaturedRoom featuredRoom={featuredRoom} /> */}
      <Gallery />
      <NewsLetter />
    </>
  );
};

export default Home;
