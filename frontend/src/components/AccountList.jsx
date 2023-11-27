import React from "react";
import AccountListItem from "./AccountListItem";

const AccountList = (props) => {

  const { accounts } = props;

  //create function to pass down
  const deleteAccount = (event) => {

  }

  const listOfAccounts = accounts.map((account) => {
    return (
      <AccountListItem
        key={account.id}
        id={account.id}
        account_name={account.account_name}
        amount={account.balance}
        onDelete={deleteAccount}
      />);
  });

  return (
    <ul className="accounts-list">
      {listOfAccounts}
    </ul>
  );
};

export default AccountList;