import React, { useEffect, useState } from 'react';
import { Line,LineChart, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import moment from 'moment';
import axios from 'axios';
import Container from 'react-bootstrap/Container';
import Col from "react-bootstrap/esm/Col";
import Row from "react-bootstrap/esm/Row";

const MonthlyBalanceChart = () => {
  const [transactionsData, setTransactionsData] = useState([]);
  const [monthlyData, setMonthlyData] = useState([]);

  useEffect(() => {

    // Fetch monthly transactions when the component mounts
    const userId = 1; // Replace with logic to get user ID from cookies or elsewhere
    const year = moment().format('YYYY');
    const month = moment().format('MM');

    axios
      .get(`transactions/monthlyTransactions`, {
        params: { year, month, userId },
      })
      .then((response) => {
        setTransactionsData(response.data);
      })
      .catch((error) => {
        console.error('Error fetching monthly transactions data:', error);
      });

    // Process transactionsData when it changes
    const dataForRecharts = transactionsData.map((item) => ({
      month: moment(item.transaction_date).format('MMM YYYY'),
      balance: item.amount,
    }));

    const aggregatedData = dataForRecharts.reduce((acc, item) => {
      const key = item.month;
      if (!acc[key]) {
        acc[key] = { month: key, balance: 0 };
      }
      acc[key].balance += item.balance;
      return acc;
    }, {});

    const resultData = Object.values(aggregatedData);

    setMonthlyData(resultData);
  }, [transactionsData]);



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
    <Container>
      <Row>
        <Col>
          <p className="monthly-balance-chart-title"><b>Past 6 Months Balance Chart</b></p>
        </Col>
      </Row>
      <Row>
        <Col>
          <ResponsiveContainer width="100%" height={400}>
            <LineChart data={monthlyData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />

              <YAxis tickFormatter={(value) => `$${value}`} />
              <Tooltip
                content={<CustomTooltip />}
                contentStyle={{ background: "transparent", border: "none" }}
                labelStyle={{ display: "none" }}
                cursor={{ fill: "none" }}
              />
              <Line type="monotone" dataKey="balance" stroke="#82ca9d" name="Monthly Balance" />
            </LineChart>
          </ResponsiveContainer>

        </Col>
      </Row>
    </Container>
  );
};


export default MonthlyBalanceChart;
