import { useEffect } from "react";
import Hero from "../components/Hero.jsx";
import Marquee from "../components/Marquee.jsx";
import ServicesJourney from "../components/ServicesJourney.jsx";
import WorkIndex from "../components/WorkIndex.jsx";
import AboutInteractive from "../components/AboutInteractive.jsx";
import Process from "../components/Process.jsx";

function Home() {
  useEffect(() => {
    document.title = "emyeeeel";
  }, []);

  return (
    <>
      <Hero />
      <Marquee />
      <WorkIndex />
      <ServicesJourney />
      <AboutInteractive />
      <Process />
    </>
  );
}

export default Home;
