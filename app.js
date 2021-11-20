const express = require("express");
const cors = require("cors");
const socketio = require('socket.io');
const http = require('http');
const app = express();

const corsOptions = {
    origin: [
        'http://localhost:8080',
        'http://localhost:8081',
        'http://localhost:3000',
    ],
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS",
    preflightContinue: false,
    optionsSuccessStatus: 204,
    allowedHeaders: "Content-Type, Option, Authorization, X-Session-Id",
    credentials: true
};

app.use(cors(corsOptions));
app.enable('trust proxy');
app.use(express.json());
app.use(express.urlencoded({
    extended: true
}));

app.get('/', (req, res) => {
    return res.send('<h1>Deploy</h1>');
});

app.post('/', (req, res) => {
    io.emit('messages', JSON.stringify(req.body));
    return res.status(200).send(req.body)
})

app.get('/socket', (req, res) => {
    return res.sendFile(__dirname + '/index.html');
});

const server = http.createServer(app);
const io = socketio(server, {
    cors: {
        origin: [
            'http://localhost:8080',
            'http://localhost:8081',
            'http://localhost:3000',
        ]
    }
})

io.on('connection', (socket) => {
    console.log('User Connected');
    socket.on('messages', (msg) => {
        console.log('messages: ' + msg);
        io.emit('messages', msg);
    });

    socket.on('disconnect', () => {
        console.log('User ' + ' Disconnected');
    });

});

const PORT = process.env.PORT || 8080;

server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});