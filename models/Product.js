const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    prevPrice: {
        type: Number,
        required: true
    },
    currentPrice: {
        type: Number,
        required: true
    },
    discount: {
        type: Number
    },
    type: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
}, { timestamps: true });

module.exports = mongoose.model("product", productSchema);

// name: "Organic Cauliflower",
// prevPrice: 65.00,
// currentPrice: 50.00,
// stars: 4,
// discount: "-27%",
// type: "vegetable",
// image: "/images/all-products/veg2.png"