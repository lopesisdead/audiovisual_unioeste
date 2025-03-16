import { Router } from "express";
import { SalaCollection } from '../models/salaModel.js';
import { EntitySala } from '../models/entityModel.js';
import { verifyToken } from '../middlewares/authMiddleware.js'; // Importando middleware

const router = Router();
const salaModel = new SalaCollection();

router.get('/', verifyToken, (req, res) => {
    salaModel.getSala(req, res);
});

router.get('/:id', verifyToken, (req, res) => {
    const { id } = req.params;
    salaModel.getSalasByID(req, res, id);
});

router.post('/', verifyToken, (req, res) => {
    const { nome_sala } = req.body;

    if (!nome_sala) {
        return res.status(400).send("O campo 'nome_sala' é obrigatório.");
    }

    const sala = new EntitySala(null, nome_sala);
    salaModel.createSala(req, res, sala);
});

router.put('/:id', verifyToken, (req, res) => {
    const { id } = req.params;
    const { nome_sala } = req.body;

    const sala = new EntitySala(null, nome_sala);
    salaModel.updateSala(req, res, id, sala);
});

router.delete('/:id', verifyToken, (req, res) => {
    const { id } = req.params;
    salaModel.deleteSala(req, res, id);
});

export default router;