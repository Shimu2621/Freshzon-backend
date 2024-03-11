const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
        //trim remove all empty spaces
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
    quantity: {
        type: Number,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    // image: {
    //     type: String
    // },
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
// category: "vegetable",
// image: "/images/all-products/veg2.png"