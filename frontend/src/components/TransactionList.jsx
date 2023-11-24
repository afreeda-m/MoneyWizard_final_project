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
      <div style={{ width: "1000px" }}>

        <ListGroupItem >
          <Container>
            <Row className="d-flex align-items-center">

              <Col sm={2}>
                <Image src="bank.png" roundedCircle />
              </Col>

              <Col lg={3}>
                <div className="category_name">
                  <b>
                    {getCategoryNameById(transaction.category_id, categories)}
                  </b>
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

              <Col className="d-flex" style={{ border: "1px solid black" }}>
                <MoreVertIcon className="alignItems: flex-end" />
              </Col>

            </Row>
          </Container>
        </ListGroupItem>
      </div>
    );
  });

  return (

    <ListGroup >
      {listOfTransactions}
    </ListGroup>

  );
};

export default TransactionList;
