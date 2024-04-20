import express from 'express';
import { init } from './db/init.js';
import { routes } from './controllers/taskController.js';
import cors from "cors"
const server = express();
const PORT = 3000

init();

server.use(express.urlencoded({extended:true}));
server.use(cors());
server.use(express.json());
server.use(routes)
server.listen(PORT, () => console.log("Rodando na porta",PORT)) //Inicia o servidor na porta 3000


