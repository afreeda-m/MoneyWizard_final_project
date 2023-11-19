import React from "react";
import AccountListItem from "./AccountListItem";

const AccountList = (props) => {

  const { accounts } = props;

  const listOfAccounts = accounts.map((account) => {
    return (
      <AccountListItem
        key={account.id}
        accountName={account.account_name}
        balance={account.balance}
      />
    );
  });

  return (
    <ul className="account-list">
      {listOfAccounts}
    </ul>
  );
};

export default AccountList;