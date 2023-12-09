import { Cell, Label, Legend, Pie, PieChart, Tooltip } from "recharts";
import AccountList from "../components/AccountList";
import AccountsModal from "../components/AccountsModal";
import FloatingActionButton from "../components/FloatingActionButton";


const Accounts = (props) => {

  const {
    accountsData,
    getAccounts,
    getTransactions,
    postAccountData,
    setPostAccountData,
    isAddAccountModalOpen,
    toggleAddAccountModal
  } = props;


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
    <div className="d-flex flex-column align-items-center bg-body-tertiary mb-5" style={{ paddingTop: "50px" }} >

      <h3>Accounts breakdown</h3>

      <PieChart className="mb-3" width={500} height={500}>
        <Pie
          data={accountsData}
          dataKey="balance"
          nameKey="account_name"
          cx="50%"
          cy="50%"
          labelLine={false}
          label={renderCustomizedLabel}
          outerRadius={180}
          fill="#8884d8"
        >
          {accountsData.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
          <Label layout="vertical" align="right" verticalAlign="middle" />
        </Pie>
        <Tooltip />
        <Legend />
      </PieChart>

      <AccountList
        accountsData={accountsData}
        getAccounts={getAccounts}
        getTransactions={getTransactions}
      />

      <AccountsModal
        isAddAccountModalOpen={isAddAccountModalOpen}
        toggleAddAccountModal={toggleAddAccountModal}
        postAccountData={postAccountData}
        setPostAccountData={setPostAccountData}
        getAccounts={getAccounts} />

      <FloatingActionButton click={toggleAddAccountModal} />

    </div>
  );
};

export default Accounts;
