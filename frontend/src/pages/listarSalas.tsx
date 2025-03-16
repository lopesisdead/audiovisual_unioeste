import { useState, useEffect } from 'react';
import { apiSalas } from '../utils/api';
import '../App.css';
import logoUnioeste from '../images/logo_unioeste.png';
import { Pen, Trash } from 'lucide-react';

interface Sala {
    id_sala: number;
    nome_sala: string;
}

function ListarSalas() {
    const [salas, setSalas] = useState<Sala[]>([]);

    useEffect(() => {
        carregarSalas();
    }, []);

    const carregarSalas = async () => {
        try {
            const response = await apiSalas.get('/');
            setSalas(response.data);
        } catch (error) {
            console.error("Erro ao carregar salas:", error);
        }
    };

    const excluirSala = async (id: number) => {
        if (window.confirm('Tem certeza que deseja excluir esta sala?')) {
            try {
                await apiSalas.delete(`/${id}`);
                carregarSalas(); // Recarrega a lista após exclusão
                alert('Sala excluída com sucesso!');
            } catch (error) {
                console.error("Erro ao excluir sala:", error);
                alert('Erro ao excluir sala');
            }
        }
    };

    return (
        <div className="App">
            <div className="container">
                <div className="cabecalho">
                    <img src={logoUnioeste} alt="Logo" className="logo" />
                    <h1 className="MainText">Salas Cadastradas</h1>
                </div>
                
                <div className="lista-container">
                    {salas.map(sala => (
                        <div key={sala.id_sala} className="lista-item">
                            <div className="item-info">
                                <span className="item-titulo">{sala.nome_sala}</span>
                            </div>
                            <div className="item-acoes">
                            <button className="acao-editar"><Pen size={20} /></button>
                            <button onClick={() => excluirSala(sala.id_sala)} className="acao-excluir"><Trash size={20} /></button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default ListarSalas;