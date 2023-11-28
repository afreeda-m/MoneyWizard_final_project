import axios from 'axios';
import moment from 'moment';
import React, { useEffect, useState } from "react";
import FilterBar from "../components/FilterBar";
import FloatingActionButton from "../components/FloatingActionButton";
import TransactionList from "../components/TransactionList";
import TransactionModalAddNew from "../components/TransactionModalAddNew";
import TransactionModalEditTransaction from "../components/TransactionModalEditTransaction";
import { getAccountNameById, getCategoryIconById, getCategoryNameById, getCategoryTypeById } from "../helpers/helperFunctions";


const Transactions = () => {

  const [accountsData, setAccountsData] = useState([]);
  const [transactionsData, setTransactionsData] = useState([]);
  const [categoriesData, setCategoriesData] = useState([]);

  const [date, setDate] = useState(moment().format("YYYY-MM"));
  const [isAddTransactionModalOpen, setIsAddTransactionModalOpen] = useState(false);
  const [isEditTransactionModalOpen, setIsEditTransactionModalOpen] = useState(false);
  const [chosenTransaction, setChosenTransaction] = useState(null);

  const toggleAddNewModal = () => setIsAddTransactionModalOpen(!isAddTransactionModalOpen);
  const toggleEditTransactionModal = () => setIsEditTransactionModalOpen(!isEditTransactionModalOpen);
  // const chooseTransaction = () => setChosenTransaction

  useEffect(() => {

    const fetchTransactions = axios.get('/transactions');
    const fetchAccounts = axios.get('/accounts');
    const fetchCategories = axios.get('/categories');

    Promise.all([fetchTransactions, fetchAccounts, fetchCategories]).then((response) => {
      const [transactionsResponse, accountsResponse, categoriesReponse] = response;
      setTransactionsData(transactionsResponse.data);
      setAccountsData(accountsResponse.data.accounts);
      setCategoriesData(categoriesReponse.data);
    }).catch((error) => {
      console.error('Error Fetching Data', error);
    });

  }, [date]);

  return (
    <div className="d-flex flex-column align-items-center bg-body-tertiary mt-5" >

      <h1>Transactions</h1>

      <FilterBar
        date={date}
        setDate={setDate}
      />

      <TransactionList
        transactionsData={transactionsData}
        categoriesData={categoriesData}
        accountsData={accountsData}
        getAccountNameById={getAccountNameById}
        getCategoryIconById={getCategoryIconById}
        getCategoryNameById={getCategoryNameById}
        getCategoryTypeById={getCategoryTypeById}
        chosenTransaction={chosenTransaction}
        isEditTransactionModalOpen={isEditTransactionModalOpen}
        toggleEditTransactionModal={toggleEditTransactionModal}
      />
      <div onClick={toggleAddNewModal}>
        <FloatingActionButton />
      </div>

      <TransactionModalAddNew
        isAddTransactionModalOpen={isAddTransactionModalOpen}
        toggleAddNewModal={toggleAddNewModal}
        categories={categoriesData}
        accounts={accountsData}
      />

      <TransactionModalEditTransaction
        isEditTransactionModalOpen={isEditTransactionModalOpen}
        toggleEditTransactionModal={toggleEditTransactionModal}
        categories={categoriesData}
        accounts={accountsData}
        chosenTransaction={chosenTransaction}
      />


    </div>
  );
};

export default Transactions;