const { Favorites } = require('../DB_connection')

module.exports = async (req, res) => {
    try {
        const { id } = req.params;

        await Favorites.destroy({where:{id}})

        const allFavorites = await Favorites.findAll();
        res.json(allFavorites);
    } catch (error) {
        return res.status(500).send(error.message)
    }
}