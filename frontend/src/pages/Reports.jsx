// Report.jsx
import React, { useState, useEffect } from "react";
import axios from "axios";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import IncomePieChart from "../components/IncomePieChart";
import ExpensePieChart from "../components/ExpensePieChart";
import ColumnChart from "../components/ColumnChart";
import Col from "react-bootstrap/esm/Col";
import FilterBar from "../components/FilterBar";
import { calculateIncomeDistribution } from "../helpers/mockhelpers";


const Report = () => {
  const [incomeData, setIncomeData] = useState([]);
  const [expenseData, setExpenseData] = useState([]);
  const [date, setDate] = useState(new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' }));
  const [incomeDistribution, setIncomeDistribution] = useState([]);

  useEffect(() => {
    // Fetch income and expense data from the backend
    axios.get('/transactions/transactionsByCategory')
      .then(response => {
        console.log("Transaction by category data:", response.data);
        // the response structure is an array of objects with 'category_name', 'sum', and 'type' properties
        const dataForRecharts = response.data.map(item => ({
          label: item.category_name,
          value: item.sum,
          type: item.type, // 'income' or 'expense'
        }));
        // Separate income and expense data based on the 'type' property
        const incomeDataForRecharts = dataForRecharts
          .filter(item => item.type === 'income');

        const expenseDataForRecharts = dataForRecharts
          .filter(item => item.type === 'expense');

        // Set the filtered data in state
        setIncomeData(incomeDataForRecharts);
        setExpenseData(expenseDataForRecharts);
        console.log("inside report incomeData:", incomeDataForRecharts);
      })
      .catch(error => {
        console.error('Error fetching income and expense distribution data:', error);
      });

      // Calculate and set income distribution by category
    const incomeDistributionData = calculateIncomeDistribution();
    setIncomeDistribution(incomeDistributionData);

  }, [date]);



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
          />
        </Col>

      </Row>
      <Row  >
        <Col md={{ span: 4, offset: 2 }}>
          <IncomePieChart
            incomeData={incomeData}
          />
        </Col>
        <Col md={{ span: 4, offset: 2 }}>
          <ExpensePieChart
            expenseData={expenseData}
          />
        </Col>
      </Row>
      <Row className="d-flex space-between" >
        <Col md={{ span: 4, offset: 2 }}>
          <h4>Income</h4>
        </Col>
        <Col md={{ span: 4, offset: 2 }}>
          <h4>Expense</h4>
        </Col>
      </Row>

    </Container>
  );
};

export default Report;
