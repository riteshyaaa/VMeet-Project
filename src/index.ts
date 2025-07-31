import express from 'express';
import { createServer } from 'http';
import serverConfig from './config/serverConfig';
import { Server } from 'socket.io';
import cors from 'cors';

const app = express();
app.use(cors());

const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST'],
  },
});

io.on('connection', (socket) => {
  console.log('A user connected with ID:', socket.id);
  socket.on('disconnect', () => {
    console.log('User disconnected with ID:', socket.id);
  });
});
server.listen(serverConfig.PORT, () => {
  console.log(`Server is running on http://localhost:${serverConfig.PORT}`);
});
