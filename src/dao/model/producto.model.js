import mongoose from "mongoose";

const collectionName = 'Product';

const productoSchema = new mongoose.Schema({
    id: {
        type: Number,
        require: true,
        unique: true,
    },
    titulo: {
        type: String,
        require: true,
    },
    descripcion: {
        type: String,
        require: true,
    },
    code: {
        type: String,
        require: true,
    },
    precio: {
        type: Number,
        require: true,
    },
    Estado: {
        type: Boolean,
        require: true,
    },
    cantidad:  {
        type: Number,
        require: true,
    },
    categoria: {
        type: String,
        require: true,
    },
    imagen: {
        type: String,
        require: false,
    }
});

// producto.model.js
const Product = mongoose.model(collectionName, productoSchema);
export default Product;