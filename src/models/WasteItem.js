const mongoose = require('mongoose');

const WasteItemSchema = new mongoose.Schema({
    name: { type: String, required: true },
    category: { type: mongoose.Schema.Types.ObjectId, ref: 'WasteCategory', required: true },
    sortingInstructions: { type: String }
});

const WasteItem = mongoose.models.WasteItem || mongoose.model('WasteItem', WasteItemSchema);

module.exports = WasteItem;

