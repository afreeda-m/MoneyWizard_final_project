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
import PieChartComponent from "./../components/PieChartMoneyWizard";
import "../styles/Dashboard.scss";
import { AiOutlineBank } from 'react-icons/ai';
import { FaChartPie } from 'react-icons/fa';
import ListGroup from 'react-bootstrap/ListGroup';


const Dashboard = (props) => {
  const { transactionsData,
    categoriesData,
    accountsData,
    chosenTransaction,
    getAccountNameById,
    getCategoryIconById,
    getCategoryNameById,
    getCategoryTypeById,
    transactionsByCategoryData

  } = props;

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
    <Container className="mt-5 d-flex flex-column align-items-center bg-body-tertiary">
      {/* <h1 className="text-center">Dashboard</h1> */}

      <div className="dashboard">

        {/*  GRID BOX - PIE CHART*/}
        <div className="box box1">
          <div className="chartBox"><h2 className="card-name">Income and Expense overview chart</h2>
            <PieChartComponent data={[
              { label: 'Income', value: totalIncome, type: "Income" },
              { label: 'Expense', value: totalExpense, type: "Expense" },
            ]} />
          </div>
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

        {/* BOX -This month */}
        <div className="box box3">
          <Row className="d-flex justify-content-between">
            <Col><FaChartPie size={60} className="text-secondary mb-3" /></Col>
            <Col>
              <div className="d-flex justify-content-between mt-1">
                <div className=""></div>
                <div className="text-center d-flex justify-content-between">
                  <h5 className="card-name">This month</h5>
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
        <div className="box box6">
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
            <h2 className="card-name">My ACCOUNTS </h2>
            <span className="icon-box"><AiOutlineBank /></span>

            {/* Render a list of accounts with amounts */}
            <div >
              <ListGroup>
                {accountsData.map((account, index) => (
                  <div>
                    <ListGroup.Item key={index}>
                      <Row>
                        <Col className="d-flex justfiy-content-left">{account.account_name}:</Col>
                        <Col className="text-center"><b>${account.balance.toFixed(2)}</b></Col>
                      </Row>
                    </ListGroup.Item>
                  </div>
                ))}
              </ListGroup>

              {/* TOTAL OF ALL ACCOUNTS */}
              <span className="number">
                <h1>{" "}</h1>
              <NumericFormat
                value={totalAccountsBalance.toFixed(2)}
                displayType={"text"}
                thousandSeparator={true}
                prefix={"$"}
              />
              </span>

            </div>
          </div>
        </div>



        {/* BOX -MONTHLY BALANCE LINE CHART */}
        <div className="box box5">
          <Row>
            <Col>
              <h2 className="card-name">Past 6 Months Balance Chart</h2>
            </Col>
          </Row>
          <MonthlyBalanceChart />
        </div>



      </div>

    </Container >

  );
};

export default Dashboard;