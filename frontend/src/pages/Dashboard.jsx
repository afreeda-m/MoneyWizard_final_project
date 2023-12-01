import React from "react";
import Container from 'react-bootstrap/Container';
import Col from "react-bootstrap/esm/Col";
import Row from "react-bootstrap/esm/Row";
import { NumericFormat } from "react-number-format";
import RecentTransactionsList from "../components/RecentTransactionsList";
import "../styles/Dashboard.scss";


const Dashboard = (props) => {
  const { transactionsData,
    categoriesData,
    accountsData,
    chosenTransaction,
    getAccountNameById,
    getCategoryIconById,
    getCategoryNameById,
    getCategoryTypeById
  } = props;

  // calculate total balance for all accounts
  const totalAccountsBalance = accountsData
    .map((account) => account.balance)
    .reduce((a, b) => a + b, 0);

    // Get the top 5 recent transactions
  const top5RecentTransactions = transactionsData.slice(0, 5);

  return (
    <Container className="mt-5 d-flex flex-column align-items-center bg-body-tertiary">
      <h1>Dashboard</h1>
      <div className='main-cards'>

           {/* First card for total balance */}
        <div className='card shadow p-3 mb-5 bg-white rounded'>
          <div className='card-inner'>
            <h3>TOTAL BALANCE</h3>
          </div>
          <h1>{" "}</h1>
          <NumericFormat
            value={totalAccountsBalance.toFixed(2)}
            displayType={"text"}
            thousandSeparator={true}
            prefix={"$"}
          />
        </div>

        {/* Second card showing Income/Expense distribution PieChart */}
        <div className='card shadow p-3 mb-5 bg-white rounded'>
          <div className='card-inner'>
            <h3>Income/Expense PieChart</h3>

          </div>
          <h1>{" "}</h1>
        </div>
      </div>

      {/* Rendering Charts section */}
      <Row className="justify-content-md-center text-center">
        <Col>
          <div className="shadow p-3 mb-5 bg-white rounded" style={{ width: "50vw" }}>
            <h1>Barchart </h1>
            <p> Monthly balance chart </p>
          </div>
        </Col>
      </Row>

       {/* Rendering Recent Transactions section */}
      <Row className="justify-content-md-center text-center">
        <Col >
          <div className="shadow p-3 mb-5 bg-white rounded ">

            <h1>Recent Transactions </h1>
            < RecentTransactionsList
              transactionsData={top5RecentTransactions}
              categoriesData={categoriesData}
              accountsData={accountsData}
              getAccountNameById={getAccountNameById}
              getCategoryIconById={getCategoryIconById}
              getCategoryNameById={getCategoryNameById}
              getCategoryTypeById={getCategoryTypeById}
              chosenTransaction={chosenTransaction}
              disableEditingAndDeleting={true}
            />
          </div>
        </Col>
      </Row>

 </Container>

  );
};

export default Dashboard;