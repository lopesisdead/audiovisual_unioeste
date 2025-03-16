import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import CriarEmprestimo from "../pages/criarEmprestimo";
import CriarSala from "../pages/criarSala";
import CriarCurso from "../pages/criarCurso";
import CriarFuncionario from "../pages/criarFuncionario";
import AutenticarFuncionario from "../pages/autenticarFuncionario";
import ListarEmprestimos from "../pages/listarEmprestimos";
import ListarEmprestimosDevolvidos from "../pages/listarEmprestimosDevolvidos";
import ListarFuncionarios from "../pages/listarFuncionarios";
import ListarCursos from "../pages/listarCursos";
import ListarSalas from "../pages/listarSalas";



const AppRoutes = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<AutenticarFuncionario />} />
                <Route path="/criar-emprestimo" element={<CriarEmprestimo />} />
                <Route path="/criar-sala" element={<CriarSala />} />
                <Route path="/criar-curso" element={<CriarCurso />} />
                <Route path="/criar-funcionario" element={<CriarFuncionario />} />
                <Route path="/listar-emprestimos" element={<ListarEmprestimos />} />
                <Route path="/listar-emprestimos-devolvidos" element={<ListarEmprestimosDevolvidos />} />
                <Route path="/listar-funcionarios" element={<ListarFuncionarios />} />
                <Route path="/listar-cursos" element={<ListarCursos />} />
                <Route path="/listar-salas" element={<ListarSalas />} />

            </Routes>
        </Router>
    );
};

export default AppRoutes;