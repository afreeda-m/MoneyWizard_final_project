import React, { useState, useEffect } from "react";
import Container from 'react-bootstrap/Container';
import axios from "axios";
import Col from "react-bootstrap/esm/Col";
import Row from "react-bootstrap/esm/Row";
import { NumericFormat } from "react-number-format";
import RecentTransactionsList from "../components/RecentTransactionsList";
import "../styles/Dashboard.scss";
import MonthlyBalanceChart from "../components/MonthlyBalanceChart";
import PieChartMoneyWizard from "./../components/PieChartMoneyWizard";
import ColumnChart from "../components/ColumnChart";

const Dashboard = (props) => {
  const { transactionsData,
    categoriesData,
    accountsData,
    chosenTransaction,
    getAccountNameById,
    getCategoryIconById,
    getCategoryNameById,
    getCategoryTypeById,

  } = props;

  // State for income and expense data
  const [incomeData, setIncomeData] = useState([]);
  const [expenseData, setExpenseData] = useState([]);

  // State for income/expense totals
  const [totalIncome, setTotalIncome] = useState(0);
  const [totalExpense, setTotalExpense] = useState(0);
  useEffect(() => {
    axios.get('/transactions/transactionsByCategory')
      .then(response => {
        // Transform the response data for use in charts

        const dataForRecharts = response.data.map(item => ({
          label: item.category_name,
          value: item.sum,
          type: item.type,
        }));

        // Separate income and expense data based on the 'type' property
        const incomeCategoryList = dataForRecharts.filter(item => item.type === 'Income');
        const expenseCategoryList = dataForRecharts.filter(item => item.type === 'Expense');

        // Set the filtered data in state
        setIncomeData(incomeCategoryList);
        setExpenseData(expenseCategoryList);

        // Calculate and set total income and expense amounts
        const totalIncomeAmount = incomeCategoryList.reduce((total, item) => total + parseFloat(item.value), 0);
        const totalExpenseAmount = expenseCategoryList.reduce((total, item) => total + parseFloat(item.value), 0);
        console.log("total", totalIncomeAmount);
        setTotalIncome(totalIncomeAmount);
        setTotalExpense(totalExpenseAmount);
      })
      .catch(error => {
        console.error('Error fetching income and expense distribution data:', error);
      });
  }, []);

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
          <div className='pie-card'>

            <PieChartMoneyWizard data={incomeData} isExpense={false} />

          </div>
        </div>
      {/* Rendering Charts section */}
      <Row className="justify-content-md-center text-center">
        <Col>
          <div className="shadow p-3 mb-5 bg-white rounded" style={{ width: "50vw" }}>

            <MonthlyBalanceChart />
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