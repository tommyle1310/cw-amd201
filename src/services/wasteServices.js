const WasteCategory = require('../models/WasteCategory');
const WasteItem = require('../models/WasteItem');

// Calculate waste sorting scores
exports.calculateSortingScore = async (userWasteItems) => {
    try {
        let score = 0;
        for (const item of userWasteItems) {
            const wasteItem = await WasteItem.findById(item.itemId).populate('category');
            if (wasteItem) {
                score++;
            }
        }
        return score;
    } catch (error) {
        console.error('Error calculating sorting score:', error);
        throw new Error('Error calculating sorting score');
    }
};

// Generate recommendations
exports.getRecommendations = async (userWasteItems) => {
    try {
        const recommendations = [];
        for (const item of userWasteItems) {
            const wasteItem = await WasteItem.findById(item.itemId).populate('category');
            if (wasteItem) {
                const similarItems = await WasteItem.find({ category: wasteItem.category });
                recommendations.push(...similarItems);
            }
        }
        return recommendations;
    } catch (error) {
        console.error('Error generating recommendations:', error);
        throw new Error('Error generating recommendations');
    }
};
