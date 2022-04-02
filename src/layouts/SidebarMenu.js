import { useState, useEffect } from "react";
import { NavItem } from "reactstrap";
import { Link } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
const SidebarMenu = ({ index, title, icon, href, submenu, pathname }) => {
  const [showSubmenu, setShowSubmenu] = useState(false);
  useEffect(() => {
    const findItem = submenu.findIndex((sItem) => pathname === sItem.href);
    if (findItem !== -1) {
      setShowSubmenu(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  let SubMenuItem = "";
  if (showSubmenu) {
    SubMenuItem = (
      <div className="sub-item">
        <ul>
          {submenu.map((subitem, index) => {
            return (
              <li
                key={uuidv4()}
                className={pathname === subitem.href ? "active" : ""}
              >
                <Link
                  to={subitem.href}
                  className={
                    pathname === subitem.href
                      ? "text-primary"
                      : "text-secondary"
                  }
                >
                  {subitem.title}
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    );
  }

  if (submenu.length > 0) {
    return (
      <NavItem
        key={uuidv4()}
        className={
          showSubmenu
            ? "sidenav-bg nav-item main-menu show"
            : " sidenav-bg nav-item main-menu"
        }
      >
        <Link
          to="#"
          onClick={() => setShowSubmenu(!showSubmenu)}
          key={uuidv4()}
          className={
            pathname === href
              ? "text-primary nav-link py-3"
              : "nav-link text-secondary py-3"
          }
        >
          <i className={icon}></i>
          <span className="ms-3 d-inline-block text-title">{title}</span>
          <span className="dropdown-icon">
            <i
              className={
                showSubmenu ? "bi bi-chevron-up" : "bi bi-chevron-right"
              }
            ></i>
          </span>
        </Link>
        {SubMenuItem}
      </NavItem>
    );
  } else {
    return (
      <NavItem key={uuidv4()} className="sidenav-bg">
        <Link
          to={href}
          key={uuidv4()}
          className={
            pathname === href
              ? "text-primary nav-link py-3"
              : "nav-link text-secondary py-3"
          }
        >
          <i className={icon}></i>
          <span className="ms-3 d-inline-block">{title}</span>
        </Link>
      </NavItem>
    );
  }
};
export default SidebarMenu;
