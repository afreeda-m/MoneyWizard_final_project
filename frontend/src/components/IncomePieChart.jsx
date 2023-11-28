import React from 'react';
import Container from 'react-bootstrap/Container';
import { PieChart, Pie, Cell, Tooltip, Label, Legend} from "recharts";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

const IncomePieChart = ({ incomeData }) => {

  // Calculate total income for percentage calculation
  const totalIncome = incomeData.reduce((total, item) => total + parseFloat(item.value), 0);

  // Calculate percentage for each income category
  const incomeDataWithPercentage = incomeData.map(item => ({
    label: item.label,
    value: parseFloat(item.value), // Convert the value to a number
    type: item.type,
    percentage:  (parseFloat(item.value) / totalIncome) * 100,
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
      <Row className="shadow p-3 mb-5 bg-white rounded" style={{border:'1px solid #ccc'}}>
        <Col className='justify-content-md-center'>
          <PieChart width={400} height={400}>
            <Pie
              dataKey="percentage"
              nameKey="label"
              data={incomeDataWithPercentage}
              cx="50%"
              cy="50%"
              outerRadius={80}
              fill="#8884d8"
              label={renderCustomizedLabel}
              labelLine={false}
            >
              {incomeDataWithPercentage.map((entry, index) => (
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

export default IncomePieChart;