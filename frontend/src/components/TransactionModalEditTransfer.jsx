import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import moment from 'moment';



const TransactionModalEditTransfer = (props) => {

  const {
    isEditTransferModalOpen,
    toggleEditTransferModal,
    accounts,
    chosenTransaction,
    getAccountNameById
  } = props;

  // list of accounts for the dropdown selection
  const accountDropdown = accounts.map((account) => {
    return (
      <option key={account.id}>{account.account_name}</option>
    );
  });

  return (

    // Adjust styling for the modal. Move 130px to the right and center vertically
    <Modal style={{ marginLeft: "130px" }} show={isEditTransferModalOpen} onHide={toggleEditTransferModal} size="md" centered >

      <Modal.Header className='d-flex justify-content-center'>
        <Modal.Title>EDIT TRANSFER</Modal.Title>
      </Modal.Header>

      <Modal.Body>

        <Form>

          {/* 2 input fields in the same row for Category selection, Account selection */}
          <Row className='d-flex align-items-center mb-3' >

            {/* Placeholder for category logo when a category is selected
                <Col className='d-flex justify-content-center' xs={2}>
                  <img src="bank.png" />
                </Col> */}

            {/* Dropdown selection for Category */}
            <Form.Group xs={6} as={Col}>
              <Form.Label >From Account</Form.Label>
              <Form.Select >
                <option>
                  {chosenTransaction && getAccountNameById(chosenTransaction.account_id, accounts)}
                </option>
                {accountDropdown}
              </Form.Select>
            </Form.Group>

            {/* Dropdown selection for Account */}
            <Form.Group xs={6} as={Col}>
              <Form.Label >To Account</Form.Label>
              <Form.Select >
                <option>
                  {chosenTransaction && chosenTransaction.type === "Transfer" && getAccountNameById(chosenTransaction.account_to_id, accounts)}
                </option>
                {accountDropdown}

              </Form.Select>
            </Form.Group>

          </Row>

          {/* Input field for Amount */}
          <Row className="mb-3">
            <Form.Group as={Col}>

              <Form.Label >Amount</Form.Label>
              <InputGroup>
                <InputGroup.Text >$</InputGroup.Text>
                <Form.Control defaultValue={chosenTransaction && chosenTransaction.amount} />
              </InputGroup>
            </Form.Group>
          </Row>

          {/* Input field for Date */}
          <Row className="mb-3">
            <Form.Group as={Col}>
              <Form.Label >Date</Form.Label>
              <Form.Control defaultValue={chosenTransaction && moment(chosenTransaction.transaction_date).format("YYYY-MM-DD")} />
            </Form.Group>
          </Row>

          {/* Input field for Notes */}
          <Row className="mb-3">
            <Form.Group as={Col}>
              <Form.Label >Notes</Form.Label>
              <Form.Control as="textarea" defaultValue={chosenTransaction && chosenTransaction.notes} />
            </Form.Group>
          </Row>

        </Form>

      </Modal.Body>

      <Modal.Footer className='d-flex justify-content-center'>
        <Button variant="secondary" onClick={toggleEditTransferModal}>
          Cancel
        </Button>
        <Button variant="success" onClick={toggleEditTransferModal}>
          Update
        </Button>
      </Modal.Footer>

    </Modal>
  );

};

export default TransactionModalEditTransfer;