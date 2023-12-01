import React from "react";
import ListGroup from 'react-bootstrap/ListGroup';
import TransactionListItem from "./TransactionListItem";


const TransactionList = (props) => {

  const {
    transactionsData,
    categoriesData,
    accountsData,
    getCategoryIconById,
    getCategoryTypeById,
    getCategoryNameById,
    getAccountNameById,
    toggleEditTransactionModal,
    toggleEditTransferModal,
    isEditTransactionModalOpen,
    isEditTransferModalOpen,
    chooseTransaction,
    getTransactions,
    disableEditingAndDeleting,
  } = props;

  const listOfTransactions = transactionsData.map((transaction) => {

    const categoryId = transaction.category_id;
    const accountId = transaction.account_id;
    const accountToId = transaction.account_id_to;

    return (

      <TransactionListItem
        key={transaction.id}
        categoryIcon={`/images/${getCategoryIconById(categoryId, categoriesData)}`}
        categoryName={getCategoryNameById(categoryId, categoriesData)}
        categoryType={getCategoryTypeById(categoryId, categoriesData)}
        accountName={getAccountNameById(accountId, accountsData)}
        accountToName={accountToId ? getAccountNameById(accountToId, accountsData) : null}
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
        disableEditingAndDeleting={disableEditingAndDeleting} // New prop for disabling editing and deleting transactions on Dashboard
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
