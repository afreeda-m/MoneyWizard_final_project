import React from "react";
import AccountListItem from "./AccountListItem";
import '../styles/Accounts.scss';

const AccountList = (props) => {

  const { accounts } = props;

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
    <ul className="accounts-list">
      {listOfAccounts}
    </ul>
  );
};

export default AccountList;