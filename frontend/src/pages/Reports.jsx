import axios from "axios";
import moment from 'moment';
import React, { useEffect, useState } from "react";
import Alert from "react-bootstrap/Alert";
import Col from "react-bootstrap/Col";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import ColumnChart from "../components/ColumnChart";
import FilterBar from "../components/FilterBar";
import IncomeExpenseList from "../components/IncomeExpenseList";
import PieChartMoneyWizard from "../components/PieChartMoneyWizard";
import ListGroup from 'react-bootstrap/ListGroup';
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





          {/* PieCharts for displaying income and expense distribution */}
          <Row className='d-flex justify-content-center'>

            <Col>
              <PieChartMoneyWizard data={incomeCategories} isExpense={false} />
            </Col>

            <Col>
              <PieChartMoneyWizard data={expenseCategories} isExpense={true} />
            </Col>

          </Row>



          {/* Lists to display individual income and expense transactions */}
          <Row className="d-flex flex-row justify-md-content-center pb-5">

            <Col md={{ span: 4, offset: 0 }} className="ms-4">

              <Col>
                {incomeCategories.map((category, index) => (
                  <IncomeExpenseList
                    key={index}
                    category={category}
                    categoriesData={categoriesData}
                    getCategoryIconById={getCategoryIconById}
                    getCategoryNameById={getCategoryNameById}
                  />
                ))}
              </Col>

              <Col>
                <ListGroup >

                  {expenseCategories.map((category, index) => (
                    <IncomeExpenseList
                      key={index}
                      category={category}
                      categoriesData={categoriesData}
                      getCategoryIconById={getCategoryIconById}
                      getCategoryNameById={getCategoryNameById}
                    />
                  ))}
                </ListGroup>
              </Col>
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
