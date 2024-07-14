// socket.js
let io;

module.exports = {
  init: (httpServer) => {
    io = require('socket.io')(httpServer, {
      cors: {
        origin: '*', // Allow all origins or specify your client's origin
        methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'], // Allowed methods
      },
    });
    return io;
  },
  getIO: () => {
    if (!io) {
      throw new Error('Socket.io not initialized!');
    }
    return io;
  },
};
