import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Navbar from 'react-bootstrap/Navbar';
import { FaBullseye } from 'react-icons/fa';



function NavBar() {
  return (

    <Navbar className="fluid-container bg-success" fixed='top'>
      <Container>

        {/* BRAND NAME */}
        <Navbar.Brand href="#home" className='text-light'>

        <FaBullseye size={45} className="mb-2 text-white" style={{marginRight: "1rem"}} />
          Money Wizard</Navbar.Brand>
        <Navbar.Toggle />


        {/* THE FORM PORTION OF THE NAVBAR */}
        <Navbar.Collapse className="justify-content-end">

          {/* LOGIN FORM */}
          <Form inline>
            <InputGroup>

              {/* Username Field */}
              <Form.Control
                name="username"
                placeholder="Username"
                aria-label="Username"
                aria-describedby="Username Field"
              />

              {/* Password Field */}
              <Form.Control
                name="password"
                placeholder="Password"
                aria-label="Password"
                aria-describedby="Password Field"
              />

              <Button type="submit">Login</Button>

            </InputGroup>
          </Form>


          {/* CODE TO DISPLAY SIGNED IN USER */}
          {/* <Navbar.Text>
              Signed in as: <a href="#login">Mark Otto</a>
            </Navbar.Text> */}

        </Navbar.Collapse>

      </Container>
    </Navbar>

  );
}

export default NavBar;