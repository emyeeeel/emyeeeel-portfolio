import { Outlet } from "react-router-dom";
import NavNotch from "./NavNotch.jsx";
import Contact from "./Contact.jsx";
import FooterCard from "./FooterCard.jsx";
import "./Layout.css";

function Layout() {
  return (
    <>
      <NavNotch />
      <main className="layout-main">
        <Outlet />
      </main>
      <Contact />
      <FooterCard />
    </>
  );
}

export default Layout;
