
import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Accounts from './pages/Accounts';
import Budgets from './pages/Budgets';
import CategoriesManagement from './pages/CategoriesManagement';
import Dashboard from './pages/Dashboard';
import Home from './pages/Home';
import RecurringTransactions from './pages/RecurringTrans';
import Report from './pages/Reports';
import Transactions from './pages/Transactions';
import Layout from './components/Layout';


function App() {
  return (
    <div className='App'>

      {/* React Router wraps the entire application in `<BrowserRouter>` tags
        * so that it can apply routing to all the routes in it.
        */}
      <BrowserRouter>


        {/* This is where all the routes in the application are defined. */}
        <Routes>
          {/* <Route path="/" element={<Home />}> </Route> */}
          <Route element={<Layout />}>
            <Route path='/' element={<Dashboard />} />
            <Route path='/transactions' element={<Transactions />} />
            <Route path='/accounts' element={<Accounts />} />
            <Route path='/reports' element={<Report />} />
            <Route path='/budgets' element={<Budgets />} />
            <Route path='/recurringtransactions' element={<RecurringTransactions />} />
            <Route path='/categoriesmanagement' element={<CategoriesManagement />} />
          </Route>
          {/* <Route path='/dashboard' element={<Dashboard />}> </Route>
          <Route path='/transactions' element={<Transactions />}> </Route>
          <Route path='/accounts' element={<Accounts />}> </Route>
          <Route path='/reports' element={<Report />}> </Route>
          <Route path='/budgets' element={<Budgets />}> </Route>
          <Route path='/recurringtransactions' element={<RecurringTransactions />}> </Route>
          <Route path='/categoriesmanagement' element={<CategoriesManagement />}> </Route> */}
        </Routes>

      </BrowserRouter>

    </div>
  );
}

export default App;
