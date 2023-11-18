import React from "react";
import transactions from "../mocks/transactions";
import categories from "../mocks/categories";
import accounts from "../mocks/accounts";
import { getAccountNameById, getCategoryIconById, getCategoryNameById } from "../helpers/mockhelpers";
import TransactionList from "../components/TransactionList";
import "../styles/Transactions.css"
import FloatingButton from "../components/FloatingButton";



const Transactions = () => {
  return (
    <div className="transactions">

      <h1>List of transactions</h1>

      <h3>Placeholder for filter</h3>

      <TransactionList
      transactions={transactions}
      categories={categories}
      accounts={accounts}
      getAccountNameById={getAccountNameById}
      getCategoryIconById={getCategoryIconById}
      getCategoryNameById={getCategoryNameById}
      />

      <FloatingButton />

    </div>
  );
};

export default Transactions;