import moment from "moment";
import { useReducer, useEffect } from "react";

export const ACTIONS = {
  SET_TRANSACTIONS_DATA: 'SET_TRANSACTION_DATA',
  SET_CATEGORIES_DATA: 'SET_CATEGORY_DATA',
  SET_ACCOUNTS_DATA: 'SET_ACCOUNT_DATA',
  INCREMENT_DATE: 'INCREMENT_DATE',
  DECREMENT_DATE: 'DECREMENT_DATE',
  TOGGLE_ADD_NEW_TRANSACTION_MODAL: 'TOGGLE_ADD_NEW_TRANSACTION_MODAL',
  TOGGLE_EDIT_TRANSACTION_MODAL: 'TOGGLE_EDIT_TRANSACTION_MODAL',
  TOGGLE_EDIT_TRANSFER_MODAL: 'TOGGLE_EDIT_TRANSFER_MODAL',
  SELECT_TRANSACTION: 'SELECT_TRANSACTION'
};

function reducer(state, action) {
  switch (action.type) {

    // Update transactionsData state when open the app
    case ACTIONS.SET_TRANSACTIONS_DATA:
      return { ...state, transactionsData: action.transactionsData };

    //Update categoriesData state when open the app
    case ACTIONS.SET_CATEGORIES_DATA:
      return { ...state, categoriesData: action.categoriesData };

    //Update accountsData state when open the app
    case ACTIONS.SET_ACCOUNTS_DATA:
      return { ...state, accountsData: action.accountsData };

    // Update date state when click on the right arrow on filter bar
    case ACTIONS.INCREMENT_DATE:
      return { ...state, date: action.newDate };

    // Update date state when click on the left arrow on filter bar
    case ACTIONS.DECREMENT_DATE:
      return { ...state, date: action.newDate };

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
      IsEditTransactionModalOpen: false,
      IsEditTransferModalOpen: false,
      chosenTransaction: null
    }
  );


  // Fetching data from backend
  useEffect(() => {

    // Fetch transactions data from backend server
    fetch('http://localhost:8080/transactions')
      .then((res) => res.json())
      .then((data) => dispatch({
        type: ACTIONS.SET_TRANSACTIONS_DATA,
        transactionsData: data
      }));

    // Fetch categories data from backend server
    fetch('http://localhost:8080/categories')
      .then((res) => res.json())
      .then((data) => dispatch({
        type: ACTIONS.SET_CATEGORIES_DATA,
        categoriesData: data
      }));

    // Fetch accounts data from backend server
    fetch('http://localhost:8080/accounts')
      .then((res) => res.json())
      .then((data) => dispatch({
        type: ACTIONS.SET_ACCOUNTS_DATA,
        accountsData: data
      }));

  }, []);

  const incrementDate = () => {
    dispatch({
      type: ACTIONS.INCREMENT_DATE,
      newDate: moment(state.date).add(1, 'months')
    });
  };

  const decrementDate = () => {
    dispatch({
      type: ACTIONS.DECREMENT_DATE,
      newDate: moment(state.date).add(-1, 'months')
    });
  };

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
    })
  }

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