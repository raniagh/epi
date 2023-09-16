/*
=========================================================
Portail étudiant SWISSWAI
=========================================================
* HTML code related to menu component.
* Copyright 2023 company "Zesty Swiss"
=========================================================
The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

import { useState } from "react";
import { NavLink, Link, useLocation } from "react-router-dom";
import { FaBars, FaInfoCircle } from "react-icons/fa";

// reactstrap components
import {
  Collapse,
  Navbar,
  NavItem,
  Nav,
  Container,
  Row,
  Col,
} from "reactstrap";
import HomeImage from "../../../Assets/img/icons/common/Home_sidebar_icon.png";
import Logo from "../../../Assets/img/icons/Swisswai_logo.png";
import UserMenu from "components/sections/UserMenu";
import Notification from "pages/notification/Notification";
import "./Sidebar.css";

const Sidebar = ({ routes, handleCommunication }) => {
  const [collapseOpen, setCollapseOpen] = useState();
  const [activeImage, setActiveImage] = useState(HomeImage);

  const location = useLocation();
  // Function to filter out Login, Register, and Profile routes
  const filterRoutes = (routes) => {
    return routes.filter((route) => {
      // Exclude "/login", "/register", and "/user-profile" paths
      return !["/login", "/user-profile"].includes(route.path);
    });
  };

  // toggles collapse between opened and closed (true/false)
  const toggleCollapse = () => {
    setCollapseOpen((open) => !open);
  };
  // closes the collapse
  const closeCollapse = (key, image) => {
    setCollapseOpen(false);
    setActiveImage(image);
  };
  // creates the links that appear in the left menu / Sidebar
  const createLinks = (routes) => {
    const filteredRoutes = filterRoutes(routes);
    return filteredRoutes.map((prop, key) => (
      <NavItem
        key={key}
        className={location.pathname === `/home${prop.path}` ? "active" : ""}
      >
        <NavLink
          to={prop.layout + prop.path}
          onClick={() => closeCollapse(key, prop.image)}
        >
          {typeof prop.icon === "string" ? (
            <i className={prop.icon} />
          ) : typeof prop.icon === "object" ? (
            prop.icon
          ) : null}
          <span className="nav-item__text">{prop.name}</span>
        </NavLink>
      </NavItem>
    ));
  };

  return (
    <Navbar
      className="navbar-vertical fixed-left navbar-light"
      expand="md"
      id="sidenav-main"
    >
      <Container fluid>
        {/* Toggler */}
        <div>
          <button
            className="navbar-toggler"
            type="button"
            onClick={toggleCollapse}
          >
            <FaBars color="#fff" />
          </button>
          {/* Brand */}
          {Logo ? (
            <Link to={"dashboard"}>
              <img alt="logo" className="navbar-brand-img" src={Logo} />
            </Link>
          ) : null}
        </div>
        {/* displayed only for small device screens*/}
        <div className="notification-user">
          {/* Communication */}
          <FaInfoCircle size={26} color="#fff" onClick={handleCommunication} />
          {/* Notification */}
          <Notification shown="true" />
          {/* User */}
          <UserMenu shown="true" />
        </div>

        {/* Collapse */}
        <Collapse navbar isOpen={collapseOpen}>
          {/* Collapse header */}
          <div className="navbar-collapse-header d-md-none">
            <Row>
              {Logo && (
                <Col className="collapse-brand" xs="6">
                  <Link to={"dashboard"}>
                    <img alt="logo" src={Logo} />
                  </Link>
                </Col>
              )}
              <Col className="collapse-close" xs="6">
                <button
                  className="navbar-toggler"
                  type="button"
                  onClick={toggleCollapse}
                >
                  <span />
                  <span />
                </button>
              </Col>
            </Row>
          </div>
          {/* Navigation */}
          <div className="side-nav">
            <Nav navbar>{createLinks(routes)}</Nav>
            <div className="menu-image">
              {activeImage && (
                <img src={activeImage} alt="" className="nav-image" />
              )}
            </div>
          </div>
        </Collapse>
      </Container>
    </Navbar>
  );
};

export default Sidebar;
