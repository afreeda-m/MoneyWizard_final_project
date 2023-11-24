import { Outlet } from "react-router-dom";
import Sidebar from '../components/SideBar';
import NavBar from '../components/NavBar';
import Footer from '../components/Footer';

const Layout = () => {
  return (
    <>
      <Sidebar />
      <NavBar />
      <Outlet />
      <Footer />
    </>
  );
};

export default Layout;