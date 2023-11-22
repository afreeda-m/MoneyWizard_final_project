import React from 'react';

import Footer from '../components/Footer';
import NavBar from '../components/NavBar';


function Home() {

  return (

    <div className="home">

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

  );

}

export default Home;