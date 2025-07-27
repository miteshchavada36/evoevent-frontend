import {
  IconDashboard,
  IconMenu2,
  IconX,
} from "@tabler/icons-react";
import React, { Fragment, useEffect, useRef, useState } from "react";
import { Container, Nav, Navbar, NavDropdown, NavItem } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link, NavLink, useLocation } from "react-router-dom";

import useIsMobile from "../hooks/useIsMobile";
import { addsidebarCounter } from "../store/slices/sideBar/sidebarCounterSlice";
import HeaderDropdown from "./HeaderDropdown";
import greenCircle from "../assets/images/circle-512.png";
import { toggleSidebar } from "../store/slices/sideBar/sidebarSlice";

const Sidebar = () => {
  const dispatch = useDispatch();
  const authSelector = useSelector((state) => state.app.authUserReducer);
  const isSidebarVisible = useSelector(
    (state) => state.app.sidebarReducer.isVisible
  );
  const isMobile = useIsMobile();

  const location = useLocation();
  const [isExpanded, setIsExpanded] = useState(false);
  const [isOpen, setIsOpen] = useState({
    show: false,
    place: "",
  });
  // const headerLogo = import.meta.env.REACT_APP_HEADER_LOGO;
  const dropdownRef = useRef(null);

  const handleMenuItemClick = () => {
    setIsExpanded(false); // Collapse the menu when a menu item is clicked
  };

  const handleToggle = (show, item) => {
    setIsOpen((prevState) => ({
      show: show ? true : false,
      place: show ? item : "",
    }));
  };

  const handleSelect = (item) => {
    setIsOpen({
      show: true,
      place: item,
    });
  };

  // Define menus for different roles
  const superAdminMenuItems = [
    {
      name: "Dashboard",
      to: "/dashboard",
      icon: <IconDashboard />,
    },
    // {
    //   name: "Employees",
    //   to: "/employees",
    //   icon: <IconUser />,
    // },
    {
      name: "Category",
      to: "/category",
      icon: <IconDashboard />,
    },
  ];

  const getMenuItems = () => {
    // switch (authSelector?.role) {
    //   case "super-admin":
        return superAdminMenuItems;
    //   default:
    //     return [];
    // }
  };

  useEffect(() => {
    const currentPath = location.pathname;

    // Find the menu item that has a submenu containing the current path
    const activeMenu = superAdminMenuItems.find((item) =>
      item.submenu?.some((subItem) => subItem.to === currentPath)
    );

    if (activeMenu) {
      setIsOpen({
        show: true,
        place: activeMenu.name, // Set to the parent menu name (e.g., "Ledger")
      });
    } else {
      setIsOpen({
        show: false,
        place: "",
      });
    }
  }, [location.pathname]);

  const SubMenu = ({ item }) => {
    const isCurrentOpen = isOpen.place === item.name && isOpen.show;
    const currentPath = location.pathname;

    return (
      <NavDropdown
        ref={dropdownRef}
        title={
          <Fragment>
            {!isMobile && (
              <span
                className={`nav-link-icon d-md-none d-lg-inline-block ${
                  currentPath === item.to ? "text-primary" : ""
                }`}
              >
                {item.icon}
              </span>
            )}
            <span
              className={`nav-link-title ${
                currentPath === item.to ? "text-primary" : ""
              }`}
            >
              {item.name}
            </span>
          </Fragment>
        }
        id={`topnav-dropdown-${item.name}`}
        show={isCurrentOpen}
        onToggle={(show) => handleToggle(show, item.name)}
      >
        <div className="dropdown-menu-columns mt-3">
          <div className="dropdown-menu-column">
            {item.submenu.map((subItem) => (
              <NavDropdown.Item
                key={`submenu-${subItem.name}`}
                as={NavLink}
                to={subItem.to}
                onClick={() => handleSelect(item.name)}
                className={`${
                  currentPath === subItem.to
                    ? "bg-primary-subtle text-primary"
                    : ""
                } rounded-3 mt-1`}
              >
                {!isMobile && (
                  <span
                    className={`nav-link-icon ${
                      currentPath === subItem.to ? " text-primary" : ""
                    }`}
                  >
                    {subItem.icon}
                  </span>
                )}
                <span className="nav-link-title">{subItem.name}</span>
              </NavDropdown.Item>
            ))}
          </div>
        </div>
      </NavDropdown>
    );
  };

  const currentPath = location.pathname;

  const renderNav = () => (
    <div>
      <Nav as="ul" className="border-top">
        {getMenuItems().map((item) => (
          <NavItem
            as="li"
            className="mt-3 mx-2 rounded-2 px-1"
            key={`topnav-${item.name}`}
          >
            {item.submenu ? (
              <SubMenu item={item} />
            ) : (
              <Nav.Link
                as={NavLink}
                to={item.to}
                onClick={handleMenuItemClick}
                className={
                  currentPath === item.to
                    ? "bg-primary-subtle text-primary"
                    : ""
                }
              >
                {!isMobile && (
                  <span
                    className={`nav-link-icon ${
                      currentPath === item.to ? "text-primary" : ""
                    }`}
                  >
                    {item.icon}
                  </span>
                )}
                <span className="nav-link-title">{item.name}</span>
              </Nav.Link>
            )}
          </NavItem>
        ))}
      </Nav>
    </div>
  );

  return (
    <>
      {!isMobile && (
        <button
          className="btn btn-default btn-icon border-0 btn-sm shadow-none toggle-sidebar"
          onClick={() => dispatch(toggleSidebar())}
          style={{
            position: "fixed",
            top: "15px",
            zIndex: 1030,
            left: isSidebarVisible ? "17rem" : "2rem",
          }}
        >
          <IconMenu2 size={24} />
        </button>
      )}
      {(isSidebarVisible || isMobile) && (
        <Navbar
          as={"aside"}
          collapseOnSelect
          expand="lg"
          className={`navbar-vertical sticky-top ${
            isSidebarVisible || isMobile ? "" : "hide"
          }`}
          expanded={isExpanded}
          onToggle={(expanded) => setIsExpanded(expanded)}
        >
          <Container fluid>
            <Navbar.Brand
              as={"h1"}
              className="justify-content-md-start ps-md-3"
            >
              <Link to={"/"}>
                <div className="d-flex align-items-center">
                  <img
                    src={''}
                    className="navbar-brand-image rounded-5"
                    alt="Logo"
                  />
                  <div className="ms-2 logo-text">
                    <div
                      className={`${
                        !isMobile ? "fs-16" : "fs-4"
                      } my-1 mx-2 text-primary fw-medium`}
                      style={{
                        transform: "scaleX(1.2)",
                        display: "inline-block",
                      }}
                    >
                      Evo
                    </div>
                  </div>
                </div>
              </Link>
            </Navbar.Brand>
            <Navbar.Toggle className={`ms-auto me-2`}>
              {isExpanded ? <IconX size={24} /> : <IconMenu2 size={24} />}
            </Navbar.Toggle>
            <Nav as={"div"} className="flex-row d-lg-none">
              <HeaderDropdown isMobile />
            </Nav>
            <Navbar.Collapse className="border-top border-secondary">
              {renderNav()}
            </Navbar.Collapse>
          </Container>
        </Navbar>
      )}
    </>
  );
};

export default Sidebar;
