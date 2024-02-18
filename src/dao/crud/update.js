import '../../connection.js'; // Importa el archivo de conexión
import Product from '../model/producto.model.js'; // Importa el modelo Product

const updateProducts = async ({ productoId, campo, nuevoValor }) => {
    const updatedProduct = await Product.findOneAndUpdate(
        { _id: productoId },
        { [campo]: nuevoValor }, // Usar corchetes para evaluar la variable campo como el nombre del campo
        { new: true }
    );
    console.log(updatedProduct);
    return updatedProduct;
};

export default updateProducts;