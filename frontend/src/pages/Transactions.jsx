import React from "react";
import FloatingButton from "../components/FloatingButton";
import TransactionList from "../components/TransactionList";
import { getAccountNameById, getCategoryIconById, getCategoryNameById } from "../helpers/mockhelpers";
import accounts from "../mocks/accounts";
import categories from "../mocks/categories";
import transactions from "../mocks/transactions";
import "../styles/Transactions.scss";


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