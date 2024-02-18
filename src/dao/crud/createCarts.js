import '../../connection.js'; // Importa el archivo de conexión
import Carts from '../model/cart.model.js'; // Importa el modelo Cart

const createCarts = async () => {
    const nuevoProducto = new Carts({
        products: [] // Crea un array vacío de productos
    });
    await nuevoProducto.save();
};

export default createCarts;