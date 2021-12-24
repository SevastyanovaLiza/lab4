const { Cart, Device, CartDevice } = require("../db/models")

class CartController {
    async getCart (req,res,next){
        const {id} = req.user

        const getCart = await Cart.findOne({where: {userId : id}})

        const cart = await CartDevice.findAll({include: {
            model: Device
        },where: {cartId : getCart.id}})
        return res.json(cart)
    }

    async addDeviceToCart(req,res,next){
        const id = req.user.id
        const {deviceId} = req.body

        const getCart = await Cart.findOne({where: {id}})

        const cart = await CartDevice.create({cartId: getCart.id, deviceId})

        return res.json(cart)
    }

    async deleteDeviceFromCart(req,res,next){
        const user = req.user
        const {id} = req.params

        const dropCart = await CartDevice.destroy({where: {id : id}})

        return res.json(dropCart)
    }

}

module.exports = new CartController()