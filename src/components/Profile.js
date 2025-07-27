import React from "react";
import { ConfirmOffcanvas } from "./CustomModal/ConfirmOffcanvas";
import { FormField } from "./Form/FormField";
import { Col, Row } from "react-bootstrap";
import { IconUserFilled } from "@tabler/icons-react";
import { useSelector } from "react-redux";
import { RIconUser } from "./Icons";
import useIsMobile from "../hooks/useIsMobile";

const Profile = ({ myProfileModal, setMyProfileModal }) => {
  const authSelector = useSelector((state) => state.app.authUserReducer);
  const isMobile = useIsMobile();

  const offcanvasProps = {
    placement: isMobile ? "bottom" : "end",
  };
  
  return (
    <ConfirmOffcanvas
      show={myProfileModal}
      title="Profile"
      onHide={() => {
        setMyProfileModal(false);
      }}
      {...offcanvasProps}
    >
      <Row className="row-cards">
        <Col md={12} className="text-center">
          <span className="avatar avatar-md rounded-circle text-primary mb-2">
            <RIconUser />
          </span>
        </Col>
        <FormField
          label="First Name"
          name="first_name"
          type="text"
          defaultValue={authSelector?.first_name || ""}
          xs="6"
          disabled
        />
        <FormField
          label="Last Name"
          name="last_name"
          type="text"
          defaultValue={authSelector?.last_name || ""}
          xs="6"
          disabled
        />
        <FormField
          label="Designation"
          name="designation"
          type="text"
          size="12"
          disabled
          defaultValue={authSelector?.designation || ""}
        />
        <FormField
          label="Role"
          name="role"
          type="text"
          size="12"
          disabled
          defaultValue={authSelector?.role?.name || ""}
        />
        <FormField
          label="Mobile"
          name="mobile"
          type="text"
          defaultValue={authSelector?.mobile || ""}
          size="12"
          disabled
        />
      </Row>
    </ConfirmOffcanvas>
  );
};

export default Profile;
