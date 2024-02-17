import express from "express";
import { engine } from "express-handlebars";
import { __dirname } from "./utils.js";
import * as path from "path";
import { Server } from "socket.io";
import GestionProductos from "./GestionProductos.js";
import searchProducts from "./dao/crud/find.js";
import searchOneProducts from "./dao/crud/findone.js";
import deleteProducts from "./dao/crud/delete.js";
import "./connection.js";


const app = express();
const PORT = 8080;

const server = app.listen(PORT, () => {
  console.log(`Server run Express port: ${PORT}`);
});

const io = new Server(server);

app.use(express.json())
const gestion = new GestionProductos('./src/dao/productos.json', './src/dao/carrito.json');

app.engine("handlebars", engine());
app.set("view engine", "handlebars");
app.set("views", path.resolve(__dirname + "/views"));

app.use("/", express.static(__dirname + "/public"));

app.get("/chat", (req, res) => {
  res.render("chat");
});

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
app.get('/home/:code', async (req, res) => {
  try {
    const productcode = parseInt(req.params.code);
    const producto = await searchOneProducts(productcode);
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
});

const message = [];

io.on("connection", (socket) => {
  console.log(`User ${socket.id} Connection`);

  //Nombre del usuario
  let userName = "";
  // Mesaje de Coneccion
  socket.on("userConnection", (data) => {
    userName = data.user;
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
  socket.on("userMessage", (data) => {
    message.push({
      id: socket.id,
      info: "message",
      name: userName,
      message: data.message,
      date: new Date().toTimeString(),
    });
    io.sockets.emit("userMessage", message);
  });
  //Mensage Usuario escribiendo
  socket.on("typing", (data) => {
    socket.broadcast.emit("typing", data);
  });
});

// Ruta para agregar un nuevo producto (POST)
app.post("/productos", (req, res) => {
  const datosProducto = req.body; // Obtener datos del cuerpo de la solicitud
  gestion.añadirProducto(datosProducto);

  // Actualizar la lista de productos
  const ArrayProductos = gestion.mostrarProductos();

  // Emitir el evento "listaActualizada" a todos los clientes conectados
  io.emit("listaActualizada", { productos: ArrayProductos });

  // Redirigir al usuario a la página principal con la lista actualizada
  res.redirect('/realtimeproducts');
});

// Ruta para actualizar un campo específico del producto por ID
app.put("/productos/:id", (req, res) => {
  const productoId = parseInt(req.params.id);
  const { campo, nuevoValor } = req.body;

  gestion.actualizarProducto({ productoId, campo, nuevoValor });

  // Actualizar la lista de productos
  const ArrayProductos = gestion.mostrarProductos();

  // Emitir el evento "listaActualizada" a todos los clientes conectados
  io.emit("listaActualizada", { productos: ArrayProductos });

  // Redirigir al usuario a la página principal con la lista actualizada
  res.redirect('/realtimeproducts');
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
  const products = req.body.products || []; // Obtener el array de productos desde el cuerpo de la solicitud
  const nuevoCarrito = gestion.crearNuevoCarrito(products);
  res.json({ message: "Nuevo carrito creado", cart: nuevoCarrito });
});

// Ruta para agregar un porducto a un carrito
app.post("/carts/:id/product/:idProducto", (req, res) => {
  const carritoId = parseInt(req.params.id);
  const productoId = parseInt(req.params.idProducto);

  // Llama al método para agregar el producto al carrito
  gestion.agregarProductoAlCarrito(carritoId, productoId);

  res.json({ message: `Producto con ID ${productoId} agregado al carrito ${carritoId} correctamente.` });
});