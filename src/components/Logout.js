import React, { useState } from "react";
import { ConfirmOffcanvas } from "./CustomModal/ConfirmOffcanvas";
import { useNavigate } from "react-router-dom";
import { RIconLogout } from "./Icons";
const DEFAULT_BOX = {
  isLoading: false,
  title: "Logout",
  description: "Are you sure you want to logout?",
  actionBtnText: "Logout",
  showWarningText: false,
};
const Logout = ({ logoutModal, setLogoutModal }) => {
  const navigate = useNavigate();
  const [confirmOffcanvas] = useState(DEFAULT_BOX);
  const onConfirmAction = () => {
    setLogoutModal(false);
    navigate("/logout");
  };
  return (
    <ConfirmOffcanvas
      {...confirmOffcanvas}
      show={logoutModal}
      icon={<RIconLogout className="text-primary" />}
      onActionCallback={onConfirmAction}
      onHide={() => {
        setLogoutModal(false);
      }}
    />
  );
};

export default Logout;
