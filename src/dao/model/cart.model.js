import mongoose from "mongoose";

const collectionName = "Carts";

const cartSchema = new mongoose.Schema({
    id: {
        type: Number,
        require: true,
        unique: true,
    },
    products: {
        type: Array,
        require: true,
    }
});

const cartModel = mongoose.model(collectionName, cartSchema)
module.exports = cartModel;