const WasteItem = require('../models/WasteItem');
const WasteCategory = require('../models/WasteCategory');
const wasteService = require('../services/wasteServices');

// Get All Waste Categories
exports.getAllCategories = async (req, res) => {
    try {
        const categories = await WasteCategory.find();
        res.status(200).json(categories);
    } catch (error) {
        console.error('Error fetching categories:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

// Add New Waste Category
exports.createCategory = async (req, res) => {
    const { name, description, disposalGuidelines } = req.body;
    try {
        const newCategory = new WasteCategory({ name, description, disposalGuidelines });
        await newCategory.save();
        res.status(201).json(newCategory);
    } catch (error) {
        console.error('Error creating category:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

// Get All Waste Items
exports.getAllItems = async (req, res) => {
    try {
        const items = await WasteItem.find().populate('category');
        res.status(200).json(items);
    } catch (error) {
        console.error('Error fetching waste items:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

// Add New Waste Item
exports.createItem = async (req, res) => {
    const { name, category, sortingInstructions } = req.body;
    if (!name || !category) {
        return res.status(400).json({ message: 'Name and category are required' });
    }

    try {
        const existingCategory = await WasteCategory.findById(category);
        if (!existingCategory) {
            return res.status(400).json({ message: 'Invalid category ID' });
        }

        const newItem = new WasteItem({ name, category, sortingInstructions });
        await newItem.save();
        res.status(201).json(newItem);
    } catch (error) {
        console.error('Error creating waste item:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

// Calculate Waste Sorting Score 
exports.calculateSortingScore = async (req, res) => {
    const userWasteItems = req.body.wasteItems;
    try {
        const score = await wasteService.calculateSortingScore(userWasteItems);
        res.status(200).json({ score });
    } catch (error) {
        console.error('Error calculating sorting score:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

// Get Recommendations 
exports.getRecommendations = async (req, res) => {
    const userWasteItems = req.body.wasteItems;
    try {
        const recommendations = await wasteService.getRecommendations(userWasteItems);
        res.status(200).json(recommendations);
    } catch (error) {
        console.error('Error generating recommendations:', error);
        res.status(500).json({ message: 'Server error' });
    }
};
