// db.js
require('dotenv').config();
const { Pool } = require('pg');

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_DATABASE,
  password: process.env.DB_PASSWORD,
  port: 5432,
  ssl: {
    require: true,
    rejectUnauthorized: false
  }
});

const getSalesData = async () => {
  const result = await pool.query('SELECT * FROM salesnew2');
  return result.rows;
};

const getTopProducts = async () => {
  const result = await pool.query('SELECT * FROM salesnew2 ORDER BY grosssales DESC LIMIT 10');
  return result.rows;
};

const getWorstProducts = async () => {
  const result = await pool.query('SELECT * FROM salesnew2 ORDER BY grosssales ASC LIMIT 10');
  return result.rows;
};

const getLocations = async () => {
    const result = await pool.query('SELECT * FROM locationsnew2');
    return result.rows;
};

const getCompanies = async () => {
    const result = await pool.query('SELECT * FROM companiesnew2');
    return result.rows;
};

// Add more functions as needed for locations, companies, etc.
//for the line graph:
const getSalesDataByBrandOrProduct = async (brandOrProduct) => {
  const result = await pool.query('SELECT salesdate, SUM(grosssales) as totalSales FROM salesnw2 WHERE brand = $1 OR product = $1 GROUP BY salesdate ORDER BY salesdate', [brandOrProduct]);
  return result.rows;
};
//This function fetches the total revenue per location for a specific brand or product, which can be used to create the interactive map.
const getSalesByLocationForBrandOrProduct = async (brandOrProduct) => {
  const result = await pool.query('SELECT locationid, SUM(grosssales) as totalSales FROM salesnew2 WHERE brand = $1 OR product = $1 GROUP BY locationid', [brandOrProduct]);
  return result.rows;
};
//to create a Venn diagram for comparing a brand with its competitors


module.exports = {
  getSalesData,
  getTopProducts,
  getWorstProducts,
  getLocations,
  getCompanies,
  getSalesDataByBrandOrProduct,
  getSalesByLocationForBrandOrProduct
};
