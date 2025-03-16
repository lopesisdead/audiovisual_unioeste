import { Router } from "express";
import { FuncionarioCollection } from '../models/funcionarioModel.js';
import { EntityFuncionario } from '../models/entityModel.js';
import { verifyToken } from '../middlewares/authMiddleware.js'; // Importando middleware

const router = Router();
const funcionarioModel = new FuncionarioCollection();

router.get('/', verifyToken, (req, res) => {
    funcionarioModel.getFuncionarios(req, res);
});

/*
router.get('/:id', verifyToken, (req, res) => {
    const { id } = req.params;
    funcionarioModel.getFuncionarioByID(req, res, id);
});
*/

router.post('/', verifyToken, (req, res) => {
    const { email_funcionario, senha_funcionario, nome_funcionario, celular_funcionario } = req.body;


    if (!email_funcionario) {
        return res.status(400).send("O campo 'email_funcionario' é obrigatório.");
    }

    // Criando o objeto EntityFuncionario com os parâmetros na ordem correta
    const funcionario = new EntityFuncionario(
        null, // id_funcionario pode ser null, será gerado automaticamente pelo banco
        email_funcionario, // email_funcionario vem primeiro
        senha_funcionario, 
        nome_funcionario, 
        celular_funcionario
    );

    funcionarioModel.createFuncionario(req, res, funcionario);
});

router.post('/login', (req, res) => {
    funcionarioModel.loginFuncionario(req, res);
});

router.post('/logout', verifyToken, (req, res) => {
    funcionarioModel.logoutFuncionario(req, res);
});

router.get('/usuario-logado', verifyToken, (req, res) => {
    try {
        const { id, email } = req.user; // Pegando os dados do usuário do middleware
        res.json({ id_funcionario: id, email });
    } catch (error) {
        console.error("Erro ao obter usuário logado:", error);
        return res.status(500).json({ message: "Erro interno no servidor." });
    }
});


router.put('/:id', verifyToken, (req, res) => {
    const { id } = req.params;
    const { email_funcionario, senha_funcionario, nome_funcionario, celular_funcionario } = req.body;

    // Atualizando apenas os campos relevantes (id_funcionario não pode ser alterado)
    const funcionario = new EntityFuncionario(null, email_funcionario, senha_funcionario, nome_funcionario, celular_funcionario);
    funcionarioModel.updateFuncionario(req, res, id, funcionario);
});

router.delete('/:id', verifyToken, (req, res) => {
    const { id } = req.params;
    funcionarioModel.deleteFuncionario(req, res, id);
});


export default router;