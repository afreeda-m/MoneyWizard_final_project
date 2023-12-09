import moment from 'moment';
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { DatePicker } from "@mui/x-date-pickers";
import { NumericFormat } from "react-number-format";


const TransactionModalEditTransfer = (props) => {

  const {
    accountsData,
    isEditTransferModalOpen,
    toggleEditTransferModal,
    chosenTransaction,
    transactionDate,
    pickTransactionDate,
    setPostTransactionData,
    postTransactionData,
    getTransactions,
    getAccounts,
    getTransactionsByCategory,
    getAccountById,
  } = props;

  // list of accounts for the dropdown selection
  const accountDropdown = accountsData.map((account) => {
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
      accountToId: chosenTransaction.account_id_to,
      amount: chosenTransaction.amount,
      transaction_date: moment(chosenTransaction.transaction_date),
      notes: chosenTransaction.notes
    });
  };

  // Update postTransactionDate whenever there is a change in the form
  const handleInput = (event) => {

    // Convert data to number expect for notes
    const targetValue = event.target.name === "amount" ? parseFloat(event.target.value).toFixed(2) : event.target.name !== "notes" ? parseInt(event.target.value) : event.target.value;

    // Update postTransactionData state on each input change
    setPostTransactionData({ ...postTransactionData, [event.target.name]: targetValue });
  };


  const handleSubmit = (event) => {

    event.preventDefault();

    axios.post(`/transfer/${chosenTransaction.id}/edit`, postTransactionData)
      .then((response) => {
        getTransactions();
        getAccounts();
        getTransactionsByCategory();
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

    toggleEditTransferModal();
  };

  return (

    // Adjust styling for the modal. Move 130px to the right and center vertically
    <Modal
      style={{ marginLeft: "130px" }}
      show={isEditTransferModalOpen}
      onHide={toggleEditTransferModal}
      onShow={handleOpen}
      size="md"
      centered >

      <Modal.Header className='d-flex justify-content-center'>
        <Modal.Title>EDIT TRANSFER</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <Form>

          {/* Dropdown selection for Category */}
          <Form.Group className="mb-3">
            <Form.Label >From Account</Form.Label>

            <div className="d-flex justify-content-between align-items-center">
              <Form.Select type="text" name="accountId" onChange={handleInput} style={{ width: "70%" }}>
                <option>{chosenTransaction && getAccountById(chosenTransaction.account_id, accountsData).account_name}</option>
                {accountDropdown}
              </Form.Select>

              <div style={{ width: "30%" }} className="d-flex justify-content-center">
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

          {/* Dropdown selection for Account */}
          <Form.Group className="mb-3">
            <Form.Label >To Account</Form.Label>

            <div className="d-flex justify-content-between align-items-center">
              <Form.Select type="text" name="accountToId" onChange={handleInput} style={{ width: "70%" }}>
                <option>
                  {chosenTransaction && chosenTransaction.account_id_to && getAccountById(chosenTransaction.account_id_to, accountsData).account_name}
                </option>
                {accountDropdown}
              </Form.Select>

              <div style={{ width: "30%" }} className="d-flex justify-content-center">
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
              <Form.Control
                name="amount"
                onChange={handleInput}
                defaultValue={chosenTransaction && chosenTransaction.amount}
              />
            </InputGroup>
          </Form.Group>


          {/* Input field for Date */}

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

          <Form.Group className="mb-3">
            <Form.Label >Notes</Form.Label>
            <Form.Control
              as="textarea"
              name="notes"
              onChange={handleInput}
              defaultValue={chosenTransaction && chosenTransaction.notes}
            />
          </Form.Group>


        </Form>

      </Modal.Body>

      <Modal.Footer className='d-flex justify-content-around'>
        <Button variant="secondary" onClick={toggleEditTransferModal} style={{ border: "1px solid" }}>
          Cancel
        </Button>
        <Button variant="primary" onClick={handleSubmit}>
          Update
        </Button>
      </Modal.Footer>

    </Modal>
  );

};

export default TransactionModalEditTransfer;