const express = require('express')
const {Server} = require("socket.io");
const app = express()
const http = require('http')
const cors = require('cors')

const server = http.createServer(app)
const io = new Server(server, {cors: {origin: '*'}})

const PORT = 7542

const rooms = new Map([

])
app.use(cors({
    origin: "http://localhost:7542"
}))
app.get('/users', (req, res) => {
    res.json(rooms)
})
io.on('connection', (socket => {
    console.log('user connected', socket.id)
}))

server.listen(PORT, (err) => {
    if(err) {
        throw Error(err)
    }
    console.log(`Server has been started on port ${PORT} ...`)
})
