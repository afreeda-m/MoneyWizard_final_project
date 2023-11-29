import MoreVertIcon from "@mui/icons-material/MoreVert";
import React from "react";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Dropdown from "react-bootstrap/Dropdown";
import Row from "react-bootstrap/Row";
import ListGroupItem from "react-bootstrap/esm/ListGroupItem";
import { NumericFormat } from "react-number-format";
import icon from "../mocks/income.png";
import { Image } from "react-bootstrap";
import '../styles/Accounts.scss';

const AccountListItem = (props) => {
  const { id, account_name, amount, note } = props;

  const deleteAccount = (event) => {
    props.deleteAccount(event.target.id);
  }

  return (
    <ListGroupItem className="p-3" style={{ width: "50vw" }}>
      <Container>
        <Row className="d-flex align-items-center">
        <Col className="d-flex justify-content-center" xs={1} >
            <Image className="accounts-icon" src={icon} />
          </Col>
          <Col className="h3">
            <div>
              <b> {account_name} </b>
            </div>
          </Col>

          <Col>
            {note}
          </Col>

          <Col className="h3 d-flex flex-column align-items-end">
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
