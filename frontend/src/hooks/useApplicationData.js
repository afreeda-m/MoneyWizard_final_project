import { useReducer, useEffect } from "react";
import moment from "moment";
import axios from 'axios';

export const ACTIONS = {
  SET_TRANSACTIONS_DATA: 'SET_TRANSACTION_DATA',
  SET_CATEGORIES_DATA: 'SET_CATEGORY_DATA',
  SET_ACCOUNTS_DATA: 'SET_ACCOUNT_DATA',
  SET_ACCOUNTS_AND_CATEGORIES_DATA: 'SET_ACCOUNTS_AND_CATEGORIES_DATA',
  SET_DATE: 'SET_DATE',
  INCREMENT_DATE: 'INCREMENT_DATE',
  DECREMENT_DATE: 'DECREMENT_DATE',
  TOGGLE_ADD_NEW_TRANSACTION_MODAL: 'TOGGLE_ADD_NEW_TRANSACTION_MODAL',
  TOGGLE_EDIT_TRANSACTION_MODAL: 'TOGGLE_EDIT_TRANSACTION_MODAL',
  TOGGLE_EDIT_TRANSFER_MODAL: 'TOGGLE_EDIT_TRANSFER_MODAL',
  SELECT_TRANSACTION: 'SELECT_TRANSACTION'
};

function reducer(state, action) {
  switch (action.type) {


    // ACTION FOR RETRIEVING DATA FROM BACKEND SERVER
    // Update transactionsData state when open the app
    case ACTIONS.SET_TRANSACTIONS_DATA:
      return { ...state, transactionsData: action.transactionsData };
    // Update categoriesData and accountsData states when open the app
    case ACTIONS.SET_ACCOUNTS_AND_CATEGORIES_DATA:
      return { ...state, accountsData: action.accountsData, categoriesData: action.categoriesData };


    // ACTION FOR FILTER BAR COMPONENT
    // Update date state when click on the right arrow on filter bar
    case ACTIONS.INCREMENT_DATE:
      return { ...state, date: action.newDate };
    // Update date state when click on the left arrow on filter bar
    case ACTIONS.DECREMENT_DATE:
      return { ...state, date: action.newDate };


    // ACTION FOR TRANSACTION RELATED COMPONENTS
    // Update state to Open/Close the Add New Transaction modal
    case ACTIONS.TOGGLE_ADD_NEW_TRANSACTION_MODAL:
      return { ...state, isAddTransactionModalOpen: !state.isAddTransactionModalOpen };
    // Update state to Open/Close the Edit Transaction modal
    case ACTIONS.TOGGLE_EDIT_TRANSACTION_MODAL:
      return { ...state, isEditTransactionModalOpen: !state.isEditTransactionModalOpen };
    // Update state to Open/Close the Edit Transfer modal
    case ACTIONS.TOGGLE_EDIT_TRANSFER_MODAL:
      return { ...state, isEditTransferModalOpen: !state.isEditTransferModalOpen };
    // Update chosenTransaction state with the clicked transaction
    case ACTIONS.SELECT_TRANSACTION:
      return { ...state, chosenTransaction: action.transaction };

    default:
      throw new Error(
        `Tried to reduce with unsupported action type: ${action.type}`
      );
  }
}

const useApplicationData = () => {

  const [state, dispatch] = useReducer(reducer,
    {
      transactionsData: [],
      categoriesData: [],
      accountsData: [],
      date: moment().format("YYYY-MM"),
      isAddTransactionModalOpen: false,
      isEditTransactionModalOpen: false,
      isEditTransferModalOpen: false,
      chosenTransaction: null
    }
  );

  // Fetch transactions data from backend server, dependent on the 'date' state
  useEffect(() => {
    fetch('http://localhost:8080/transactions',)
      .then((res) => res.json())
      .then((data) => dispatch({
        type: ACTIONS.SET_TRANSACTIONS_DATA,
        transactionsData: data
      }))
      .catch((error) => {
        console.error('Error fetching transactions data:', error);
      });
    // Transactions data will be dependent on the 'date' state
  }, [state.date]);

  // Fetch categories and accounts data from backend server
  useEffect(() => {
    const fetchCategories = axios.get('http://localhost:8080/categories');
    const fetchAccounts = axios.get('http://localhost:8080/accounts');

    Promise.all([fetchCategories, fetchAccounts])
      .then((response) => {
        const [categoriesResponse, accountsResponse] = response;
        dispatch({
          type: ACTIONS.SET_ACCOUNTS_AND_CATEGORIES_DATA,
          accountsData: accountsResponse.data.accounts,
          categoriesData: categoriesResponse.data
        });
      })
      .catch((error) => { console.log("Error fetching categories and accounts data:", error); });
    // No dependency for categories and accounts data, only retrieve when the page reload
  }, []);


  // FUNCTION FOR FILTER BAR
  const incrementDate = () => {
    dispatch({
      type: ACTIONS.INCREMENT_DATE,
      newDate: moment(state.date).add(1, 'months').format("YYYY-MM")
    });
  };
  const decrementDate = () => {
    dispatch({
      type: ACTIONS.DECREMENT_DATE,
      newDate: moment(state.date).add(-1, 'months').format("YYYY-MM")
    });
  };


  // FUNCTION FOR TRANSACTION PAGE
  const toggleAddNewModal = () => {
    dispatch({
      type: ACTIONS.TOGGLE_ADD_NEW_TRANSACTION_MODAL
    });
  };
  const toggleEditTransactionModal = () => {
    dispatch({
      type: ACTIONS.TOGGLE_EDIT_TRANSACTION_MODAL
    });
  };
  const toggleEditTransferModal = () => {
    dispatch({
      type: ACTIONS.TOGGLE_EDIT_TRANSFER_MODAL
    });
  };
  const chooseTransaction = (transaction) => {
    dispatch({
      type: ACTIONS.SELECT_TRANSACTION,
      transaction
    });
  };

  return {
    state,
    incrementDate,
    decrementDate,
    toggleAddNewModal,
    toggleEditTransactionModal,
    toggleEditTransferModal,
    chooseTransaction
  };

};

export default useApplicationData;