import React, { useEffect, useState } from 'react';
import { ResponsiveContainer, AreaChart, CartesianGrid, XAxis, YAxis, Tooltip, Area, Dot} from 'recharts';
import axios from 'axios';
import moment from 'moment';
import Container from 'react-bootstrap/Container';
import Col from "react-bootstrap/esm/Col";
import Row from "react-bootstrap/esm/Row";

const MonthlyBalanceChart = () => {
  const [transactionsData, setTransactionsData] = useState([]);
  const [monthlyData, setMonthlyData] = useState([]);

  //New State to prevent infinite loop
  const [refresh, setRefresh] = useState(false);

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
        //Force amount to be float
        for(const i in response.data) {
          response.data[i].amount = parseFloat(response.data[i].amount);
        }
        setTransactionsData(response.data);
        if (!refresh) {
          setRefresh(true);
        }
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
  }, [refresh]);



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

  // Custom Dot component to increase the size
  const CustomDot = (props) => {
    const { cx, cy, stroke, strokeWidth, r } = props;

    return (
      <Dot cx={cx} cy={cy} r={r + 3} stroke={stroke} strokeWidth={strokeWidth} fill="#fff" />
    );
  };
  return (
    <Container>

      <Row>
        <Col>
          <ResponsiveContainer width="100%" height={400}>
            <AreaChart data={monthlyData}>
              {/* Define linear gradient */}
              <defs>
                <linearGradient id="balanceGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#82ca9d" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="#82ca9d" stopOpacity={0} />
                </linearGradient>
              </defs>

              {/* Chart components */}
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis tickFormatter={(value) => `$${value}`} />
              <Tooltip
                content={<CustomTooltip />}
                contentStyle={{ background: "transparent", border: "none" }}
                labelStyle={{ display: "none" }}
                cursor={{ fill: "none" }}
              />

              {/* Area with linear gradient */}
              <Area
                type="monotone"
                dataKey="balance"
                stroke="#82ca9d"
                fill="url(#balanceGradient)" // Apply the linear gradient
                name="Monthly Balance"
                dot={<CustomDot/>}
              />
            </AreaChart>
          </ResponsiveContainer>

        </Col>
      </Row>
    </Container>
  );
};


export default MonthlyBalanceChart;
