import axios from 'axios';
import moment from 'moment';
import React, { useEffect, useState } from "react";
import FilterBar from "../components/FilterBar";
import FloatingActionButton from "../components/FloatingActionButton";
import TransactionList from "../components/TransactionList";
import TransactionModal from "../components/TransactionModal";
import { getAccountNameById, getCategoryIconById, getCategoryNameById, getCategoryTypeById } from "../helpers/helperFunctions";
// import accounts from "../mocks/accounts";
// import categories from "../mocks/categories";
// import transactions from "../mocks/transactions";



const Transactions = () => {

  const [accountsData, setAccountsData] = useState([]);
  const [transactionsData, setTransactionsData] = useState([]);
  const [categoriesData, setCategoriesData] = useState([]);

  const [date, setDate] = useState(moment().format("MMMM YYYY"));
  const [isModalOpen, setIsModalOpen] = useState(false);

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

  }, []);

  const toggleModal = () => setIsModalOpen(!isModalOpen);

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
      />
      <div onClick={toggleModal}>
        <FloatingActionButton />
      </div>

      <TransactionModal
        isModalOpen={isModalOpen}
        toggleModal={toggleModal}
        categories={categoriesData}
        accounts={accountsData}
      />

    </div>
  );
};

export default Transactions;