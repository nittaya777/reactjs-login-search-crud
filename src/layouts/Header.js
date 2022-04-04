import React, { useEffect, useState } from "react";
import { useLocation, Link, useNavigate } from "react-router-dom";
import {
  Navbar,
  Collapse,
  Nav,
  NavbarBrand,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Dropdown,
  Button,
} from "reactstrap";
import LogoWhite from "../assets/images/logos/logo.png";
import user1 from "../assets/images/users/user1.jpg";
import { connect } from "react-redux";
import { logout } from "../actions/loginAction";
import { getProfileById } from "../actions/profileAction";
import TokenService from "../utils/TokenService";
import Breadcrumbs from "./Breadcrumbs"

const Header = (props) => {
  const [titleState, setTitleState] = useState("");
  const [breadcrumbs, setBreadcrumbs] = useState([]);
  const location = useLocation();
  const { getProfileById, logout } = props;
  const user = TokenService.getUser();
  const navigate = useNavigate();
  const pathName = location.pathname;
  const infoData = props.profileReducer.data;
  useEffect(() => {
    loadProfile();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps
  useEffect(() => {
    setTitleName();
  }, [pathName]); // eslint-disable-line react-hooks/exhaustive-deps
  const setTitleName = () => {
    
    if (pathName === "/sale") {
      setTitleState("รายการคำสั่งซื้อ");
      setBreadcrumbs([])
    } else if (pathName.startsWith("/sale/info/")) {
      setBreadcrumbs([
        { title: "หน้าแรก", path: "/" },
        { title: "คำสั่งซื้อทั้งหมด", path: "/sale" },
        { title: "รายละเอียด", path: "" },
      ]);
      setTitleState('');
    } else if (pathName === "/payment") {
      setTitleState("รายการแจ้งชำระเงิน");
      setBreadcrumbs([])
    } else if (pathName === "/home" || pathName === "/") {
      setTitleState("Home");
      setBreadcrumbs([])
    } else if (pathName === "/users") {
      setTitleState("สมาชิกทั้งหมด");
      setBreadcrumbs([])
    } else if (pathName.startsWith("/user/edit/")) {
      setBreadcrumbs([
        { title: "หน้าแรก", path: "/" },
        { title: "สมาชิกทั้งหมด", path: "/users" },
        { title: "แก้ไข", path: "" },
      ]);
      setTitleState('');
    } else if (pathName.startsWith("/user/create")) {
      setBreadcrumbs([
        { title: "หน้าแรก", path: "/" },
        { title: "สมาชิกทั้งหมด", path: "/users" },
        { title: "เพิ่มสมาชิก", path: "" },
      ]);
      setTitleState('');
    } else {
      setTitleState("");
      setBreadcrumbs([])
    }
  };
  const loadProfile = () => {
    if (user?.id) {
      getProfileById(user.id, navigate);
      return true;
    }
  };

  const [isOpen, setIsOpen] = React.useState(false);
  const [dropdownOpen, setDropdownOpen] = React.useState(false);

  const toggle = () => setDropdownOpen((prevState) => !prevState);
  const Handletoggle = () => {
    setIsOpen(!isOpen);
  };
  const showMobilemenu = () => {
    document.getElementById("sidebarArea").classList.toggle("showSidebar");
  };
  // props.logout(navigate);
  function handleLogout(e) {
    e.preventDefault();
    logout(navigate);
  }
  if (!props.profileReducer.data) return null;

  return (
    <Navbar color="primary" dark expand="md">
      <div className="d-flex align-items-center">
        <NavbarBrand href="/" className="d-lg-none">
          <img src={LogoWhite} alt="logo" width="43px" />
        </NavbarBrand>
        <Button
          color="primary"
          className="d-lg-none"
          onClick={() => showMobilemenu()}
        >
          <i className="bi bi-list"></i>
        </Button>
      </div>
      <div className="hstack gap-2">
        <Button
          color="primary"
          size="sm"
          className="d-sm-block d-md-none"
          onClick={Handletoggle}
        >
          {isOpen ? (
            <i className="bi bi-x"></i>
          ) : (
            <i className="bi bi-three-dots-vertical"></i>
          )}
        </Button>
      </div>

      <Collapse navbar isOpen={isOpen}>
        <Nav className="me-auto" navbar>
          <div className="d-flex align-items-center flex-wrap mr-2">
            <div className="d-flex align-items-baseline flex-wrap mr-5">
              <h5 className="text-light my-1 mr-5">{titleState}</h5>
              <Breadcrumbs breadcrumbs={breadcrumbs}/>
            </div>
          </div>
        </Nav>
        <Dropdown isOpen={dropdownOpen} toggle={toggle}>
          <DropdownToggle color="primary" className="profile-img">
            <img
              src={infoData?.avatar_url !== "" ? infoData?.avatar_url : user1}
              alt="profile"
              className="rounded-circle"
              width="30"
            />
          </DropdownToggle>
          <DropdownMenu>
            <DropdownItem header>
              Signed in as <br />
              <b>{infoData.username ? infoData.username : null}</b>
            </DropdownItem>
            <DropdownItem>
              <Link to="/profile">My Account</Link>
            </DropdownItem>
            <DropdownItem divider />
            <DropdownItem>
              <Link to="" onClick={(e) => handleLogout(e)}>
                Logout
              </Link>
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </Collapse>
    </Navbar>
  );
};

const mapStateToProps = ({ appReducer, profileReducer }) => ({
  appReducer,
  profileReducer,
});

const mapDispatchToProps = {
  logout,
  getProfileById,
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
