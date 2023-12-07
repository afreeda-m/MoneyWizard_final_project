import React from 'react';
import Button from 'react-bootstrap/Button';
import Carousel from 'react-bootstrap/Carousel';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Image from 'react-bootstrap/Image';
import Row from 'react-bootstrap/Row';
import { FaCashRegister, FaChartPie, FaExchangeAlt, FaMoneyBillAlt, FaRocket, FaTags, FaWallet } from 'react-icons/fa'; // Import the FontAwesome icons
import Footer from '../components/Footer';
import Header from '../components/Header';
import NavBar from '../components/NavBar';
import "../styles/Home.scss";


const Home = (props) => {
  return (
    <Container fluid className="p-0">

      {/* Navbar */}
      <NavBar isLoggedIn={props.isLoggedIn} setIsLoggedIn={props.setIsLoggedIn} setUsername={props.setUsername} username={props.username}/>

      {/* For this page, I want the `Footer` component to hug the bottom of the
        * page, so I need to make the `main` element take 85% of the viewport
        * width.
        *
        * However, Bootstrap has defined `min-vh-100` only, but no other value.
        * So if want `min-vh-80`, you're going to have to write custom CSS.
        *
        * Because this project is intended to use minimum custom CSS, I've
        * chosen to add an inline style here. To use inline styling with JSX,
        * use this format: `style={{camelCaseAttribute: 'string'}}`.
        */}
      {/* <main className='text-center' style={{minHeight: "85vh"}}>

        <h1>Welcome to Money Wizard!</h1>

      </main> */}

      {/* Header */}
      <Header />


      {/* Feature Section */}
      <Container className="my-5">
        <h2 className="text-center mb-4">Key Features</h2>
        <Row className="justify-content-center">
          <Col md={6} lg={4} className="d-flex flex-column align-items-center">
            <FaMoneyBillAlt size={60} className="text-primary mb-3" />
            <h4>Income/Expense Tracking</h4>
            <p>Effortlessly track your income and expenses to gain insights into your financial activities.</p>
          </Col>
          <Col md={6} lg={4} className="d-flex flex-column align-items-center">
            <FaWallet size={60} className="text-success mb-3" />
            <h4>Add Accounts</h4>
            <p>Add and manage financial accounts such as wallet, piggy bank, and cash to keep a comprehensive overview of your financial portfolio.</p>
          </Col>
          <Col md={6} lg={4} className="d-flex flex-column align-items-center">
            <FaChartPie size={60} className="text-warning mb-3" />
            <h4>Reports</h4>
            <p>Generate detailed reports to analyze your financial trends, helping you make informed decisions.</p>
          </Col>
          <Col md={6} lg={4} className="d-flex flex-column align-items-center">
            <FaTags size={60} className="text-info mb-3" />
            <h4>Customize Categories</h4>
            <p>Customize and organize expense categories to match your unique spending habits and preferences.</p>
          </Col>
          <Col md={6} lg={4} className="d-flex flex-column align-items-center">
            <FaExchangeAlt size={60} className="text-danger mb-3" />
            <h4>Transfer Between Accounts</h4>
            <p>Efficiently transfer funds between your financial accounts to manage your finances seamlessly.</p>
          </Col>
          <Col md={6} lg={4} className="d-flex flex-column align-items-center">
            <FaCashRegister size={60} className="text-secondary mb-3" />
            <h4>Daily Transactions</h4>
            <p>Record your daily transactions with ease and keep a detailed log of your financial activities.</p>
          </Col>
        </Row>
      </Container>

      <Container className="my-5 d-flex flex-column align-items-center justify-content-center">
        {/* Add `&nbsp;` to centre the `Interested` text w.r.t `Register` button. */}
        <h2 className="text-center ms-10 mb-4">&nbsp; Interested?</h2>
        {/* DEAD LINK: Added to complete the home page. */}
        <Button variant="primary" type="#" form="login-form" className="h1 ms-2 mb-0">Register</Button>
      </Container>

      {/* Carousel Images Section */}
      <Container className="my-5" >
        <h2 className="text-center mb-4">App Screenshots</h2>

        <Row className="d-flex justify-content-center">

          <Col className="mb-4 d-flex justify-content-center">
            <Carousel slide={true}>

              <Carousel.Item>
                <Image src="./Screenshot-1-Transactions-Page.png" alt="Transactions Page" fluid />
              </Carousel.Item>

              <Carousel.Item>
                <Image src="./Screenshot-2-Reports-Page.png" alt="Reports Page" fluid />
              </Carousel.Item>

              <Carousel.Item>
                <Image src="./Screenshot-3-Accounts-Page.png" alt="Accounts Page" fluid />
              </Carousel.Item>

            </Carousel>

          </Col>

        </Row>

      </Container>

      {/* Mission & Technology Sections */}
      <Container className='mb-5'>
        <Row className="d-flex justify-content-around">

          <Col md={6} lg={4} className="shadow p-4 mb-4 bg-white rounded d-flex flex-column align-items-center">
            <FaRocket size={40} className="mb-2" />
            <h4>Our Mission</h4>
            <p>
              At MoneyWizard, our mission is to empower you with the tools needed to take control of your finances and achieve your financial goals.
            </p>
          </Col>

          <Col md={6} lg={4} className="shadow p-4 mb-4 bg-white rounded d-flex flex-column align-items-center">
            <FaRocket size={40} className="mb-2" />
            <h4>Our Technology</h4>
            <p>
              MoneyWizard is designed to provide a user-friendly experience, helping you gain a better understanding of your finances effortlessly.
            </p>
          </Col>
        </Row>
      </Container>

      {/* Footer */}
      <Footer />

    </Container>
  );
};

export default Home;