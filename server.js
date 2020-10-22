const express = require('express');
const app = express();
const server = require('http').Server(app)

const config = require('./config')

const cors = require('cors')
const bodyParser = require('body-parser')
const socket = require ('./socket')
const url = require('./db')
const router = require ('./network/routes')

url(config.dbURL)

app.use (cors())
// AÑAIDENDO EL ROUTER A LA APLICACION EXPRESS
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:false}))

socket.connect(server)
//app.use(router)

router(app)
// app.use('/', function (req, res){
//     res.send('Hola');
// });
app.use(config.publicRoute, express.static('public'))

server.listen(config.port, function(){
    console.log('La aplicacion está escuchando en '+ config.host +':'+ config.port)
});
