import '../../connection.js'; // Importa el archivo de conexión
import Product from '../model/producto.model.js'; // Importa el modelo Product

const searchProducts = async () => {
    // Buscar todos los productos
    const products = await Product.find({});

    return products; // Llama a la función de devolución de llamada con los productos encontrados
};

export default searchProducts;