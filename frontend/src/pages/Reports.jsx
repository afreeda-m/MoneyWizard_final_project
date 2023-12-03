import axios from "axios";
import moment from 'moment';
import React, { useEffect, useState } from "react";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from "react-bootstrap/Col";
import Alert from "react-bootstrap/Alert";
import ColumnChart from "../components/ColumnChart";
import FilterBar from "../components/FilterBar";
import IncomeExpenseList from "../components/IncomeExpenseList";
import PieChartMoneyWizard from "../components/PieChartMoneyWizard";
import "../styles/Reports.scss";

const Report = (props) => {
  const {
    date,
    incrementDate,
    decrementDate
  } = props;

  // State for income and expense data
  const [incomeData, setIncomeData] = useState([]);
  const [expenseData, setExpenseData] = useState([]);

  // State for income/expense totals
  const [totalIncome, setTotalIncome] = useState(0);
  const [totalExpense, setTotalExpense] = useState(0);


  // Use moment to parse the date string
  const dateObject = moment(date);

  //Add state variables to keep track of the selected month and year.

  const [selectedMonth, setSelectedMonth] = useState(dateObject.month() + 1);
  const [selectedYear, setSelectedYear] = useState(dateObject.year());

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
  }, [date]);
  // Check if there is no data
  const hasData = incomeData.length > 0 && expenseData.length > 0;

  if (!hasData) {
    // Display a message or notification when there is no data
    return (
      <Container className='mt-5'>
        <Row className="justify-content-md-center">
            <Col >
              <FilterBar
                date={date}
                incrementDate={incrementDate}
                decrementDate={decrementDate} />
            </Col>
          </Row>
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
      </Container>
    );
  }
  return (
    <Container className="mt-5">

      <div className="reports">
        <div className="box box1">
          {/* FilterBar component for selecting the date */}
          <Row className="justify-content-md-center">
            <Col >
              <FilterBar
                date={date}
                incrementDate={incrementDate}
                decrementDate={decrementDate} />
            </Col>
          </Row>

          {/* ColumnChart component for displaying bar chart */}
          <Row className="justify-content-md-center">
            <Col>
              <ColumnChart
                data={[
                  { category: 'income', income: totalIncome, month: selectedMonth, year: selectedYear },
                  { category: 'expense', expense: totalExpense, month: selectedMonth, year: selectedYear },
                ]}
                totalIncome={totalIncome}
                totalExpense={totalExpense} />
            </Col>
          </Row>
        </div>

        {/* PieCharts for displaying income and expense distribution */}
        <div className="box box2 justify-content-md-center">
          <PieChartMoneyWizard data={incomeData} isExpense={false} />
        </div>
        <div className="box box3 justify-content-md-center">
          <PieChartMoneyWizard data={expenseData} isExpense={true} />
        </div>

        {/* Lists to display individual income and expense transactions */}
        <div className="box box4 text-center">
          {incomeData.map((transaction, index) => (
            <IncomeExpenseList key={index} transaction={transaction} />
          ))}
        </div>

        <div className="box box5 text-center">
          {expenseData.map((transaction, index) => (
            <IncomeExpenseList key={index} transaction={transaction} />
          ))}
        </div>
      </div>

    </Container>
  );
};

export default Report;
