import { Button, Nav } from "reactstrap";
import Logo from "./Logo";
import "./Sidebar.css";
import { useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import SidebarMenu from "./SidebarMenu";
const baseURL = "http://localhost:1500/menu";

const Sidebar = () => {
  const showMobilemenu = () => {
    document.getElementById("sidebarArea").classList.toggle("showSidebar");
  };

  let location = useLocation();

  const [navigationList, setNavigationList] = useState(null);
  useEffect(() => {
    axios.get(baseURL).then((response) => {
      setNavigationList(response.data.data);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  if (!navigationList) return null;
  const SideBarElements = navigationList.map((navi, index) => {
    const menuItem = {
      index: index,
      title: navi.title,
      icon: navi.icon,
      href: navi.href,
      submenu: navi.submenu,
      pathname: location.pathname,
    };
    return <SidebarMenu key={index} {...menuItem} />;
  })

  return (
    <div className="p-3">
      <div className="d-flex align-items-center">
        <Logo />
        <Button
          close
          size="sm"
          className="ms-auto d-lg-none"
          onClick={() => showMobilemenu()}
        ></Button>
      </div>
      <div className="pt-4 mt-2">
        <Nav vertical className="sidebarNav sidebar-menu">
          {SideBarElements}
        </Nav>
      </div>
    </div>
  );
};

export default Sidebar;
