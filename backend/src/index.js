import express from 'express';
import cookieParser from "cookie-parser";
import cors from "cors"

import emprestimoController from './controllers/emprestimoController.js';
import salaController from './controllers/salaController.js';
import cursoController from './controllers/cursoController.js';
import funcionarioController from './controllers/funcionarioController.js';


const server = express();
const PORT = 3000

server.use(express.urlencoded({extended:true}));
server.use(express.json());
server.use(cookieParser());

server.use(
    cors({
      origin: "http://localhost:5173", // Certifique-se de que essa URL está correta
      credentials: true, // Permite envio de cookies nas requisições
    })
);

server.use("/emprestimos", emprestimoController)
server.use("/salas", salaController)
server.use("/cursos", cursoController)
server.use("/funcionarios", funcionarioController)

server.listen(PORT, () => console.log("Rodando na porta",PORT)) //Inicia o servidor na porta 3000