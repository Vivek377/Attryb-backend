const mongoose = require("mongoose");

const OEMSchema = mongoose.Schema({
    title: { required: true, type: String },
    image: { required: true, type: String },
    price: { required: true, type: String },
    colors: { required: true, type: Array },
    power: { required: true, type: Number },
    model: { required: true, type: String },
    modelYear: { required: true, type: Number },
    maxSpeed: { required: true, type: Number },
    mileage: { required: true, type: Number }
})

const OEMModel = mongoose.model("OEM", OEMSchema);

module.exports = OEMModel
