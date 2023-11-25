import React from "react";
import Container from 'react-bootstrap/Container';
import ColumnChart from "../components/ColumnChart";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import monthlyData from '../mocks/monthlyData'; // Importing mock data
import IncomePieChart from "../components/IncomePieChart";
import ExpensePieChart from "../components/ExpensePieChart";
import { calculateIncomeDistribution, calculateExpenseDistribution } from "../helpers/mockhelpers";

const Report = () => {

// Calculate income distribution by category
const incomeDistributionData = calculateIncomeDistribution();
const expenseDistributionData = calculateExpenseDistribution();
  return (
    <Container>
      <Row >
        <Col>
          <ColumnChart monthlyData={monthlyData}/>
        </Col>
      </Row>
      <Row className="justify-content-md-center">
        <Col>
          <IncomePieChart
           incomeData={incomeDistributionData}/>
        </Col>
        <Col >
        <ExpensePieChart expenseData={expenseDistributionData}/>
        </Col>
      </Row>
    </Container>
  );
};

export default Report;