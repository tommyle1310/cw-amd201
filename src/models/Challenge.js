const mongoose = require('mongoose');

const challengeSchema = new mongoose.Schema({
    description: { type: String, required: true },
    difficultyLevel: { type: String, required: true },
    scoringCriteria: { type: String, required: true }
});


const Challenge = mongoose.models.Challenge || mongoose.model('Challenge', challengeSchema);

module.exports = Challenge;

