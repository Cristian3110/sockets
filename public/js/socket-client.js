/**
 * Archivo en comunicación con el server de websocket
 */
// console.log('Hello world with websockets');

// Referencia del HTML
const msgOnline = document.querySelector('#msgOnline');
const msgOffline = document.querySelector('#msgOffline');

const txtMensaje = document.querySelector('#txtMensaje');
const btnEnviar = document.querySelector('#btnEnviar');

// configuración de conección del frontEnd
const socket = io();

// para escuchar eventos desde front
socket.on('connect', () => {
	// console.log('connect');
	msgOffline.style.display = 'none';
	msgOnline.style.display = '';
});

socket.on('disconnect', () => {
	// console.log('Server Disconnect');
	msgOnline.style.display = 'none';
	msgOffline.style.display = '';
});

socket.on('enviar-msj', (payload) => {
	console.log(payload);
});

btnEnviar.addEventListener('click', () => {
	const mensaje = txtMensaje.value;
	const payload = {
		msg: mensaje,
		id: 'AXjste5874gTTmcs',
		fecha: new Date().getTime(),
	};
	console.log(mensaje);
	//enviando msj al server
	socket.emit('enviar-msj', payload, (id) => {
		console.log('Desde el server:', id);
	});
});
