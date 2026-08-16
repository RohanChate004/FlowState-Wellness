import Navbar from "../../components/Navbar/Navbar";
import Hero from "../../components/Hero/Hero";
import Stats from "../../components/Stats/Stats";
import Features from "../../components/Features/Features";
import AIWellness from "../../components/AIWellness/AIWellness";
import KnowledgeHub from "../../components/KnowledgeHub/KnowledgeHub";
import HowItWorks from "../../components/HowItWorks/HowItWorks";
// import Testimonials from "../../components/Testimonials/Testimonials";
import Footer from "../../components/Footer/Footer";

function Home() {
  return (
    <>
      <Navbar />

      <Hero />

      <Stats />

      <Features />

      <AIWellness />

      <KnowledgeHub />

      <HowItWorks />
      
      {/* <Testimonials /> */}

      <Footer />
    </>
  );
}

export default Home;