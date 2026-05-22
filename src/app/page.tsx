import CTA from "@/components/v2/CTA";
import Footer from "@/components/v2/Footer";
import Header from "@/components/v2/Header";
import Hero from "@/components/v2/Hero";
import HowItWorks from "@/components/v2/HowItWorks";
import Primitives from "@/components/v2/Primitives";
import Settlement from "@/components/v2/Settlement";
import Status from "@/components/v2/Status";
import WhyEmei from "@/components/v2/WhyEmei";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <WhyEmei />
        <Primitives />
        <HowItWorks />
        <Settlement />
        <Status />
        <CTA />
      </main>
      <Footer />
    </>
  );
}
