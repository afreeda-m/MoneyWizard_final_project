import React from "react";
import transactions from "../mocks/transactions";
import categories from "../mocks/categories";
import accounts from "../mocks/accounts";
import { getAccountNameById, getCategoryIconById, getCategoryNameById } from "../helpers/mockhelpers";
import TransactionList from "../components/TransactionList";
import "../styles/Transactions.css"



const Transactions = () => {
  return (
    <div className="transactions">
      <h1>List of transactions</h1>
      <TransactionList
      transactions={transactions}
      categories={categories}
      accounts={accounts}
      getAccountNameById={getAccountNameById}
      getCategoryIconById={getCategoryIconById}
      getCategoryNameById={getCategoryNameById}
      />

    </div>
  );
};

export default Transactions;