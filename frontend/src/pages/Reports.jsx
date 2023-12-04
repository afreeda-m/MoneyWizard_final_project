import axios from "axios";
import moment from 'moment';
import React, { useEffect, useState } from "react";
import Alert from "react-bootstrap/Alert";
import Col from "react-bootstrap/Col";
import Container from 'react-bootstrap/Container';
import ListGroup from 'react-bootstrap/ListGroup';
import Row from 'react-bootstrap/Row';
import ColumnChart from "../components/ColumnChart";
import FilterBar from "../components/FilterBar";
import IncomeExpenseList from "../components/IncomeExpenseList";
import IncomeExpenseListNew from "../components/IncomeExpenseListNew";
import PieChartMoneyWizard from "../components/PieChartMoneyWizard";
import "../styles/Reports.scss";

const Report = (props) => {
  const {
    date,
    incrementDate,
    decrementDate,
    transactionsByCategoryData,
    categoriesData,
    getCategoryIconById,
    getCategoryNameById
  } = props;


  const incomeCategories = transactionsByCategoryData.filter((transaction) => transaction.type === "Income");
  const expenseCategories = transactionsByCategoryData.filter((transaction) => transaction.type === "Expense");

  const totalIncome = incomeCategories.reduce((total, category) => total + parseFloat(category.sum), 0);
  const totalExpense = expenseCategories.reduce((total, category) => total + parseFloat(category.sum), 0);

  // console.log("log totalIncome:", totalIncome);
  // console.log("log totalExpense:", totalExpense);

  // console.log(moment(date).format("MM"));
  // console.log(moment(date).format("YYYY"));

  console.log('New income data:', incomeCategories);
  console.log('New expense data:', expenseCategories);


  return (
    <Container className="mt-5 d-flex flex-column justify-content-center">

      {/* FilterBar component for selecting the date */}
      <Row className="justify-content-center">
        <Col>
          <FilterBar
            date={date}
            incrementDate={incrementDate}
            decrementDate={decrementDate} />
        </Col>
      </Row>

      {transactionsByCategoryData.length > 0
        ?
        <>
          {/* ColumnChart component for displaying bar chart */}
          <Row className="justify-content-center">
            <Col>
              <ColumnChart
                data={[
                  { category: 'income', income: totalIncome, month: moment(date).format("MM"), year: moment(date).format("YYYY") },
                  { category: 'expense', expense: totalExpense, month: moment(date).format("MM"), year: moment(date).format("YYYY") },
                ]}
                totalIncome={totalIncome}
                totalExpense={totalExpense} />
            </Col>
          </Row>

          <Row >
            <Col xs={6}>
              <IncomeExpenseListNew
                categoriesDataByType={incomeCategories}
                categoriesData={categoriesData}
                getCategoryIconById={getCategoryIconById}
                getCategoryNameById={getCategoryNameById}
              />
            </Col>

            <Col xs={6}>
              <IncomeExpenseListNew
                categoriesDataByType={expenseCategories}
                categoriesData={categoriesData}
                getCategoryIconById={getCategoryIconById}
                getCategoryNameById={getCategoryNameById}
              />
            </Col>
          </Row>

        </>
        :
        <Row >
          <Col className='justify-content-md-center'>
            <Alert variant="success">
              <Alert.Heading>Hello!</Alert.Heading>
              <p>
                No data available to display charts.
              </p>
              <hr />
              <p className="mb-0">
                Consider adding some transactions to see meaningful charts!
              </p>
            </Alert>
          </Col>
        </Row>
      }

    </Container>
  );
};

export default Report;
