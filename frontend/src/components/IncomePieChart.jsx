import React from 'react';
import CanvasJSReact from '@canvasjs/react-charts';
import Container from 'react-bootstrap/Container';

const { CanvasJSChart } = CanvasJSReact;

const IncomePieChart = ({ incomeData }) => {

  const options = {
    animationEnabled: true,
    theme: "light1",
    title: {
      text: "Income Distribution by Category"
    },
    data: [{
      type: "pie",
      indexLabel: "{label}: {y}%",
      startAngle: -90,
      dataPoints: incomeData.map(item => ({ y: item.value, label: item.label }))
    }]
  };

  return (
    <Container className="mt-5">
      <div className="shadow p-3 mb-5 bg-white rounded" style={{ border: '1px solid #ccc', minHeight: '400px' }}>
        <CanvasJSChart options={options} />
      </div>
    </Container>
  );
};

export default IncomePieChart;
