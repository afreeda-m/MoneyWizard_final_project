import React from 'react';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Image from 'react-bootstrap/Image';
import Carousel from 'react-bootstrap/Carousel';
import NavBar from '../components/NavBar';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { FaMoneyBillAlt, FaChartPie, FaWallet, FaCashRegister, FaTags, FaExchangeAlt, FaRocket } from 'react-icons/fa'; // Import the FontAwesome icons


const Home = () => {
  return (
    <Container fluid className="p-0">

      {/* Navbar */}
      <NavBar />

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
      <main className='text-center' style={{minHeight: "85vh"}}>

        <h1>Welcome to Money Wizard!</h1>

      </main>

      <Footer />

    </div>
      {/* Header */}
      <Header />


      {/* Feature Section */}
      <Container className="my-5">
        <h2 className="text-center mb-4">Key Features</h2>
        <Row className="justify-content-center">
          <Col md={6} lg={4} className="mb-4">
            <FaMoneyBillAlt size={60} className="text-primary mb-3" />
            <h4>Income/Expense Tracking</h4>
            <p>Effortlessly track your income and expenses to gain insights into your financial activities.</p>
          </Col>
          <Col md={6} lg={4} className="mb-4">
            <FaWallet size={60} className="text-success mb-3" />
            <h4>Add Accounts</h4>
            <p>Add and manage financial accounts such as wallet, piggy bank, and cash to keep a comprehensive overview of your financial portfolio.</p>
          </Col>
          <Col md={6} lg={4} className="mb-4">
            <FaChartPie size={60} className="text-warning mb-3" />
            <h4>Reports</h4>
            <p>Generate detailed reports to analyze your financial trends, helping you make informed decisions.</p>
          </Col>
          <Col md={6} lg={4} className="mb-4">
            <FaTags size={60} className="text-info mb-3" />
            <h4>Customize Categories</h4>
            <p>Customize and organize expense categories to match your unique spending habits and preferences.</p>
          </Col>
          <Col md={6} lg={4} className="mb-4">
            <FaExchangeAlt size={60} className="text-danger mb-3" />
            <h4>Transfer Between Accounts</h4>
            <p>Efficiently transfer funds between your financial accounts to manage your finances seamlessly.</p>
          </Col>
          <Col md={6} lg={4} className="mb-4">
            <FaCashRegister size={60} className="text-secondary mb-3" />
            <h4>Daily Transactions</h4>
            <p>Record your daily transactions with ease and keep a detailed log of your financial activities.</p>
          </Col>
        </Row>
      </Container>

      {/* Carousel Images Section */}
      <Container className="my-5" >
        <h2 className="text-center mb-4">Placeholders - App Screenshots</h2>
        <Row className="justify-content-center">
          <Col md={8} className="mb-4">
            <Carousel>
              <Carousel.Item>
                <Image src="./dashboard.jpg" alt="Screenshot 1" fluid />
              </Carousel.Item>
              <Carousel.Item>
                <Image src="./dashboard.jpg" alt="Screenshot 2" fluid />
              </Carousel.Item>
              <Carousel.Item>
                <Image src="./dashboard.jpg" alt="Screenshot 3" fluid />
              </Carousel.Item>
            </Carousel>
          </Col>
        </Row>
      </Container>

      {/* Get Started Section - redirect to Login/Register Pages? */}
      <Container className="text-center my-5">
        <hr className="my-4" />
        <Button variant="primary">

          Get Started
        </Button>
      </Container>


      {/* Screenshots Section */}
      <Container className="my-5">
        <h2 className="text-center mb-4">Placeholders - App Screenshots</h2>
        <Row className="justify-content-center">
          <Col md={4} className="mb-4">
            <Image src="./dashboard.jpg" thumbnail />
          </Col>
          <Col md={4} className="mb-4">
            <Image src="./dashboard.jpg" thumbnail />
          </Col>
          <Col md={4} className="mb-4">
            <Image src="./dashboard.jpg" thumbnail />
          </Col>
        </Row>
      </Container>

      {/* Mission & Technology Sections */}
      <Container>
        <Row className="justify-content-center">
          <Col md={6} lg={4} className="shadow p-4 mb-4 bg-white rounded">
            <FaRocket size={40} className="mb-2" />
            <h4>Our Mission</h4>
            <p>
              At MoneyWizard, our mission is to empower you with the tools needed to take control of your finances and achieve your financial goals.
            </p>
          </Col>
          <Col md={6} lg={4} className="shadow p-4 mb-4 bg-white rounded">
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