import axios from 'axios';
import moment from "moment";
import { useEffect, useReducer } from "react";

export const ACTIONS = {
  SET_TRANSACTIONS_DATA: 'SET_TRANSACTION_DATA',
  SET_ACCOUNTS_DATA: 'SET_ACCOUNTS_DATA',
  SET_CATEGORIES_DATA: 'SET_CATEGORIES_DATA',
  SET_TRANSACTION_DATE: 'SET_TRANSACTION_DATE',
  INCREMENT_DATE: 'INCREMENT_DATE',
  DECREMENT_DATE: 'DECREMENT_DATE',
  TOGGLE_ADD_NEW_TRANSACTION_MODAL: 'TOGGLE_ADD_NEW_TRANSACTION_MODAL',
  TOGGLE_EDIT_TRANSACTION_MODAL: 'TOGGLE_EDIT_TRANSACTION_MODAL',
  TOGGLE_EDIT_TRANSFER_MODAL: 'TOGGLE_EDIT_TRANSFER_MODAL',
  SELECT_TRANSACTION: 'SELECT_TRANSACTION',
  SET_POST_TRANSACTION_DATA: 'SET_POST_TRANSACTION_DATA',
  SET_LOGGED_IN: 'SET_LOGGED_IN',
  SET_USERNAME: 'SET_USERNAME',
  TOGGLE_ADD_NEW_CATEGORY_MODAL: 'TOGGLE_ADD_NEW_CATEGORY_MODAL',
  SET_POST_CATEGORY_DATA: 'SET_POST_CATEGORY_DATA',
  SET_ICONS_DATA: 'SET_ICONS_DATA'
};

function reducer(state, action) {
  switch (action.type) {


    // ACTION FOR RETRIEVING DATA FROM BACKEND SERVER
    // Update transactionsData state
    case ACTIONS.SET_TRANSACTIONS_DATA:
      return { ...state, transactionsData: action.transactionsData };
    // Update accountsData state
    case ACTIONS.SET_ACCOUNTS_DATA:
      return { ...state, accountsData: action.accountsData };
    // Update categoriesData state
    case ACTIONS.SET_CATEGORIES_DATA:
      return { ...state, categoriesData: action.categoriesData };

    case ACTIONS.SET_ICONS_DATA:
      return { ...state, iconsData: action.iconsData };


    // Update transactionDate when picking transaction date
    case ACTIONS.SET_TRANSACTION_DATE:
      return { ...state, transactionDate: action.transactionDate };

    // ACTION FOR FILTER BAR COMPONENT
    case ACTIONS.INCREMENT_DATE:
      return { ...state, date: action.newDate };
    case ACTIONS.DECREMENT_DATE:
      return { ...state, date: action.newDate };

    // ACTION FOR USER AUTHENTICATION
    case ACTIONS.SET_LOGGED_IN:
      return { ...state, isLoggedIn: action.isLoggedIn };
    case ACTIONS.SET_USERNAME:
      return { ...state, username: action.username };

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
    // Update postTransactionData state upon editing in the Modal
    case ACTIONS.SET_POST_TRANSACTION_DATA:
      return { ...state, postTransactionData: action.postTransactionData };

    // ACTION FOR CATEGORY RELATED COMPONENTS
    // Update state to Open/Close the Add New Category Modal
    case ACTIONS.TOGGLE_ADD_NEW_CATEGORY_MODAL:
      return { ...state, isAddCategoryModalOpen: !state.isAddCategoryModalOpen };
    // Update postCategoryData state upon editing in the Modal
    case ACTIONS.SET_POST_CATEGORY_DATA:
      return { ...state, postCategoryData: action.postCategoryData };

    default:
      throw new Error(
        `Tried to reduce with unsupported action type: ${action.type}`
      );
  }
}

const useApplicationData = () => {

  const [state, dispatch] = useReducer(reducer,
    {
      // DATA STATES FOR THE APPLICATION
      transactionsData: [],
      categoriesData: [],
      accountsData: [],

      // STATE FOR THE FILTER BAR
      date: moment().format("YYYY-MM"),

      // TRANSACTION PAGE RELATED STATES
      isAddTransactionModalOpen: false,
      isEditTransactionModalOpen: false,
      isEditTransferModalOpen: false,
      transactionDate: moment(), // state for DatePicker in the Modal
      chosenTransaction: null, // state for the target Transaction/Transfer when editing/deleting
      postTransactionData: { // state for Transaction/Transfer related form submission
        categoryId: null,
        accountId: null,
        accountToId: null,
        amount: null,
        transaction_date: moment(),
        notes: ''
      },

      // CATEGORY PAGE RELATED STATES
      isAddCategoryModalOpen: false,
      postCategoryData: { // state for form control in the Add New Category Modal
        category_name: null,
        type: null,
        logo_url: null,
        user_id: null
      },
      iconsData: [],

      // STATES FOR USER AUTHENTICATION
      isLoggedIn: false,
      username: '',
    }
  );

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

  // FUNCTION FOR USER AUTHENTICATION
  const setIsLoggedIn = (loggedIn) => {
    dispatch({
      type: ACTIONS.SET_LOGGED_IN,
      isLoggedIn: loggedIn
    });
  };
  const setUsername = (username) => {
    dispatch({
      type: ACTIONS.SET_USERNAME,
      username: username
    });
  };

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

  // FUNCTION FOR CATEGORY RELATED PAGE
  const toggleAddCategoryModal = () =>
    dispatch({
      type: ACTIONS.TOGGLE_ADD_NEW_CATEGORY_MODAL
    });

  // FUNCTION FOR FORM SUBMISSION
  // Transaction/Transfer related Modals
  const setPostTransactionData = (data) => {
    dispatch({
      type: ACTIONS.SET_POST_TRANSACTION_DATA,
      postTransactionData: data
    });
  };
  // Category Modal
  const setPostCategoryData = (data) => {
    dispatch({
      type: ACTIONS.SET_POST_CATEGORY_DATA,
      postCategoryData: data
    });
  };





  // FUNCTION TO FETCH DATA FROM BACKEND FOR TRANASCTIONS, ACCOUNTS AND CATEGORIES
  // Fetch transactions and update transactionsData state
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
  // Fetch accounts and update accountsData state
  const getAccounts = async () => {
    const response = await axios.get('/accounts');
    dispatch({
      type: ACTIONS.SET_ACCOUNTS_DATA,
      accountsData: response.data.accounts
    });
  };
  // Fetch categories and update categoriesData state
  const getCategories = async () => {
    const response = await axios.get('/categories');
    dispatch({
      type: ACTIONS.SET_CATEGORIES_DATA,
      categoriesData: response.data
    });
  };

  const getIcons = async () => {
    const response = await axios.get('/icons');
    dispatch({
      type: ACTIONS.SET_ICONS_DATA,
      iconsData: response.data
    });
  };

  // Fetch transactions data from backend server upon loading the app
  useEffect(() => {
    getTransactions();
    // Dependent on the 'date' state
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.date]);

  // Fetch categories and accounts data from backend server upon loading the app
  useEffect(() => {
    getAccounts();
    getCategories();
    getIcons();
    // No dependency for categories and accounts data, only retrieve on reload
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
        if (response.status == 200 && response.data.name) {
          setIsLoggedIn(true);
          setUsername(response.data.name);
        }
      })
      .catch(function(error) {
        console.log(error);
      });
  }, []);


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
    getAccounts,
    getCategories,
    getIcons,
    setPostTransactionData,
    setIsLoggedIn,
    setUsername,
    toggleAddCategoryModal,
    setPostCategoryData
  };

};

export default useApplicationData;