import axios from 'axios';
import React, { useEffect, useState } from "react";
import { Cell, Label, Legend, Pie, PieChart, Tooltip } from "recharts";
import AccountList from "../components/AccountList";
import AccountsModal from "../components/AccountsModal";
import FloatingActionButton from "../components/FloatingActionButton";
// import "../styles/Accounts.scss";


const Accounts = () => {

  const [accounts, setAccounts] = useState([]);

  const [show, setShow] = useState(false);

  const modalClose = () => setShow(false);

  const modalShow = () => {
    setShow(true);
  };

  const deleteAccount = (account_id) => {
    axios.post('/accounts/' + account_id + '/delete')
      .then((response) => {
        axios.get("/accounts").then((response) => {
          setAccounts(response.data.accounts);
        });
      })
      .catch(function(error) {
        console.log(error);
      });
  };

  useEffect(() => {
    axios.get('/accounts')
      .then((response) => {
        setAccounts(response.data.accounts);
      });
  }, []);


  const totalAccountsBalance = accounts
    .map((account) => account.balance)
    .reduce((a, b) => a + b, 0);

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', "#FFD300", "#8f2d56", "#BE0AFF", "#f15bb5"];

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
    <div className="d-flex flex-column align-items-center bg-body-tertiary mb-5" style={{ paddingTop: "50px"}} >

      <h3>Accounts breakdown</h3>

      <PieChart className="mb-3" width={500} height={500}>
        <Pie
          data={accounts}
          dataKey="balance"
          nameKey="account_name"
          cx="50%"
          cy="50%"
          labelLine={false}
          label={renderCustomizedLabel}
          outerRadius={180}
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

      <AccountList
        accounts={accounts}
        deleteAccount={deleteAccount}
        totalAccountsBalance={totalAccountsBalance}
      />

      {show && <AccountsModal show={show} modalClose={modalClose} modalShow={modalShow} updateAccounts={setAccounts} />}

      <FloatingActionButton click={modalShow} />
      {/* </div> */}
    </div>
  );
};

export default Accounts;
