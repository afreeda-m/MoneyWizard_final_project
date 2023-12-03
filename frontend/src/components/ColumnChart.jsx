import React from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer, CartesianGrid, Label, LabelList } from 'recharts';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';


const ColumnChart = ({ data }) => {

  // Custom tooltip component for formatting
  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="custom-tooltip">
          <p className="label">{`${label} : $${payload[0].value}`}</p>
        </div>
      );
    }

    return null;
  };
  return (
    <Container className="mt-5">
      <Row className="mt-3">
        <Col md={{ span: 6, offset: 3 }}>
          {/* Display the bar chart with shadow and border */}
          <div className="shadow p-3 mb-5 bg-white rounded" style={{ border: '1px solid #ccc', width: '400px', height: '400px' }}>
            {/* Create a responsive container for the bar chart */}
            <ResponsiveContainer width="100%" height="100%">
              {/* Define the BarChart component with data and margin */}
              <BarChart
                width={600}
                height={300}
                data={data}
                margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <YAxis>
                  {/* Title for Y-Axis */}
                  <Label value="Amount" angle={-90} position="insideLeft" />
                </YAxis>
                <Tooltip
                  content={<CustomTooltip />}
                  contentStyle={{ background: "transparent", border: "none" }}
                  labelStyle={{ display: "none" }}
                  cursor={{ fill: "none" }} />
                <Legend />
                <Bar dataKey="income" fill="#82ca9d" name="Income" >
                  <LabelList dataKey="income" position="top" />
                </Bar>
                <Bar dataKey="expense" fill="#8884d8" name="Expense" >
                  <LabelList dataKey="expense" position="top" />
                </Bar>
                {/* Title for the entire chart */}
                <Label value="Total Income and Expense Chart" position="top" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default ColumnChart;
