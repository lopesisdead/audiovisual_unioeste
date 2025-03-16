import { useState, useEffect } from 'react';
import { apiEmprestimos, apiSalas } from '../utils/api'; // Adicione a API das salas
import logoUnioeste from '../images/logo_unioeste.png';
import { Check, Trash } from 'lucide-react';

interface Emprestimo {
    id_emprestimo: number;
    id_sala: number; // Novo campo
    nome_requisitante: string;
    email_requisitante: string;
    status_devolucao: number;
}

interface Sala {
    id_sala: number;
    nome_sala: string;
}

function ListarEmprestimos() {
    const [emprestimos, setEmprestimos] = useState<Emprestimo[]>([]);
    const [salas, setSalas] = useState<Sala[]>([]); // Estado para salas

    useEffect(() => {
        carregarDados();
    }, []);

    const carregarDados = async () => {
        try {
            // Carrega empréstimos
            const responseEmprestimos = await apiEmprestimos.get('/');
            const emprestimosAtivos = responseEmprestimos.data.filter((e: Emprestimo) => e.status_devolucao === 0);
            
            // Carrega salas
            const responseSalas = await apiSalas.get('/');
            
            setEmprestimos(emprestimosAtivos);
            setSalas(responseSalas.data);
        } catch (error) {
            console.error("Erro ao carregar dados:", error);
        }
    };

    const marcarComoCompleto = async (id: number) => {
        if (window.confirm("Tem certeza que deseja marcar este empréstimo como completo?")) {
            try {
                await apiEmprestimos.put(`/${id}`, { status_devolucao: 1 });
                carregarDados();
            } catch (error) {
                console.error("Erro ao marcar empréstimo como completo:", error);
            }
        }
    };

    const excluirEmprestimo = async (id: number) => {
        if (window.confirm("Tem certeza que deseja excluir este empréstimo?")) {
            try {
                await apiEmprestimos.delete(`/${id}`);
                carregarDados();
            } catch (error) {
                console.error("Erro ao excluir empréstimo:", error);
            }
        }
    };

    const encontrarNomeSala = (idSala: number) => {
      const sala = salas.find(s => s.id_sala === idSala);
      return sala ? sala.nome_sala : 'Sala não encontrada';
    };

    return (
      <div className="App">
        <img src={logoUnioeste} alt="Logo" className="logo" />
        <h1 className="MainText">Empréstimos Ativos</h1>
        
        <div className="form-container2">
          {emprestimos.map(emprestimo => (
            <div key={emprestimo.id_emprestimo} className="linha-emprestimo">
              <div className="grupo-info">
                <div className="info-item">
                  <span className="label">Nome:</span>
                  <span className="valor">{emprestimo.nome_requisitante}</span>
                </div>
                
                <div className="info-item">
                  <span className="label">Email:</span>
                  <span className="valor">{emprestimo.email_requisitante}</span>
                </div>
                
                <div className="info-item">
                  <span className="label">Sala:</span>
                  <span className="valor">{encontrarNomeSala(emprestimo.id_sala)}</span>
                </div>
              </div>
    
              <div className="grupo-botoes">
                <button 
                  onClick={() => marcarComoCompleto(emprestimo.id_emprestimo)}
                  className="submit-button"
                >
                  <Check size={20} />
                </button>
                <button 
                  onClick={() => excluirEmprestimo(emprestimo.id_emprestimo)}
                  className="submit-button bg-red"
                >
                  <Trash size={20} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
}

export default ListarEmprestimos;