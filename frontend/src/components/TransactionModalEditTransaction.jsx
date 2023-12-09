import moment from 'moment';
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import { NumericFormat } from "react-number-format/";
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { DatePicker } from "@mui/x-date-pickers";


const TransactionModalEditTransaction = (props) => {

  const {
    accountsData,
    categoriesData,
    isEditTransactionModalOpen,
    toggleEditTransactionModal,
    chosenTransaction,
    transactionDate,
    pickTransactionDate,
    setPostTransactionData,
    postTransactionData,
    getTransactions,
    getAccounts,
    getTransactionsByCategory,
    getAccountById,
    getCategoryById
  } = props;

  // list of categories for the dropdown selection
  const categoryDropdown = categoriesData.map((category) => {
    return (
      <option key={category.id} value={category.id}>
        {category.category_name}
      </option>
    );
  });

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
    // Close the Modal
    toggleEditTransactionModal();
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
    const targetValue =
      event.target.name === "amount"
        ? parseFloat(event.target.value).toFixed(2)
        : event.target.name !== "notes"
          ? parseInt(event.target.value)
          : event.target.value;
    // Update postTransactionData state on each input change
    setPostTransactionData({ ...postTransactionData, [event.target.name]: targetValue });
  };

  // When submit the form, make a post call to DB then reset the postTransactionData and close the Modal
  const handleSubmit = (event) => {

    event.preventDefault();
    // Post edited transaction to DB
    axios.post(`/transactions/${chosenTransaction.id}/edit`, postTransactionData)
      .then(() => {
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
    // Close the Modal
    toggleEditTransactionModal();
  };


  return (

    // Adjust styling for the modal. Move 130px to the right and center vertically
    <Modal
      style={{ marginLeft: "130px" }}
      show={isEditTransactionModalOpen}
      onHide={handleClose}
      onShow={handleOpen}
      size="md"
      centered
    >

      <Modal.Header className='d-flex justify-content-center'>
        <Modal.Title>EDIT TRANSACTION</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <Form>

          {/* Dropdown selection for Category */}
          <div className="d-flex justify-content-between " style={{ width: "100%" }}>
            <Form.Group className='mb-3' style={{ width: "70%" }}>
              <Form.Label >Category</Form.Label>
              <div className="d-flexalign-items-center">
                <Form.Select type="text" name="categoryId" onChange={handleInput}>
                  <option>
                    {chosenTransaction && getCategoryById(chosenTransaction.category_id, categoriesData).category_name}
                  </option>
                  {categoryDropdown}
                </Form.Select>
              </div>
            </Form.Group>

            <div className="d-flex justify-content-center align-items-center" style={{ width: "30%" }} >
              <img src={postTransactionData.categoryId ? `/images/${getCategoryById(postTransactionData.categoryId, categoriesData).logo_url}` : "/images/blue.png"} alt="category icon" style={{ height: "64px" }} />
            </div>
          </div>

          {/* Dropdown selection for Account */}
          <Form.Group className="mb-3">
            <Form.Label >Account</Form.Label>
            <div className="d-flex justify-content-between align-items-center">
              <Form.Select type="text" name="accountId" onChange={handleInput} style={{ width: "70%" }}>
                <option>
                  {chosenTransaction && getAccountById(chosenTransaction.account_id, accountsData).account_name}
                </option>
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
        <Button variant="secondary" onClick={toggleEditTransactionModal} style={{ border: "1px solid" }}>
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