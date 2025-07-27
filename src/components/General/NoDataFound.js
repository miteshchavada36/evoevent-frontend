import React from "react";
import { RIconEmpty } from "../Icons";
import { Col, Row } from "react-bootstrap";
import { IconAlertSquareRoundedFilled } from "@tabler/icons-react";

const NoDataFound = ({ message, minHeight = "150px" }) => {
  return (
    <Row
      className="align-items-center text-center"
      style={{ minHeight: `calc(100vh - ${minHeight})` }}
    >
      <Col xs="12">
        <Row>
          <Col xs="12">
            <div className="d-flex mx-auto align-items-center justify-content-center bg-white confirm-icon-box border  rounded-circle mb-3">
              {forRRb ? (
                <IconAlertSquareRoundedFilled width={36} height={36} />
              ) : (
                <RIconEmpty className="text-primary" />
              )}
            </div>
          </Col>
          <Col xs="12" className="fs-18">
            {message}
          </Col>
        </Row>
      </Col>
    </Row>
  );
};

export default NoDataFound;
