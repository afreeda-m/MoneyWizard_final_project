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
    transactionDate,
    pickTransactionDate,
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
    getCategoryTypeById,
    getTransactions,
    setPostTransactionData,
    postTransactionData,
    getAccounts,
    getTransactionsByCategory
  } = props;

  return (
    <div className="d-flex flex-column align-items-center bg-body-tertiary mb-5" style={{width: "100%", paddingTop: "50px"}} >

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
        getTransactions={getTransactions}
        getAccounts={getAccounts}
        getTransactionsByCategory={getTransactionsByCategory}
      />

      <div onClick={toggleAddNewModal}>
        <FloatingActionButton />
      </div>

      <TransactionModalAddNew
        isAddTransactionModalOpen={isAddTransactionModalOpen}
        toggleAddNewModal={toggleAddNewModal}
        categories={categoriesData}
        accounts={accountsData}
        transactionDate={transactionDate}
        pickTransactionDate={pickTransactionDate}
        getTransactions={getTransactions}
        setPostTransactionData={setPostTransactionData}
        postTransactionData={postTransactionData}
        getAccounts={getAccounts}
        getTransactionsByCategory={getTransactionsByCategory}
      />

      <TransactionModalEditTransaction
        isEditTransactionModalOpen={isEditTransactionModalOpen}
        toggleEditTransactionModal={toggleEditTransactionModal}
        categories={categoriesData}
        accounts={accountsData}
        chosenTransaction={chosenTransaction}
        getAccountNameById={getAccountNameById}
        getCategoryNameById={getCategoryNameById}
        transactionDate={transactionDate}
        pickTransactionDate={pickTransactionDate}
        setPostTransactionData={setPostTransactionData}
        postTransactionData={postTransactionData}
        getTransactions={getTransactions}
        getAccounts={getAccounts}
        getTransactionsByCategory={getTransactionsByCategory}
      />

      <TransactionModalEditTransfer
        isEditTransferModalOpen={isEditTransferModalOpen}
        toggleEditTransferModal={toggleEditTransferModal}
        categories={categoriesData}
        accounts={accountsData}
        chosenTransaction={chosenTransaction}
        getAccountNameById={getAccountNameById}
        transactionDate={transactionDate}
        pickTransactionDate={pickTransactionDate}
        setPostTransactionData={setPostTransactionData}
        postTransactionData={postTransactionData}
        getTransactions={getTransactions}
        getAccounts={getAccounts}
        getTransactionsByCategory={getTransactionsByCategory}
      />

    </div>
  );
};

export default Transactions;