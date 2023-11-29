import axios from "axios";
import React, { useEffect, useState } from "react";
import { Button, Modal } from "react-bootstrap";

function AccountsModal(props) {
  const { show, modalClose, modalShow, updateAccounts } = props;

  const [formData, setFormData] = useState({});

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
        axios.get("/accounts").then((response) => {
          updateAccounts(response.data.accounts);
        });
      })
      .catch(function (error) {
        console.log(error);
      });


    setFormData(value);
    modalClose();
  };

  // useEffect(() => {}, []);

  return (
    <div className="App p-4">
      <Modal centered show={show} onHide={modalClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add Account</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <form id="account-form" onSubmit={submitForm}>
            <div class="form-group">
              <label for="recipient-name" class="col-form-label">
                Account Name:
              </label>
              <input
                type="text"
                name="accountName"
                class="form-control"
                id="account-name"
              />
            </div>
            <div class="form-group">
              <label for="message-text" class="col-form-label">
                Balance:
              </label>
              <input
                class="form-control"
                name="balance"
                id="account-balance"
              ></input>
            </div>
            <div class="form-group">
              <label for="message-text" class="col-form-label">
                Notes:
              </label>
              <input
                class="form-control"
                name="notes"
                id="account-notes"
              ></input>
            </div>
          </form>
        </Modal.Body>

        <Modal.Footer>
          <div>
            <Button variant="secondary" type="button" onClick={modalClose}>
              Close
            </Button>
            <Button type="submit" form="account-form" variant="primary">
              Save
            </Button>
          </div>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default AccountsModal;
