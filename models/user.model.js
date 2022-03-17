const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: { type: String },
    company: { type: String },
    status: { type: String },
    notes: { type: String }
}, {
    timestamps: true,
    versionKey: false
});

module.exports = mongoose.model('userData',userSchema);