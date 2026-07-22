import { useEffect } from "react";
import Hero from "../components/Hero.jsx";
import Marquee from "../components/Marquee.jsx";
import Services from "../components/Services.jsx";
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
      <Services />
      <WorkIndex />
      <AboutInteractive />
      <Process />
    </>
  );
}

export default Home;
