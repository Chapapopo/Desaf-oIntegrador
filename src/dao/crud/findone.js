import '../../connection.js'; // Importa el archivo de conexión
import Product from '../model/producto.model.js'; // Importa el modelo Product

const searchOneProducts = async (id) => {
    const product = await Product.findOne({_id: id});

    return product;
};

export default searchOneProducts;