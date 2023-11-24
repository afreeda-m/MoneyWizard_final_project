import React, { useState, useEffect } from 'react';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Dropdown from 'react-bootstrap/Dropdown';
import CanvasJSReact from '@canvasjs/react-charts';


const { CanvasJSChart } = CanvasJSReact;

const ColumnChart = (props) => {
const [selectedMonth, setSelectedMonth] = useState('January');
  const [data, setData] = useState([]);

  useEffect(() => {
    // Effect to run when the selected month changes
    const fetchDataFromMock = () => {
      // Get data from the mock file based on the selected month
      const monthData =props.monthlyData[selectedMonth] || { income: 0, expenses: 0 };
      setData(monthData);
    };

    fetchDataFromMock(); // Fetch data when the component mounts or when the selected month changes
  }, [selectedMonth]); // Dependency array ensures the effect runs when the selected month changes

  const handleMonthChange = (month) => {
    setSelectedMonth(month); // Update the selected month when the dropdown changes
  };

  // Configuration options for the CanvasJS chart
  const chartOptions = {
    animationEnabled: true,
    title: {
      text: `Income and Expenses for ${selectedMonth}`,
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
        dataPoints: [
          { label: 'Income', y: data.income },
          { label: 'Expenses', y: 0 }, // Expenses value set to 0 for proper spacing
        ],
      },
      {
        type: 'column',
        name: 'Expenses',
         showInLegend: true,
        dataPoints: [
          { label: 'Income', y: 0 }, // Income value set to 0 for proper spacing
          { label: 'Expenses', y: data.expenses },
        ],
      },
    ],
  };

  return (
    <Container className="mt-5">
      <Row className="justify-content-md-center">
        <Col md={{ span: 6, offset: 3 }}>
          {/* Display the dropdown for selecting the month */}
          <DropdownButton id="dropdown-basic-button" title={`Select Month: ${selectedMonth}`}>
            {/* Replace with the actual months you want to support */}
            {['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'].map((month) => (
              <Dropdown.Item key={month} onClick={() => handleMonthChange(month)}>
                {month}
              </Dropdown.Item>
            ))}
          </DropdownButton>
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
