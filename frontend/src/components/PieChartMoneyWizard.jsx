import React from 'react';
import Container from 'react-bootstrap/Container';
import { PieChart, Pie, Cell, Tooltip, Label, Legend } from "recharts";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

const PieChartComponent = ({ data, isExpense}) => {

  // Check if there is no data
  const hasData = data.length > 0;

  if (!hasData) {
    // Display a message or notification when there is no data
    return (
      <Container className='mt-5'>
        <Row className="shadow p-3 mb-5 bg-white rounded" style={{ border: '1px solid #ccc' }}>
          <Col className='justify-content-md-center'>
            <p>No {isExpense ? 'expense' : 'income'} data available for charts.</p>
          </Col>
        </Row>
      </Container>
    );
  }
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
  const colors = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', "#FFD300", "#8f2d56", "#BE0AFF", "#f15bb5"];
  const RADIAN = Math.PI / 180;
  const renderCustomizedLabel = ({
  cx,
  cy,
  midAngle,
  innerRadius,
  outerRadius,
  percent,
  index,
  payload, // Add payload to access entry data
}) => {
  const RADIAN = Math.PI / 180;
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  const lineStartX = cx + (outerRadius + 10) * Math.cos(-midAngle * RADIAN);
  const lineStartY = cy + (outerRadius + 10) * Math.sin(-midAngle * RADIAN);
  const lineEndX = cx + (outerRadius + 30) * Math.cos(-midAngle * RADIAN);
  const lineEndY = cy + (outerRadius + 30) * Math.sin(-midAngle * RADIAN);

  return (
    <>
      {/* Line */}
      <line
        x1={lineStartX}
        y1={lineStartY}
        x2={lineEndX}
        y2={lineEndY}
        stroke="black"
        strokeWidth={1}
      />
      {/* Label text */}
      <text
        x={lineEndX}
        y={lineEndY}
        fill="black"
        textAnchor={lineEndX > cx ? "start" : "end"}
        dominantBaseline="central"
      >
        {`${payload.label} ${(percent * 100).toFixed(0)}%`}
      </text>
    </>
  );
};

  return (
    <Container className='mt-5'>
      <Row>
        <Col className='justify-content-md-center'>
          <PieChart width={600} height={400}>
            <Pie
              dataKey="percentage"
              nameKey="label"
              data={dataWithPercentage}
              cx="50%"
              cy="50%"
              outerRadius={"80%"}
              fill="#8884d8"
              label={renderCustomizedLabel}

               // Customize innerRadius based on isExpense
            >
              {dataWithPercentage.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
              ))}
              <Label layout="vertical" align="right" verticalAlign="middle" />
            </Pie>
            <Tooltip
            formatter={(value) => `${value.toFixed()}%`}
            contentStyle={{background: "transparent", border:"none"}}
            labelStyle={{display:"none"}}/>
            <Legend />
          </PieChart>
        </Col>
      </Row>
    </Container>
  );
};

export default PieChartComponent;
