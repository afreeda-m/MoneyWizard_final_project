import { Outlet } from "react-router-dom";

import Footer from '../components/Footer';
import NavBar from '../components/NavBar';
import SideBar from '../components/SideBar';


// This is the `Layout` page, which handles the layout for all the user pages.
// This page consists of the sidebar and a second `div` consisting of the
// Navbar, main component (`Outlet` component) and Footer.
const Layout = (props) => {

  return (

    <div className="d-flex" style={{ height: "100%" }}>
      <SideBar />
      {/* COMPENSATORY STYLING
        *
        * For some reason, the width of this page overflows to the right,
        * probably because of the width of the sidebar (whose width has been
        * set to 250 pixels). In turn, this also throws off the width of its
        * child elements, like the Navbar and Footer. To compensate for this,
        * the width of this element has been made to account for the sidebar's
        * width.
        */}

      <div className="d-flex flex-column" style={{ width: "calc(100% - 250px)" }}>

        <NavBar isLoggedIn={props.isLoggedIn} setIsLoggedIn={props.setIsLoggedIn} setUsername={props.setUsername} username={props.username}/>
        <Outlet />
        <Footer />
      </div>


    </div>

  );

};

export default Layout;