const jwt = require('jsonwebtoken')
const knex = require('../database/conection')
require('dotenv').config();


const verifyUser = async (req, res, next) => {
    const {authorization} = req.headers 

    if(!authorization){
        return res.status(401).json({message: 'Não Autorizado'})
    }

    const token = authorization.split(' ')[1]

    try {
        const {id} = jwt.verify(token, process.env.JWT_PASS )

        const user = await knex('users').select('*').where('id', id)

        if(!user) {
            return res.status(404).json({ message: 'Usuário não encontrado'})
        }
        console.log(user)
        req.user = user

        next()
    } catch (error) {
        return res.status(401).json({message: 'Token inválido'})
    }
}

module.exports = verifyUser