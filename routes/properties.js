const express = require('express');
const { Property, User } = require('../models');
const authMiddleware = require('../middleware/auth');
const router = express.Router();

// Get all properties (public)
router.get('/', async (req, res) => {
  try {
    const properties = await Property.findAll({
      include: [{
        model: User,
        attributes: ['id', 'firstName', 'lastName', 'email']
      }],
      order: [['createdAt', 'DESC']]
    });
    res.json(properties);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Get single property (public)
router.get('/:id', async (req, res) => {
  try {
    const property = await Property.findByPk(req.params.id, {
      include: [{
        model: User,
        attributes: ['id', 'firstName', 'lastName', 'email']
      }]
    });
    
    if (!property) {
      return res.status(404).json({ message: 'Property not found' });
    }
    
    res.json(property);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Create property (protected)
router.post('/', authMiddleware, async (req, res) => {
  try {
    const { title, description, price, bedrooms, bathrooms, area, type, location } = req.body;
    
    const property = await Property.create({
      title,
      description,
      price,
      bedrooms,
      bathrooms,
      area,
      type,
      location,
      UserId: req.user.id
    });
    
    res.status(201).json({
      message: 'Property created successfully',
      property
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Update property (protected - only owner)
router.put('/:id', authMiddleware, async (req, res) => {
  try {
    const property = await Property.findByPk(req.params.id);
    
    if (!property) {
      return res.status(404).json({ message: 'Property not found' });
    }
    
    if (property.UserId !== req.user.id) {
      return res.status(403).json({ message: 'Not authorized to update this property' });
    }
    
    const { title, description, price, bedrooms, bathrooms, area, type, location } = req.body;
    
    await property.update({
      title,
      description,
      price,
      bedrooms,
      bathrooms,
      area,
      type,
      location
    });
    
    res.json({
      message: 'Property updated successfully',
      property
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Delete property (protected - only owner)
router.delete('/:id', authMiddleware, async (req, res) => {
  try {
    const property = await Property.findByPk(req.params.id);
    
    if (!property) {
      return res.status(404).json({ message: 'Property not found' });
    }
    
    if (property.UserId !== req.user.id) {
      return res.status(403).json({ message: 'Not authorized to delete this property' });
    }
    
    await property.destroy();
    
    res.json({ message: 'Property deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Get user's properties (protected)
router.get('/user/my-properties', authMiddleware, async (req, res) => {
  try {
    const properties = await Property.findAll({
      where: { UserId: req.user.id },
      order: [['createdAt', 'DESC']]
    });
    
    res.json(properties);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

module.exports = router;
