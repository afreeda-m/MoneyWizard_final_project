import React, { useState, useEffect } from "react";
import axios from 'axios';
import FloatingActionButton from "../components/FloatingActionButton";
import TransactionList from "../components/TransactionList";
import { getAccountNameById, getCategoryIconById, getCategoryNameById, getCategoryTypeById } from "../helpers/mockhelpers";
import accounts from "../mocks/accounts";
import categories from "../mocks/categories";
import transactions from "../mocks/transactions";
import FilterBar from "../components/FilterBar";
import moment from 'moment';
import TransactionModal from "../components/TransactionModal";



const Transactions = () => {

  const [accountsData, setAccountsData] = useState([]);
  const [transactionsData, setTransactionsData] = useState([]);
  const [categoriesData, setCategoriesData] = useState([]);

  const [date, setDate] = useState(moment().format("MMMM YYYY"));
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    // Fetch transactions when the component mounts
    axios.get('/transactions')
      .then((response) => {
        setTransactionsData(response.data);
      })
      .catch((error) => {
        console.error('Error fetching transactions', error);
      });

    // Fetch accounts data when the component mounts
    axios.get('/accounts')
      .then((response) => {
        setAccountsData(response.data);
      })
      .catch((error) => {
        console.error('Error fetching accounts', error);
      });

    // Fetch categories when the component mounts
    axios.get('/categories')
      .then(response => {
        console.log(response.data);
        setCategoriesData(response.data);
      })
      .catch(error => {
        console.error('Error fetching categories:', error);
      });

    // Empty dependency array ensures the effect runs only once
  }, []);

  console.log('Transactions data from backend', transactionsData);
  console.log('Accounts data from backend', accountsData);
  console.log('Categories data from backend', categoriesData);

  const toggleModal = () => setIsModalOpen(!isModalOpen);

  return (
    <div className="d-flex flex-column align-items-center bg-body-tertiary" >

      <h1>List of Transactions</h1>

      <FilterBar
        date={date}
        setDate={setDate}
      />

      <TransactionList
        transactions={transactions}
        categories={categories}
        accounts={accounts}
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
        categories={categories}
        accounts={accounts}
      />

    </div>
  );
};

export default Transactions;