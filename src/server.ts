import express from 'express';
import connectDB from './config/database';
import storeRoutes from '../src/routes/storeRoutes';
import errorHandler  from './middlewares/errorHandler';
import loggerMiddleware from './middlewares/middlewareLogger';
import errorRouterHandler from './middlewares/errorRouterHandler'
import { setupSwagger } from './config/swagger';




connectDB();
const server = express();
const PORT = process.env.PORT || 5000;

server.use(express.json());

server.use(loggerMiddleware);

setupSwagger(server);

server.use('/api', storeRoutes);

server.use(errorRouterHandler)
server.use(errorHandler);



server.listen(PORT, ()=>{
    console.log('Servidor inicializado na porta 5000');
});