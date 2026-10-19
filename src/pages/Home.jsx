import { useEffect } from "react";
import Hero from "../components/Hero.jsx";
import WorkTransition from "../components/WorkTransition.jsx";
import WorkStack from "../components/WorkStack.jsx";
import ServicesJourney from "../components/ServicesJourney.jsx";
import Skills from "../components/Skills.jsx";
import ProcessReveal from "../components/ProcessReveal.jsx";
import AboutInteractive from "../components/AboutInteractive.jsx";
import Experience from "../components/Experience.jsx";
import projects from "../data/projects.js";

const featuredProjects = projects.filter((project) => project.featured);

function Home() {
  useEffect(() => {
    document.title = "emyeeeel — software development & business automation";
  }, []);

  return (
    <>
      <Hero />
      <WorkTransition />
      {/* Proof first (work, the tools behind it, the roles behind it),
          then the person, then working together: how, what, and the ask. */}
      <WorkStack projects={featuredProjects} />
      <Skills />
      <Experience />
      <AboutInteractive />
      <ProcessReveal />
      <ServicesJourney />
    </>
  );
}

export default Home;
