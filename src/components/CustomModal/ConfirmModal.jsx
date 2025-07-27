import {
  IconAlertTriangle,
  IconCircleCheck,
  IconCircleX,
} from "@tabler/icons-react";
import React, { useEffect, useState } from "react";
import { Button, CloseButton, Col, Modal, Row } from "react-bootstrap";
import Loader from "../Loader";
import { IconMailForward } from "@tabler/icons-react";

const ConfirmModal = ({
  size = "sm",
  show = false,
  isLoading = false,
  onHide = () => {},
  modalHeading = "",
  children,
  hasActions = true,
  hasAction = true,
  title = "",
  description = "",
  actionBtnText = "Save Changes",
  action = "",
  onActionCallback = () => {},
}) => {
  const [modalShow, setModalShow] = useState(show);
  const [variant, setVariant] = useState();
  const handleClose = () => {
    setModalShow(false);
  };
  useEffect(() => {
    setTimeout(() => {
      const backdrop = document.getElementsByClassName("modal-backdrop show");
      try {
        backdrop[1].classList.add("top-backdrop");
      } catch (err) {}
    }, 10);
    setVariant(
      action === "APPROVE" ||
        action === "RESOLVE" ||
        action === "SEND_VERIFICATION_EMAIL" ||
        action === "YES"
        ? "success"
        : "danger"
    );
  }, []);
  return (
    <Modal
      show={modalShow}
      onHide={handleClose}
      onExited={onHide}
      size={size}
      aria-labelledby="contained-modal-title-vcenter"
      centered
      backdrop="static"
      keyboard={false}
    >
      {isLoading && <Loader />}
      <Modal.Body className="text-center pt-4 pb-0">
        <CloseButton onClick={onHide} />
        {action === "SEND_VERIFICATION_EMAIL" && (
          <IconAlertTriangle className="icon mb-2 text-success icon-lg" />
        )}
        {action === "DELETE" && (
          <IconAlertTriangle className="icon mb-2 text-danger icon-lg" />
        )}
        {(action === "APPROVE" || action === "RESOLVE" || action === "YES") && (
          <IconCircleCheck className="icon mb-2 text-green icon-lg" />
        )}
        {action === "REJECT" && (
          <IconCircleX className="icon mb-2 text-danger icon-lg" />
        )}
        {title && <h3 className="mb-2">{title}</h3>}
        {description && <p className="text-muted mb-0">{description}</p>}
        {children}
      </Modal.Body>
      {hasActions && (
        <Modal.Footer className="border-0 p-4">
          <div class="w-50 pe-2">
            {hasAction && (
              <Button
                variant={variant}
                className="w-100"
                onClick={onActionCallback}
              >
                {actionBtnText}
              </Button>
            )}
          </div>
          <div class="w-50 ps-2">
            <div class="d-flex">
              <Button variant="" className="w-100" onClick={handleClose}>
                Cancel
              </Button>
            </div>
          </div>
          {/* <Row className="w-100 gap-3">
            <Col className='px-0'>
              
            </Col>
            {hasAction && (
              <Col className='px-0'>
                <Button
                  variant={variant}
                  className="w-100"
                  onClick={onActionCallback}
                >
                  {actionBtnText}
                </Button>
              </Col>
            )}
          </Row> */}
        </Modal.Footer>
      )}
    </Modal>
  );
};

export default ConfirmModal;
