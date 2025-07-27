import React, { Fragment, useState } from "react";

import { Container, Nav, NavDropdown, NavItem, Navbar } from "react-bootstrap";
import { Link, NavLink, useLocation } from "react-router-dom";
import { sidebar_menu, brand_name } from "../themeConfig";
import logo from "../assets/images/logo.svg";
import {
  IconBook,
  IconBuilding,
  IconHome,
  IconPoint,
  IconSettings,
  IconUsers,
} from "@tabler/icons-react";
import { useSelector } from "react-redux";
import useIsMobile from "../hooks/useIsMobile";
const Sidebar = () => {
  // const location = useLocation();
  // const currentUrl = location.pathname;
  // const [isOpen, setIsOpen] = useState({
  //   show: false,
  //   place: "",
  // });
  // const handleToggle = (isOpen, meta, item) => {
  //   const hasItems = currentUrl.includes(item);
  //   setIsOpen({
  //     show: hasItems ? true : isOpen,
  //     place: item,
  //   });
  // };

  // const handleSelect = (item) => {
  //   setTimeout(() => {
  //     setIsOpen({
  //       show: true,
  //       place: item,
  //     });
  //   }, 0);
  // };
  const authSelector = useSelector((state) => state.app.authUserReducer);
  const location = useLocation();
  const currentUrl = location.pathname;
  const isMobile = useIsMobile();
  const [isOpen, setIsOpen] = useState({
    show: false,
    place: "",
  });

  const handleToggle = (isOpen, meta, item) => {
    const hasItems = currentUrl.includes(item);
    setIsOpen({
      show: hasItems ? true : isOpen,
      place: item,
    });
  };

  const handleSelect = (item) => {
    setTimeout(() => {
      setIsOpen({
        show: true,
        place: item,
      });
    }, 0);
  };

  const superAdminMenuItems = [
    {
      name: "Dashboard",
      to: "/dashboard",
      icon: <IconHome size={20} />,
    },
    {
      name: "Setup",
      icon: <IconSettings size={20} />,
      submenu: [
        {
          name: "Users",
          to: "/users",
          icon: <IconUsers size={10} stroke={8} />,
          count: 1,
        },
        {
          name: "Recruitment Boards",
          icon: <IconPoint size={10} stroke={8} />,
          to: "/recruitment_boards",
          count: 2,
        },
      ],
    },
  ];

  const menuItems = [
    {
      name: "Dashboard",
      to: "/dashboard",
      icon: <IconHome size={20} />,
    },
    {
      name: "Exams",
      to: "/exams",
      icon: <IconBook size={20} />,
    },
    {
      name: "Setup",
      to: "/divisions",
      icon: <IconSettings size={20} />,
      submenu: [
        {
          name: "Divisions",
          to: "/divisions",
          icon: <IconPoint size={10} stroke={8} />,
          count: 1,
        },
        {
          name: "Centers",
          icon: <IconPoint size={10} stroke={8} />,
          to: "/centers",
          count: 2,
        },
        {
          name: "Users",
          to: "/users",
          icon: <IconPoint size={10} stroke={8} />,
          count: 2,
        },
        {
          name: "Posts",
          icon: <IconPoint size={10} stroke={8} />,
          to: "/posts",
          count: 4,
        },
      ],
    },
  ];
  const SubMenu = ({ item }) => {
    return (
      <NavDropdown
        title={
          <Fragment>
            <span className="nav-link-icon d-md-none d-lg-inline-block">
              {item.icon}
            </span>
            <span className="nav-link-title">{item.name}</span>
          </Fragment>
        }
        id={`topnav-dropdown-${item.name}`}
        className={`${
          isOpen.place === item.to && isOpen.show ? "bg-muted-lt text-dark" : ""
        }`}
        show={isOpen.place === item.to && isOpen.show}
        onToggle={(...args) => handleToggle(...args, item.to)}
        onSelect={() => handleSelect(item.to)}
      >
        <div className="dropdown-menu-columns">
          <div className="dropdown-menu-column">
            {item.submenu.map((subItem, j) => (
              <NavDropdown.Item
                key={`submenu-${subItem.name}`}
                as={NavLink}
                to={subItem.to}
              >
                {/* {subItem.name} */}
                <span className="nav-link-icon">{subItem.icon}</span>
                <span className="nav-link-title">{subItem.name}</span>
              </NavDropdown.Item>
            ))}
          </div>
        </div>
      </NavDropdown>
    );
  };

  const renderNav = () => {
    return (
      <Nav as="ul" className="pt-lg-3">
        {menuItems.map((item, i) => (
          <NavItem as="li" key={`topnav-${item.name}`} className="">
            {item.submenu ? (
              <SubMenu item={item} />
            ) : (
              <Nav.Link as={NavLink} to={item.to}>
                <span className="nav-link-icon">{item.icon}</span>
                <span className="nav-link-title">{item.name}</span>
              </Nav.Link>
            )}
          </NavItem>
        ))}
      </Nav>
    );
  };
  return (
    <Navbar
      as={"aside"}
      collapseOnSelect
      expand="lg"
      className="shadow navbar-vertical	sticky-top"
    >
      <Container fluid>
        <Navbar.Toggle />
        <Navbar.Brand as={"h1"} className="justify-content-md-start ps-md-3">
          <Link to={"/"}>
            <img src={logo} className="navbar-brand-image" alt="Logo" />
          </Link>
        </Navbar.Brand>
        {/* <Nav as={"div"} className="flex-row d-lg-none">
          {isMobile && <NotificationsDropdown />}
          <HeaderDropdown isMobile />
        </Nav> */}
        <Navbar.Collapse>{renderNav()}</Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Sidebar;
