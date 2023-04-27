const { Router } = require('express')
const { crearCarrito,agregarProductoACarrito,borrarCarritoPorId, listarProductosPorIdCarrito } = require('../controller/carritoControlador')

const rutaCarrito = Router()


//Ruta para obtener productos según el carrito elegido
rutaCarrito.get('/carrito/:id/products',listarProductosPorIdCarrito)

//Ruta para crear un nuevo carrito
rutaCarrito.post('/carrito',crearCarrito)

//Ruta para agregar un producto según su id al carrito
rutaCarrito.post('/carrito/:id/products',agregarProductoACarrito)

//Ruta para eliminar un carrito
rutaCarrito.delete('/carrito/:id',borrarCarritoPorId)

module.exports = rutaCarrito