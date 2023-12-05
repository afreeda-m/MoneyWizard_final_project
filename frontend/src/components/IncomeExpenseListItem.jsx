import React from "react";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import ListGroupItem from "react-bootstrap/esm/ListGroupItem";
import { NumericFormat } from "react-number-format";


const IncomeExpenseListItem = (props) => {

  const {
    category,
    categoriesData,
    getCategoryIconById,
    getCategoryNameById,
  } = props;

  const logoURL = getCategoryIconById(category.category_id, categoriesData);

  return (

    <ListGroupItem className="p-2" style={{ width: "100%" }}>
      <Container>
        <Row className="d-flex align-items-center">

          <Col xs={2}>
            <img src={`/images/${logoURL}`} alt={logoURL} />
          </Col>

          <Col xs={8}>
            <div>
              <b>{getCategoryNameById(category.category_id, categoriesData)}</b>
            </div>
          </Col>

          <Col xs={2} className="d-flex justify-content-end">
            {/* Amount shows in red for expense and green for income */}
            <b>
              <NumericFormat
                className={category.type === "Expense" ? "text-danger" : "text-success"}
                value={parseFloat(category.sum).toFixed(2)}
                displayType={"text"}
                thousandSeparator={true}
                prefix={"$"}
              />
            </b>
          </Col>

        </Row>
      </Container>
    </ListGroupItem>

  );
};

export default IncomeExpenseListItem;
