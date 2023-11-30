import React from "react";
import Image from 'react-bootstrap/Image';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import ListGroupItem from "react-bootstrap/esm/ListGroupItem";

const IncomeExpenseList = ({ transaction}) => {
  return (
    <ListGroupItem className="p-1" style={{ width: "50vw" }}>
      <Container>
        <Row className="d-flex align-items-center">
          <Col className="d-flex justify-content-center" xs={1}>
            <Image src="./images/bank.png" />
          </Col>
          <Col xs={3}>
            <div>
              <b><h6>{transaction.label}</h6></b>
            </div>
            <div>
              {/* Additional details if needed */}
            </div>
          </Col>
          <Col xs={2}>
            {/* Amount shows in red for expense and green for income */}
            <div className={transaction.type === "Expense" ? "text-danger" : "text-success"}>
              <b><i>{transaction.value}</i></b>
            </div>
          </Col>
        </Row>
      </Container>
    </ListGroupItem>
  );
};

export default IncomeExpenseList;
