const userName = document.querySelector(".userName");
const socket = io();
let nameUser = "";
const listaproductos = document.querySelector(".listaproductos");

Swal.fire({
  title: "Ingrese su Nombre",
  input: "text",
  inputAttributes: {
    autocapitalize: "on",
  },
  showCancelButton: false,
  confirmButtonText: "Ingesar",
}).then((result) => {
  userName.textContent = result.value;
  nameUser = result.value;
  socket.emit("userConnection", {
    user: result.value,
  });
});

const chatMessage = document.querySelector(".chatMessage");
let idUser = "";
const messageInnerHTML = (data) => {
  let message = "";

  for (let i = 0; i < data.length; i++) {
    if (data[i].info === "connection") {
      message += `<p class="connection">${data[i].message}</p>`;
    }
    if (data[i].info === "message") {
      message += `
        <div class="messageUser">
            <h5>${data[i].name}</h5>
            <p>${data[i].message}</p>
        </div>
        `;
    }
  }

  return message;
};

socket.on("listaActualizada", (productos) => {
  console.log("Productos actualizados:", productos);

  if (listaproductos) {
      renderizarProductos(productos);
  } else {
      console.error("El elemento .listaproductos no se encontró en el DOM");
  }
});

function renderizarProductos(data) {
  // Obtener el array de productos del objeto data
  const productos = data.productos;

  // Limpiar la lista antes de agregar los nuevos productos
  listaproductos.innerHTML = "";

  // Iterar sobre los productos y agregarlos a la lista
  productos.forEach(producto => {
      const li = document.createElement("li");
      li.innerHTML = `
          <h2>${producto.titulo}</h2>
          <p>${producto.descripcion}</p>
          <p>Código: ${producto.code}</p>
          <p>Precio: $${producto.precio}</p>
          <p>Estado: ${producto.estado}</p>
          <p>Cantidad: ${producto.cantidad}</p>
          <p>Categoría: ${producto.categoria}</p>
          <img src="${producto.imagen}" alt="${producto.titulo}">
      `;
      listaproductos.appendChild(li);
  });
}

socket.on("userConnection", (data) => {
  chatMessage.innerHTML = "";
  const connection = messageInnerHTML(data);
  chatMessage.innerHTML = connection;
});

const inputMessage = document.getElementById("inputMessage");
const btnMessage = document.getElementById("btnMessage");

btnMessage.addEventListener("click", (e) => {
  e.preventDefault();
  socket.emit("userMessage", {
    message: inputMessage.value,
  });
});

socket.on("userMessage", (data) => {
  chatMessage.innerHTML = "";
  const message = messageInnerHTML(data);
  chatMessage.innerHTML = message;
});

inputMessage.addEventListener("keypress", () => {
  socket.emit("typing", { nameUser });
});

const typing = document.querySelector(".typing");
socket.on("typing", (data) => {
  typing.textContent = `${data.nameUser} escribiendo...`;
});