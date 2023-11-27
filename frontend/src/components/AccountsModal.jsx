import React, { useState } from "react";
import { Button, Modal } from "react-bootstrap";

function AccountsModal(props) {
  const { show, modalClose, modalShow } = props;

  return (
    <div className="App p-4">
      <Modal centered show={show} onHide={modalClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add Account</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <form>
            <div class="form-group">
              <label for="recipient-name" class="col-form-label">
                Account Name:
              </label>
              <input type="text" class="form-control" id="recipient-name" />
            </div>
            <div class="form-group">
              <label for="message-text" class="col-form-label">
                Balance:
              </label>
              <textarea class="form-control" id="message-text"></textarea>
            </div>
          </form>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={modalClose}>
            Close
          </Button>
          <Button variant="primary">Save</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default AccountsModal;
