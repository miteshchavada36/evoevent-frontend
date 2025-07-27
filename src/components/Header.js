import { IconMoon, IconSun, IconUserCircle } from "@tabler/icons-react";
import { useCallback, useEffect, useState } from "react";
import {
  Button,
  Container,
  Dropdown,
  Nav,
  Navbar,
  Popover,
} from "react-bootstrap";
import { NavLink } from "react-router-dom";
import { profile_menu, is_dark_mode, user_details } from "../themeConfig";

import Avatar from "./Avatar";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import Profile from "./Profile";

const Header = () => {
  const authSelector = useSelector((state) => state.app.authUserReducer);
  const role = authSelector?.role?.slug;

  const isSidebarVisible = useSelector(
    (state) => state.app.sidebarReducer.isVisible
  );
  const navigate = useNavigate();

  const [modalShow, setModalShow] = useState(false);

  useEffect(() => {
    if (localStorage.getItem("mode") === null) {
      localStorage.setItem("mode", is_dark_mode == true ? "light" : "light");
    }
  }, []);

  const [darkMode, setDarkMode] = useState(
    localStorage.getItem("mode") == "light" ? true : false
  );

  const toggleDarkMode = () => {
    const newDarkMode = !darkMode;
    setDarkMode(!darkMode);
    // Update the data-bs-theme attribute in index.html
    const themeAttribute = newDarkMode ? "light" : "light";
    document.documentElement.setAttribute("data-bs-theme", themeAttribute);
    localStorage.setItem("mode", themeAttribute);
    // Update the data-bs-theme attribute when component mounts
  };
  const logout = () => {
    navigate("/logout");
  };
  useEffect(() => {
    document.documentElement.setAttribute(
      "data-bs-theme",
      darkMode ? "light" : "dark"
    );
  }, [darkMode]);
  const [showProfile, setShowProfile] = useState(false);
  return (
    <Navbar
      as="header"
      expand="md"
      className={`d-none d-lg-flex d-print-none sticky-top border-bottom ${
        isSidebarVisible ? "" : "hide"
      } `}
    >
      <Container fluid>
        <Nav className="flex-row order-md-last">
          <Nav className="d-none d-md-flex">
            <>
              <Dropdown className="nav-link cursor-pointer">
                <Dropdown.Toggle
                  as={"a"}
                  bsPrefix={`nav-link d-flex lh-1 text-reset p-0 dropdown-toggle arrow-top`}
                >
                  <Avatar
                    name={authSelector.first_name}
                    profilePicture={user_details?.profile_picture || ""}
                  ></Avatar>

                  <div className="d-none d-xl-block px-2">
                    <div className="fs-3">
                      {authSelector.first_name} {authSelector.last_name}
                    </div>
                    <div className="mt-1 small text-muted">
                      {authSelector?.role?.name}
                    </div>
                  </div>
                </Dropdown.Toggle>
                <Dropdown.Menu
                  align="end"
                  className="dropdown-menu-end dropdown-menu-arrow"
                >
                  {profile_menu.map((item, i) => {
                    if (item.slug === "logout") {
                      return (
                        <div>
                          <Dropdown.Item
                            key={item.slug}
                            onClick={() => setShowProfile(true)}
                          >
                            <IconUserCircle className="icon me-2" /> Profile
                          </Dropdown.Item>
                          <Dropdown.Item key={item.slug} onClick={logout}>
                            {item.icon}
                            {item.name}
                          </Dropdown.Item>
                        </div>
                      );
                    }
                    return (
                      <Dropdown.Item
                        key={`dd-${i}`}
                        as={NavLink}
                        to={item.slug}
                      >
                        {item.icon}
                        {item.name}
                      </Dropdown.Item>
                    );
                  })}
                </Dropdown.Menu>
              </Dropdown>
            </>
          </Nav>
        </Nav>
        {showProfile && (
          <Profile
            myProfileModal={showProfile}
            setMyProfileModal={setShowProfile}
          />
        )}
        <Navbar.Collapse></Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
