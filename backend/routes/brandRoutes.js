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

// Single User
router.get('/brands', async (req, res) => {
  try {
    const { id } = req.query;

    if (!id) {
      return res.status(400).json({ error: 'Brand ID is required in the query parameters.' });
    }

    // Fetch the brand from the database by its ID
    const brand = await Brand.findById(id);

    if (!brand) {
      return res.status(404).json({ error: 'Brand not found' });
    }

    res.status(200).json(brand);
  } catch (error) {
    console.error('Error getting brand by ID:', error);
    res.status(500).json({ error: 'Failed to get brand' });
  }
});

router.put('/brands', async (req, res) => {
  try {
    const { id, name, url } = req.body;

    // Check if the required fields are provided
    if (!id || !name || !url) {
      return res.status(400).json({ error: 'Brand ID, name, and URL are required.' });
    }

    // Fetch the brand from the database by its ID
    const brand = await Brand.findByIdAndUpdate(id, { name, url }, { new: true });

    if (!brand) {
      return res.status(404).json({ error: 'Brand not found' });
    }

    res.status(200).json(brand);
  } catch (error) {
    console.error('Error updating brand:', error);
    res.status(500).json({ error: 'Failed to update brand' });
  }
});


module.exports = router;
