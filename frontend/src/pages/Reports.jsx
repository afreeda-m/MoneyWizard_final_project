// Report.jsx
import React, { useState, useEffect } from "react";
import axios from "axios";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
// Import other Bootstrap components as needed
//import IncomeTransactions from "../components/IncomeTransactions";
import IncomePieChart from "../components/IncomePieChart";
import ExpensePieChart from "../components/ExpensePieChart";

const Report = () => {
  const [incomeData, setIncomeData] = useState([]);
  const [expenseData, setExpenseData] = useState([]);

  useEffect(() => {
    axios.get('/category/type')
      .then(response => {
        setIncomeData(response.data);
      })
      .catch(error => {
        console.error('Error fetching income distribution data:', error);
      });
  }, []);


  useEffect(() => {
    axios.get('/category/type')
    .then(response =>{
      setExpenseData(response.data)
    }).catch(error=>{
      console.error('Error fetching Expense distribution data:', error)
    })

  }, []);

  return (
    <Container>
      <Row>
        <IncomePieChart
          incomeData={incomeData}
        />
      </Row>
      <Row>
        <ExpensePieChart
          expenseData={expenseData}
        />
      </Row>
    </Container>
  );
};

export default Report;
