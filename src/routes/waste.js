const express = require('express');
const router = express.Router();
const wasteController = require('../controllers/wasteController');
const authMiddleware = require('../middlewares/JWT');

// Waste Category routes
router.get('/waste-categories', wasteController.getAllCategories);
router.post('/waste-categories', authMiddleware, wasteController.createCategory);

// Waste Item routes
router.get('/waste-items', authMiddleware, wasteController.getAllItems);
router.post('/waste-items', authMiddleware, wasteController.createItem);

router.post('/calculate-sorting-score', authMiddleware, wasteController.calculateSortingScore);
router.post('/get-recommendations', authMiddleware, wasteController.getRecommendations);

module.exports = router;
