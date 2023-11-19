import React from "react";
import accounts from "../mocks/accounts";
import AccountList from "../components/AccountList";
import "../styles/Accounts.css";
import FloatingButton from "../components/FloatingButton";

const Accounts = () => {
  return (
    <div className="accounts">
      <h1>List of accounts</h1>

      <div>Place holder for Pie chart and  total balance</div>

      <AccountList
        accounts={accounts}
      />

    <FloatingButton />

    </div>
  );
};

export default Accounts;