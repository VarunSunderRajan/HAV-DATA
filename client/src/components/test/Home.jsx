import React from 'react';

import Header from '../test/partials/Header';
import HeroHome from '../test/partials/HeroHome';
import FeaturesHome from '../test/partials/Features';
import FeaturesBlocks from '../test/partials/FeaturesBlocks';
import Testimonials from '../test/partials/Testimonials';
import Newsletter from '../test/partials/Newsletter';
import Footer from '../test/partials/Footer';
//import Banner from '../test/partials/Banner';


function Home() {
  return (
    <div className="flex flex-col min-h-screen overflow-hidden">

      {/*  Site header */}
      <Header />

      {/*  Page content */}
      <main className="flex-grow">

        {/*  Page sections */}
        <HeroHome />
        <FeaturesHome />
        <FeaturesBlocks />
        <Testimonials />
        <Newsletter />

      </main>

      {/* <Banner /> */}

      {/*  Site footer */}
      <Footer />

    </div>
  );
}

export default Home;