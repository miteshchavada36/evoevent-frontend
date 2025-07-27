import React, { useEffect, useRef, useState } from 'react';
import { Button, Modal } from 'react-bootstrap';
import Loader from '../Loader';

const CustomModal = ({
  size = '',
  show = false,
  isLoading = false,
  onHide = () => {},
  modalHeading = '',
  hadBodyPadding = false,
  children,
  hasActions = true,
  hasSave = true,
  hasBack = false,
  saveBtnText = 'Save',
  closeBtnText = 'Cancel',
  backBtnText = 'Back',
  fullscreen = false,
  scrollable = false,
  onSaveCallback = () => {},
  onBackCallback = () => {},
  centered = false,
  customFooter = '',
  scrollToEnd = false,
  showUnitWarning = '',
  isSaveBtnDisabled = false,
}) => {
  const [modalShow, setModalShow] = useState(show);
  const modalContentRef = useRef(null);
  useEffect(() => {
    if (modalContentRef.current && scrollToEnd) {
      modalContentRef.current.scrollTop = modalContentRef.current.scrollHeight;
    }
  }, [children]);
  const handleClose = () => {
    setModalShow(false);
  };
  return (
    <Modal
      show={modalShow}
      onHide={handleClose}
      onExited={onHide}
      size={size}
      fullscreen={fullscreen}
      scrollable={scrollable}
      centered={centered}
    >
      {isLoading && <Loader />}
      <Modal.Header closeButton>
        <Modal.Title as='div' bsPrefix='modal-title fw-bold'>
          {modalHeading}
          {showUnitWarning}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body
        ref={modalContentRef}
        className={hadBodyPadding ? 'p-0' : ' pb-0'}
        style={{ overflowX: `hidden-` }}
      >
        {children}
      </Modal.Body>
      {customFooter}
      {hasActions && (
        <Modal.Footer className='justify-content-start border-top-0 gap-3'>
          <Button variant='' className='me-1' onClick={handleClose}>
            {closeBtnText}
          </Button>
          {hasSave && (
            <Button
              type='submit'
              onClick={onSaveCallback}
              disabled={isSaveBtnDisabled}
            >
              {saveBtnText}
            </Button>
          )}
        </Modal.Footer>
      )}
    </Modal>
  );
};

export default CustomModal;
