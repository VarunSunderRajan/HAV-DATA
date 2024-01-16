// server.js

require('dotenv').config();

const express = require('express');
const { Client } = require('pg');
const cors = require('cors');

const app = express();
const port = 3001; // Choose a port number

app.use(cors()); // Enable CORS for all routes

const client = new Client({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_DATABASE,
    password: process.env.DB_PASSWORD,
    port: 5432,
    ssl: {
      require: true, // This will help you. But you will see nwe error
      rejectUnauthorized: false // This line will fix new error 
    }
});

client.connect();



app.get('/api/sales', async (req, res) => {
  try {
    const username = req.query.username;
    const limit = req.query.limit;


    console.log('Received username (email):', username);

    if (!username) {
      return res.status(400).json({ error: 'Username not provided' });
    }

    // Fetch userid and usertype based on username
    const userQuery = 'SELECT userid, usertype FROM users WHERE username = $1';
    const userResult = await client.query(userQuery, [username]);

    if (userResult.rows.length === 0) {
      return res.status(404).json({ error: 'User not found' });
    }

    const { userid, usertype } = userResult.rows[0];

    if (usertype === 'LP') {
      // For "LP" user type, use the original query
      let lpQuery = 'SELECT * FROM salesnew2 WHERE userid = $1';

      if (limit) {
        lpQuery += ` ORDER BY grosssales DESC LIMIT ${limit}`;
      }



      const lpResult = await client.query(lpQuery, [userid]);
      const lpData = lpResult.rows;
      return res.json(lpData);

      
    } else if (usertype === 'D') {
      // For "D" user type, use the new query
      let dQuery = `
        SELECT s.*
        FROM Salesnew2 s
        JOIN Locationsnew2 l ON s.LocationID = l.LocationID
        JOIN Companiesnew2 c ON l.CompanyID = c.CompanyID
        WHERE c.CompanyID IN (
          SELECT CompanyID
          FROM Users u
          WHERE u.Username = $1 AND u.UserType = 'D'
        )
        ${limit ? 'ORDER BY s.grosssales DESC LIMIT ' + limit : ''};
      `;

      // if (limit) {
      //   dQuery += ` ORDER BY s.grosssales DESC LIMIT ${limit}`;
      // }


      const dResult = await client.query(dQuery, [username]);
      const dData = dResult.rows;
      return res.json(dData);
    } else {
      // Handle other user types or provide an error response
      return res.status(403).json({ error: 'Access forbidden for this user type' });
    }
  } catch (error) {
    console.error('Error executing query:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});



app.get('/api/allsales', async (req, res) => {
  try {
    const result = await client.query('SELECT * FROM salesnew2');
    const data = result.rows;
    res.json(data);
  } catch (error) {
    console.error('Error executing query:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


app.get('/api/alllocations', async (req, res) => {
  try {
    const result = await client.query('SELECT * FROM locationsnew2');
    const data = result.rows;
    res.json(data);
  } catch (error) {
    console.error('Error executing query:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});





app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
