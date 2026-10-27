import { Outlet, useLocation } from "react-router-dom";
import NavNotch from "./NavNotch.jsx";
import Contact from "./Contact.jsx";
import FooterCard from "./FooterCard.jsx";
import "./Layout.css";

function Layout() {
  // Case studies end on their own call to action, which opens the inquiry
  // form in a slide-in panel, so the full section isn't repeated there.
  const { pathname } = useLocation();
  const isCaseStudy = /^\/work\/[^/]+/.test(pathname);

  return (
    <>
      <NavNotch />
      <main className="layout-main">
        <Outlet />
      </main>
      {!isCaseStudy && <Contact />}
      <FooterCard />
    </>
  );
}

export default Layout;
