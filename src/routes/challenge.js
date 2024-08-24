const express = require('express');
const router = express.Router();
const challengeController = require('../controllers/challengeController');
const authMiddleware = require('../middlewares/JWT');


// Get all challenges
router.get('/', challengeController.getAllChallenges);

// Create a new challenge
router.post('/', challengeController.createChallenge);

// Update user score
router.post('/update-score', authMiddleware, challengeController.increaseWasteSortingScore);

module.exports = router;
