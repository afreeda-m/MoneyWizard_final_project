import React, { useState, useEffect } from "react";
import Container from 'react-bootstrap/Container';
import axios from "axios";
import Card from 'react-bootstrap/Card';
import { ListGroup } from "react-bootstrap";
import { NumericFormat } from "react-number-format";
import RecentTransactionsList from "../components/RecentTransactionsList";
import "../styles/Dashboard.scss";
import MonthlyBalanceChart from "../components/MonthlyBalanceChart";
import PieChartMoneyWizard from "./../components/PieChartMoneyWizard";
import "../styles/Dashboard.scss";


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
  console.log(accountsData);
  // State for income and expense data
  const [incomeData, setIncomeData] = useState([]);
  const [expenseData, setExpenseData] = useState([]);

  // State for income/expense totals
  const [totalIncome, setTotalIncome] = useState(0);
  const [totalExpense, setTotalExpense] = useState(0);

  useEffect(() => {
    // Define an async function to fetch data
    const fetchData = async () => {
      try {
        // Fetch data from the API endpoint
        const response = await axios.get('/transactions/transactionsByCategory');

        // Transform the response data for use in charts
        const dataForRecharts = response.data.map(item => ({
          label: item.category_name,
          value: item.sum,
          type: item.type,
        }));

        // Separate data into income and expense categories
        const incomeCategoryList = dataForRecharts.filter(item => item.type === 'Income');
        const expenseCategoryList = dataForRecharts.filter(item => item.type === 'Expense');

        // Set the filtered data in state
        setIncomeData(incomeCategoryList);
        setExpenseData(expenseCategoryList);

        // Calculate and set total income and expense amounts
        const totalIncomeAmount = incomeCategoryList.reduce((total, item) => total + parseFloat(item.value), 0);
        const totalExpenseAmount = expenseCategoryList.reduce((total, item) => total + parseFloat(item.value), 0);

        // Log total income amount to the console
        console.log("total", totalIncomeAmount);

        // Set total income and expense amounts in state
        setTotalIncome(totalIncomeAmount);
        setTotalExpense(totalExpenseAmount);
      } catch (error) {
        // Handle errors during data fetching
        console.error('Error fetching income and expense distribution data:', error);
      }
    };

    // Call the fetchData function when the component mounts (empty dependency array)
    fetchData();
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

      <div className="dashboard">

        {/*  GRID BOX -1 */}
        <div className="box box1">
          <div className="chartBox">
            <PieChartMoneyWizard data={[
              { label: 'Income', value: totalIncome, type: "Income" },
              { label: 'Expense', value: totalExpense, type: "Expense" },
            ]} />
          </div>
        </div>

        {/* BOX -2 */}
        <div className="box box2">
          <span>TOTAL BALANCE</span>
          <span className="percentage">
            <h1>{" "}</h1>
            <NumericFormat
              value={totalAccountsBalance.toFixed(2)}
              displayType={"text"}
              thousandSeparator={true}
              prefix={"$"}
            />
          </span>
        </div>

        {/* BOX-3 */}
        <div className="box box3">
          <div className="texts">

            {/* Render a list of accounts with amounts */}
            <ul>
              {accountsData.map((account, index) => (
                <li key={index} className="percentage">
                  {`${account.account_name}: $${account.balance.toFixed(2)}`}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* BOX -4 */}
        <div className="box box4">
          <div className="summary-container">
            <h5 className="text-success">Income ${totalIncome}</h5>
            <h5 className="text-danger">Expense ${totalExpense}</h5>
            <h5>Total: ${totalIncome - totalExpense}</h5>
          </div>
        </div>
        {/* BOX -5 */}
        <div className="box box7"><MonthlyBalanceChart /></div>

        {/* BOX -6 */}
        <div className="box box8">
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

        <div className="box box9">box7</div>
      </div>

    </Container >

  );
};

export default Dashboard;