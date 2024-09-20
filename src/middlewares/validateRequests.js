const knex = require('../database/conection')

const verifyValidEmail = async (req, res, next) => {
    const {email} = req.body
    console.log(email);

    try {    
        const isValidEmail = await knex('emailspermitidos').where('email', email);
        console.log(isValidEmail)
        // if(singleEmail.length > 0){
        //     const singleEmail =  await knex('users').where('email', email);
            if (isValidEmail.length > 0) {
                return next();
            }
        //     return res.status(400).json({ message: 'Email já cadastrado' });   
        //    }  
        return res.status(400).json({ message: 'Email não permitido' });   
    } catch (error) {
        return  res.status(400).json({ message: 'Erro ao verificar o e-mail' })
    }
 
}


const emailExists = async (req, res, next) => {
    const {email} = req.body;
    try {    
        const isValidEmail = await knex('users').where('email', email);
        console.log(isValidEmail)
        // if(singleEmail.length > 0){
        //     const singleEmail =  await knex('users').where('email', email);
            if (isValidEmail.length < 1) {
                return next();
            }
        //     return res.status(400).json({ message: 'Email já cadastrado' });   
        //    }  
        return res.status(400).json({ message: 'Email já cadastrado' });   
    } catch (error) {
        return  res.status(400).json({ message: 'Erro ao verificar o e-mail' })
    }
 
}


module.exports = {
    verifyValidEmail,
    emailExists
}