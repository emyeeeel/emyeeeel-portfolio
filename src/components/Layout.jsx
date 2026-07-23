import { Outlet } from "react-router-dom";
import NavNotch from "./NavNotch.jsx";
import Contact from "./Contact.jsx";
import Footer from "./Footer.jsx";
import "./Layout.css";

function Layout() {
  return (
    <>
      <NavNotch />
      <main className="layout-main">
        <Outlet />
      </main>
      {/* <Contact /> */}
      <Footer />
    </>
  );
}

export default Layout;
