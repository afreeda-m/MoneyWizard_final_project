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

  const { categoryIcon, categoryName, categoryType, accountName, amount, notes, date } = props;

  return (
    <ListGroupItem className="p-1" style={{ width: "50vw" }} >
      <Container>

        <Row className="d-flex align-items-center">

          <Col className="d-flex justify-content-center" xs={1} >
            <Image src={categoryIcon} />
          </Col>

          <Col xs={3} >
            <div>
              <b>
                {categoryName}
              </b>
            </div>
            <div>
              <i>
                {accountName}
              </i>
            </div>
          </Col>

          <Col xs={5} >

            {notes}

          </Col>

          <Col xs={2} className="d-flex flex-column align-items-end" >
            <div className={categoryType === "Expense" ? "text-danger" : "text-success"}  >
              <b>
                {amount}
              </b>
            </div>
            <div>
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
