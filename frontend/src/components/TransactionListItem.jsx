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
    chosenTransaction,
    toggleEditTransactionModal,
    isEditTransactionModalOpen
  } = props;

  // const handleClick = () => {
  //   !isEditTransactionModalOpen && toggleEditTransactionModal && toggleEditTransactionModal();
  //   !isEditTransactionModalOpen && chosenTransaction && toggleEditTransactionModal();

  // };


  return (
    <ListGroupItem className="p-2" style={{ width: "50vw" }} >
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
              <i> {accountToName ? `${accountName} - ${accountToName}` : accountName} </i>
            </div>
          </Col>

          <Col xs={5} >

            {notes}

          </Col>

          <Col xs={2} className="d-flex flex-column align-items-end" >
            {/* Amount shows in red for expense, green for income and blue for transfer*/}
            <div className={categoryType === "Expense" ? "text-danger" : categoryType === "Income" ? "text-success" : "text-primary"}  >
              <b> {amount} </b>
            </div>
            {/* Change date to the desired format */}
            <div>
              <i>{moment(date).format("YYYY-MM-DD")}</i>
            </div>
          </Col >

          {/* 3 dots icon with dropdown list show the Edit and Delete feature for a transaction */}
          <Col xs={1} className="d-flex justify-content-end"  >

            <Dropdown >

              <Dropdown.Toggle variant="none" id="dropdown-basic">
                <MoreVertIcon />
              </Dropdown.Toggle>

              <Dropdown.Menu>
                <Dropdown.Item >Edit transaction</Dropdown.Item>
                <Dropdown.Item >Delete transaction</Dropdown.Item>
              </Dropdown.Menu>

            </Dropdown>

          </Col>

        </Row>

      </Container>
    </ListGroupItem>
  );
};

export default TransactionListItem;
