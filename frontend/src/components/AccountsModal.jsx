import axios from "axios";
import React from "react";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';


function AccountsModal(props) {
  const { show, modalClose, getAccounts } = props;

  const submitForm = (event) => {
    event.preventDefault();

    const value = {
      account_name: event.target.accountName.value,
      balance: event.target.balance.value,
      note: event.target.notes.value,
    };

    axios({
      method: "post",
      url: "/accounts/add",
      header: {
        "Content-Type": "application/json",
      },
      data: value,
    })
      .then((response) => {
        getAccounts();
      })
      .catch(function(error) {
        console.log(error);
      });

    modalClose();
  };

  return (
    <div className="App p-4">
      <Modal style={{ marginLeft: "130px" }} show={show} onHide={modalClose} size="md" centered >
        <Modal.Header className='d-flex justify-content-center'>
          <Modal.Title>Add New Account</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <form id="account-form" onSubmit={submitForm}>

            <div class="form-group">
              <label for="recipient-name" class="col-form-label">
                Account Name
              </label>
              <input type="text" name="accountName" class="form-control" id="account-name" />
            </div>

            <div class="form-group">
              <label for="message-text" class="col-form-label">
                Balance
              </label>
              <div class="input-group">
                <div class="input-group-prepend">
                  <span class="input-group-text">$</span>
                </div>
                <input class="form-control" name="balance" id="account-balance" />
              </div>
            </div>

            <div class="form-group">
              <label for="message-text" class="col-form-label">
                Notes
              </label>
              <input class="form-control" name="notes" id="account-notes" />
            </div>

          </form>
        </Modal.Body>

        <Modal.Footer className="d-flex justify-content-around">
          <Button className="accounts-modal" variant="secondary" type="button" onClick={modalClose}>
            Close
          </Button>
          <Button type="submit" form="account-form" variant="primary">
            Save
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default AccountsModal;
