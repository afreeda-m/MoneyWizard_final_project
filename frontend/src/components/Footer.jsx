import React from 'react';
import Container from 'react-bootstrap/Container';

function Footer() {

  return (

    // `min-vw-100`: Set to 100% of viewport.
    // `bg-body-tertiary`: Give its the same colour as the NavBar.
    <footer className='navbar-expand navbar-light bg-body-tertiary min-vw-100'>

      <Container>

        {/* If you want to auto-generate and insert the current year for the
          * copyright, use this snippet:
          *
          *   {new Date().getFullYear()}
          *
          */}
        <div className='text-center py-3'>

          <p> Copyright &copy; 2023: &nbsp;

            <a className='text-dark' href='https://github.com/afreeda-m/MoneyWizard_final_project'>
              Wizards of Money Wizard
            </a>

          </p>

          <p>All Rights Reserved</p>

        </div>
      </Container>

    </footer>

  );

}

export default Footer;