import React from 'react';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import { Bar, BarChart, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';


const ColumnChart = ({ data }) => {

  return (
    <Container className="mt-5 d-flex justify-content-center">
      <Row className="mt-3">
        <Col>
          {/* Display the bar chart with shadow and border */}
          <div className="shadow p-3 mb-5 bg-white rounded" style={{ border: '1px solid #ccc', width: '400px', height: '400px' }}>
            {/* Create a responsive container for the bar chart */}
            <ResponsiveContainer width="100%" height="100%">
              {/* Define the BarChart component with data and margin */}
              <BarChart data={data} >
                {/* Define the X-axis with the dataKey as "category" */}
                <XAxis dataKey="category" />
                {/* Define the Y-axis */}
                <YAxis />
                {/* Enable tooltip for displaying data */}
                <Tooltip />
                {/* Enable legend for displaying data series */}
                <Legend />
                {/* Create a bar for "income" with a unique color */}
                <Bar dataKey="income" stackId="1" fill="#8884d8" />
                {/* Create a bar for "expense" with a unique color */}
                <Bar dataKey="expense" stackId="1" fill="#82ca9d" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default ColumnChart;
