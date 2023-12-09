import React from "react";
import { ListGroup, ListGroupItem } from "react-bootstrap";
import { NumericFormat } from "react-number-format";
import AccountListItem from "./AccountListItem";
// import '../styles/Accounts.scss';

const AccountList = (props) => {

  const {
    accountsData,
    getAccounts,
    getTransactions,
  } = props;


  const totalAccountsBalance = accountsData
    .map((account) => account.balance)
    .reduce((a, b) => a + b, 0);

  const listOfAccounts = accountsData.map((account) => {
    return (
      <AccountListItem
        key={account.id}
        account={account}
        getAccounts={getAccounts}
        getTransactions={getTransactions}
      />);
  });

  return (
    <ListGroup style={{ width: "100%" }}>

      <ListGroupItem className="d-flex justify-content-center" style={{ fontSize: '20px' }}>
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