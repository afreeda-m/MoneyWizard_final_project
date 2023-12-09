import { DatePicker } from "@mui/x-date-pickers";
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import axios from 'axios';
import moment from 'moment';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Modal from 'react-bootstrap/Modal';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import { NumericFormat } from "react-number-format";


const TransactionModalAddNew = (props) => {

  const {
    accountsData,
    categoriesData,
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
    getTransactionsByCategory,
    getAccountById,
    getCategoryById
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
    //const targetValue = event.target.name !== "notes" ? parseInt(event.target.value) : event.target.value;
    const targetValue = event.target.name === "amount" ? parseFloat(event.target.value).toFixed(2) : event.target.name !== "notes" ? parseInt(event.target.value) : event.target.value;

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

            {/* Dropdown selection for Category */}
            <Form.Group className='mb-3'>
              <Form.Label >Category</Form.Label>
              <div className="d-flex justify-content-between align-items-center">
                <Form.Select type="text" name="categoryId" onChange={handleInput} style={{ width: "70%" }}>
                  <option>Category Select</option>
                  {categoryDropdown}
                </Form.Select>
                <div className="d-flex justify-content-center" style={{ width: "20%"}} >
                  <img src={postTransactionData.categoryId ? `/images/${getCategoryById(postTransactionData.categoryId, categoriesData).logo_url}` : "/images/blue.png"} alt="category icon" />
                </div>
              </div>
            </Form.Group>

            {/* Dropdown selection for Account */}
            <Form.Group className='mb-3'>
              <Form.Label >Account</Form.Label>
              <div className="d-flex justify-content-between align-items-center">
                <Form.Select type="text" name="accountId" onChange={handleInput} style={{ width: "70%" }}>
                  <option>Account Select</option>
                  {accountDropdown}
                </Form.Select>

                <div style={{ width: "20%" }} className="d-flex justify-content-end">
                  {postTransactionData.accountId
                    ?
                    <NumericFormat
                      value={getAccountById(postTransactionData.accountId, accountsData).balance.toFixed(2)}
                      thousandSeparator={true}
                      prefix={"$"}
                      displayType={"text"}
                    />
                    :
                    null}
                </div>
              </div>
            </Form.Group>

            {/* Input field for Amount */}
            <Form.Group className='mb-3'>
              <Form.Label >Amount</Form.Label>
              <InputGroup>
                <InputGroup.Text >$</InputGroup.Text>
                <Form.Control type="number" name="amount" onChange={handleInput} />
              </InputGroup>
            </Form.Group>

            {/* Input field for Date using MUI DatePicker */}
            <Form.Group className='mb-3'>
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


            {/* Input field for Notes */}
            <Form.Group className="mb-4">
              <Form.Label >Notes</Form.Label>
              <Form.Control as="textarea" type="text" name="notes" onChange={handleInput} />
            </Form.Group>


            {/* 'Close' and 'Save' buttons for the TRANSACTION tab */}
            <div className='d-flex justify-content-around mb-2'>
              <Button variant="secondary" onClick={handleClose} style={{ border: "1px solid" }}>
                Close
              </Button>
              <Button variant="primary" onClick={handleTransactionSubmit}>
                Save
              </Button>
            </div>

          </Tab>

          {/* TRANSFER TAB using grid layout */}
          <Tab eventKey="transfer" title="TRANSFER">

            <Form.Group className="mb-3" >

              <Form.Label >From Account</Form.Label>

              <div className="d-flex justify-content-between align-items-center">
                <Form.Select type="text" name="accountId" onChange={handleInput} style={{ width: "70%" }}>
                  <option>Account Select</option>
                  {accountDropdown}
                </Form.Select>

                <div style={{ width: "20%" }} className="d-flex justify-content-end">
                  {postTransactionData.accountId
                    ?
                    <NumericFormat
                      value={getAccountById(postTransactionData.accountId, accountsData).balance.toFixed(2)}
                      thousandSeparator={true}
                      prefix={"$"}
                      displayType={"text"}
                    />
                    :
                    null}
                </div>
              </div>
            </Form.Group>
            <Form.Group className="mb-3">

              <Form.Label >To Account</Form.Label>

              <div className="d-flex justify-content-between align-items-center">
                <Form.Select type="text" name="accountToId" onChange={handleInput} style={{ width: "70%" }}>
                  <option>Account Select</option>
                  {accountDropdown}
                </Form.Select>

                <div style={{ width: "20%" }} className="d-flex justify-content-end">
                  {postTransactionData.accountToId
                    ?
                    <NumericFormat
                      value={getAccountById(postTransactionData.accountToId, accountsData).balance.toFixed(2)}
                      thousandSeparator={true}
                      prefix={"$"}
                      displayType={"text"}
                    />
                    :
                    null}
                </div>
              </div>

            </Form.Group>

            {/* Input field for Amount */}
            <Form.Group className="mb-3">

              <Form.Label >Amount</Form.Label>
              <InputGroup>
                <InputGroup.Text >$</InputGroup.Text>
                <Form.Control type="number" name="amount" onChange={handleInput} />
              </InputGroup>
            </Form.Group>


            {/* Input field for Date using MUI DatePicker */}
            <Form.Group className="mb-3">
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


            {/* Input field for Notes */}
            <Form.Group className="mb-4">
              <Form.Label >Notes</Form.Label>
              <Form.Control as="textarea" type="text" name="notes" onChange={handleInput} />
            </Form.Group>

            {/* 'Close' and 'Save' buttons for the TRANSFER tab */}
            <div className='d-flex justify-content-around mb-2'>
              <Button variant="secondary" onClick={handleClose} style={{ border: "1px solid" }}>
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