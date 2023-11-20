import React from "react";
import "../styles/TransactionList.scss";

import TransactionListItem from "./TransactionListItem";

const TransactionList = (props) => {

  const { transactions, categories, accounts, getCategoryIconById, getCategoryNameById, getAccountNameById } = props;

  const listOfTransactions = transactions.map((transaction) => {
    return (
      <TransactionListItem
        key={transaction.id}
        id={transaction.id}
        category_icon={getCategoryIconById(transaction.category_id, categories)}
        category_name={getCategoryNameById(transaction.category_id, categories)}
        account_name={getAccountNameById(transaction.account_id, accounts)}
        amount={transaction.amount}
        notes={transaction.notes}
      />);
  });

  return (
    <ul className="transaction-list">
      {listOfTransactions}
    </ul>
  );
};

export default TransactionList;