const Challenge = require('../models/challenge');
const User = require('../models/User');
const wasteService = require('../services/wasteServices');

// Get All Challenges
exports.getAllChallenges = async (req, res) => {
    try {
        const challenges = await Challenge.find();
        res.status(200).json(challenges);
    } catch (error) {
        console.error('Error fetching challenges:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

// Add New Challenge
exports.createChallenge = async (req, res) => {
    const { description, difficultyLevel, scoringCriteria } = req.body;
    try {
        const newChallenge = new Challenge({ description, difficultyLevel, scoringCriteria });
        await newChallenge.save();
        res.status(201).json(newChallenge);
    } catch (error) {
        console.error('Error creating challenge:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

exports.increaseWasteSortingScore = async (req, res) => {
    const userId = req.user._id;
    const userWasteItems = req.body.wasteItems;

    try {
        // Calculate the score based on user waste items
        const score = await wasteService.calculateSortingScore(userWasteItems);

        // Find user and update their waste sorting score
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }


        user.wasteSortingScores = (user.wasteSortingScores || 0) + score;
        await user.save();

        res.status(200).json({ message: 'Waste sorting score updated', score: user.wasteSortingScores });
    } catch (error) {
        console.error('Error updating waste sorting score:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

