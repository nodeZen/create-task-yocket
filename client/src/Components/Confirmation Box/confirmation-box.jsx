import React from "react";
import { Button, Modal } from "react-bootstrap";

const ConfirmationBox = ({ heading, message, showModal, yes, no }) => {

  const yesHandler = ()=>{
      yes();
  };

  const noHandler = ()=>{
    no();
  };
  return (
    <Modal show={showModal} onHide={noHandler}>
      <Modal.Header closeButton>
        <Modal.Title>{heading}</Modal.Title>
      </Modal.Header>
      <Modal.Body>{message}</Modal.Body>
      <Modal.Footer>
        <Button variant="danger" onClick={yesHandler}>
          Yes
        </Button>
        <Button variant="primary" onClick={noHandler}>
          No
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ConfirmationBox;
