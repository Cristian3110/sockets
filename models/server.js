/**************************************************
 * Declarando nuestro servidor a traves de Clases
 ***********************************************/

require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { socketController } = require('../sockets/controller');

const port = process.env.PORT;

class Server {
	constructor() {
		this.app = express();
		this.port = port;
		// from socket.io
		this.server = require('http').createServer(this.app);
		this.io = require('socket.io')(this.server);

		this.path = {};
		// this.usuariosPath = '/api/usuarios';

		// Middlewares
		this.middlewares();

		//Rutas de mi aplicacion
		this.routes();

		// Sockets
		this.sockets();
	}

	middlewares() {
		// CORS configuration
		this.app.use(cors());

		//Directorio público (Recordar que es el primero que toma por defecto ya q tiene el index.html)
		this.app.use(express.static('public'));
	}

	routes() {
		// this.app.use(this.path.auth, require('../routes/auth'));
	}

	// configuración de socket.io
	sockets() {
		this.io.on('connection', socketController);
	}

	listen() {
		// se inicializa con el server ya q estamos utilizando sockets ver referencia up
		this.server.listen(port, () => {
			console.log('Servidor corriendo en el puerto:', port);
		});
	}
}

module.exports = Server;
