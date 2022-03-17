const mongoose = require('mongoose');

module.exports = () => {
    return mongoose.connect("mongodb+srv://Sush8088:Sush8088@cluster0.kympl.mongodb.net/deltaData")
}