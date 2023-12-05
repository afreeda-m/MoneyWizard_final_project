import React from 'react';
import Container from 'react-bootstrap/Container';

function Footer() {

  return (

    // `bg-body-tertiary`: Give its the same colour as the NavBar.
    <footer className='navbar-expand bg-primary' style={{marginTop: "auto"}}>

      <Container>

        {/* If you want to auto-generate and insert the current year for the
          * copyright, use this snippet:
          *
          *   {new Date().getFullYear()}
          *
          */}
        <div className='text-center py-3'>

          <p className='text-light'> Copyright &copy; 2023:&nbsp;

            <a className='text-light' href='https://github.com/afreeda-m/MoneyWizard_final_project'>
              The Wizards of Money Wizard
            </a>

          </p>

          <p className='text-light'>All Rights Reserved</p>

        </div>
      </Container>

    </footer>

  );

}

export default Footer;