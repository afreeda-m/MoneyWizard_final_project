import React, { useState, useEffect } from "react";
import Container from 'react-bootstrap/Container';
import axios from "axios";
import Card from 'react-bootstrap/Card';
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/esm/Col";
import { NumericFormat } from "react-number-format";
import RecentTransactionsList from "../components/RecentTransactionsList";
import "../styles/Dashboard.scss";
import MonthlyBalanceChart from "../components/MonthlyBalanceChart";
import PieChartMoneyWizard from "./../components/PieChartMoneyWizard";
import "../styles/Dashboard.scss";
import { AiOutlineBank } from 'react-icons/ai';
import { FaChartPie } from 'react-icons/fa';


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
      {/* <h1 className="text-center">Dashboard</h1> */}

      <div className="dashboard">

        {/*  GRID BOX - PIE CHART*/}
        <div className="box box1">
          <div className="chartBox"><p><b>Income and Expense overview chart</b></p>
            <PieChartMoneyWizard data={[
              { label: 'Income', value: totalIncome, type: "Income" },
              { label: 'Expense', value: totalExpense, type: "Expense" },
            ]} />
          </div>
        </div>
        {/* BOX -This month */}
        <div className="box box4">
          <Row className="d-flex justify-content-between">
            <Col><FaChartPie size={60} className="text-secondary mb-3" /></Col>
            <Col><div className="d-flex justify-content-between mt-1">
              <div className=""></div>
              <div className="text-center"><b>This month</b></div>
              <div className="big_text_1 text-end text-success" >${totalIncome}</div>
            </div>
              <div className="d-flex justify-content-between mt-1">
                <div className=""> </div>
                <div className="big_text_1 text-end text-danger">-  ${totalExpense}</div>
              </div>
              <div className="d-flex">
                <div className="col-5"></div>
                <hr className="col my-1"></hr>
              </div>
              <div className="d-flex justify-content-between">
                <div className=""></div>
                <div className="big_text_1 text-end text-success" >${totalIncome - totalExpense}</div>
              </div></Col>
          </Row>


        </div>

        {/* BOX -TOTAL BALANCE */}
        <div className="box box2">
          <h2 className="card-name">TOTAL BALANCE</h2>
          <span className="number">
            <h1>{" "}</h1>
            <NumericFormat
              value={(totalIncome - totalExpense).toFixed(2)}
              displayType={"text"}
              thousandSeparator={true}
              prefix={"$"}
            />
          </span>
        </div>


        {/* BOX- MY ACCOUNTS*/}
        <div className="box box3">
          <div className="card-content">
            <h2 className="card-name">My ACCOUNTS </h2>
            <span className="icon-box"><AiOutlineBank /></span>

            {/* Render a list of accounts with amounts */}
            <div className="number"><ul className="no-bullets">
              {accountsData.map((account, index) => (
                <li key={index} className="percentage">
                  {`${account.account_name}: $${account.balance.toFixed(2)}`}
                </li>
              ))}
            </ul>

              {/* TOTAL OF ALL ACCOUNTS */}
              <h1 className="number">{" "}</h1>
              <NumericFormat
                value={totalAccountsBalance.toFixed(2)}
                displayType={"text"}
                thousandSeparator={true}
                prefix={"$"}
              />
            </div>
          </div>
        </div>


        {/* BOX -MONTHLY BALANCE CHART */}
        <div className="box box7">
          <MonthlyBalanceChart />
        </div>

        {/* BOX -RECENT TRANSACTIONS */}
        <div className="box box8">
          <h1 className="card-name">RECENT TRANSACTIONS </h1>
          
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

      </div>

    </Container >

  );
};

export default Dashboard;