const { Type } = require("../db/models")
const ApiError = require("../middleware/error/ApiError")

class TypeController{
    async getAll(req,res,next){
        const types = await Type.findAll({})
        return res.json(types)
    }
    async getOne(req,res,next){
        const {id} = req.params
        const types = await Type.findOne({where : {id}})

        return res.json(types)
    }
    
    async createType(req,res,next){
        const {name} = req.body

        const check = await Type.findOne({where: {name}})
        if(check){
            return next(ApiError.badRequest(`Данный тип уже создан`))
        }

        const type = await Type.create({name})
        return res.json(type)
    }

}

module.exports = new TypeController()