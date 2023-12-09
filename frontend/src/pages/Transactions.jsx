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
    getAccountNameById,
    getCategoryIconById,
    getCategoryNameById,
    getCategoryTypeById,
    getCategoryById,
    getAccountById,
    getTransactions,
    setPostTransactionData,
    postTransactionData,
    getAccounts,
    getTransactionsByCategory
  } = props;

  return (
    <div className="d-flex flex-column align-items-center bg-body-tertiary mb-5" style={{ width: "100%", paddingTop: "50px" }} >

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
        categories={categoriesData}
        accounts={accountsData}
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