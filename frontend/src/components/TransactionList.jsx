import React from "react";
// import "../styles/TransactionList.scss";

import ListGroup from 'react-bootstrap/ListGroup';
import ListGroupItem from "react-bootstrap/esm/ListGroupItem";
import Image from 'react-bootstrap/Image';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import MoreVertIcon from '@mui/icons-material/MoreVert';



const TransactionList = (props) => {

  const { transactions, categories, accounts, getCategoryIconById, getCategoryNameById, getAccountNameById } = props;

  const listOfTransactions = transactions.map((transaction) => {
    return (
      <ListGroupItem style={{innerWidth: "1000px"}}>
        <Container>
          <Row >

            <Col sm={2}>
              <Image src="bank.png" roundedCircle />
            </Col>

            <Col lg={3}>
              <div className="category_name">
                {getCategoryNameById(transaction.category_id, categories)}
              </div>
              <div className="account_name">
                {getAccountNameById(transaction.account_id, accounts)}
              </div>
            </Col>

            <Col lg={3}>
              <div className="transaction_notes">
                {transaction.notes}
              </div>
            </Col>

            <Col sm={2}>
              <div className="transaction_amount">
                {transaction.amount}
              </div>
              <div className="transaction_date">
                <i>1111/11/11</i>
              </div>
            </Col>

            <Col sm={1}>
              <MoreVertIcon />
            </Col>

          </Row>
        </Container>
      </ListGroupItem>
    );
  });

  return (

    <ListGroup >
      {listOfTransactions}
    </ListGroup>

  );
};

export default TransactionList;
