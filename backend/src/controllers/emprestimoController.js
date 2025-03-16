import { Router } from "express";
import { EmprestimoCollection } from '../models/emprestimoModel.js';
import { EntityEmprestimo } from '../models/entityModel.js';
import { verifyToken } from '../middlewares/authMiddleware.js'; // Importando middleware

const router = Router();
const emprestimoModel = new EmprestimoCollection();

router.get("/", verifyToken, (req, res) => {
    emprestimoModel.getEmprestimos(req, res);
});

router.get("/:id", verifyToken, (req, res) => {
    const { id } = req.params;
    emprestimoModel.getEmprestimoByID(req, res, id);
});

router.post("/", verifyToken, (req, res) => {
    const { id_funcionario, id_sala, id_curso, nome_requisitante, email_requisitante, notebook_emprestimo, hdmi_emprestimo, som_emprestimo } = req.body;

    if (!id_funcionario || !id_sala || !id_curso || !nome_requisitante || !email_requisitante) {
        return res.status(400).send("Todos os campos devem ser preenchidos!");
    }

    emprestimoModel.createEmprestimo(req, res, {
        id_funcionario,
        id_sala,
        id_curso,
        nome_requisitante,
        email_requisitante,
        notebook_emprestimo,
        hdmi_emprestimo,
        som_emprestimo
    });
});

router.put("/:id", verifyToken, (req, res) => {
    const { id } = req.params;
    const { id_funcionario, id_sala, id_curso, nome_requisitante, email_requisitante, notebook_emprestimo, hdmi_emprestimo, som_emprestimo } = req.body;

    emprestimoModel.updateEmprestimo(req, res, id, {
        id_funcionario,
        id_sala,
        id_curso,
        nome_requisitante,
        email_requisitante,
        notebook_emprestimo,
        hdmi_emprestimo,
        som_emprestimo
    });
});

router.delete("/:id", verifyToken, (req, res) => {
    const { id } = req.params;
    emprestimoModel.deleteEmprestimo(req, res, id);
});

export default router;