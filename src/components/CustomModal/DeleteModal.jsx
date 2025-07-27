import React from 'react';
import { Modal, Button } from 'react-bootstrap';

const DeleteModal = ({ show, onClose, onConfirm, itemName }) => {
  return (
    <Modal show={show} onHide={onClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Confirm Deletion</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        Are you sure you want to delete {itemName || 'this event'}?
        <img src="delete.png" className="d-block mx-auto mt-3" alt="Delete Icon"></img>
      </Modal.Body>
      <Modal.Footer className='gap-2'>
        <Button variant='secondary' onClick={onClose}>
          Cancel
        </Button>
        <Button variant='danger' onClick={onConfirm}>
          Yes
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default DeleteModal;
