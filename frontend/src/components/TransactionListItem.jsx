import React from "react";
import "../styles/TransactionListItem.css";

const TransactionListItem = (props) => {

  const { id, categoryIcon, categoryName, accountName, amount, notes } = props;
  return (
    <div key={id} className="transaction-list-item">

      <div className="category-icon">
        {categoryIcon}
      </div>

      <div className="transaction-list-item-detail">

        {categoryName}
        {accountName}

        <div className="transaction-notes">
          {notes}
        </div>

      </div>

      <div className="transaction-list-item-amount">
        {amount}
      </div>

    </div>
  );
};

export default TransactionListItem;
