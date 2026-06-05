import Navbar from "@/components/Navbar";
import ScrollIndicator from "@/components/ScrollIndicator";
import Hero from "@/components/Hero";
import Features from "@/components/Features";
import Gallery from "@/components/Gallery";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <ScrollIndicator />
      <Hero />
      <Features />
      <Gallery />
      <Footer />
    </>
  );
}
