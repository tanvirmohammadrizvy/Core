// brandRoutes.js

const express = require('express');
const router = express.Router();
const Brand = require('../models/brand');

// Create a new brand
router.post('/brands', async (req, res) => {
  try {
    const { brandName, brandUrl } = req.body;

    // Create a new brand using the Brand model
    const brand = new Brand({
      name: brandName,
      url: brandUrl,
    });

    // Save the brand to the database
    const createdBrand = await brand.save();

    res.status(201).json(createdBrand);
  } catch (error) {
    console.error('Error creating brand:', error);
    res.status(500).json({ error: 'Failed to create brand' });
  }
});

// Get all brands
router.get('/brands', async (req, res) => {
  try {
    // Fetch all brands from the database
    const brands = await Brand.find();

    res.status(200).json(brands);
  } catch (error) {
    console.error('Error getting brands:', error);
    res.status(500).json({ error: 'Failed to get brands' });
  }
});

module.exports = router;
