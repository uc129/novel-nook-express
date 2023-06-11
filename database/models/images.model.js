const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const imageSchema = new Schema({
    url: { type: String, required: true },
    title: { type: String },
    description: { type: String },
    altText: { type: String },
    featured: { type: Boolean },
    owner: { type: Schema.Types.ObjectId, required: true },
    ownerType: { type: String, enum: ['customer', 'product', 'designer', 'product_category', 'product_bundle'], required: true },
}, { timestamps: true });

const ImageModel = mongoose.model('Images', imageSchema)

module.exports = ImageModel