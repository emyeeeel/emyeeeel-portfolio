import { useEffect } from "react";
import Hero from "../components/Hero.jsx";
import Marquee from "../components/Marquee.jsx";
import WorkTransition from "../components/WorkTransition.jsx";
import ServicesJourney from "../components/ServicesJourney.jsx";
import WorkShowcase from "../components/WorkShowcase.jsx";
import AboutInteractive from "../components/AboutInteractive.jsx";
import ProcessReveal from "../components/ProcessReveal.jsx";

function Home() {
  useEffect(() => {
    document.title = "emyeeeel";
  }, []);

  return (
    <>
      <Hero />
      {/* <Marquee /> */}
      <WorkTransition />
      <WorkShowcase />
      <ProcessReveal />
      <ServicesJourney />
      <AboutInteractive />
    </>
  );
}

export default Home;
