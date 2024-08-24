const mongoose = require('mongoose');

const wasteCategorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    description: String,
    disposalGuidelines: String,
});

const WasteCategory = mongoose.models.WasteCategory || mongoose.model('WasteCategory', wasteCategorySchema);

module.exports = WasteCategory;
