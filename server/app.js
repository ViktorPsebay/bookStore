import express from 'express';
import { sequelize } from './models/models.js';
import router from './router/router.js';
import cors from 'cors';

const app = express();

app.use(cors());
app.use(express.json());
app.use(router);

sequelize.sync().then(()=>{
  app.listen(5000, function(){
    console.log('server has been started on port 5000');
  });
}).catch(err=>console.log(err));
