// src/pages/LandingPage.jsx
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const LandingPage = () => {
  const apiUrl = `http://api.mediastack.com/v1/news?access_key=6e7ddb1dcf5da881d518ae95e954b49f&keywords=cannabis&countries=ca`;
  const [newsData, setNewsData] = useState([]);

  useEffect(() => {
    const fetchNewsData = async () => {
      try {
        const response = await fetch(apiUrl);

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        setNewsData(data.data || []); // Assuming the news data is in the 'data' property
      } catch (error) {
        console.error('Error fetching news:', error.message);
      }
    };

    fetchNewsData();
  }, [apiUrl]);

  return (
    <div>
      <header>
        <h1>Welcome to Our Website</h1>
      </header>
      <main>
        <p>Discover amazing things with our awesome platform!</p>
        <Link to="/sign-in">
          <button>Sign In</button>
        </Link>
        <p>*display news here*</p>
        <ul>
          {newsData.map((newsItem) => (
            <li key={newsItem.title}>{newsItem.title}</li>
          ))}
        </ul>
      </main>
      <footer>
        <p>Contact us for more information</p>
      </footer>
    </div>
  );
};

export default LandingPage;
