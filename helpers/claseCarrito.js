const fs = require("fs");
const moment = require("moment");

const { leer } = require("../helpers/claseProductos");

let productosCarrito = '';
const carritos = []

class Carrito {
  constructor() {
    (this.id = carritos.length + 1),
    (this.fecha = moment().format()),
    (this.productos = [])
  }
  async nuevoCarrito(arreglo){
    
    let productosEnFs = await leerCarrito()
    if (productosEnFs.length > 0) {
      const prueba1 = productosEnFs.slice(-1)
      arreglo.id = prueba1[0].id + 1
      productosEnFs.push(arreglo)
      let prodEnCarrito = JSON.stringify(productosEnFs)
      escribirEnCarrito('carrito.txt',prodEnCarrito)
      return arreglo.id
    } 
    if (productosEnFs.length == 0) {
      productosEnFs.push(arreglo)
      let prodEnCarrito = JSON.stringify(productosEnFs)
      escribirEnCarrito('carrito.txt',prodEnCarrito)
      return arreglo.id
    }
    
    /* productosCarrito = arreglo
    return arreglo */
  }
  /* async agregarProductoACarrito (id){
        let productosEnFs = await leer()
        productosEnFs.map((e)=>{
            if (e.id == id) {
                this.productos.push(e)
            }
        })
        let prodEnCarrito = JSON.stringify(this.productos)
        escribirEnCarrito('carrito.txt',prodEnCarrito)
    } */
}

async function leerCarrito() {
  //Este contenedor debe estar fuera del try catch para evitar bucles
  let contenedorProducto = [];
  try {
    await fs.promises.readFile("carrito.txt", "utf-8").then((contenido) => {
      contenedorProducto = JSON.parse(contenido);
    });
  } catch (error) {
    console.log(error);
  }
  return contenedorProducto;
}

/* async function agregarNuevoCarrito(carrito) {
    carritos.push(carrito)
    console.log(carritos)
    return carritos
} */

async function escribirEnCarrito(nombre, producto) {
  try {
    await fs.promises.writeFile(nombre, producto);
  } catch (error) {
    console.log(error);
  }
}

module.exports = {
  Carrito,
  escribirEnCarrito,
  leerCarrito
};
