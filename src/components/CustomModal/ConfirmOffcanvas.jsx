import React, { Fragment, useEffect, useState } from "react";
import { Button, Col, Offcanvas, Row } from "react-bootstrap";
import Loader from "../Loader";
import { RIconPaperPlane } from "../Icons";

export const ConfirmOffcanvas = ({
  show = false,
  isLoading = false,
  placement = "bottom",
  title = "Confirmation",
  description = "",
  showWarningText = true,
  actionBtnText = "Submit",
  actionBtnColor = "danger",
  action = "",
  extraMessage = false,
  icon = false,
  iconBgClass=false,
  bodyClass = "",
  onHide = () => {},
  onActionCallback = () => {},
  children,
}) => {
  const [modalShow, setModalShow] = useState(show);
  const handleClose = () => {
    setModalShow(false);
  };
  useEffect(() => {
    setTimeout(() => {
      const backdrop = document.getElementsByClassName("offcanvas-backdrop show");
      try {
        backdrop[1].classList.add("top-offcanvas-backdrop");
      } catch (err) {}
    }, 10);
  }, []);
  return (
    <Offcanvas
      show={modalShow}
      onHide={handleClose}
      onExited={onHide}
      placement={placement}
      keyboard={false}
      className="h-auto"
      {...(isLoading ? { backdrop: "static" } : { backdrop: true })}
    >
      {isLoading && <Loader />}
      <Offcanvas.Header closeButton>
        <Offcanvas.Title>{title}</Offcanvas.Title>
      </Offcanvas.Header>
      <Offcanvas.Body className={bodyClass}>
        {children ? (
          children
        ) : (
          <Fragment>
            <div className="d-flex justify-content-center mb-3">
              <div className={`d-flex align-items-center justify-content-center  confirm-icon-box border  rounded-circle ${iconBgClass||"bg-light-rrb"}`}>
                {icon ? (
                  icon
                ) : (
                  <RIconPaperPlane
                    className={`text-primary ${
                      extraMessage ? "text-danger" : "text-primary"
                    }`}
                  />
                )}
              </div>
            </div>
            {extraMessage && (
              <p className="text-danger text-center fs-18">{extraMessage}</p>
            )}
            <p className={`fs-18 text-center ${showWarningText ? "mb-2" : ""}`}>
              {description}
            </p>
            {showWarningText && (
              <p className="text-muted text-center">
                This action cannot be undone.
              </p>
            )}
            <Row className="g-3">
              <Col>
                <Button
                  variant={actionBtnColor}
                  type="button"
                  className="w-100"
                  onClick={onActionCallback}
                >
                  {actionBtnText}
                </Button>
              </Col>
              <Col>
                <Button
                  variant=""
                  type="button"
                  className="w-100"
                  onClick={handleClose}
                >
                  Cancel
                </Button>
              </Col>
            </Row>
          </Fragment>
        )}
      </Offcanvas.Body>
    </Offcanvas>
  );
};
