import React from "react";
import Image from 'react-bootstrap/Image';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import ListGroupItem from "react-bootstrap/esm/ListGroupItem";

const ExpenseTransactions = ({expenseData}) => {

  console.log("inside ExpenseTransaction componenet:", expenseData);
  /*
{
    "label": "Food/Drinks",
    "value": "5000",
    "type": "Expense"
},
{
    "label": "Shopping",
    "value": "150",
    "type": "Expense"
}
  */

  return (
    <div className="justify-content-md-center shadow p-3 mb-5 bg-white rounded">
      {/* Iterate through income transactions and display them */}
      {expenseData.map((transaction, index) => (
        <ListGroupItem className="p-1" style={{ width: "50vw" }} key={index}>
          <Container>
            <Row className="d-flex align-items-center">
              <Col className="d-flex justify-content-center" xs={1}>
                <Image src={"bank.png"} />
              </Col>
              <Col xs={3}>
                <div>
                  <b><h7>{transaction.label}</h7></b>
                </div>
                <div>

                </div>
              </Col>
              <Col xs={2}>
            {/* Amount shows in red for expense and green for income */}
            <div className={transaction.type === "Expense" ? "text-danger" : "text-success"}  >
              <b> <i>{transaction.value}</i> </b>
            </div>
            </Col >
            </Row>

          </Container>
        </ListGroupItem>
      ))}
    </div>
  );
};

export default ExpenseTransactions;
