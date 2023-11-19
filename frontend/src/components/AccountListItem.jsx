import React from "react";

const AccountListItem = (props) => {

  const { id, accountName, balance } = props;

  return (
    <div key={id} className="account-list-item">

      <span>{accountName}</span>
      <span>{balance}</span>

    </div>
  );
};

export default AccountListItem;