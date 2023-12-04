import React from "react";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import ListGroupItem from "react-bootstrap/esm/ListGroupItem";


const IncomeExpenseListItem = (props) => {

  const {
    category,
    categoriesData,
    getCategoryIconById,
    getCategoryNameById,
  } = props;

  console.log(category);
  const logoURL = getCategoryIconById(category.category_id, categoriesData);



  return (

    <ListGroupItem className="p-1" style={{ width: "100%" }}>
      <Container>
        <Row className="d-flex align-items-center">

          <Col xs={2}>
            <img src={`/images/${logoURL}`} alt={logoURL} />
          </Col>

          <Col xs={8}>
            <div>
              <b><h6>{getCategoryNameById(category.category_id, categoriesData)}</h6></b>
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

export default IncomeExpenseListItem;
