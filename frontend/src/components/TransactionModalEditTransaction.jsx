import moment from 'moment';
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { DatePicker } from "@mui/x-date-pickers";


const TransactionModalEditTransaction = (props) => {

  const {
    isEditTransactionModalOpen,
    toggleEditTransactionModal,
    categories,
    accounts,
    chosenTransaction,
    getCategoryNameById,
    getAccountNameById,
    transactionDate,
    pickTransactionDate,
    setPostTransactionData,
    postTransactionData,
    getTransactions,
    getAccounts
  } = props;

  // list of categories for the dropdown selection
  const categoryDropdown = categories.map((category) => {
    return (
      <option key={category.id} value={category.id}>
        {category.category_name}
      </option>
    );
  });

  // list of accounts for the dropdown selection
  const accountDropdown = accounts.map((account) => {
    return (
      <option key={account.id} value={account.id}>
        {account.account_name}
      </option>
    );
  });

  // Function to update transaction_date for DatePicker
  const handleDateChange = (newDate) => {
    setPostTransactionData({ ...postTransactionData, transaction_date: newDate });
    pickTransactionDate(newDate);
  };

  // Update postTransactionData state to the target Transaction for editing when opening the Modal
  const handleOpen = () => {
    setPostTransactionData({
      categoryId: chosenTransaction.category_id,
      accountId: chosenTransaction.account_id,
      accountToId: chosenTransaction.account_to_id,
      amount: chosenTransaction.amount,
      transaction_date: moment(chosenTransaction.transaction_date),
      notes: chosenTransaction.notes
    });
  };

  // Update postTransactionDate whenever there is a change in the form
  const handleInput = (event) => {

    // Convert data to number expect for notes
    const targetValue = event.target.name !== "notes" ? parseInt(event.target.value) : event.target.value;

    // Update postTransactionData state on each input change
    setPostTransactionData({ ...postTransactionData, [event.target.name]: targetValue });
  };

  const handleSubmit = (event) => {

    event.preventDefault();

    axios.post(`/transactions/${chosenTransaction.id}/edit`, postTransactionData)
      .then((response) => {
        getTransactions();
        getAccounts();
      })
      .catch((error) => {
        console.error("Error editing transaction:", error);
      });

    // Reset 'postTransactionData' state to default after submitting data to backend
    setPostTransactionData({
      categoryId: null,
      accountId: null,
      accountToId: null,
      amount: null,
      transaction_date: moment(),
      notes: ''
    });

    toggleEditTransactionModal();
  };


  return (

    // Adjust styling for the modal. Move 130px to the right and center vertically
    <Modal
      style={{ marginLeft: "130px" }}
      show={isEditTransactionModalOpen}
      onHide={toggleEditTransactionModal}
      onShow={handleOpen}
      size="md"
      centered
    >

      <Modal.Header className='d-flex justify-content-center'>
        <Modal.Title>EDIT TRANSACTION</Modal.Title>
      </Modal.Header>

      <Modal.Body>

        <Form>

          {/* 2 input fields in the same row for Category selection, Account selection */}
          <Row className='d-flex align-items-center mb-3' >

            {/* Dropdown selection for Category */}
            <Form.Group xs={6} as={Col}>
              <Form.Label >Category</Form.Label>
              <Form.Select type="text" name="categoryId" onChange={handleInput} >
                <option>
                  {chosenTransaction && getCategoryNameById(chosenTransaction.category_id, categories)}
                  {/* {getCategoryNameById(postTransactionData.category_id, categories)} */}
                </option>
                {categoryDropdown}

              </Form.Select>
            </Form.Group>

            {/* Dropdown selection for Account */}
            <Form.Group xs={6} as={Col}>
              <Form.Label >Account</Form.Label>
              <Form.Select type="text" name="accountId" onChange={handleInput} >
                <option>
                  {chosenTransaction && getAccountNameById(chosenTransaction.account_id, accounts)}
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
                <Form.Control
                  name="amount"
                  onChange={handleInput}
                  defaultValue={chosenTransaction && chosenTransaction.amount}
                />
              </InputGroup>
            </Form.Group>
          </Row>

          {/* Input field for Date */}
          <Row className="mb-3">
            <Form.Group as={Col}>
              <Form.Label >Date</Form.Label>
              {/* Date picker box */}
              <div>
                <LocalizationProvider dateAdapter={AdapterMoment}>
                  <DatePicker
                    sx={{ width: "50%" }}
                    value={chosenTransaction ? moment(chosenTransaction.transaction_date) : transactionDate}
                    onChange={handleDateChange}
                  />
                </LocalizationProvider>
              </div>
            </Form.Group>
          </Row>

          {/* Input field for Notes */}
          <Row className="mb-3">
            <Form.Group as={Col}>
              <Form.Label >Notes</Form.Label>
              <Form.Control
                as="textarea"
                name="notes"
                onChange={handleInput}
                defaultValue={chosenTransaction && chosenTransaction.notes}
              />
            </Form.Group>
          </Row>

        </Form>

      </Modal.Body>

      <Modal.Footer className='d-flex justify-content-center'>
        <Button variant="secondary" onClick={toggleEditTransactionModal}>
          Cancel
        </Button>
        <Button variant="primary" onClick={handleSubmit}>
          Update
        </Button>
      </Modal.Footer>

    </Modal>
  );

};

export default TransactionModalEditTransaction;