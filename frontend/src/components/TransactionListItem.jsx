import React from "react";
import "../styles/TransactionListItem.scss";

const TransactionListItem = (props) => {

  const { id, category_icon, category_name, account_name, amount, notes } = props;
  return (
    <div key={id} className="transaction-list-item">

      <div className="category-icon">
        {category_icon}
      </div>

      <div className="transaction-list-item-detail">

        {category_name}
        {account_name}

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
