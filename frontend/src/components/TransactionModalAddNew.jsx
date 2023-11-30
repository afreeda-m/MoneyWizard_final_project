import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import DatePickerBox from './DatePickerBox';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import moment from 'moment';
import { useState } from 'react';
import axios from 'axios';


const TransactionModalAddNew = (props) => {

  const {
    isAddTransactionModalOpen,
    toggleAddNewModal,
    categories,
    accounts,
    transactionDate,
    pickTransactionDate
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


  // state of post data, to be moved to useReducer
  const [post, setPost] = useState({
    categoryId: null,
    accountId: null,
    accountToId: null,
    amount: null,
    transaction_date: transactionDate,
    notes: ''
  });

  // Function to handle the onChange event
  const handleInput = (event) => {

    const targetValue = event.target.name !== "notes" ? parseInt(event.target.value) : event.target.value;
    setPost({ ...post, [event.target.name]: targetValue });

  };

  // Function to close modal and reset transactionDate state to current date
  const handleClose = () => {

    toggleAddNewModal();
    // pickTransactionDate(moment());

  };



  // Function to submit new transaction data to backend and then close the Add New Modal
  const handleTransactionSubmit = (event) => {

    // console.log(event);
    // console.log('log inside handleTransSubmit:', moment(transactionDate).format("YYYY-MM-DD"));

    event.preventDefault();

    axios.post('http://localhost:8080/transactions/add', { post })
      .then((response) => {
        console.log('logging response param from handleTransactionSubmit', response);
      })
      .catch((error) => {
        console.error("Error posting new transaction to backend:", error);
      });

    toggleAddNewModal();
  };


  // Function to submit new transfer data to backend and then close the Add New Modal
  const handleTransferSubmit = (event) => {

    event.preventDefault();

    axios.post('http://localhost:8080/transactions/transfer', { post })
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.error("Error posting new transaction to backend:", error);
      });

    toggleAddNewModal();
  };



  return (

    // Adjust styling for the modal. Move 130px to the right and center vertically
    <Modal style={{ marginLeft: "130px" }} show={isAddTransactionModalOpen} onHide={handleClose} size="md" centered >

      <Modal.Header className='d-flex justify-content-center'>
        <Modal.Title>ADD NEW</Modal.Title>
      </Modal.Header>

      <Modal.Body>

        {/* This modal has two tabs: Transaction and Transfer */}
        <Tabs defaultActiveKey="transaction" transition={false} className="mb-3" justify >

          {/* TRANSACTION TAB using grid layout */}
          <Tab eventKey="transaction" title="TRANSACTION">

            <Form >

              {/* 2 input fields in the same row for Category selection, Account selection */}
              <Row className='mb-3' >

                {/* Dropdown selection for Category */}
                <Form.Group xs={6} as={Col}>
                  <Form.Label >Category</Form.Label>
                  <Form.Select type="text" name="categoryId" onChange={handleInput}>
                    <option> </option>
                    {categoryDropdown}

                  </Form.Select>
                </Form.Group>

                {/* Dropdown selection for Account */}
                <Form.Group xs={6} as={Col}>
                  <Form.Label >Account</Form.Label>
                  <Form.Select type="text" name="accountId" onChange={handleInput} >
                    <option> </option>
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

              {/* Input field for Date */}
              <Row className="mb-3">
                <Form.Group as={Col}>
                  <Form.Label  >Date</Form.Label>
                  {/* Date picker box */}
                  <div >
                    <LocalizationProvider dateAdapter={AdapterMoment}>
                      <DatePickerBox
                        transactionDate={transactionDate}
                        pickTransactionDate={pickTransactionDate}
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

            </Form>
            <div className='d-flex justify-content-around mb-2'>
              <Button variant="secondary" onClick={handleClose}>
                Close
              </Button>
              <Button variant="success" onClick={handleTransactionSubmit}>
                Save
              </Button>
            </div>
          </Tab>

          {/* TRANSFER TAB using grid layout */}
          <Tab eventKey="transfer" title="TRANSFER">

            <Row className="mb-3">

              <Form.Group xs={6} as={Col} >
                <Form.Label >From Account</Form.Label>
                <Form.Select >
                  <option> </option>
                  {accountDropdown}

                </Form.Select>
              </Form.Group>

              <Form.Group xs={6} as={Col} >
                <Form.Label >To Account</Form.Label>
                <Form.Select >
                  <option> </option>
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
                  <Form.Control />
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
                    <DatePickerBox
                      transactionDate={transactionDate}
                      pickTransactionDate={pickTransactionDate}
                    />
                  </LocalizationProvider>
                </div>
              </Form.Group>
            </Row>

            {/* Input field for Notes */}
            <Row className="mb-4">
              <Form.Group as={Col}>
                <Form.Label >Notes</Form.Label>
                <Form.Control as="textarea" />
              </Form.Group>
            </Row>

            <div className='d-flex justify-content-around mb-2'>
              <Button variant="secondary" onClick={handleClose}>
                Close
              </Button>
              <Button variant="success" onClick={handleTransferSubmit}>
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