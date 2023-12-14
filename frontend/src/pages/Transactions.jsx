import FilterBar from "../components/FilterBar";
import FloatingActionButton from "../components/FloatingActionButton";
import TransactionList from "../components/TransactionList";
import TransactionModalAddNew from "../components/TransactionModalAddNew";
import TransactionModalEditTransaction from "../components/TransactionModalEditTransaction";
import TransactionModalEditTransfer from "../components/TransactionModalEditTransfer";
import NoDataDisplay from "../components/NoDataDisplay";

const Transactions = (props) => {

  const {
    transactionsData,
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
    getCategoryById,
    getAccountById,
    getTransactions,
    setPostTransactionData,
    postTransactionData,
    getAccounts,
    getTransactionsByCategory
  } = props;

  return (
    <div className="d-flex flex-column align-items-center mb-5" style={{ width: "100%"}} >

      <div style={{ width: "50%" }}>
        <FilterBar
          date={date}
          incrementDate={incrementDate}
          decrementDate={decrementDate}
        />
      </div>

      {transactionsData.length > 0
        ?
        <TransactionList
          transactionsData={transactionsData}
          categoriesData={categoriesData}
          accountsData={accountsData}
          chosenTransaction={chosenTransaction}
          isEditTransactionModalOpen={isEditTransactionModalOpen}
          toggleEditTransactionModal={toggleEditTransactionModal}
          isEditTransferModalOpen={isEditTransferModalOpen}
          toggleEditTransferModal={toggleEditTransferModal}
          chooseTransaction={chooseTransaction}
          getTransactions={getTransactions}
          getAccounts={getAccounts}
          getTransactionsByCategory={getTransactionsByCategory}
          getAccountById={getAccountById}
          getCategoryById={getCategoryById}
        />
        :
        <div style={{ width: "50%" }}>
          <NoDataDisplay />
        </div>
      }

      <FloatingActionButton click={toggleAddNewModal} />

      <TransactionModalAddNew
        accountsData={accountsData}
        categoriesData={categoriesData}
        isAddTransactionModalOpen={isAddTransactionModalOpen}
        toggleAddNewModal={toggleAddNewModal}
        transactionDate={transactionDate}
        pickTransactionDate={pickTransactionDate}
        getTransactions={getTransactions}
        setPostTransactionData={setPostTransactionData}
        postTransactionData={postTransactionData}
        getAccounts={getAccounts}
        getTransactionsByCategory={getTransactionsByCategory}
        getAccountById={getAccountById}
        getCategoryById={getCategoryById}
      />

      <TransactionModalEditTransaction
        accountsData={accountsData}
        categoriesData={categoriesData}
        isEditTransactionModalOpen={isEditTransactionModalOpen}
        toggleEditTransactionModal={toggleEditTransactionModal}
        chosenTransaction={chosenTransaction}
        transactionDate={transactionDate}
        pickTransactionDate={pickTransactionDate}
        setPostTransactionData={setPostTransactionData}
        postTransactionData={postTransactionData}
        getTransactions={getTransactions}
        getAccounts={getAccounts}
        getTransactionsByCategory={getTransactionsByCategory}
        getAccountById={getAccountById}
        getCategoryById={getCategoryById}
      />

      <TransactionModalEditTransfer
        accountsData={accountsData}
        isEditTransferModalOpen={isEditTransferModalOpen}
        toggleEditTransferModal={toggleEditTransferModal}
        chosenTransaction={chosenTransaction}
        transactionDate={transactionDate}
        pickTransactionDate={pickTransactionDate}
        setPostTransactionData={setPostTransactionData}
        postTransactionData={postTransactionData}
        getTransactions={getTransactions}
        getAccounts={getAccounts}
        getTransactionsByCategory={getTransactionsByCategory}
        getAccountById={getAccountById}
      />

    </div>
  );
};

export default Transactions;