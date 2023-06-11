const express = require('express');
const router = express.Router();
const imageController = require('../controllers/image.controller');

// Create a new image
router.post('/create', imageController.createImage);

// Get all images
router.get('/all', imageController.getAllImages);

// Get image by ID
router.get('/:image_id', imageController.getImageById);

//Get images by ID array
router.get('/ids/:image_ids', imageController.getImagesByIds)

// Update an image
router.patch('/:image_id', imageController.updateImage);

// Delete an image
router.delete('/:image_id', imageController.deleteImage);

module.exports = router;
