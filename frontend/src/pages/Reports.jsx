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


  const incomeTransactions = transactionsByCategoryData.filter((transaction) => transaction.type === "Income");
  const expenseTransactions = transactionsByCategoryData.filter((transaction) => transaction.type === "Expense");


  // console.log('transaction by category:', transactionsByCategoryData);
  console.log('New income data:', incomeTransactions);
  console.log('New expense data:', expenseTransactions);

  // State for income and expense data
  const [incomeData, setIncomeData] = useState([]);
  const [expenseData, setExpenseData] = useState([]);

  // // State for income/expense totals
  // const [totalIncome, setTotalIncome] = useState(0);
  // const [totalExpense, setTotalExpense] = useState(0);

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
      {/* ColumnChart component for displaying bar chart */}
      <Row className="justify-content-center">
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
      {/* PieCharts for displaying income and expense distribution */}
      <Row className='d-flex justify-content-center'>
        <Col>
          <PieChartMoneyWizard data={incomeData} isExpense={false} />
        </Col>
        <Col>
          <PieChartMoneyWizard data={expenseData} isExpense={true} />
        </Col>
      </Row>
      {/* Lists to display individual income and expense transactions */}
      <Row className="d-flex flex-row justify-md-content-center pb-5">
        <Col md={{ span: 4, offset: 0 }} className="ms-4">
          <Col><h4>Income</h4></Col>
          <Col>
            {incomeData.map((transaction, index) => (
              <IncomeExpenseList key={index} transaction={transaction} />
            ))}
          </Col>
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
//   return (
//     <Container className="mt-5">

//       <div className="reports">
//         <div className="box box1">
//           {/* FilterBar component for selecting the date */}
//           <Row className="justify-content-md-center">
//             <Col >
//               <FilterBar
//                 date={date}
//                 incrementDate={incrementDate}
//                 decrementDate={decrementDate} />
//             </Col>
//           </Row>

//           {/* ColumnChart component for displaying bar chart */}
//           <Row className="justify-content-md-center">
//             <Col>
//               {/* <ColumnChart
//                 data={[
//                   { category: 'income', income: totalIncome, month: selectedMonth, year: selectedYear },
//                   { category: 'expense', expense: totalExpense, month: selectedMonth, year: selectedYear },
//                 ]}
//                 totalIncome={totalIncome}
//                 totalExpense={totalExpense} /> */}
//             </Col>
//           </Row>
//         </div>

//         {/* PieCharts for displaying income and expense distribution */}
//         <div className="box box2 justify-content-md-center">
//           <PieChartMoneyWizard data={incomeTransactions} isExpense={false} />
//         </div>
//         <div className="box box3 justify-content-md-center">
//           <PieChartMoneyWizard data={expenseTransactions} isExpense={true} />
//         </div>

//         {/* Lists to display individual income and expense transactions */}
//         <div className="box box4 text-center">

//           {incomeTransactions.map((category, index) => (
//             <IncomeExpenseList
//               key={index}
//               categoriesData={categoriesData}
//               category={category}
//               getCategoryIconById={getCategoryIconById}
//               getCategoryNameById={getCategoryNameById}
//             />
//           ))}

//         </div>

//         <div className="box box5 text-center">

//           {expenseTransactions.map((category, index) => (
//             <IncomeExpenseList
//               key={index}
//               categoriesData={categoriesData}
//               category={category}
//               getCategoryIconById={getCategoryIconById}
//               getCategoryNameById={getCategoryNameById}
//             />
//           ))}

//         </div>
//       </div>

// //     </Container>
// //   );
// };

export default Report;
