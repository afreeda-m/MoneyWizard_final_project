import React from "react";
// import "../styles/TransactionList.scss";
import ListGroup from 'react-bootstrap/ListGroup';
import TransactionListItem from "./TransactionListItem";


const TransactionList = (props) => {

  const { transactions, categories, accounts, getCategoryTypeById, getCategoryNameById, getAccountNameById } = props;

  const listOfTransactions = transactions.map((transaction) => {
    return (

      <TransactionListItem
        key={transaction.id}
        categoryIcon={"bank.png"}
        categoryName={getCategoryNameById(transaction.category_id, categories)}
        categoryType={getCategoryTypeById(transaction.category_id, categories)}
        accountName={getAccountNameById(transaction.account_id, accounts)}
        notes={transaction.notes}
        amount={transaction.amount}
        date={transaction.date}
      />

    );
  });

  return (

    <ListGroup >
      {listOfTransactions}
    </ListGroup>

  );
};

export default TransactionList;
