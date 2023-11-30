import React from 'react';
import Container from 'react-bootstrap/Container';
import { PieChart, Pie, Cell, Tooltip, Label, Legend } from "recharts";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

const PieChartComponent = ({ data, isExpense }) => {
  // Calculate total for percentage calculation
  const total = data.reduce((total, item) => total + parseFloat(item.value), 0);

  // Calculate percentage for each category
  const dataWithPercentage = data.map(item => ({
    label: item.label,
    value: parseFloat(item.value),
    type: item.type,
    percentage: (parseFloat(item.value) / total) * 100,
  }));

  // Define fixed colors for the chart segments
  const colors = ['#FF8080', '#80C7FF', '#A0FFA0', '#FFD080', '#D080FF'];
  const RADIAN = Math.PI / 180;
  const renderCustomizedLabel = ({
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    percent,
    index,
  }) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
      <text
        x={x}
        y={y}
        fill="white"
        textAnchor={x > cx ? "start" : "end"}
        dominantBaseline="central"
      >
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };

  return (
    <Container className='mt-5'>
      <Row className="shadow p-3 mb-5 bg-white rounded" style={{ border: '1px solid #ccc' }}>
        <Col className='justify-content-md-center'>
          <PieChart width={400} height={400}>
            <Pie
              dataKey="percentage"
              nameKey="label"
              data={dataWithPercentage}
              cx="50%"
              cy="50%"
              outerRadius={130}
              fill="#8884d8"
              label={renderCustomizedLabel}
              labelLine={false}
              innerRadius={isExpense ? 0 : 40} // Customize innerRadius based on isExpense
            >
              {dataWithPercentage.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
              ))}
              <Label layout="vertical" align="right" verticalAlign="middle" />
            </Pie>
            <Tooltip formatter={(value) => `${value.toFixed()}%`} />
            <Legend />
          </PieChart>
        </Col>
      </Row>
    </Container>
  );
};

export default PieChartComponent;
