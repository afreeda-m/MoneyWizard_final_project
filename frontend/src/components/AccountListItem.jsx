import MoreVertIcon from "@mui/icons-material/MoreVert";
import { useState } from "react";
import { Image } from "react-bootstrap";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Dropdown from "react-bootstrap/Dropdown";
import Row from "react-bootstrap/Row";
import ListGroupItem from "react-bootstrap/esm/ListGroupItem";
import { NumericFormat } from "react-number-format";
// import '../styles/Accounts.scss';

const AccountListItem = (props) => {
  const { id, account_name, amount, note } = props;

  const [show, setShow] = useState(false);

  const handleClick = () => setShow(!show);


  const deleteAccount = (event) => {
    props.deleteAccount(event.target.id);
  };

  return (
    <ListGroupItem className="p-2" style={{ width: "40vw" }} >
      <Container>

        <Row className="d-flex align-items-center">

          <Col xs={1} onClick={handleClick}>
            <Image className="accounts-icon" src={"./images/income.png"} />
          </Col>

          <Col xs={7} onClick={handleClick}>
            <div>
              <b> {account_name} </b>
            </div>
          </Col>

          <Col className="d-flex flex-column align-items-end" xs={3}>
            <>
              <NumericFormat
                className={amount > 0 ? "text-success" : "text-danger"}
                value={amount.toFixed(2)}
                displayType={"text"}
                thousandSeparator={true}
                prefix={"$"}
              />
            </>
          </Col>

          <Col xs={1} className="d-flex justify-content-end">
            <Dropdown>
              <Dropdown.Toggle variant="none" id="dropdown-basic">
                <MoreVertIcon />
              </Dropdown.Toggle>

              <Dropdown.Menu>
                <Dropdown.Item onClick={deleteAccount} id={id} className="text-danger text-center">Delete account</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </Col>

        </Row>
      </Container>

      {show && <div className="d-flex justify-content-center"> {note} </div>}
    </ListGroupItem>
  );
};

export default AccountListItem;
