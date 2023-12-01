import axios from "axios";
import { useState } from "react";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Navbar from 'react-bootstrap/Navbar';
import { FaBullseye } from 'react-icons/fa';
import { useNavigate } from "react-router-dom";

function NavBar(props) {
  const navigate = useNavigate();

  const {isLoggedIn, setIsLoggedIn, setUsername, username} = props;

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
        if(response.status == 200){
          setIsLoggedIn(true);
          setUsername(response.data.name);
          navigate("/dashboard");
        }
      })
      .catch(function (error) {
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
      if(response.status == 200) {
        setIsLoggedIn(false);
        setUsername('');
        navigate("/");
      }else{
        console.log("Couldn't log user out", response);
      }
    })
    .catch(function (error) {
      console.log(error);
    });
  }

  return (

    <Navbar className="bg-success d-flex justify-content-center align-items-between px-4">

      {/* BRAND NAME */}
      <Navbar.Brand href="#home" className='text-light'>

        <FaBullseye size={45} className="mb-2 text-white" style={{ marginRight: "1rem" }} />
        Money Wizard</Navbar.Brand>
      <Navbar.Toggle />


      {/* THE FORM PORTION OF THE NAVBAR */}
      <Navbar.Collapse className="justify-content-end">

        {/* LOGIN FORM */}
        {!isLoggedIn && <Form inline="true" id="login-form" onSubmit={submitLogin}>
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


            {/* Submit Button */}
            <Button type="submit" form="login-form">Login</Button>

          </InputGroup>
        </Form>}

        {isLoggedIn && <div><span>Hello {username}</span><Button onClick={performLogout}>Logout</Button></div>}

      {/* CODE TO DISPLAY SIGNED IN USER */}
      {/* <Navbar.Text>
            Signed in as: <a href="#login">Mark Otto</a>
          </Navbar.Text> */}

      </Navbar.Collapse>

    </Navbar>

  );
}

export default NavBar;