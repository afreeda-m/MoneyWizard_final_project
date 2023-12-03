import React from "react";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import ListGroupItem from "react-bootstrap/esm/ListGroupItem";

const IncomeExpenseList = (props) => {

  const {
    category,
    categoriesData,
    getCategoryIconById,
    getCategoryNameById,
  } = props;

  // const logoURL = getCategoryIconById(category.category_id, categoriesData)

  return (


    <ListGroupItem className="p-1" style={{ width: "50vw" }}>
      <Container>
        <Row className="d-flex align-items-center">
          <Col className="d-flex justify-content-center" xs={1}>

            {/* <img src={`/images/${logoURL}`}/> */}
            <img src="/images/bank.png" />

          </Col>
          <Col xs={3}>
            <div>
              <b><h6>{category.category_name}</h6></b>
              {/* <b><h6>{getCategoryNameById(category.category_id, categoriesData)}</h6></b> */}
            </div>
            <div>
              {/* Additional details if needed */}
            </div>
          </Col>
          <Col xs={2}>
            {/* Amount shows in red for expense and green for income */}
            <div className={category.type === "Expense" ? "text-danger" : "text-success"}>
              <b><i>{category.sum}</i></b>
            </div>
          </Col>
        </Row>
      </Container>
    </ListGroupItem>
  );
};

export default IncomeExpenseList;
