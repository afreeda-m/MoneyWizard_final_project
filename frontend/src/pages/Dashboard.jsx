import React, { useEffect } from "react";
import Container from 'react-bootstrap/Container';
import ListGroup from 'react-bootstrap/ListGroup';
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/esm/Col";
import { AiOutlineBank } from 'react-icons/ai';
import { FaChartPie } from 'react-icons/fa';
import { NumericFormat } from "react-number-format";
import MonthlyBalanceChart from "../components/MonthlyBalanceChart";
import RecentTransactionsList from "../components/RecentTransactionsList";
import "../styles/Dashboard.scss";
import PieChartComponent from "./../components/PieChartMoneyWizard";


const Dashboard = (props) => {
  const { transactionsData,
    categoriesData,
    accountsData,
    chosenTransaction,
    getAccountNameById,
    getCategoryIconById,
    getCategoryNameById,
    getCategoryTypeById,
    transactionsByCategoryData,
    resetDate

  } = props;




  // Reset 'date' state to current to render data of the current month on dashboard
  useEffect(() => {
    resetDate();
  }, []);



  // Separate data into income and expense categories
  const incomeCategories = transactionsByCategoryData.filter((transaction) => transaction.type === "Income");
  const expenseCategories = transactionsByCategoryData.filter((transaction) => transaction.type === "Expense");

  // Calculate and set total income and expense amounts
  const totalIncome = incomeCategories.reduce((total, category) => total + parseFloat(category.sum), 0);
  const totalExpense = expenseCategories.reduce((total, category) => total + parseFloat(category.sum), 0);

  // calculate total balance for all accounts
  const totalAccountsBalance = accountsData
    .map((account) => account.balance)
    .reduce((a, b) => a + b, 0);

  // Get the top 5 recent transactions
  const top5RecentTransactions = transactionsData.slice(0, 5);


  return (
    <Container className="mt-5 mb-5 d-flex flex-column align-items-center bg-body-tertiary">
      {/* <h1 className="text-center">Dashboard</h1> */}

      <div className="dashboard">

        {/*  GRID BOX - PIE CHART*/}
        <div className="box box1">
          <div className="chartBox"><h3 className="card-name">Current Month Income and Expense overview</h3>
            <PieChartComponent data={[
              { category_name: 'Income', sum: totalIncome, type: "Income" },
              { category_name: 'Expense', sum: totalExpense, type: "Expense" },
            ]} />
          </div>
        </div>


        {/* BOX -TOTAL BALANCE */}
        <div className="box box2">
          <h3 className="card-name">CURRENT MONTH NET BALANCE</h3>
          <span className="number text-success">
            <h1>{" "}</h1>
            <NumericFormat
              className="mt-5"
              value={(totalIncome - totalExpense).toFixed(2)}
              displayType={"text"}
              thousandSeparator={true}
              prefix={"$"}
            />
          </span>
        </div>

        {/* BOX -This month */}
        <div className="box box3">
          <Row className="d-flex justify-content-between align-items-center mt-5 me-4">
            <Col>
              <h3 className="card-name text-center">
                <FaChartPie size={90} className="text-secondary mb-3" />
                <div className=""></div>This month</h3>
            </Col>
            <Col>
              <div className="d-flex justify-content-between mt-1">
                <div className=""></div>
                <div className="text-center d-flex justify-content-between">

                </div>
                <div className="big_text_1 text-end text-success" >
                  <NumericFormat
                    value={totalIncome.toFixed(2)}
                    displayType={"text"}
                    thousandSeparator={true}
                    prefix={"$"}
                  /></div>
              </div>
              <div className="d-flex justify-content-between mt-1">
                <div className=""> </div>
                <div className="big_text_1 text-end text-danger">-
                  <NumericFormat
                    value={totalExpense.toFixed(2)}
                    displayType={"text"}
                    thousandSeparator={true}
                    prefix={"$"}
                  />
                </div>
              </div>
              <div className="d-flex">
                <div className="col-5"></div>
                <hr className="col my-1"></hr>
              </div>
              <div className="d-flex justify-content-between">
                <div className=""></div>
                <div className="big_text_1 text-end text-success" >
                  <NumericFormat
                    value={(totalIncome - totalExpense).toFixed(2)}
                    displayType={"text"}
                    thousandSeparator={true}
                    prefix={"$"}
                  />

                </div>
              </div></Col>
          </Row>


        </div>
        {/* BOX -RECENT TRANSACTIONS */}
        <div className="box box6" >
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
        {/* BOX- MY ACCOUNTS*/}
        <div className="box box4">
          <div className="card-content">
            <h3 className="card-name">My ACCOUNTS </h3>
            <span className="icon-box"><AiOutlineBank /></span>

            {/* Render a list of accounts with amounts */}
            <div >
              <ListGroup>
                {accountsData.map((account, index) => (

                  <ListGroup.Item key={account.id}>
                    <Row className="texts">
                      <Col className="d-flex justfiy-content-left">
                        {account.account_name}:</Col>
                      <Col>
                        <b><NumericFormat
                          value={account.balance.toFixed(2)}
                          displayType={"text"}
                          thousandSeparator={true}
                          prefix={"$"}
                        /></b>
                      </Col>
                    </Row>
                  </ListGroup.Item>
                ))}
              </ListGroup>

              <ListGroup>
                <ListGroup.Item> <Row className="number-total-account">

                  <Col className="d-flex justify-content-between">Total: <h3>{" "}</h3>
                    <NumericFormat
                      value={totalAccountsBalance.toFixed(2)}
                      displayType={"text"}
                      thousandSeparator={true}
                      prefix={"$"}
                    /></Col>
                </Row></ListGroup.Item></ListGroup>
            </div>
          </div>
          {/* TOTAL OF ALL ACCOUNTS */}

        </div>



        {/* BOX -MONTHLY BALANCE LINE CHART */}
        <div className="box box5">
          <Row>
            <Col>
              <h3 className="card-name">Monthly Balance Chart</h3>
            </Col>
          </Row>
          <MonthlyBalanceChart />
        </div>



      </div>

    </Container >

  );
};

export default Dashboard;