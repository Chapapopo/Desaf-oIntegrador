import mongoose from "mongoose";

const collectionName = "Carts";

const cartSchema = new mongoose.Schema({
    products: {
        type: Array,
        require: true,
    }
});

const cartModel = mongoose.model(collectionName, cartSchema)
module.exports = cartModel;