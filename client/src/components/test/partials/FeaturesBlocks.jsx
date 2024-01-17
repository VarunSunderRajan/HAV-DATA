import React from 'react';
import ms from '../images/microsoft.png';
import tf from '../images/tensorflow.png';
import c from '../images/cloud.png';
import py from '../images/py.png';
import sql from '../images/s.png';
import node from '../images/node.png';

function FeaturesBlocks() {
  return (
    <section className="relative">

      {/* Section background (needs .relative class on parent and next sibling elements) */}
      <div className="absolute inset-0 top-1/2 md:mt-24 lg:mt-0 bg-gray-900 pointer-events-none" aria-hidden="true"></div>
      <div className="absolute left-0 right-0 bottom-0 m-auto w-px p-px h-20 bg-gray-200 transform translate-y-1/2"></div>

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6">
        <div className="py-12 md:py-20">

          {/* Section header */}
          <div className="max-w-3xl mx-auto text-center pb-12 md:pb-20">
            <h2 className="h2 mb-4">Solutions using HAV Data</h2>
            {/* <p className="text-xl text-gray-600">Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur excepteur sint occaecat cupidatat.</p> */}
          </div>

          {/* Items */}
          <div className="max-w-sm mx-auto grid gap-6 md:grid-cols-2 lg:grid-cols-3 items-start md:max-w-2xl lg:max-w-none">

            {/* 1st item */}
            <div className="relative flex flex-col items-center p-6 bg-white rounded shadow-xl">
            <img className="relative rounded-full" src={py} width="96" height="96" alt="" />
              <h4 className="text-xl font-bold leading-snug tracking-tight mb-1">Python</h4>
              <p className="text-gray-600 text-center">Database Migration, Machine Learning and Statistical Analysis for robust solutions.</p>
            </div>

            {/* 2nd item */}
            <div className="relative flex flex-col items-center p-6 bg-white rounded shadow-xl">
            <img className="relative rounded-full" src={sql} width="96" height="96" alt="" />
              <h4 className="text-xl font-bold leading-snug tracking-tight mb-1">SQL</h4>
              <p className="text-gray-600 text-center">Key value and relational data mapping using every SQL based language. PostgreSQL, NoSQL, MS SQL, AWS etc. </p>
            </div>

            {/* 3rd item */}
            <div className="relative flex flex-col items-center p-6 bg-white rounded shadow-xl">
            <img className="relative rounded-full" src={ms} width="96" height="96" alt="" />
              <h4 className="text-xl font-bold leading-snug tracking-tight mb-1">Microsoft</h4>
              <p className="text-gray-600 text-center">Power BI Integration, API management and all MS Office tools. Excel conversion support.</p>
            </div>

            {/* 4th item */}
            <div className="relative flex flex-col items-center p-6 bg-white rounded shadow-xl">
            <img className="relative rounded-full" src={tf} width="96" height="96" alt="" />            
              <h4 className="text-xl font-bold leading-snug tracking-tight mb-1">TensorFlow</h4>
              <p className="text-gray-600 text-center">Machine learning with the latest neural networks. Keras, scikit-learn, XG Boost, PyTorch. </p>
            </div>

            {/* 5th item */}
            <div className="relative flex flex-col items-center p-6 bg-white rounded shadow-xl">
            <img className="relative rounded-full" src={node} width="84" height="84" alt="" />
              <h4 className="text-xl font-bold leading-snug tracking-tight mb-1">Node.js</h4>
              <p className="text-gray-600 text-center">The latest full-stack frameworks for custom builds. Integration with all software languages.</p>
            </div>

            {/* 6th item */}
            <div className="relative flex flex-col items-center p-6 bg-white rounded shadow-xl">
            <img className="relative rounded-full" src={c} width="96" height="96" alt="" />
              <h4 className="text-xl font-bold leading-snug tracking-tight mb-1">Secure Cloud Hosting</h4>
              <p className="text-gray-600 text-center">Aggregated data hosted in a secure server. Industry tested and built with heavy backtesting. (AWS, Azure, GCP)</p>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}

export default FeaturesBlocks;
