import React, { useState } from "react";
import { Button, Modal } from "react-bootstrap";

function AccountsModal(props) {

  const { show, modalClose, modalShow } = props;

  // const [show, setShow] = useState(false);

  // const modalClose = () => setShow(false);
  // const modalShow = () => setShow(true);

  return (
    <div className="App p-4">
      <Modal centered show={show} onHide={modalClose}>
        <Modal.Header closeButton>
          <Modal.Title>Modal Title</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <p>Modal Content.</p>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={modalClose}>
            Close Modal
          </Button>
          <Button variant="primary">Save changes</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default AccountsModal;
