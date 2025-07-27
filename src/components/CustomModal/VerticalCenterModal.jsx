import React from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";

export function VerticalCenterModal({ 
  show, 
  onHide, 
  title, 
  children, 
  modalClass = "", 
  headerClass = "", 
  bodyClass = "", 
  footerClass = "", 
  closeButtonLabel = "Close" ,
  size = "xl"
}) {
  return (
    <Modal
      show={show}
      onHide={onHide}
      size={size}
      aria-labelledby="custom-modal-title"
      centered
      className={modalClass}
    >
      <Modal.Header closeButton>
        <Modal.Title as="div" bsPrefix="modal-title fw-bold">
          {title}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className={bodyClass}>
        {children}
      </Modal.Body>
      <Modal.Footer className={footerClass}>
        <Button onClick={onHide}>{closeButtonLabel}</Button>
      </Modal.Footer>
    </Modal>
  );
}
