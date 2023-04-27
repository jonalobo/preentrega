const { Router } = require('express')
const { check } = require('express-validator')

const { agregarProductoControlador, actualizarProductosControlador, obtenerTodosControlador, obtenerPorIdControlador,borrarProductosControlador } = require('../controller/productosControlador')
const { validacion } = require('../helpers/middlewares')

//Enrutador para productos
const rutaProductos = Router()

//Listar todos los productos(público) 
rutaProductos.get('/products',  obtenerTodosControlador)
//Lista el producto por su ID(público)
rutaProductos.get('/products/:id', obtenerPorIdControlador)

//Ruta solo para administradores(administrador)
rutaProductos.post('/products', [
    check('rol', 'Error: -1, ruta productos metodo post no autorizada').isIn(['administrador']),
    validacion
] ,agregarProductoControlador)
//Ruta solo para administradores(administrador)
rutaProductos.put('/:id/products', [
    check('rol', 'Error: -1, ruta productos metodo put no autorizada').isIn(['administrador']),
    validacion
] ,actualizarProductosControlador)
//Ruta solo para administradores(administrador)
rutaProductos.delete('/:id/products', [
    check('rol', 'Error: -1, ruta productos metodo delete no autorizada').isIn(['administrador']),
    validacion
] ,borrarProductosControlador)

module.exports = rutaProductos