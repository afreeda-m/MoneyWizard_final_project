import React from "react";
import "../styles/TransactionListItem.scss";
import moment from 'moment';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Image from 'react-bootstrap/Image';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import ListGroupItem from "react-bootstrap/esm/ListGroupItem";
import Dropdown from 'react-bootstrap/Dropdown';
import axios from "axios";
import { NumericFormat } from "react-number-format";

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
    disableEditingAndDeleting
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
      })
      .catch((error) => {
        console.error('Error deleting data:', error);
      });
  };



  return (
    <ListGroupItem className="p-2" style={{ width: "40vw" }} >
      <Container>

        <Row className="d-flex align-items-center">

          <Col className="d-flex justify-content-center" xs={1} >
            <Image src={categoryIcon} />
          </Col>

          <Col xs={3} >
            <div>
              <b> {categoryName} </b>
            </div>
            {/* Render from and to account if this is a transfer, if not then only render the account name */}
            <div>
              <i> {categoryType === "Transfer" ? `${accountName} - ${accountToName}` : accountName} </i>
            </div>
          </Col>

          <Col xs={5} >

            {notes}

          </Col>

          <Col xs={2} className="d-flex flex-column align-items-end" >
            <b>
              {/* Amount shows in red for expense, green for income and blue for transfer*/}
              <NumericFormat
                className={categoryType === "Expense" ? "text-danger font-weight-bold" : categoryType === "Income" ? "text-success" : "text-primary"}
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
          <Col xs={1} className="d-flex justify-content-end"  >
            {/* Render the dropdown only if editing and deleting are not disabled */}
            {!disableEditingAndDeleting && (

              <Dropdown >

                <Dropdown.Toggle variant="none" id="dropdown-basic">
                  <MoreVertIcon />
                </Dropdown.Toggle>

                <Dropdown.Menu>

                {/* The onClick event on Edit button will open different modal based on the type of the category */}
                <Dropdown.Item onClick={categoryType === "Transfer" ? handleTransferEdit : handleTransactionEdit}>Edit transaction</Dropdown.Item>

                  <Dropdown.Item onClick={handleDelete}>Delete transaction</Dropdown.Item>

                </Dropdown.Menu>

              </Dropdown>
            )}
          </Col>

        </Row>

      </Container>
    </ListGroupItem>
  );
};

export default TransactionListItem;
