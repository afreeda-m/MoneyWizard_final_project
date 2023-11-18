
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SideBar from './components/SideBar';
import Dashboard from './pages/Dashboard';

function App() {
  return (
    <>
      <Router>

        <SideBar />

        <Routes>
          <Route path='/dashboard'>{Dashboard}</Route>
        </Routes>
        
      </Router>
    </>
  );
}

export default App;
