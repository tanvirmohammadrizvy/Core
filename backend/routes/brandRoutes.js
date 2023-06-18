const express = require('express');
const router = express.Router();
const Brand = require('../models/brand');

// Get all brands
router.get('/brands', async (req, res) => {
    try {
        const brands = await Brand.find();
        res.json(brands);
    } catch (error) {
        console.error('Error getting brands:', error);
        res.status(500).json({ error: 'Server error' });
    }
});

// Create a brand
router.post('/brands', async (req, res) => {
    try {
        const { name, url } = req.body;
        const brand = new Brand({ name, url });
        await brand.save();
        res.status(201).json(brand);
    } catch (error) {
        console.error('Error creating brand:', error);
        res.status(500).json({ error: 'Server error' });
    }
});

// Update a brand
router.put('/brands/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { name, url } = req.body;
        const updatedBrand = await Brand.findByIdAndUpdate(id, { name, url }, { new: true });
        if (!updatedBrand) {
            return res.status(404).json({ error: 'Brand not found' });
        }
        res.json(updatedBrand);
    } catch (error) {
        console.error('Error updating brand:', error);
        res.status(500).json({ error: 'Server error' });
    }
});

// Delete a brand
router.delete('/brands/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const deletedBrand = await Brand.findByIdAndDelete(id);
        if (!deletedBrand) {
            return res.status(404).json({ error: 'Brand not found' });
        }
        res.json({ message: 'Brand deleted successfully' });
    } catch (error) {
        console.error('Error deleting brand:', error);
        res.status(500).json({ error: 'Server error' });
    }
});

module.exports = router;
