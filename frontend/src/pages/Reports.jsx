import React from "react";
import Container from 'react-bootstrap/Container';
import ColumnChart from "../components/ColumnChart";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import monthlyData from '../mocks/monthlyData'; // Importing mock data


const Report = () => {
  return (
    <Container>
      <Row >
        <Col>
          <ColumnChart monthlyData={monthlyData} />
        </Col>
      </Row>
    </Container>
  );
};

export default Report;