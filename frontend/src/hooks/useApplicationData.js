import axios from 'axios';
import moment from "moment";
import { useEffect, useReducer } from "react";

export const ACTIONS = {
  SET_TRANSACTIONS_DATA: 'SET_TRANSACTION_DATA',
  SET_ACCOUNTS_AND_CATEGORIES_DATA: 'SET_ACCOUNTS_AND_CATEGORIES_DATA',
  SET_TRANSACTION_DATE: 'SET_TRANSACTION_DATE',
  SET_DATE: 'SET_DATE',
  INCREMENT_DATE: 'INCREMENT_DATE',
  DECREMENT_DATE: 'DECREMENT_DATE',
  TOGGLE_ADD_NEW_TRANSACTION_MODAL: 'TOGGLE_ADD_NEW_TRANSACTION_MODAL',
  TOGGLE_EDIT_TRANSACTION_MODAL: 'TOGGLE_EDIT_TRANSACTION_MODAL',
  TOGGLE_EDIT_TRANSFER_MODAL: 'TOGGLE_EDIT_TRANSFER_MODAL',
  SELECT_TRANSACTION: 'SELECT_TRANSACTION',
  SET_POST_TRANSACTION_DATA: 'SET_POST_TRANSACTION_DATA',
  SET_LOGGED_IN: 'SET_LOGGED_IN',
  SET_USERNAME: 'SET_USERNAME',
};

function reducer(state, action) {
  switch (action.type) {


    // ACTION FOR RETRIEVING DATA FROM BACKEND SERVER
    // Update transactionsData state when open the app
    case ACTIONS.SET_TRANSACTIONS_DATA:
      return { ...state, transactionsData: action.transactionsData };
    // Update categoriesData and accountsData states when open the app --> To be revised if we should separate these into two actions. For now I combined them as a temporary workaround
    case ACTIONS.SET_ACCOUNTS_AND_CATEGORIES_DATA:
      return { ...state, accountsData: action.accountsData, categoriesData: action.categoriesData };

    // Update transactionDate when picking transaction date
    case ACTIONS.SET_TRANSACTION_DATE:
      return { ...state, transactionDate: action.transactionDate };

    // ACTION FOR FILTER BAR COMPONENT
    // Update date state when click on the right arrow on filter bar
    case ACTIONS.INCREMENT_DATE:
      return { ...state, date: action.newDate };
    // Update date state when click on the left arrow on filter bar
    case ACTIONS.DECREMENT_DATE:
      return { ...state, date: action.newDate };

    case ACTIONS.SET_LOGGED_IN:
      return {...state, isLoggedIn: action.isLoggedIn}

    case ACTIONS.SET_USERNAME:
      return {...state, username: action.username}

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

    case ACTIONS.SET_POST_TRANSACTION_DATA:
      return { ...state, postTransactionData: action.postTransactionData };

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
      date: moment().format("YYYY-MM"), // state for filterBar
      transactionDate: moment(), // state for DatePicker
      isAddTransactionModalOpen: false,
      isEditTransactionModalOpen: false,
      isEditTransferModalOpen: false,
      chosenTransaction: null, // state to pull data and autofill edit form for Transaction/Transfer
      postTransactionData: { // state for Transaction/Transfer related form submission
        categoryId: null,
        accountId: null,
        accountToId: null,
        amount: null,
        transaction_date: moment(),
        notes: ''
      },
      isLoggedIn: false,
      username: '',
    }
  );

  // FUNCTION FOR FORM SUBMISSION
  const setPostTransactionData = (data) => {
    dispatch({
      type: ACTIONS.SET_POST_TRANSACTION_DATA,
      postTransactionData: data
    });
  };


  // FUNCTION FOR PICKING TRANSACTION DATE
  const pickTransactionDate = (newDate) => {
    dispatch({
      type: ACTIONS.SET_TRANSACTION_DATE,
      transactionDate: moment(newDate)
    });
  };

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

  const setIsLoggedIn = (loggedIn) => {
    dispatch({
      type: ACTIONS.SET_LOGGED_IN,
      isLoggedIn: loggedIn
    });
  }


  const setUsername = (username) => {
    dispatch({
      type: ACTIONS.SET_USERNAME,
      username: username
    })
  }

  // FUNCTION FOR TRANSACTION/TRANSFER RELATED PAGE
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
  const getTransactions = () => {
    fetch('http://localhost:8080/transactions?' + new URLSearchParams({
      month: moment(state.date).format("MM"),
      year: moment(state.date).format("YYYY")
    }))
      .then((res) => res.json())
      .then((data) => dispatch({
        type: ACTIONS.SET_TRANSACTIONS_DATA,
        transactionsData: data
      }))
      .catch((error) => {
        console.error('Error fetching transactions data:', error);
      });
  };


  // Fetch transactions data from backend server, dependent on the 'date' state
  useEffect(() => {

    getTransactions();

    // Dependent on the 'date' state
    // eslint-disable-next-line react-hooks/exhaustive-deps
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

  useEffect(() => {
    axios({
      method: "post",
      url: "/user/status",
      header: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    })
      .then((response) => {
        if(response.status == 200 && response.data.name){
          setIsLoggedIn(true);
          setUsername(response.data.name);
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  }, [])

  return {
    state,
    pickTransactionDate,
    incrementDate,
    decrementDate,
    toggleAddNewModal,
    toggleEditTransactionModal,
    toggleEditTransferModal,
    chooseTransaction,
    getTransactions,
    setPostTransactionData,
    setIsLoggedIn,
    setUsername
  };

};

export default useApplicationData;