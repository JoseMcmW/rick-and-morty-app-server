const {Favorites} = require('../DB_connection')

module.exports = async (req, res) => {
    try {
        const { id, name, origin, status, image, species, gender } = req.body;

        if(!name || !origin || !status || !image || !species || !gender ) {
            return res.status(401).send('Faltan datos')
        }

        await Favorites.findOrCreate({where: {id, name, origin, status, image, species, gender}})

        const allFavorites = await Favorites.findAll();

        return res.send(200).json(allFavorites);

    } catch (error) {
        return res.send(500).json(error.message);
    }
}