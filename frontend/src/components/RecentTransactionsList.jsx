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
   } = props;

  return <TransactionList
  transactionsData={transactionsData}
   categoriesData={categoriesData}
  accountsData={accountsData}
  chosenTransaction={chosenTransaction}
  getAccountNameById={getAccountNameById}
  getCategoryIconById={getCategoryIconById}
  getCategoryNameById={getCategoryNameById}
  getCategoryTypeById={getCategoryTypeById}/>;
};

export default RecentTransactionsList;
