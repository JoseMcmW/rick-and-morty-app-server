const { User } = require('../DB_connection');

module.exports = async (req, res) => {
    try {
        const { email, password } = req.query;

        if(!email || !password) return res.send(400).send('Faltan datos');

        const user = await User.findOne({where: {email}})

        if(!user) return res.status(404).send('Usuario no encontrado');

        if(user.password === password){
            return res.json({access: true})
        } else {
            return res.status(403).send('Contraseña incorrecta')
        }

    } catch (error) {
        return res.status(500).send(error.message)
    }
}