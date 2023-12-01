import React from "react";
import AccountListItem from "./AccountListItem";
import { ListGroup, ListGroupItem } from "react-bootstrap";
import { NumericFormat } from "react-number-format";
// import '../styles/Accounts.scss';

const AccountList = (props) => {

  const { accounts, totalAccountsBalance } = props;

  const listOfAccounts = accounts.map((account) => {
    return (
      <AccountListItem
        key={account.id}
        id={account.id}
        account_name={account.account_name}
        amount={account.balance}
        note={account.note}
        deleteAccount={props.deleteAccount}
      />);
  });

  return (
    <ListGroup>

      <ListGroupItem className="d-flex justify-content-center">
        <b>
          <span>Total balance: $</span>
          <NumericFormat
            value={totalAccountsBalance.toFixed(2)}
            displayType={"text"}
            thousandSeparator={true}
          />
        </b>

      </ListGroupItem>

      {listOfAccounts}

    </ListGroup>
  );
};

export default AccountList;