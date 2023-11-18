import logo from './logo.svg';
import './App.css';
// In a React component
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Datepicker from './Datepicker';
function App() {

  const [categories, setCategories] = useState([]);

  useEffect(() => {
    // Fetch categories when the component mounts
    axios.get('http://localhost:8080/categories')
      .then(response => {
        setCategories(response.data);
      })
      .catch(error => {
        console.error('Error fetching categories:', error);
      });
  }, []); // Empty dependency array ensures the effect runs only once

  return (
    <div className="App">
      <h2>Categories List</h2>
      <ul>
        {categories.map(category => (
          <li key={category.id}>{category.category_name}</li>
        ))}
      </ul>

      <Datepicker/>
    </div>
  );
};


export default App;
