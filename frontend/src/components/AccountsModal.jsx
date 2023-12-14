import axios from "axios";
import React from "react";
import Form from "react-bootstrap/Form";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';


function AccountsModal(props) {

  const {
    isAddAccountModalOpen,
    toggleAddAccountModal,
    postAccountData,
    setPostAccountData,
    getAccounts
  } = props;

  // Function handle closing action
  const handleClose = () => {
    // Reset postAccountData
    setPostAccountData({
      account_name: null,
      balance: 0,
      user_id: null,
      note: null
    });
    // Close the Modal
    toggleAddAccountModal();
  };

  // Function to update postAccountData upon input on the Modal
  const handleInput = (event) => {
    const targetValue = event.target.value;
    setPostAccountData({ ...postAccountData, [event.target.name]: targetValue });

  };

  // Function handle submit action
  const handleSubmit = (event) => {

    event.preventDefault();
    // Make a post request to BE
    axios.post('/accounts/add', postAccountData)
      .then(() => {
        getAccounts();
      })
      .catch((error) => {
        console.error("Error adding new Account:", error);
      });
    // Reset postAccountData state
    setPostAccountData({
      account_name: null,
      balance: 0,
      user_id: null,
      note: null
    });
    // Close the Modal
    toggleAddAccountModal();
  };

  return (
    <div className="App p-4">
      <Modal style={{ marginLeft: "130px" }} show={isAddAccountModalOpen} onHide={handleClose} size="md" centered >
        <Modal.Header className='d-flex justify-content-center'>
          <Modal.Title>Add New Account</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Form>
            <Form.Group>
              <Form.Label>Account Name</Form.Label>
              <Form.Control name="account_name" onChange={handleInput} />
            </Form.Group>

            <Form.Group>
              <Form.Label>Initial Balance</Form.Label>
              <Form.Control name="balance" onChange={handleInput} />
            </Form.Group>

            <Form.Group>
              <Form.Label>Notes</Form.Label>
              <Form.Control as="textarea" name="note" onChange={handleInput} />
            </Form.Group>
          </Form>
        </Modal.Body>

        <Modal.Footer className="d-flex justify-content-around">
          <Button variant="secondary" onClick={handleClose} style={{ border: "1px solid" }}>
            Close
          </Button>
          <Button form="account-form" variant="primary" onClick={handleSubmit}>
            Save
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default AccountsModal;
