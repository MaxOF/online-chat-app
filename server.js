const express = require('express')
const {Server} = require("socket.io");
const app = express()
const http = require('http')
const cors = require('cors')

const server = http.createServer(app)
const io = new Server(server, {cors: {origin: '*'}})

const PORT = 7542

app.use(express.json())

const rooms = new Map([])
app.use(cors({
    origin: `http://localhost:${PORT}`
}))
app.use(express.urlencoded({extended: true}))


app.get('/rooms/:id', (req, res) => {
    const roomId = req.params.id
    console.log(roomId)
    const obj = rooms.has(roomId)
        ? {
            users: [...rooms.get(roomId).get('users').values()],
            messages: [...rooms.get(roomId).get('messages').values()]
        }
        : {users: [], messages: []}
    res.json(obj)
})
app.post('/rooms', (req, res) => {
    const {roomId, userName} = req.body
    if (!rooms.has(roomId)) {
        rooms.set(roomId, new Map([
            ['users', new Map()],
            ['messages', []]
        ]))
    }
    res.send()
})
io.on('connection', (socket => {
    socket.on('ROOM:JOIN', ({roomId, userName}) => {
        socket.join(roomId)
        rooms.get(roomId).get('users').set(socket.id, userName)
        const users = [...rooms.get(roomId).get('users').values()]
        socket.to(roomId).emit('ROOM:SET-USERS', users)
    })
    socket.on('ROOM:NEW-MESSAGE', ({roomId, userName, text}) => {
        const obj = {
            userName,
            text
        }
        rooms.get(roomId).get('messages').push(obj)
        socket.to(roomId).emit('ROOM:NEW-MESSAGE', obj)
    })
    socket.on('disconnect', () => {
        rooms.forEach((value, roomId) => {
            if (value.get('users').delete(socket.id)) {
                const users = [...value.get('users').values()]
                socket.broadcast.to(roomId).emit('ROOM:SET-USERS', users)
            }
        })
    })

    console.log('user connected', socket.id)
}))

server.listen(PORT, (err) => {
    if (err) {
        throw Error(err)
    }
    console.log(`Server has been started on port ${PORT} ...`)
})
