const { Device, Width, Height, Forma } = require("../db/models");
const ApiError = require("../middleware/error/ApiError");


const checkProduct = async (Scheme, size, info) => {
    const devices = await Scheme.findOne({where : {size}})
    if(devices){
        return true
    }
}

class DeviceController{
    async getAll(req,res,next){
        let {typeId, widthId, heightId} = req.query

        let devices;

        // All
        if(!typeId && !widthId && !heightId){
            devices = await Device.findAll({})
        }
        if(typeId && widthId && heightId){
            devices = await Device.findAll({where : {typeId, widthId, heightId}})
        }

        // 1 from all
        if(typeId && !widthId && !heightId){
            devices = await Device.findAll({where: {typeId}})
        }
        if(!typeId && widthId && !heightId){
            devices = await Device.findAll({where: {widthId}})
        }
        if(!typeId && !widthId && heightId){
            devices = await Device.findAll({where: {heightId}})
        }

        // 2 from all
        if(typeId && widthId && !heightId){
            devices = await Device.findAll({where: {typeId, widthId}})
        }
        if(typeId && !widthId && heightId){
            devices = await Device.findAll({where: {typeId, heightId}})
        }
        if(!typeId && widthId && heightId){
            devices = await Device.findAll({where: {widthId, heightId}})
        }

        return res.json(devices)
    }
    async getOne(req,res,next){
        const {id} = req.params
        const device = await Device.findOne({include: [{
            model: Width,
        }, {
            model: Height,
        }],where : {id}})

        return res.json(device)
    }


    async createDevice(req,res,next){
        const {name, price, width, height ,typeId} = req.body

        const checkWidth = await Width.findOne({where : {size : width}})
        const checkHeight = await Height.findOne({where : {size : height}})

        const device = await Device.create({name, price, widthId : checkWidth.id, heightId: checkHeight.id, typeId})
        
        return res.json(device)
    }


    async getWidth (req,res,next){
        const devices = await Width.findAll()
        return res.json(devices)
    }
    async getHeight (req,res,next){
        const devices = await Height.findAll()
        return res.json(devices)
    }

    async getForma(req,res,next){
        const devices = await Forma.findAll()
        return res.json(devices)
    }


    async createWidth(req,res,next){
        const {size} = req.body

        const devices = await Width.findOne({where : {size}})
        if(devices){
            return next(ApiError.badRequest(`Данная ширина была уже создана`))
        }

        const create = await Width.create({size})
        return res.json(create)
    }

    async createHeight(req,res,next){
        const {size} = req.body

        const devices = await Height.findOne({where : {size}})
        if(devices){
            return next(ApiError.badRequest(`Данная высота была уже создана`))
        }

        const create = await Height.create({size})
        return res.json(create)
    }

    async createForma(req,res,next){
        const {name} = req.body 
        const devices = await Forma.findOne({where : {name}})
        if(devices){
            return next(ApiError.badRequest(`Данная форма уже создана!`))
        }

        const create = await Forma.create({name})
        return res.json(create)
    }

}

module.exports = new DeviceController()