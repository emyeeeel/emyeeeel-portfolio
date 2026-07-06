import { useEffect } from "react";
import Hero from "../components/Hero.jsx";
import Marquee from "../components/Marquee.jsx";
import WorkIndex from "../components/WorkIndex.jsx";
import About from "../components/About.jsx";
import Experience from "../components/Experience.jsx";

function Home() {
  useEffect(() => {
    document.title = "emyeeeel — AI engineer & fullstack developer";
  }, []);

  return (
    <>
      <Hero />
      <Marquee />
      <WorkIndex />
      <About />
      <Experience />
    </>
  );
}

export default Home;
