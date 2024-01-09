// routes.js
const express = require('express');
const router = express.Router();
const db = require('./db'); // Make sure the path is correct

router.get('/sales', async (req, res) => {
  try {
    const data = await db.getSalesData();
    res.json(data);
  } catch (error) {
    console.error('Error executing query:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

router.get('/top-products', async (req, res) => {
  try {
    const data = await db.getTopProducts();
    res.json(data);
  } catch (error) {
    console.error('Error executing query:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

router.get('/worst-products', async (req, res) => {
  try {
    const data = await db.getWorstProducts();
    res.json(data);
  } catch (error) {
    console.error('Error executing query:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

router.get('/locations', async (req, res) => {
  try {
    const data = await db.getLocations();
    res.json(data);
  } catch (error) {
    console.error('Error executing query:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

router.get('/companies', async (req, res) => {
  try {
    const data = await db.getCompanies();
    res.json(data);
  } catch (error) {
    console.error('Error executing query:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

router.get('/sales-by-brand-or-product/:brandOrProduct', async (req, res) => {
  try {
    const data = await db.getSalesDataByBrandOrProduct(req.params.brandOrProduct);
    res.json(data);
  } catch (error) {
    console.error('Error executing query:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

router.get('/sales-by-location-for-brand-or-product/:brandOrProduct', async (req, res) => {
  try {
    const data = await db.getSalesByLocationForBrandOrProduct(req.params.brandOrProduct);
    res.json(data);
  } catch (error) {
    console.error('Error executing query:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});



// Update other routes similarly...

module.exports = router;
