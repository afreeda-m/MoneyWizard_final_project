import Col from "react-bootstrap/Col";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import FilterBar from "../components/FilterBar";
import IncomeExpenseList from "../components/IncomeExpenseList";
import NoDataDisplay from "../components/NoDataDisplay";
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
    <div className="d-flex flex-column align-items-center bg-body-tertiary">

      <div style={{ width: "50%" }}>
        <FilterBar
          date={date}
          incrementDate={incrementDate}
          decrementDate={decrementDate} />
      </div>

      {/* Show notification of no data if there is no transaction during the target period and render the information if there are transactions */}
      {transactionsByCategoryData.length > 0

        ?

        <Container className="d-flex flex-column justify-content-center mb-5">
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
        </Container>

        :

        <div style={{ width: "50%" }}>
          <NoDataDisplay />
        </div>
      }

    </div>
  );
};

export default Report;
