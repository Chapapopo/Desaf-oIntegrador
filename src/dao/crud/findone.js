import '../../connection.js'; // Importa el archivo de conexión
import Product from '../model/producto.model.js'; // Importa el modelo Product

const searchOneProducts = async (code) => {
    const products = await Product.findOne({code});

    return products;
};

export default searchOneProducts;