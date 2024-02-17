import '../../connection.js'; // Importa el archivo de conexión
import Product from '../model/producto.model.js'; // Importa el modelo Product

const deleteProducts = async (id) => {
    const result = await Product.findByIdAndDelete(id);

    console.log(result);

};

deleteProducts();

export default deleteProducts;