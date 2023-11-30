import React, { useState, useEffect } from "react";
import axios from "axios";
import moment from 'moment';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import PieChart from "../components/PieChart";
import ColumnChart from "../components/ColumnChart";
import Col from "react-bootstrap/esm/Col";
import FilterBar from "../components/FilterBar";
import IncomeExpenseList from "../components/IncomeExpenseList";

const Report = (props) => {

  // State for income and expense data
  const [incomeData, setIncomeData] = useState([]);
  const [expenseData, setExpenseData] = useState([]);

  // State for date and income/expense totals
  const [date, setDate] = useState(new Date());
  const [totalIncome, setTotalIncome] = useState(0);
  const [totalExpense, setTotalExpense] = useState(0);

  //Add state variables to keep track of the selected month and year.

  // Use moment to parse the date string
  const dateObject = moment(date);

  const [selectedMonth, setSelectedMonth] = useState(dateObject.month() + 1);
  const [selectedYear, setSelectedYear] = useState(dateObject.year());

  const updateSelectedMonthAndYear = (newDate) => {
    setSelectedMonth(newDate.month() + 1);
    setSelectedYear(newDate.year());
  };


  useEffect(() => {
    axios.get('/transactions/transactionsByCategory', {
      params: {
        date: moment(date).format('YYYY-MM-DD'),
        selectedMonth: selectedMonth,
        selectedYear: selectedYear,
      },
    })
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

        setTotalIncome(totalIncomeAmount);
        setTotalExpense(totalExpenseAmount);
      })
      .catch(error => {
        console.error('Error fetching income and expense distribution data:', error);
      });
  }, [date, selectedMonth, selectedYear]);

  return (
    <Container className="mt-5">
      {/* FilterBar component for selecting the date */}
      <Row className="justify-content-md-center">
        <Col md={{ span: 6, offset: 3 }}>
          <FilterBar
            date={date}
            setDate={setDate}
            updateSelectedMonthAndYear={updateSelectedMonthAndYear} />
        </Col>
      </Row>
      {/* ColumnChart component for displaying bar chart */}
      <Row className="justify-content-md-center">
        <Col md={{ span: 8, offset: 2 }}>
          <ColumnChart
            data={[
              { category: 'income', income: totalIncome, month: selectedMonth, year: selectedYear },
              { category: 'expense', expense: totalExpense, month: selectedMonth, year: selectedYear },
            ]}
            totalIncome={totalIncome}
            totalExpense={totalExpense} />
        </Col>
      </Row>
      {/* PieCharts for displaying income and expense distribution */}
      <Row>
        <Col md={{ span: 4, offset: 2 }}>
          <PieChart data={incomeData} isExpense={false} />
        </Col>
        <Col md={{ span: 4, offset: 2 }}>
          <PieChart data={expenseData} isExpense={true} />
        </Col>
      </Row>
      {/* Lists to display individual income and expense transactions */}
      <Row className="d-flex space-between">
        <Col md={{ span: 4, offset: 2 }}>
          <Col><h4>Income</h4></Col>
          <Col>
            {incomeData.map((transaction, index) => (
              <IncomeExpenseList key={index} transaction={transaction} />
            ))}
          </Col>
        </Col>
        <Col md={{ span: 4, offset: 2 }}>
          <h4>Expense</h4>
          <Col>
            {expenseData.map((transaction, index) => (
              <IncomeExpenseList key={index} transaction={transaction} />
            ))}
          </Col>
        </Col>
      </Row>
    </Container>
  );
};

export default Report;
