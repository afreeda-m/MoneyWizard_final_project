import React from "react";
import "../styles/TransactionListItem.scss";

import MoreVertIcon from '@mui/icons-material/MoreVert';
import Image from 'react-bootstrap/Image';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import ListGroupItem from "react-bootstrap/esm/ListGroupItem";
import Dropdown from 'react-bootstrap/Dropdown';

const TransactionListItem = (props) => {

  const { categoryIcon, categoryName, accountName, amount, notes, date } = props;
  return (
    <ListGroupItem className="shadow p-1 mb-1 rounded" style={{ width: "50vw" }} >
      <Container>

        <Row className="d-flex align-items-center">

          <Col className="d-flex justify-content-center" xs={2} >
            <Image src={categoryIcon} />
          </Col>

          <Col xs={3} >
            <div className="category_name">
              <b>
                {categoryName}
              </b>
            </div>
            <div className="account_name">
              <i>
                {accountName}
              </i>
            </div>
          </Col>

          <Col xs={4} >
            <div className="transaction_notes">
              {notes}
            </div>
          </Col>

          <Col xs={2} className="d-flex flex-column align-items-end" >
            <div className="transaction_amount">
              {amount}
            </div>
            <div className="transaction_date">
              <i>{date}</i>
            </div>
          </Col >

          {/* 3 dots icon with dropdown list show the Edit and Delete feature for a transaction */}
          <Col xs={1} className="d-flex justify-content-end"  >

            <Dropdown >
              <Dropdown.Toggle variant="none" id="dropdown-basic">

                <MoreVertIcon />

              </Dropdown.Toggle>
              <Dropdown.Menu>

                <Dropdown.Item href="#">Edit</Dropdown.Item>
                <Dropdown.Item href="#">Delete</Dropdown.Item>

              </Dropdown.Menu>

            </Dropdown>
          </Col>

        </Row>

      </Container>
    </ListGroupItem>
  );
};

export default TransactionListItem;
