// IncomeTransactions.jsx
import React from "react";

const IncomeTransactions = ({ incomeTransactions, loading }) => {
  return (
    <div className="justify-content-md-center">
      {loading ? (
        <p>Loading income transactions...</p>
      ) : (
        <div>
          <h2>Income Transactions</h2>
          <ul>
            {incomeTransactions.map((transaction) => (
              <li key={transaction.category_name}>
                <strong>{transaction.category_name}</strong>: ${transaction.sum}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default IncomeTransactions;
