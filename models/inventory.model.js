const mongoose = require("mongoose");
const DealerModel = require("./dealers.model")

const InventorySchema = mongoose.Schema({
    title: { required: true, type: String },
    image: { required: true, type: String },
    price: { required: true, type: Number },
    colors: { required: true, type: Array },
    km: { required: true, type: Number },
    scratches: { required: true, type: Number },
    accidents: { required: true, type: Number },
    prevBuyers: { required: true, type: Number },
    originalPaint: { required: true, type: String },
    registrationPlace: { required: true, type: String },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: DealerModel }
})

const InventoryModel = mongoose.model("inventory", InventorySchema);

module.exports = InventoryModel
