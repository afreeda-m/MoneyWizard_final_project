import React from "react";
import Container from 'react-bootstrap/Container';
import Col from "react-bootstrap/esm/Col";
import Row from "react-bootstrap/esm/Row";


const Dashboard = () => {
  return (
    <Container className="mt-5 d-flex flex-column align-items-center">
      <h1>Dashboard</h1>
      <Row className="justify-content-md-center text-center">

        <Col>
          <div className="shadow p-3 mb-5 bg-white rounded" style={{ border: '1px solid #ccc', width: '350px', height: '250px' }}>
            <h1>Overview </h1>
            <p> All Accounts</p>
            <Col className="h1 d-flex flex-column align-items-center">

              Total balance :{`$0 `}

            </Col>
          </div>
        </Col>
        <Col  >
          <div className="shadow p-3 mb-5 bg-white rounded " style={{ border: '1px solid #ccc', width: '350px', height: '250px' }}>
            <h1 >Overview </h1>
            <p> This month</p>

          </div>
        </Col>
        <Col  >
          <div className="shadow p-3 mb-5 bg-white rounded " style={{ border: '1px solid #ccc', width: '350px', height: '250px' }}>
            <h1 >Overview </h1>
            <p> Total Income/Expenses</p>

          </div>
        </Col>
      </Row>
      <Row className="justify-content-md-center text-center">

        <Col>
          <div className="shadow p-3 mb-5 bg-white rounded" style={{ border: '1px solid #ccc', width: '400px', height: '400px' }}>
            <h1>Barchart </h1>
            <p> Monthly balance chart </p>


          </div>
        </Col>
        <Col  >
          <div className="shadow p-3 mb-5 bg-white rounded " style={{ border: '1px solid #ccc', width: '400px', height: '400px' }}>
            <h1 >Line chart </h1>
            <p> Monthly balance chart </p>
          </div>
        </Col>
      </Row>
      <Row className="justify-content-md-center text-center">


        <Col  >
          <div className="shadow p-3 mb-5 bg-white rounded " style={{ border: '1px solid #ccc', width: '100%', height: '100%' }}>
            <h1 >Recent Transactions </h1>

          </div>
        </Col>
      </Row>


    </Container>

  );
};

export default Dashboard;