const {request,response} = require('express')
const {Carrito, leerCarrito, escribirEnCarrito} = require('../helpers/claseCarrito')
const { leer } = require('../helpers/claseProductos')


//Crea el carrito
const crearCarrito = async (req = request,res = response)=>{
    const newCarrito = new Carrito()
    //Al instanciar un carrito debo agregarlo a un array
    /* agregarNuevoCarrito(newCarrito) */
    let demo1 = await newCarrito.nuevoCarrito(newCarrito)
    res.json({msg:`Carrito con el ID # ${demo1} creado`})
}

const listarProductosPorIdCarrito = async (req = request,res = response)=>{
    const {id} = req.params
    let demo2 = await leerCarrito()
    let demo1 = []
    demo2.map((e)=>{
        if (e.id == id) {
            demo1.push(e)
        } 
    })
    //Debo mostrar solo los productos del carrito seleccionado
    //Está condicionado para que muestre un msg si no existe el id
    if (demo1.length > 0) {
        res.json(demo1[0].productos)
    } else {
        res.status(400).json({msg:`El carrito con el Id # ${id} no existe`})
    }
}

const agregarProductoACarrito = async (req = request,res = response)=>{
    const {id} = req.params
    //Acá hago lectura de los productos y envío el id
    let demo1 = await  addProductoId(id)
    //Ahora reviso el carrito e ingreso el producto
    let demo2 = await leerCarrito()
    //Obtengo el carrito y debo acceder a sus productos 
    let arrayCarritoProductos = demo2[0].productos
    //Acá ingreso al arreglo productos
    arrayCarritoProductos.push(demo1)
    //Ahora agrego la modificación al arreglo que va al carrito
    let prodEnCarrito = JSON.stringify(demo2)
    escribirEnCarrito('carrito.txt',prodEnCarrito)

    res.status(201).json(arrayCarritoProductos)
}
const borrarCarritoPorId = async (req = request,res = response)=>{
    const {id} = req.params
    let demo2 = await leerCarrito()
    let demo1 = []
    demo2.map((e)=>{
        if (e.id != id) {
            demo1.push(e)
        }
    })
    escribirEnCarrito('carrito.txt',JSON.stringify(demo1))
    res.json({msg:`El carrito con ID ${id} ha sido eliminado`})
}

//Funciones auxiliares
async function addProductoId(identificador) {
  let demo = { msg: "No existe producto" };
  let productosDesdeFs = await leer();
  productosDesdeFs.map((e) => {
    const numero = e.id;
    if (numero == identificador) {
      demo = e;
    }
  });
  return demo;
}


module.exports = {
    crearCarrito,
    agregarProductoACarrito,
    borrarCarritoPorId,
    listarProductosPorIdCarrito
}