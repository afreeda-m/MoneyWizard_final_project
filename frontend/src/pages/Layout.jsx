import { Outlet } from "react-router-dom";
import Sidebar from '../components/SideBar';

const Layout = () => {
  return (
    <>
      <Sidebar />
      <Outlet />
    </>
  );
};

export default Layout;