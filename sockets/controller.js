/**
 * El controlador de nuestro código del socket
 */

const socketController = (socket) => {
	console.log('Cliente Conectado', socket.id);

	socket.on('disconnect', () => {
		console.log('Cliente Desconectado', socket.id);
	});

	//recibiendo evento desde el front para acá
	//Recuerden que el payload es lo q está en el request del front
	socket.on('enviar-msj', (payload, callback) => {
		// console.log('Enviando msj desde el server');
		// console.log(payload);
		// this.io.emit('enviar-msj', payload);
		const id = 123456789;
		callback(id);
		socket.broadcast.emit('enviar-msj', payload);
	});
};

module.exports = { socketController };
