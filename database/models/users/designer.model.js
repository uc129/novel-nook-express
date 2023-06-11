const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const designerSchema = new Schema({
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    role: { type: String, enum: ['designer'], default: 'designer' },
    avatar: [{ type: Schema.Types.ObjectId, ref: 'Images' }],
    bio: { type: String },
    links: [{ platform: String, url: String }],

    products: [{ type: mongoose.Types.ObjectId, ref: 'Product' }],
    testimonials: [{ type: Schema.Types.ObjectId, ref: 'Testimonial' }],
},
    { timestamps: true }
);

const testimonialSchema = new Schema({
    designer: { type: Schema.Types.ObjectId, ref: 'Designer' },
    testimonial: { type: String },
    featured: { type: Boolean },
},
    { timestamps: true })

const DesignerModel = mongoose.model("Designer", designerSchema);
const TestimonialModel = mongoose.model('Testimonial', testimonialSchema)

module.exports = { DesignerModel, TestimonialModel };
