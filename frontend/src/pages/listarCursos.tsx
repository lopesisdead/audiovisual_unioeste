import { useState, useEffect } from 'react';
import { apiCursos } from '../utils/api';
import '../App.css';
import logoUnioeste from '../images/logo_unioeste.png';
import { Pen, Trash } from 'lucide-react';

interface Curso {
    id_curso: number;
    nome_curso: string;
}

function ListarCursos() {
    const [cursos, setCursos] = useState<Curso[]>([]);

    useEffect(() => {
        carregarCursos();
    }, []);

    const carregarCursos = async () => {
        try {
            const response = await apiCursos.get('/');
            setCursos(response.data);
        } catch (error) {
            console.error("Erro ao carregar cursos:", error);
        }
    };

    const excluirCurso = async (id: number) => {
        if (window.confirm('Tem certeza que deseja excluir este curso?')) {
            try {
                await apiCursos.delete(`/${id}`);
                carregarCursos(); // Recarrega a lista após exclusão
                alert('Curso excluído com sucesso!');
            } catch (error) {
                console.error("Erro ao excluir curso:", error);
                alert('Erro ao excluir curso');
            }
        }
    };

    return (
        <div className="App">
            <div className="container">
                <div className="cabecalho">
                    <img src={logoUnioeste} alt="Logo" className="logo" />
                    <h1 className="MainText">Cursos Cadastrados</h1>
                </div>
                
                <div className="lista-container">
                    {cursos.map(curso => (
                        <div key={curso.id_curso} className="lista-item">
                            <div className="item-info">
                                <span className="item-titulo">{curso.nome_curso}</span>
                            </div>
                            <div className="item-acoes">
                            <button className="acao-editar"><Pen size={20} /></button>
                            <button onClick={() => excluirCurso(curso.id_curso)} className="acao-excluir"><Trash size={20} /></button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default ListarCursos;