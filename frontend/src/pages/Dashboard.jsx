import React from "react";
import Container from 'react-bootstrap/Container';
import Col from "react-bootstrap/esm/Col";
import Row from "react-bootstrap/esm/Row";
import { NumericFormat } from "react-number-format";
import TransactionList from "../components/TransactionList";
import "../styles/Dashboard.scss";


const Dashboard = (props) => {
  const { transactionsData,
    categoriesData,
    accountsData,
    chosenTransaction,
    getAccountNameById,
    getCategoryIconById,
    getCategoryNameById,
    getCategoryTypeById
  } = props;


  const totalAccountsBalance = accountsData
    .map((account) => account.balance)
    .reduce((a, b) => a + b, 0);

  return (
    <Container className="mt-5 d-flex flex-column align-items-center bg-body-tertiary">
      <h1>Dashboard</h1>
      <div className='main-cards'>
        <div className='card shadow p-3 mb-5 bg-white rounded'>
          <div className='card-inner'>
            <h3>TOTAL BALANCE</h3>

          </div>
          <h1>{" "}</h1>
          <NumericFormat
            value={totalAccountsBalance.toFixed(2)}
            displayType={"text"}
            thousandSeparator={true}
            prefix={"$"}
          />


        </div>
        <div className='card shadow p-3 mb-5 bg-white rounded'>
          <div className='card-inner'>
            <h3>Income/Expense PieChart</h3>

          </div>
          <h1>{" "}</h1>
        </div>


      </div>

      <Row className="justify-content-md-center text-center">

        <Col>
          <div className="shadow p-3 mb-5 bg-white rounded" style={{ width: "50vw" }}>
            <h1>Barchart </h1>
            <p> Monthly balance chart </p>


          </div>
        </Col>
        {/* <Col  >
          <div className="shadow p-3 mb-5 bg-white rounded " style={{ border: '1px solid #ccc', width: '400px', height: '200px' }}>
            <h1 >Line chart </h1>
            <p> Monthly balance chart </p>
          </div>
        </Col> */}
      </Row>
      <Row className="justify-content-md-center text-center">


        <Col  >
          <div className="shadow p-3 mb-5 bg-white rounded ">
            <h1 >Recent Transactions </h1>
            <TransactionList
              transactionsData={transactionsData}
              categoriesData={categoriesData}
              accountsData={accountsData}
              getAccountNameById={getAccountNameById}
              getCategoryIconById={getCategoryIconById}
              getCategoryNameById={getCategoryNameById}
              getCategoryTypeById={getCategoryTypeById}
              chosenTransaction={chosenTransaction}

            />
          </div>
        </Col>
      </Row>


    </Container>

  );
};

export default Dashboard;