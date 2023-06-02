const URL = "https://rickandmortyapi.com/api/character";
const axios = require('axios');

const getCharById = async (req, res) => {
    try {
        const { id } = req.params;
        const { data } = await axios.get(`${URL}/${id}`);
        const { status, name, species, origin, image, gender } = data;

        if(!name) throw new Error(`Character ${name} - ID: ${id} Not found.`)

            const character = {
                id,
                name,
                species,
                origin,
                image,
                gender,
                status
            }
            return res.status(200).json(character)
    } catch (error) {
        res.status(error.status || 500).send({ error: error.response.data.error })
    }
}

module.exports = {
    getCharById
}

















/* const axios = require("axios");

const getCharById = (res, id) => {
    axios(`https://rickandmortyapi.com/api/character/${id}`)
    .then(result => result.data)
    .then(data => {
        let character = {
            id: data.id,
            name: data.name,
            gender: data.gender,
            species: data.species,
            origin: data.origin.name,
            image: data.image,
            status: data.status
        }
        res.writeHead(200, {"Content-type": "application/json"})
        .end(JSON.stringify(character))
    })
    .catch(error => {
        res.writeHead(500, {"Content-type": "text/plain"})
        .end(error,`El personaje con el id: ${id} no fue encontrado`)
    })
}

module.exports = {
    getCharById
} */