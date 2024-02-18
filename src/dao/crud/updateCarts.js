import '../../connection.js'; // Importa el archivo de conexión
import Carts from '../model/cart.model.js'; // Importa el modelo Cart
import Product from '../model/producto.model.js'; // Importa el modelo Product

const updateCarts = async ({ carritoId, productoId}) => {
    try {
        // Encuentra el carrito por su ID
        const cart = await Carts.findOne({ _id: carritoId });
        if (!cart) {
            throw new Error('No se encontró el carrito');
        }
        
        // Encuentra el producto por su ID
        const product = await Product.findOne({ _id: productoId });
        if (!product) {
            throw new Error('No se encontró el producto');
        }
        
        // Agrega el producto al array de productos del carrito
        cart.products.push(product);

        // Guarda el carrito actualizado
        const updatedCart = await cart.save();
        console.log(updatedCart);

        return updatedCart;
    } catch (error) {
        console.error(error);
        throw new Error('Error al actualizar el carrito');
    }
};

export default updateCarts;
