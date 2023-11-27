import React, { useState, useEffect } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import CanvasJSReact from '@canvasjs/react-charts';
import axios from 'axios';

const { CanvasJSChart } = CanvasJSReact;

const ColumnChart = ({incomeData, expenseData, date}) => {

  const chartOptions = {
    animationEnabled: true,
    title: {
      text: `Income and Expenses for ${date}`,
    },
    axisY: {
      title: 'Amount (CAD)',
    },
    axisX: {
      title: 'Categories Type',
    },
    legend: {
      cursor: 'pointer',
      itemclick: () => {},
    },
    data: [
      {
        type: 'column',
        name: 'Income',
        showInLegend: true,
        dataPoints: incomeData.map(item => ({ label: item.label, y: item.income })),
      },
      {
        type: 'column',
        name: 'Expenses',
        showInLegend: true,
        dataPoints: expenseData.map(item => ({ label: item.label, y: item.expenses })),
      },
    ],
  };


  return (
    <Container className="mt-5">
      <Row className="justify-content-md-center">
        <Col md={{ span: 6, offset: 3 }}>
          {/* Display the dropdown for selecting the month */}

        </Col>
      </Row>
      <Row className="mt-3">
        <Col md={{ span: 6, offset: 3 }}>
          {/* Display the bar chart with shadow and border */}
          <div className="shadow p-3 mb-5 bg-white rounded" style={{ border: '1px solid #ccc', minHeight: '400px' }}>
            <CanvasJSChart options={chartOptions} />
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default ColumnChart;
