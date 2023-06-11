const mongoose = require('mongoose');
const Schema = mongoose.Schema


const adminSchema = new Schema({

    firstName: String,
    lastName: String,
    email: String,
    password: String,
    role: { type: String, enum: ['admin', "superadmin", "content_manager", "designer_manager"] }

})