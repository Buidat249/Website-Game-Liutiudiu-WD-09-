import { Server } from 'socket.io';
import serverEvents from './serverEvents/index.js';
import socketEvents from './socketEvents/index.js';

export default (options = {}) => ({
  name: 'socket.io',
  configureServer(server) {
    // initiate default options
    const defaults = { serverEvents, socketEvents }

    // merge defaults with options
    options = Object.assign(defaults, options);

    // create io server with CORS configuration
    const io = new Server(server.httpServer, {
      cors: {
        origin: "*",  // Cho phép tất cả các domain
        methods: ["GET", "POST"],  // Chỉ cho phép các phương thức GET và POST
        allowedHeaders: ["Content-Type"],  // Cấu hình các header được phép
        credentials: true  // Nếu cần cookie, credentials phải được thiết lập là true
      }
    });

    // pass io server to serverEvents
    options.serverEvents(io, options.socketEvents);
  }
})
