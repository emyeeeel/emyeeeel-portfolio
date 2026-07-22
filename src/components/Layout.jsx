import { Outlet } from "react-router-dom";
import Nav from "./Nav.jsx";
import Contact from "./Contact.jsx";
import Footer from "./Footer.jsx";

function Layout() {
  return (
    <>
      <Nav />
      <main>
        <Outlet />
      </main>
      <Contact />
      <Footer />
    </>
  );
}

export default Layout;
