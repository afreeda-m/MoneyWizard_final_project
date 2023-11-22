// Import `bootstrap/dist/css/bootstrap.min.css` to import default Bootstrap
// styling into React-Bootstrap. Otherwise, your React-Bootstrap elements will
// not have any styling.
import 'bootstrap/dist/css/bootstrap.min.css';
// Import the `App.scss` file to enable SASS in your project.
import './App.scss';

import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Accounts from './pages/Accounts';
import Budgets from './pages/Budgets';
import CategoriesManagement from './pages/CategoriesManagement';
import Dashboard from './pages/Dashboard';
import Home from './pages/Home';
import RecurringTransactions from './pages/RecurringTrans';
import Report from './pages/Reports';
import Transactions from './pages/Transactions';


function App() {
  return (
    <div className='App'>

      {/* React Router wraps the entire application in `<BrowserRouter>` tags
        * so that it can apply routing to all the routes in it.
        */}
      <BrowserRouter>


        {/* This is where all the routes in the application are defined. */}
        <Routes>
          <Route path="/" element={<Home />}> </Route>
          <Route path='/dashboard' element={<Dashboard />}> </Route>
          <Route path='/transactions' element={<Transactions />}> </Route>
          <Route path='/accounts' element={<Accounts />}> </Route>
          <Route path='/reports' element={<Report />}> </Route>
          <Route path='/budgets' element={<Budgets />}> </Route>
          <Route path='/recurringtransactions' element={<RecurringTransactions />}> </Route>
          <Route path='/categoriesmanagement' element={<CategoriesManagement />}> </Route>
        </Routes>

      </BrowserRouter>

    </div>
  );
}

export default App;
