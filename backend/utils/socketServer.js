import { Server } from 'socket.io';

let io;

export function initSocket(server) {
  io = new Server(server, {
    cors: {
      origin: process.env.CLIENT_URL,
      credentials: true
    }
  });
  io.on('connection', (socket) => {
    console.log(`Socket connected: ${socket.id}`);
  });
  return io;
}

export function getIO() {
  if (!io) {
    throw new Error('Socket.io not initialized! Call initSocket(server) in index.js');
  }
  return io;
}
