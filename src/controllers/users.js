const knex = require ('../database/conection');
const bcrypt = require ('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();


const registerUser = async (req, res) => {
    const { name, email, password } = req.body

    if (!name || !email || !password) {
        return res.status(404).json({ message: 'Todos os campos são obrigatórios' });
    }
   try{
        const encryptedPassword = await bcrypt.hash(password, 10)
        const user = await knex('users').insert({name, email, password: encryptedPassword}).returning('*');
        return res.status(201).json(user[0])
   } catch (error){
        return res.status(500).json({message: error.message})
   }
}   

const loginUser = async (req, res) =>{


    const {email, password} = req.body
    console.log(email,password); 

    if (!email || !password) {
        return res.status(404).json({ message: 'Todos os campos são obrigatórios' });
    }

    try {
        const  user = await knex('users').select('id', 'email', 'password').where('email', email)

        if( user.length < 1) {
            return res.status(400).json({ message: 'Email e/ou senha incorretos' });
        }
        
        const confirmPassword = await bcrypt.compare(password, user[0].password)
       
        if(!confirmPassword) {
            return res.status(400).json({ message: 'Email e/ou senha incorretos' });
        }

        const token = jwt.sign({id: user[0].id}, process.env.JWT_PASS , {expiresIn: '8h',})
        
        const {password: _ , ... loggedInUser} = user[0]
        return res.status(200).json({ user: loggedInUser, token });
    } catch (error) {
        return res.status(500).json({message: 'Erro ao logar o usuário'})
    }


}

const logAcess = async (req, res) => {
    const {email} = req.body;
    console.log(email);
    

    try { const user = await knex('acessos')
        .insert({
          email,
          data_hora: knex.fn.now()
        })

        return res.status(200).json({message: 'registro adicionado'});
         
    }

    catch(error) {
        return res.status(500).json({message: 'Erro ao registrar log'})
    }
 
}




module.exports = {
    registerUser,
    loginUser,
    logAcess
}