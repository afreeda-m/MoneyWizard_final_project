import MoreVertIcon from "@mui/icons-material/MoreVert";
import axios from "axios";
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
  const {
    account,
    getAccounts,
    getTransactions,
  } = props;

  const [show, setShow] = useState(false);

  const handleClick = () => setShow(!show);

  const handleDelete = () => {
    axios.post(`/accounts/${account.id}/delete`)
      .then(() => {
        getAccounts();
        getTransactions();
      });
  };

  return (
    <ListGroupItem className="p-2" style={{ width: "100%" }} >
      <Container>

        <Row className="d-flex align-items-center">

          <Col className="d-flex justify-content-center" xs={2} onClick={handleClick}>
            <Image className="accounts-icon" src={"./images/income.png"} />
          </Col>

          <Col className="d-flex justify-content-start" xs={6} onClick={handleClick}>
            <b> {account.account_name} </b>
          </Col>

          <Col className="d-flex justify-content-end" xs={3}>
            <>
              <NumericFormat
                className={account.balance > 0 ? "text-success" : "text-danger"}
                value={account.balance.toFixed(2)}
                displayType={"text"}
                thousandSeparator={true}
                prefix={"$"}
              />
            </>
          </Col>

          <Col className="d-flex justify-content-center" xs={1}>
            <Dropdown>
              <Dropdown.Toggle variant="none" id="dropdown-basic" >
                <MoreVertIcon />
              </Dropdown.Toggle>

              <Dropdown.Menu>
                <Dropdown.Item onClick={handleDelete} id={account.id} className="text-danger text-center">Delete account</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </Col>

        </Row>
      </Container>

      {show && <div className="d-flex justify-content-center"> {account.note} </div>}

    </ListGroupItem>
  );
};

export default AccountListItem;
