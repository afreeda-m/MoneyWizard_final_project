import axios from "axios";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Navbar from 'react-bootstrap/Navbar';
import { useLocation, useNavigate } from "react-router-dom";

function NavBar(props) {

  const navigate = useNavigate();

  const { isLoggedIn, setIsLoggedIn, setUsername, username } = props;

  const submitLogin = (event) => {
    event.preventDefault();

    const value = {
      email: event.target.username.value,
      password: event.target.password.value,
    };

    axios({
      method: "post",
      url: "/user/login",
      header: {
        "Content-Type": "application/json",
      },
      data: value,
    })
      .then((response) => {
        if (response.status === 200) {
          setIsLoggedIn(true);
          setUsername(response.data.name);
          navigate("/dashboard");
        }
      })
      .catch(function(error) {
        console.log(error);
      });
  };

  const performLogout = (event) => {
    event.preventDefault();
    axios({
      method: "post",
      url: "/user/logout",
      header: {
        "Content-Type": "application/json",
      }
    })
      .then((response) => {
        if (response.status === 200) {
          setIsLoggedIn(false);
          setUsername('');
          navigate("/");
        } else {
          console.log("Couldn't log user out", response);
        }
      })
      .catch(function(error) {
        console.log(error);
      });
  };

  // Utilize useLocation from react-router-dom to get the current pathname
  const location = useLocation();
  const { pathname } = location;

  // Return the page name based on the current path
  const getPageHeading = () => {
    switch (pathname) {
      case '/':
        return 'Money Wizard';
      case '/dashboard':
        return 'Dashboard';
      case '/transactions':
        return 'Transactions';
      case '/accounts':
        return 'Accounts';
      case '/reports':
        return 'Reports';
      case '/categoriesmanagement':
        return 'Categories Management';
      default:
        return 'Money Wizard';
    }
  };

  return (

    <Navbar className="bg-primary px-4" style={{ height: "5rem" }}>

      {/* BRAND NAME */}
      <Navbar.Brand className='text-light d-flex align-items-center'>
        {pathname === "/" && <div className="me-4"><img src="/MWlogo.png" alt="logo" style={{height: "50px"}}/></div>}
        {getPageHeading()}
      </Navbar.Brand>

      <Navbar.Toggle />


      {/* THE FORM PORTION OF THE NAVBAR */}
      <Navbar.Collapse className="justify-content-end">

        {/* LOGIN FORM */}
        {!isLoggedIn &&
          <Form inline="true" id="login-form" onSubmit={submitLogin}>
            <InputGroup className="d-flex align-items-center">

              {/* Username Field */}
              <Form.Control
                name="username"
                placeholder="Username"
                aria-label="Username"
                aria-describedby="Username Field"
                className="mx-1"
              />

              {/* Password Field */}
              <Form.Control
                name="password"
                type="password"
                placeholder="Password"
                aria-label="Password"
                aria-describedby="Password Field"
                className="me-1"
              />

              {/* Submit Button */}
              <Button variant="secondary" type="submit" form="login-form" className="h1 mb-0">Login</Button>

            </InputGroup>
          </Form>}


        {/* CODE TO DISPLAY SIGNED IN USER */}
        {isLoggedIn &&
          <Navbar.Text className="d-flex align-items-center mt-2">
            <span className="text-secondary h5">Hello, {username}!</span>
            <Button variant="secondary" onClick={performLogout} className="h1 ms-4">Logout</Button>
          </Navbar.Text>}

      </Navbar.Collapse>

    </Navbar>

  );
}

export default NavBar;