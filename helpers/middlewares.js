const { validationResult } = require('express-validator')
const {request,response} = require('express')

const validacion = (req = request,res = response, next)=>{
    const result = validationResult(req)

    if (!result.isEmpty()) {
        return res.status(400).json(result.errors)
    }

    next()
}

module.exports = {
    validacion
}
