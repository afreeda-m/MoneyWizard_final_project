import React from "react";
import AccountListItem from "./AccountListItem";

const AccountList = (props) => {

  const { accounts } = props;

  const listOfAccounts = accounts.map((account) => {
    return (
      <AccountListItem
        key={account.id}
        id={account.id}
        account_name={account.account_name}
        amount={account.balance}
      />);
  });

  return (
    <ul className="accounts-list">
      {listOfAccounts}
    </ul>
  );
};

export default AccountList;