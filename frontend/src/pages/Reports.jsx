// Report.jsx
import React, { useState, useEffect } from "react";
import axios from "axios";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import PieChart from "../components/PieChart";
import ColumnChart from "../components/ColumnChart";
import Col from "react-bootstrap/esm/Col";
import FilterBar from "../components/FilterBar";
import IncomeTransactions from "../components/IncomeTransactions";
import ExpenseTransactions from "../components/ExpenseTransactions";

const Report = () => {

  // State for income and expense data
  const [incomeData, setIncomeData] = useState([]);
  const [expenseData, setExpenseData] = useState([]);

  // State for date and income/expense totals
  const [date, setDate] = useState(new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' }));
  const [totalIncome, setTotalIncome] = useState(0);
  const [totalExpense, setTotalExpense] = useState(0);

  useEffect(() => {
    // Fetch income and expense data from the backend
    axios.get('/transactions/transactionsByCategory')
      .then(response => {

        //transform each item in the response.data array into a new object
        // the response structure is an array of objects with 'category_name', 'sum', and 'type' properties
        const dataForRecharts = response.data.map(item => ({
          label: item.category_name,
          value: item.sum,
          type: item.type, // 'income' or 'expense'
        }));

        // Separate income and expense data based on the 'type' property
        const incomeCategoryList = dataForRecharts
          .filter(item => item.type === 'Income');


        const expenseCategoryList = dataForRecharts
          .filter(item => item.type === 'Expense');


        // Set the filtered data in state
        setIncomeData(incomeCategoryList);
        setExpenseData(expenseCategoryList);
      })
      .catch(error => {
        console.error('Error fetching income and expense distribution data:', error);
      });

    // // Calculate and set total income and expense amounts
    const totalIncomeAmount = incomeData.reduce((total, item) => total + parseFloat(item.value), 0);
    const totalExpenseAmount = expenseData.reduce((total, item) => total + parseFloat(item.value), 0);

    setTotalIncome(totalIncomeAmount);
    setTotalExpense(totalExpenseAmount);

  }, [date, incomeData, expenseData]);


  return (
    <Container className="mt-5">
      <Row className="justify-content-md-center">
        <Col md={{ span: 6, offset: 3 }} >

          <FilterBar
            date={date}
            setDate={setDate}
          />

        </Col>
      </Row>
      <Row className="justify-content-md-center">
        <Col md={{ span: 8, offset: 2 }} >
          <ColumnChart
            incomeData={incomeData}
            expenseData={expenseData}
            date={date}
            totalIncome={totalIncome}
            totalExpense={totalExpense}
          />
        </Col>

      </Row>
      <Row  >
        <Col md={{ span: 4, offset: 2 }}>
          <PieChart
            data={incomeData}
            isExpense={false}
          />
        </Col>
        <Col md={{ span: 4, offset: 2 }}>
          <PieChart
            data={expenseData}
            isExpense={true}
          />
        </Col>
      </Row>
      <Row className="d-flex space-between" >
        <Col md={{ span: 4, offset: 2 }}>
          <Col><h4>Income</h4></Col>
          <Col >
            <IncomeTransactions
              incomeData={incomeData} />
          </Col>

        </Col>
        <Col md={{ span: 4, offset: 2 }}>
          <h4>Expense</h4>
          <Col >
            <ExpenseTransactions
              expenseData={expenseData} />
          </Col>
        </Col>
      </Row>

    </Container>
  );
};

export default Report;
