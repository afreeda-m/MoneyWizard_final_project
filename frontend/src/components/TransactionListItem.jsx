import MoreVertIcon from '@mui/icons-material/MoreVert';
import axios from "axios";
import moment from 'moment';
import React from "react";
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Dropdown from 'react-bootstrap/Dropdown';
import Image from 'react-bootstrap/Image';
import Row from 'react-bootstrap/Row';
import ListGroupItem from "react-bootstrap/esm/ListGroupItem";
import { NumericFormat } from "react-number-format";
import "../styles/TransactionListItem.scss";

const TransactionListItem = (props) => {

  const {
    categoryIcon,
    categoryName,
    categoryType,
    accountName,
    accountToName,
    amount,
    notes,
    date,
    toggleEditTransferModal,
    isEditTransferModalOpen,
    toggleEditTransactionModal,
    isEditTransactionModalOpen,
    chooseTransaction,
    transaction,
    getTransactions,
    disableEditingAndDeleting,
    getAccounts,
    getTransactionsByCategory
  } = props;


  // Function to toggle Edit Transaction Modal
  const handleTransactionEdit = () => {
    !isEditTransactionModalOpen && chooseTransaction(transaction);
    !isEditTransactionModalOpen && toggleEditTransactionModal && toggleEditTransactionModal();
  };

  // Function to toggle Edit Transfer Modal
  const handleTransferEdit = () => {
    !isEditTransferModalOpen && chooseTransaction(transaction);
    !isEditTransferModalOpen && toggleEditTransferModal && toggleEditTransferModal();
  };

  // Function to delete transaction/transfer from database
  const handleDelete = () => {
    axios.post(`/transactions/${transaction.id}/delete`)
      .then((response) => {
        getTransactions();
        getAccounts();
        getTransactionsByCategory();
      })
      .catch((error) => {
        console.error('Error deleting data:', error);
      });
  };



  return (
    <ListGroupItem className="p-2" style={{ width: "100%" }} >
      <Container>

        <Row className="d-flex align-items-center">

          <Col className="d-flex justify-content-center" xs={!disableEditingAndDeleting ? 1 : 2} >
            <Image src={categoryIcon} />
          </Col>

          <Col xs={!disableEditingAndDeleting ? 4 : 3} className='d-flex flex-column align-items-start'>
            <div>
              <b> {categoryName} </b>
            </div>
            {/* Render from and to account if this is a transfer, if not then only render the account name */}
            <div>
              <i> {categoryType === "Transfer" ? `${accountName} - ${accountToName}` : accountName} </i>
            </div>
          </Col>

          <Col xs={4} >

            {notes}

          </Col>

          <Col xs={!disableEditingAndDeleting ? 2 : 3} className="d-flex flex-column align-items-end" >
            <b>
              {/* Amount shows in red for expense, green for income and blue for transfer*/}
              <NumericFormat
                className={categoryType === "Expense" ? "text-danger" : categoryType === "Income" ? "text-success" : "text-info"}
                value={amount.toFixed(2)}
                displayType={"text"}
                thousandSeparator={true}
                prefix={"$"} />
            </b>

            <div>
              <i>{moment(date).format("YYYY-MM-DD")}</i>
            </div>
          </Col >

          {/* 3 dots icon with dropdown list show the Edit and Delete feature for a transaction */}
          {!disableEditingAndDeleting && (
            <Col xs={1}  >
              {/* Render the dropdown only if editing and deleting are not disabled */}

              <Dropdown >

                <Dropdown.Toggle variant="none" id="dropdown-basic" style={{ width: "1rem" }}>
                  <MoreVertIcon />
                </Dropdown.Toggle>

                <Dropdown.Menu>

                  {/* The onClick event on Edit button will open different modal based on the type of the category */}
                  <Dropdown.Item onClick={categoryType === "Transfer" ? handleTransferEdit : handleTransactionEdit} >Edit transaction</Dropdown.Item>

                  <Dropdown.Item onClick={handleDelete} className='text-danger'>Delete transaction</Dropdown.Item>

                </Dropdown.Menu>

              </Dropdown>
            </Col>
          )}

        </Row>

      </Container>
    </ListGroupItem>
  );
};

export default TransactionListItem;
