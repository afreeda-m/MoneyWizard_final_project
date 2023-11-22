import React from 'react';
import Container from 'react-bootstrap/Container';


function Header() {
  return (
    <Container fluid className="my-5 p-5 position-relative">
      <img className="img-fluid" src="./laptop_showing_report.jpg" alt="Header Background" />


      {/* Landing Page Content */}
      <Container className="text-center my-5">
        <h1 className="display-4">Discover a Smarter Way to Manage Your Money!</h1>
        <p className="lead">Track your income, expenses, and financial goals with ease.</p>

      </Container>

      {/* Overlay */}
      <div
        className="overlay"
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          backgroundColor: 'rgba(0, 0, 0, 0.5)', // Adjust the alpha value for transparency
        }}
      ></div>

    </Container>
  );
}

export default Header;
