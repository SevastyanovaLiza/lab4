const { User, Cart } = require("../db/models")
const ApiError = require("../middleware/error/ApiError")
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const genetateJwt = (id, email) => {
    return jwt.sign(
        {id,email}, 
        process.env.SECRET_KEY,
        {expiresIn: '24h'}
    )
}

class AuthController{
    async registration(req,res,next){
        const {email, password} = req.body
        const check = await User.findOne({where: {email}})
        if(check){
            return next(ApiError.badRequest(`Данная почта уже занята другим пользователем`))
        }


        const hashPassword = await bcrypt.hash(password, 5)
        const user = await User.create({email, password: hashPassword})

        const cart = await Cart.create({userId: user.id})

        const token = genetateJwt(user.id, user.email)
        return res.json({token})
    }

    async login(req,res,next){
        const {email, password} = req.body
        const check = await User.findOne({where : {email}})
        if(!check){
            return next(ApiError.badRequest(`Неверно указана почта`))
        }

        const checkPass = bcrypt.compareSync(password, check.password)
        if(!checkPass){
            return next(ApiError.internal(`Неверный пароль!`))
        }

        const token = genetateJwt(check.id,check.email)
        return res.json({token})
    }

    async check(req,res,next){
        const token = genetateJwt(req.user.id, req.user.email)
        return res.json({token})
    }

}

module.exports = new AuthController()