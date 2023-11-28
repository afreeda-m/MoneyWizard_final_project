import FilterBar from "../components/FilterBar";
import FloatingActionButton from "../components/FloatingActionButton";
import TransactionList from "../components/TransactionList";
import TransactionModalAddNew from "../components/TransactionModalAddNew";
import TransactionModalEditTransaction from "../components/TransactionModalEditTransaction";
import TransactionModalEditTransfer from "../components/TransactionModalEditTransfer";

const Transactions = (props) => {

  const { transactionsData,
    categoriesData,
    accountsData,
    date,
    isAddTransactionModalOpen,
    isEditTransactionModalOpen,
    isEditTransferModalOpen,
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
        isEditTransferModalOpen={isEditTransferModalOpen}
        toggleEditTransferModal={toggleEditTransferModal}
        chooseTransaction={chooseTransaction}
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
        getAccountNameById={getAccountNameById}
        getCategoryNameById={getCategoryNameById}
      />

      <TransactionModalEditTransfer
        isEditTransferModalOpen={isEditTransferModalOpen}
        toggleEditTransferModal={toggleEditTransferModal}
        categories={categoriesData}
        accounts={accountsData}
        chosenTransaction={chosenTransaction}
        getAccountNameById={getAccountNameById}
      />

    </div>
  );
};

export default Transactions;