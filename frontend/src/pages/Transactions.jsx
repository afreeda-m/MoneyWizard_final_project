import Alert from "react-bootstrap/Alert";
import Col from "react-bootstrap/Col";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
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
    <div className="d-flex flex-column align-items-center bg-body-tertiary mb-5" style={{ width: "100%", paddingTop: "50px" }} >

      <FilterBar
        date={date}
        incrementDate={incrementDate}
        decrementDate={decrementDate}
      />

      {/* TRANSACTIONS LIST */}
      {/* If the transactions list is NOT empty, display it. It it is empty,
        * display an error message.
        */}
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

        // ERROR MESSAGE (If there aren't any transactions.)
        <Container>
          <Row >
            <Col className='justify-content-md-center'>
              <Alert variant="success">
                <Alert.Heading>Hello!</Alert.Heading>
                <p>
                  No transactions are available.
                </p>
                <hr />
                <p className="mb-0">
                  Consider adding some transactions to this month!
                </p>
              </Alert>
            </Col>
          </Row>
        </Container>

      }

      <FloatingActionButton click={toggleAddNewModal} />

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