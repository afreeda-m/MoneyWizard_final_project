import moment from 'moment';
import Alert from "react-bootstrap/Alert";
import Col from "react-bootstrap/Col";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import ColumnChart from "../components/ColumnChart";
import FilterBar from "../components/FilterBar";
import IncomeExpenseList from "../components/IncomeExpenseList";
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

  return (
    <div className="d-flex flex-column align-items-center bg-body-tertiary" style={{ paddingTop: "50px"}}>

      <Container className="d-flex flex-column justify-content-center">

        {/* FilterBar component for selecting the date */}
        <Row className="justify-content-center">
          <Col>
            <FilterBar
              date={date}
              incrementDate={incrementDate}
              decrementDate={decrementDate} />
          </Col>
        </Row>

        {/* Show notification of no data if there is no transaction during the target period and render the information if there are transactions */}
        {transactionsByCategoryData.length > 0
          ?
          <>
            {/* ColumnChart component for displaying bar chart */}
            {/* <Row>
            <Col>
            <ColumnChart
            data={[
              { category: 'income', income: totalIncome, month: moment(date).format("MM"), year: moment(date).format("YYYY") },
              { category: 'expense', expense: totalExpense, month: moment(date).format("MM"), year: moment(date).format("YYYY") },
            ]}
            totalIncome={totalIncome}
            totalExpense={totalExpense} />
            </Col>
          </Row> */}

            <Row>
              <Container className='d-flex justify-content-center'>
                <Row>
                  <Col xs={6} style={{ width: "50%" }}>
                    <IncomeExpenseList
                      categoriesDataByType={incomeCategories}
                      categoriesData={categoriesData}
                      getCategoryIconById={getCategoryIconById}
                      getCategoryNameById={getCategoryNameById}
                      isIncome={true}
                      total={totalIncome}
                    />
                  </Col>

                  <Col xs={6} style={{ width: "50%" }}>
                    <IncomeExpenseList
                      categoriesDataByType={expenseCategories}
                      categoriesData={categoriesData}
                      getCategoryIconById={getCategoryIconById}
                      getCategoryNameById={getCategoryNameById}
                      isIncome={false}
                      total={totalExpense}
                    />
                  </Col>
                </Row>
              </Container>
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
    </div>
  );
};

export default Report;
