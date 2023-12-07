import { DatePicker } from "@mui/x-date-pickers";
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import axios from 'axios';
import moment from 'moment';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Modal from 'react-bootstrap/Modal';
import Row from 'react-bootstrap/Row';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';


const TransactionModalAddNew = (props) => {

  const {
    isAddTransactionModalOpen,
    toggleAddNewModal,
    categories,
    accounts,
    transactionDate,
    pickTransactionDate,
    chosenTransaction,
    getTransactions,
    setPostTransactionData,
    postTransactionData,
    getAccounts,
    getTransactionsByCategory
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

  // Function to handle the onChange event
  const handleInput = (event) => {

    // Convert data to number expect for notes
    const targetValue = event.target.name !== "notes" ? parseInt(event.target.value) : event.target.value;
    // const targetValue = event.target.name === "amount" ? parseFloat(event.target.value).toFixed(2) : event.target.name !== "notes" ? parseInt(event.target.value) : event.target.value;

    // Update postTransactionData state on each input change
    setPostTransactionData({ ...postTransactionData, [event.target.name]: targetValue });

  };

  // Function to close modal and reset transactionDate state to current date
  const handleClose = () => {

    // Reset postTransactionData to default on Modal close
    setPostTransactionData({
      categoryId: null,
      accountId: null,
      accountToId: null,
      amount: null,
      transaction_date: moment(),
      notes: ''
    });

    // Reset transactionDate state to current date
    pickTransactionDate(moment());

    toggleAddNewModal();

  };

  // Function to update transaction_date for DatePicker
  const handleDateChange = (newDate) => {
    setPostTransactionData({ ...postTransactionData, transaction_date: newDate });
    pickTransactionDate(newDate);
  };


  // Function to submit new transaction data to backend and then close the Add New Modal
  const handleTransactionSubmit = (event) => {

    event.preventDefault();

    axios.post('/transactions/add', postTransactionData)
      .then((response) => {
        // Invoke getTransactions function to update transactionsData state
        getTransactions();
        getAccounts();
        getTransactionsByCategory();
      })
      .catch((error) => {
        console.error("Error posting new transaction to backend:", error);
      });

    // Reset 'postTransactionData' state to default - avoid resubmitting the same data
    setPostTransactionData({
      categoryId: null,
      accountId: null,
      accountToId: null,
      amount: null,
      transaction_date: moment(),
      notes: ''
    });

    toggleAddNewModal();
  };


  // Function to submit new transfer data to backend and then close the Add New Modal
  const handleTransferSubmit = (event) => {

    event.preventDefault();

    axios.post('/transfer/add', { ...postTransactionData, categoryId: 20 })
      .then((response) => {
        // Invoke getTransactions function to update transactionsData state
        getTransactions();
        getAccounts();
        getTransactionsByCategory();
      })
      .catch((error) => {
        console.error("Error posting new transaction to backend:", error);
      });

    // Reset 'postTransactionData' state to default - avoid resubmitting the same data
    setPostTransactionData({
      categoryId: null,
      accountId: null,
      accountToId: null,
      amount: null,
      transaction_date: moment(),
      notes: ''
    });

    toggleAddNewModal();
  };



  return (

    // Adjust styling for the modal. Move 130px to the right and center vertically
    <Modal style={{ marginLeft: "130px" }} show={isAddTransactionModalOpen} onHide={handleClose} size="md" centered >

      <Modal.Header className='d-flex justify-content-center'>
        <Modal.Title>ADD NEW TRANSACTION</Modal.Title>
      </Modal.Header>

      <Modal.Body>

        {/* This modal has TWO tabs: TRANSACTION and TRANSFER */}
        <Tabs defaultActiveKey="transaction" transition={false} className="mb-3" justify >

          {/* TRANSACTION TAB using grid layout */}
          <Tab eventKey="transaction" title="TRANSACTION">

            {/* 2 input fields in the same row for Category selection, Account selection */}
            <Row className='mb-3' >

              {/* Dropdown selection for Category */}
              <Form.Group xs={6} as={Col}>
                <Form.Label >Category</Form.Label>
                <Form.Select type="text" name="categoryId" onChange={handleInput} required>
                  <option>Category Select</option>
                  {categoryDropdown}

                </Form.Select>
              </Form.Group>

              {/* Dropdown selection for Account */}
              <Form.Group xs={6} as={Col}>
                <Form.Label >Account</Form.Label>
                <Form.Select type="text" name="accountId" onChange={handleInput} >
                  <option>Account Select</option>
                  {accountDropdown}

                </Form.Select>
              </Form.Group>

            </Row>

            {/* Input field for Amount */}
            <Row className="mb-3" >
              <Form.Group as={Col}>
                <Form.Label >Amount</Form.Label>
                <InputGroup>
                  <InputGroup.Text >$</InputGroup.Text>
                  <Form.Control type="number" name="amount" onChange={handleInput} />
                </InputGroup>
              </Form.Group>
            </Row>

            {/* Input field for Date using MUI DatePicker */}
            <Row className="mb-3">
              <Form.Group as={Col}>
                <Form.Label  >Date</Form.Label>
                {/* Date picker box */}
                <div >
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
            <Row className="mb-4">
              <Form.Group as={Col}>
                <Form.Label >Notes</Form.Label>
                <Form.Control as="textarea" type="text" name="notes" onChange={handleInput} />
              </Form.Group>
            </Row>

            {/* 'Close' and 'Save' buttons for the TRANSACTION tab */}
            <div className='d-flex justify-content-around mb-2'>
              <Button variant="secondary" onClick={handleClose}>
                Close
              </Button>
              <Button variant="primary" onClick={handleTransactionSubmit}>
                Save
              </Button>
            </div>

          </Tab>

          {/* TRANSFER TAB using grid layout */}
          <Tab eventKey="transfer" title="TRANSFER">

            <Row className="mb-3">

              <Form.Group xs={6} as={Col} >
                <Form.Label >From Account</Form.Label>
                <Form.Select type="text" name="accountId" onChange={handleInput}>
                  <option>Account Select</option>
                  {accountDropdown}

                </Form.Select>
              </Form.Group>

              <Form.Group xs={6} as={Col} >
                <Form.Label >To Account</Form.Label>
                <Form.Select type="text" name="accountToId" onChange={handleInput} >
                  <option>Account Select</option>
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
                  <Form.Control type="number" name="amount" onChange={handleInput} />
                </InputGroup>
              </Form.Group>
            </Row>

            {/* Input field for Date using MUI DatePicker */}
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
            <Row className="mb-4">
              <Form.Group as={Col}>
                <Form.Label >Notes</Form.Label>
                <Form.Control as="textarea" type="text" name="notes" onChange={handleInput} />
              </Form.Group>
            </Row>

            {/* 'Close' and 'Save' buttons for the TRANSFER tab */}
            <div className='d-flex justify-content-around mb-2'>
              <Button variant="secondary" onClick={handleClose}>
                Close
              </Button>
              <Button variant="primary" onClick={handleTransferSubmit}>
                Save
              </Button>
            </div>

          </Tab>

        </Tabs>
      </Modal.Body>

    </Modal>
  );

};

export default TransactionModalAddNew;