import express from 'express';
import { sequelize } from './model/models.js';
import router from './router/router.js';
import cors from 'cors';
import multer from 'multer';
import path from 'path';
import http from 'http';
import { Server } from 'socket.io';

const storageConfig = multer.diskStorage({
  destination: (req, file, cb) =>{
    cb(null, 'public/uploads');
  },
  filename: (req, file, cb) =>{
    cb(null, file.originalname);
  }
});

// const corsOptions = {
//   origin: "http://localhost:3000"
// };

const app = express();

const __dirname = path.resolve();

console.log(__dirname);

app.use(express.static('public'));
// app.use(multer({dest:'public/uploads'}).single('filedata'));
app.use(multer({storage:storageConfig}).single('filedata'));
app.use(cors());
app.use(express.json());
app.use(router);

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST']
  }
});

io.on('connection', (socket) => {
  console.log('a user connected');

  socket.on('message', (message) => {
    message = JSON.parse(message);
    console.log(message);
    io.emit('message', message);
  });
  
  socket.on('disconnect', () => {
    console.log('user disconnected');
  });

  
});

sequelize.sync().then(()=>{
  server.listen(5000, function(){
    console.log('server has been started on port 5000');
  });
}).catch(err=>console.log(err));
