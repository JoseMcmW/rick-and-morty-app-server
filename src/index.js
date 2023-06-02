const PORT = 3001;
const server = require('./app')
const { conn } = require('./DB_connection');

conn.sync({force: true})
server.listen(PORT, () => {
    console.log(`Server raise on port: ${PORT}`)
})