const mongoose = require("mongoose");

const DealerSchema = mongoose.Schema({
    name: { required: true, type: String },
    email: { required: true, type: String },
    password: { required: true, type: String }
})

const DealerModel = mongoose.model("dealer", DealerSchema);

module.exports = DealerModel
