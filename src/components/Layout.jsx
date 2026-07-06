import { Outlet } from "react-router-dom";
import Nav from "./Nav.jsx";
import Contact from "./Contact.jsx";

function Layout() {
  return (
    <>
      <Nav />
      <main>
        <Outlet />
      </main>
      <Contact />
    </>
  );
}

export default Layout;
