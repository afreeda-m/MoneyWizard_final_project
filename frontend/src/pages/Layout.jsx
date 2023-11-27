import { Outlet } from "react-router-dom";
import Footer from '../components/Footer';
import Navbar from '../components/NavBar';
import Sidebar from '../components/SideBar';

const Layout = () => {
  return (
    <>
      <Sidebar />
      <Navbar/>
      <Outlet />
      <Footer />
    </>
  );
};

export default Layout;