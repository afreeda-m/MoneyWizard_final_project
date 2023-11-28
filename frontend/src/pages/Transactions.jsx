import FilterBar from "../components/FilterBar";
import FloatingActionButton from "../components/FloatingActionButton";
import TransactionList from "../components/TransactionList";
import TransactionModalAddNew from "../components/TransactionModalAddNew";
import TransactionModalEditTransaction from "../components/TransactionModalEditTransaction";

const Transactions = (props) => {

  const { transactionsData,
    categoriesData,
    accountsData,
    date,
    isAddTransactionModalOpen,
    isEditTransactionModalOpen,
    isEditTransferModelOpen,
    chosenTransaction,
    incrementDate,
    decrementDate,
    toggleAddNewModal,
    toggleEditTransactionModal,
    toggleEditTransferModal,
    chooseTransaction,
    getAccountNameById,
    getCategoryIconById,
    getCategoryNameById,
    getCategoryTypeById
  } = props;

  return (
    <div className="d-flex flex-column align-items-center bg-body-tertiary mt-5" >

      <h1>Transactions</h1>

      <FilterBar
        date={date}
        incrementDate={incrementDate}
        decrementDate={decrementDate}
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