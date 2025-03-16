import { useState, useEffect } from 'react';
import { apiFuncionarios } from '../utils/api';
import '../App.css';
import logoUnioeste from '../images/logo_unioeste.png';
import { Pen, Trash } from 'lucide-react';

interface Funcionario {
    id_funcionario: number;
    nome_funcionario: string;
    email_funcionario: string;
}

function ListarFuncionarios() {
    const [funcionarios, setFuncionarios] = useState<Funcionario[]>([]);

    useEffect(() => {
        carregarFuncionarios();
    }, []);

    const carregarFuncionarios = async () => {
        try {
            const response = await apiFuncionarios.get('/');
            setFuncionarios(response.data);
        } catch (error) {
            console.error("Erro ao carregar funcionários:", error);
        }
    };

    return (
        <div className="App">
            <div className="container">
                <div className="cabecalho">
                    <img src={logoUnioeste} alt="Logo" className="logo" />
                    <h1 className="MainText">Funcionários Cadastrados</h1>
                </div>
                
                <div className="lista-container-funcionarios">
                    {funcionarios.map(funcionario => (
                        <div key={funcionario.id_funcionario} className="funcionario-card">
                            <div className="funcionario-info">
                                <div className="funcionario-detalhes">
                                    <span className="funcionario-nome">{funcionario.nome_funcionario}</span>
                                    <span className="funcionario-email">{funcionario.email_funcionario}</span>
                                </div>
                                
                                <div className="funcionario-acoes">
                                    <button className="btn-editar">
                                        <Pen size={20} />
                                    </button>
                                    <button className="btn-excluir">
                                        <Trash size={20} />
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default ListarFuncionarios;