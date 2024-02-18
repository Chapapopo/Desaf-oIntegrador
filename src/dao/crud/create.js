import '../../connection.js'; // Importa el archivo de conexión
import Product from '../model/producto.model.js'; // Importa el modelo Product

const createProducts = async (Producto) => {

    const nuevoProducto = new Product({
        titulo: Producto.titulo,
        descripcion: Producto.descripcion,
        code: Producto.code,
        precio: Producto.precio,
        Estado: Producto.Estado,
        cantidad: Producto.cantidad,
        categoria: Producto.categoria,
        imagen: Producto.imagen
    });
    await nuevoProducto.save();
};

export default createProducts;