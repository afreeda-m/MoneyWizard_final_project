import axios from 'axios';
import React, { useEffect, useState } from "react";
import { NumericFormat } from "react-number-format";
import { Cell, Label, Legend, Pie, PieChart, Tooltip } from "recharts";
import AccountList from "../components/AccountList";
import AccountsModal from "../components/AccountsModal";
import FloatingActionButton from "../components/FloatingActionButton";
import "../styles/Accounts.scss";


const Accounts = () => {

  const [accounts, setAccounts] = useState([]);

  const [show, setShow] = useState(false);

  const modalClose = () => setShow(false);
  const modalShow = () => setShow(true);

  useEffect(() => {
    axios.get('/accounts')
    .then((response) => {
      setAccounts(response.data.accounts)
    });
  }, []);


  const totalAccountsBalance = accounts
  .map((account) => account.balance)
  .reduce((a, b) => a + b, 0);

  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

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
    <div className="accounts">
      <h1 className="title">Accounts</h1>
      <PieChart width={400} height={400}>
        <Pie
          data={accounts}
          dataKey="balance"
          nameKey="account_name"
          cx="50%"
          cy="50%"
          labelLine={false}
          label={renderCustomizedLabel}
          outerRadius={80}
          fill="#8884d8"
        >
          {accounts.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
          <Label layout="vertical" align="right" verticalAlign="middle" />
        </Pie>
        <Tooltip />
        <Legend />
      </PieChart>

      <span class="text-end">
        Total:{" "}
        <NumericFormat
          value={totalAccountsBalance.toFixed(2)}
          displayType={"text"}
          thousandSeparator={true}
          prefix={"$"}
        />
      </span>

      <AccountList accounts={accounts} />

      {show && <AccountsModal show={show} modalClose={modalClose} modalShow={modalShow}/>}

      <FloatingActionButton onClick={modalShow}/>

    </div>
  );
};

export default Accounts;
