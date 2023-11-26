import React, { useState } from "react";
import FloatingActionButton from "../components/FloatingActionButton";
import TransactionList from "../components/TransactionList";
import { getAccountNameById, getCategoryIconById, getCategoryNameById, getCategoryTypeById } from "../helpers/mockhelpers";
import accounts from "../mocks/accounts";
import categories from "../mocks/categories";
import transactions from "../mocks/transactions";
import FilterBar from "../components/FilterBar";
import moment from 'moment';

const Transactions = () => {

  const [date, setDate] = useState(moment().format("MMMM YYYY"));

  return (
    <div className="d-flex flex-column align-items-center bg-body-tertiary" >

      <h1>List of Transactions</h1>

      <FilterBar
        date={date}
        setDate={setDate}
      />

      <TransactionList
        transactions={transactions}
        categories={categories}
        accounts={accounts}
        getAccountNameById={getAccountNameById}
        getCategoryIconById={getCategoryIconById}
        getCategoryNameById={getCategoryNameById}
        getCategoryTypeById={getCategoryTypeById}
      />

      <FloatingActionButton />

    </div>
  );
};

export default Transactions;