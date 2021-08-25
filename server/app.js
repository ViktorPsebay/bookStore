import express from 'express';
import { sequelize } from './model/models.js';
import router from './router/router.js';
import cors from 'cors';
import multer from 'multer';
import path from 'path';

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


sequelize.sync().then(()=>{
  app.listen(5000, function(){
    console.log('server has been started on port 5000');
  });
}).catch(err=>console.log(err));
