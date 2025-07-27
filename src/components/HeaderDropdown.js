import React, { Fragment, useCallback, useEffect, useState } from "react";
import { Dropdown } from "react-bootstrap";
import { useSelector } from "react-redux";
import { Link, NavLink } from "react-router-dom";
import Logout from "./Logout";

import Profile from "./Profile";

const HeaderDropdown = ({ isMobile = false }) => {
  const authSelector = useSelector((state) => state.app.authUserReducer);
  const [myProfileModal, setMyProfileModal] = useState(false);
  const [logoutModal, setLogoutModal] = useState(false);

  const handleLogout = (e) => {
    e.preventDefault();
    setLogoutModal(true);
  };
  const handleProfile = (e) => {
    e.preventDefault();
    setMyProfileModal(true);
  };

  const allNotifFilter = {
    _page: 1,
    _limit: 10000,
    q: "",
  };

  return (
    <Fragment>
      <Dropdown className="nav-link cursor-pointer">
        <Dropdown.Toggle
          as={"a"}
          bsPrefix={`nav-link d-flex lh-1 text-reset p-0 text-dark ${
            !isMobile ? "dropdown-toggle" : ""
          }`}
        >
          <span className={`avatar rounded-circle bg-primary text-white`}>
            {authSelector?.first_name?.charAt(0).toUpperCase()}
          </span>
          <div className="d-none d-xl-block ps-2">
            <div>
              {authSelector?.first_name} {authSelector?.last_name}
            </div>
            <div className="mt-1 small text-muted">
              {authSelector?.role?.name}
            </div>
          </div>
        </Dropdown.Toggle>
        <Dropdown.Menu
          align="end"
          className="dropdown-menu-end dropdown-menu-arrow-"
        >
          <Dropdown.Item
            as={Link}
            to={""}
            className="fs-3"
            onClick={handleProfile}
          >
            Profile
          </Dropdown.Item>
          <Dropdown.Item
            as={Link}
            to={""}
            className="fs-3"
            onClick={handleLogout}
          >
            Logout
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
      {logoutModal && <Logout {...{ logoutModal, setLogoutModal }} />}
      {myProfileModal && <Profile {...{ myProfileModal, setMyProfileModal }} />}
    </Fragment>
  );
};

export default HeaderDropdown;
