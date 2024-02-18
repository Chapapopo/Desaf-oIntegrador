import express from "express";
import { engine } from "express-handlebars";
import { __dirname } from "./utils.js";
import * as path from "path";
import { Server } from "socket.io";/* 
import searchProducts from "./dao/crud/find.js";
import searchOneProducts from "./dao/crud/findone.js";
import deleteProducts from "./dao/crud/delete.js";
import createProducts from "./dao/crud/create.js";
import updateProducts from "./dao/crud/update.js";
import createCarts from "./dao/crud/createCarts.js";
import updateCarts from "./dao/crud/updateCarts.js"; 
import createMessage from "./dao/crud/createMessage.js";
import getAllMessages from "./dao/crud/findMessage.js";*/
import "./connection.js";


const app = express();
const PORT = 8080;

const server = app.listen(PORT, () => {
  console.log(`Server run Express port: ${PORT}`);
});

const io = new Server(server);

app.engine("handlebars", engine());
app.set("view engine", "handlebars");
app.set("views", path.resolve(__dirname + "/views"));

app.use("/", express.static(__dirname + "/public"));

app.get("/chat", (req, res) => {
  res.render("chat");
});
/* 
app.get('/home', async (req, res) => {
  try {
    const ArrayProductos = await searchProducts();
    console.log(ArrayProductos);
    res.render('home', { productos: ArrayProductos });
  } catch (error) {
    // Manejar el error
    console.error(error);
    res.status(500).send('Error al buscar productos');
  }
});

// Ruta para mostrar un producto por ID
app.get('/home/:id', async (req, res) => {
  try {
    const productid = parseInt(req.params.id);
    const producto = await searchOneProducts(productid);
    // Crear un nuevo array y agregar el producto
    const productos = [];
    productos.push(producto);
    console.log(producto);
    res.render('home', { productos: productos });
  } catch (error) {
    // Manejar el error
    console.error(error);
    res.status(500).send('Error al buscar productos');
  }
});

app.get('/realtimeproducts', async (req, res) => {
  try {
    const ArrayProductos = await searchProducts();
    console.log(ArrayProductos);
    res.render('home', { productos: ArrayProductos });
  } catch (error) {
    // Manejar el error
    console.error(error);
    res.status(500).send('Error al buscar productos');
  }
});

// Ruta para mostrar productos de un carrito por ID
app.get('/carts/:id', (req, res) => {
  const carritoId = parseInt(req.params.id);
  const productosEnCarrito = gestion.mostrarProductosDeCarrito(carritoId);

  // Crear un nuevo array y agregar el producto
  const productos = [];
  productos.push(productosEnCarrito);

  res.render('carts', { productos: productosEnCarrito });
}); */

const message = [];

io.on("connection", (socket) => {
  console.log(`User ${socket.id} Connection`);

  //Nombre del usuario
  let userName = "";
  // Mesaje de Coneccion
  socket.on("userConnection", (data) => {
    userName = data.user;
    userMessage = data.message;
    message.push({
      id: socket.id,
      info: "connection",
      name: data.user,
      message: `${data.user} Connectado`,
      date: new Date().toTimeString(),
    });
    io.sockets.emit("userConnection", message);
  });
  // Mensaje de Mesaje enviado
  socket.on("userMessage", async (data) => {
    userName = data.user;
    userMessage = data.message;

    // Crea el mensaje y espera a que se guarde en la base de datos
    await createMessage(userName, userMessage);

    // Obtiene todos los mensajes de la base de datos
    const messages = await getAllMessages();

    // Emite los mensajes a todos los clientes conectados
    io.sockets.emit("userMessage", messages);
  });
});
/* 
// Ruta para agregar un nuevo producto (POST)
app.post("/productos", async (req, res) => {
  const datosProducto = req.body; // Obtener datos del cuerpo de la solicitud
  createProducts(datosProducto);

  // Actualizar la lista de productos
  try {
    const ArrayProductos = await searchProducts();
    console.log(ArrayProductos);

    // Emitir el evento "listaActualizada" a todos los clientes conectados
    io.emit("listaActualizada", { productos: ArrayProductos });

    // Redirigir al usuario a la página principal con la lista actualizada
    res.redirect('/realtimeproducts');
  } catch (error) {
    // Manejar el error
    console.error(error);
    res.status(500).send('Error al buscar productos');
  }
});

// Ruta para actualizar un campo específico del producto por ID
app.put("/productos/:id", async (req, res) => {
  const productoId = parseInt(req.params.id);
  const { campo, nuevoValor } = req.body;

  updateProducts({ productoId, campo, nuevoValor })

  // Actualizar la lista de productos
  try {
    const ArrayProductos = await searchProducts();
    console.log(ArrayProductos);

    // Emitir el evento "listaActualizada" a todos los clientes conectados
    io.emit("listaActualizada", { productos: ArrayProductos });

    // Redirigir al usuario a la página principal con la lista actualizada
    res.redirect('/realtimeproducts');
  } catch (error) {
    // Manejar el error
    console.error(error);
    res.status(500).send('Error al buscar productos');
  }
});

// Ruta para borrar un producto por ID
app.delete("/productos/:id", async (req, res) => {
  try {
    const productoId = parseInt(req.params.id);
    const producto = await deleteProducts(productoId);
    // Crear un nuevo array y agregar el producto
    const productos = [];
    productos.push(producto);
    console.log(producto);
    io.emit("listaActualizada", { productos: producto })
  } catch (error) {
    // Manejar el error
    console.error(error);
    res.status(500).send('Error al buscar productos');
  }  
});

// Ruta para crear un nuevo carrito
app.post("/carts", (req, res) => {
  createCarts();
});

// Ruta para agregar un porducto a un carrito
app.post("/carts/:id/product/:idProducto", (req, res) => {
  const carritoId = parseInt(req.params.id);
  const productoId = parseInt(req.params.idProducto);

  // Llama al método para agregar el producto al carrito
  updateCarts(carritoId, productoId);

  res.json({ message: `Producto con ID ${productoId} agregado al carrito ${carritoId} correctamente.` });
}); */