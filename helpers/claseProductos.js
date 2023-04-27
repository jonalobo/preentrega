const fs = require("fs");

const productos = [];

class Producto {
  constructor(title, description, code, price, thumbnail, stock) {
    this.id = productos.length + 1,
      this.title = title,
      this.description = description,
      this.code = code,
      this.price = price,
      this.thumbnail = thumbnail,
      this.stock = stock;
  }
  async agregarProducto() {
    const productoAgregar = {
      id: this.id,
      fecha: this.fecha,
      title: this.title,
      description: this.description,
      code: this.code,
      price: this.price,
      thumbnail: this.thumbnail,
      stock: this.stock,
    };
    //Debo leer la persistencia para que el actualizar y borrar tengan efecto
    let prueba = await leer()
    if (prueba.length > 0) {
      const prueba3 = prueba.slice(-1)
      productoAgregar.id = prueba3[0].id + 1
      prueba.push(productoAgregar)
      const productoTexto = JSON.stringify(prueba)
      escribir("productos.txt", productoTexto)
    } else {
      productos.push(productoAgregar)
      const productoTexto = JSON.stringify(productos);
      escribir("productos.txt", productoTexto)
    }
    /* if (prueba.length == 0) {
      productos.push(productoAgregar);
      const productoTexto = JSON.stringify(productos);
      escribir("productos.txt", productoTexto)
    } else {
      prueba.push(productoAgregar)
      const productoTexto = JSON.stringify(prueba);
      escribir("productos.txt", productoTexto)
    } */
    /* productos.push(prueba)
    await escribir('productos.txt',JSON.stringify(productos)) */
    /* productos.push(productoAgregar);
    const productoTexto = JSON.stringify(productos);
    escribir("productos.txt", productoTexto); */
  }
}

async function leer() {
  //Este contenedor debe estar fuera del try catch para evitar bucles
  let contenedorProducto = [];
  try {
    await fs.promises.readFile("productos.txt", "utf-8").then((contenido) => {
      contenedorProducto = JSON.parse(contenido);
    });
  } catch (error) {
    console.log(error);
  }
  return contenedorProducto;
}

async function buscarProductoId(identificador) {
  let demo = { msg: "No existe el ID" };
  let productosDesdeFs = await leer();
  productosDesdeFs.map((e) => {
    const numero = e.id;
    if (numero == identificador) {
      demo = e;
    }
  });
  return demo;
}

async function escribir(title, producto) {
  try {
    await fs.promises.writeFile(title, producto);
  } catch (error) {
    console.log(error);
  }
}



module.exports = {
  productos,
  Producto,
  leer,
  escribir,
  buscarProductoId
};
