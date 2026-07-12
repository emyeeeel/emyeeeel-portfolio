import { useEffect } from "react";
import Hero from "../components/Hero.jsx";
import Marquee from "../components/Marquee.jsx";
import WorkIndex from "../components/WorkIndex.jsx";
import Services from "../components/Services.jsx";
import About from "../components/About.jsx";
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
      <Services />
      <About />
      <Process />
    </>
  );
}

export default Home;
