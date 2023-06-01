const PORT = 3001;
const server = require('./app')

server.listen(PORT, () => {
    console.log(`Server raise on port: ${PORT}`)
})