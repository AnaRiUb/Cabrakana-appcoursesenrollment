import { io, Socket } from 'socket.io-client';

// URL de la API (asegúrate de que la URL del backend esté en la variable de entorno)
const SOCKET_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

// Crear la instancia de socket
const socket: Socket = io(SOCKET_URL, {
  withCredentials: true,
  // Puedes agregar otras opciones de configuración aquí si es necesario
});

export default socket;
