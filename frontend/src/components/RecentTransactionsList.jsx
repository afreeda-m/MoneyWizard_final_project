import React from "react";
import TransactionList from "./TransactionList"

const  RecentTransactionsList = (props) => {

  const { transactionsData,
    categoriesData,
    accountsData,
    chosenTransaction,
    getAccountNameById,
    getCategoryIconById,
    getCategoryNameById,
    getCategoryTypeById,
    getAccountById,
    getCategoryById,
    disableEditingAndDeleting,
   } = props;

  return <TransactionList
  transactionsData={transactionsData}
   categoriesData={categoriesData}
  accountsData={accountsData}
  chosenTransaction={chosenTransaction}
  getAccountNameById={getAccountNameById}
  getCategoryIconById={getCategoryIconById}
  getCategoryNameById={getCategoryNameById}
  getCategoryTypeById={getCategoryTypeById}
  getAccountById={getAccountById}
  getCategoryById={getCategoryById}
  disableEditingAndDeleting={disableEditingAndDeleting}
  width={"100%"}
  />;
};

export default RecentTransactionsList;
