import MoreVertIcon from "@mui/icons-material/MoreVert";
import React from "react";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Dropdown from "react-bootstrap/Dropdown";
import Image from "react-bootstrap/Image";
import Row from "react-bootstrap/Row";
import ListGroupItem from "react-bootstrap/esm/ListGroupItem";
import { NumericFormat } from "react-number-format";

const AccountListItem = (props) => {
  const { id, account_name, amount } = props;

  const deleteAccount = (event) => {
    props.deleteAccount(event.target.id);
  }

  return (
    <ListGroupItem className="p-1" style={{ width: "50vw" }}>
      <Container>
        <Row className="d-flex align-items-center">
          <Col className="d-flex justify-content-center" xs={1}>
            {/* <Image src={categoryIcon} /> */}

          </Col>

          <Col xs={3}>
            <div>
              <i> {account_name} </i>
            </div>
          </Col>

          <Col xs={2} className="d-flex flex-column align-items-end">
            <b>
              <NumericFormat
                value={amount.toFixed(2)}
                displayType={"text"}
                thousandSeparator={true}
                prefix={"$"}
              />
            </b>
          </Col>

          {/* 3 dots icon with dropdown list show the Edit and Delete feature for a transaction */}
          <Col xs={1} className="d-flex justify-content-end">
            <Dropdown>
              <Dropdown.Toggle variant="none" id="dropdown-basic">
                <MoreVertIcon />
              </Dropdown.Toggle>

              <Dropdown.Menu>
                <Dropdown.Item onClick={deleteAccount} id={id} href="#" className="text-danger">Delete account</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </Col>
        </Row>
      </Container>
    </ListGroupItem>
  );
};

export default AccountListItem;
