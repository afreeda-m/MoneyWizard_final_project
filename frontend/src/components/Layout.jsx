import { Outlet } from "react-router-dom";
import Sidebar from "./SideBar";

const Layout = () => {
  return (
  <>
    <Sidebar />
    <Outlet/>

  </>
  );
};

export default Layout;