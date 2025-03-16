import { Router } from "express";
import { CursoCollection } from '../models/cursoModel.js';
import { EntityCurso } from '../models/entityModel.js';
import { verifyToken } from '../middlewares/authMiddleware.js'; // Importando middleware

const router = Router();
const cursoModel = new CursoCollection();

router.get('/', verifyToken, (req, res) => {
    cursoModel.getCurso(req, res);
});

router.get('/:id', verifyToken, (req, res) => {
    const { id } = req.params;
    cursoModel.getCursoByID(req, res, id);
});

router.post('/', verifyToken, (req, res) => {
    const { nome_curso} = req.body;


    if (!nome_curso) {
        return res.status(400).send("O campo 'nome_curso' é obrigatório.");
    }

    // Criando o objeto EntityCurso com os parâmetros na ordem correta
    const sala = new EntityCurso(
        null, // id_curso pode ser null, será gerado automaticamente pelo banco
        nome_curso // nome_curso vem primeiro
    );

    cursoModel.createCurso(req, res, sala);
});


router.put('/:id', verifyToken, (req, res) => {
    const { id } = req.params;
    const { nome_curso} = req.body;

    // Atualizando apenas os campos relevantes (id_curso não pode ser alterado)
    const sala = new EntityCurso(null, nome_curso);
    cursoModel.updateCurso(req, res, id, sala);
});

router.delete('/:id', verifyToken, (req, res) => {
    const { id } = req.params;
    cursoModel.deleteCurso(req, res, id);
});


export default router;