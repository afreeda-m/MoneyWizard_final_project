import moment from 'moment';
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import DatePickerBox from './DatePickerBox';
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
    postTransactionData
  } = props;

  // list of categories for the dropdown selection
  const categoryDropdown = categories.map((category) => {
    return (
      <option key={category.id}>{category.category_name}</option>
    );
  });

  // list of accounts for the dropdown selection
  const accountDropdown = accounts.map((account) => {
    return (
      <option key={account.id}>{account.account_name}</option>
    );
  });

  // Function to update transaction_date for DatePicker
  const handleDateChange = (newDate) => {
    setPostTransactionData({ ...postTransactionData, transaction_date: newDate });
    pickTransactionDate(newDate);
  };

  const handleEditSubmit = () => {

    axios.post();

    toggleEditTransactionModal();
  };


  return (

    // Adjust styling for the modal. Move 130px to the right and center vertically
    <Modal style={{ marginLeft: "130px" }} show={isEditTransactionModalOpen} onHide={toggleEditTransactionModal} size="md" centered >

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
              <Form.Select >
                <option>
                  {chosenTransaction && getCategoryNameById(chosenTransaction.category_id, categories)}
                </option>
                {categoryDropdown}

              </Form.Select>
            </Form.Group>

            {/* Dropdown selection for Account */}
            <Form.Group xs={6} as={Col}>
              <Form.Label >Account</Form.Label>
              <Form.Select >
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
                <Form.Control defaultValue={chosenTransaction && chosenTransaction.amount} />
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
              <Form.Control as="textarea" defaultValue={chosenTransaction && chosenTransaction.notes} />
            </Form.Group>
          </Row>

        </Form>

      </Modal.Body>

      <Modal.Footer className='d-flex justify-content-center'>
        <Button variant="secondary" onClick={toggleEditTransactionModal}>
          Cancel
        </Button>
        <Button variant="success" onClick={handleEditSubmit}>
          Update
        </Button>
      </Modal.Footer>

    </Modal>
  );

};

export default TransactionModalEditTransaction;