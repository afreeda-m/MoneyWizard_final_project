import React from "react";
import ListGroup from 'react-bootstrap/ListGroup';
import TransactionListItem from "./TransactionListItem";


const TransactionList = (props) => {

  const {
    transactionsData,
    categoriesData,
    accountsData,
    toggleEditTransactionModal,
    toggleEditTransferModal,
    isEditTransactionModalOpen,
    isEditTransferModalOpen,
    chooseTransaction,
    getTransactions,
    disableEditingAndDeleting,
    width,
    getAccounts,
    getTransactionsByCategory,
    getAccountById,
    getCategoryById
  } = props;

  const listOfTransactions = transactionsData.map((transaction) => {

    const categoryId = transaction.category_id;
    const accountId = transaction.account_id;
    const accountToId = transaction.account_id_to;

    if (!categoriesData || categoriesData.length === 0) {
      return <div key={transaction.id}>No data available.</div>;
    }

    return (

      <TransactionListItem
        key={transaction.id}
        categoryIcon={`/images/${getCategoryById(categoryId, categoriesData).logo_url}`}
        categoryName={getCategoryById(categoryId, categoriesData).category_name}
        categoryType={getCategoryById(categoryId, categoriesData).type}
        accountName={getAccountById(accountId, accountsData).account_name}
        accountToName={accountToId ? getAccountById(accountToId, accountsData).account_name : null}
        notes={transaction.notes}
        amount={transaction.amount}
        date={transaction.transaction_date}
        isEditTransactionModalOpen={isEditTransactionModalOpen}
        toggleEditTransactionModal={toggleEditTransactionModal}
        isEditTransferModalOpen={isEditTransferModalOpen}
        toggleEditTransferModal={toggleEditTransferModal}
        chooseTransaction={chooseTransaction}
        transaction={transaction}
        getTransactions={getTransactions}
        getAccounts={getAccounts}
        getTransactionsByCategory={getTransactionsByCategory}
        disableEditingAndDeleting={disableEditingAndDeleting} // New prop for disabling editing and deleting transactions on Dashboard
      />

    );
  });

  return (

    <ListGroup style={{width: width ? width : "50%"}}>
      {listOfTransactions}
    </ListGroup>

  );
};

export default TransactionList;
