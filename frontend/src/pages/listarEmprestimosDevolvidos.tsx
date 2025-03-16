import { useState, useEffect } from 'react';
import { apiEmprestimos, apiSalas } from '../utils/api';
import logoUnioeste from '../images/logo_unioeste.png';

interface Emprestimo {
    id_emprestimo: number;
    id_sala: number;
    nome_requisitante: string;
    email_requisitante: string;
    status_devolucao: number;
    datahora_devolucao: string; // Campo adicionado
}

interface Sala {
    id_sala: number;
    nome_sala: string;
}

function ListarEmprestimosDevolvidos() {
    const [emprestimos, setEmprestimos] = useState<Emprestimo[]>([]);
    const [salas, setSalas] = useState<Sala[]>([]);

    useEffect(() => {
        carregarDados();
    }, []);

    const carregarDados = async () => {
        try {
            const responseEmprestimos = await apiEmprestimos.get('/');
            const emprestimosDevolvidos = responseEmprestimos.data.filter((e: Emprestimo) => e.status_devolucao === 1);
            
            const responseSalas = await apiSalas.get('/');
            
            setEmprestimos(emprestimosDevolvidos);
            setSalas(responseSalas.data);
        } catch (error) {
            console.error("Erro ao carregar dados:", error);
        }
    };

    const encontrarNomeSala = (idSala: number) => {
      const sala = salas.find(s => s.id_sala === idSala);
      return sala ? sala.nome_sala : 'Sala não encontrada';
    };

    const formatarDataHora = (datahora: string) => {
        const data = new Date(datahora);
        return {
            data: data.toLocaleDateString('pt-BR'),
            hora: data.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })
        };
    };

    return (
      <div className="App">
        <img src={logoUnioeste} alt="Logo" className="logo" />
        <h1 className="MainText">Empréstimos Devolvidos</h1>
        
        <div className="form-container2">
          {emprestimos.map(emprestimo => {
              const dataHora = formatarDataHora(emprestimo.datahora_devolucao);
              
              return (
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

                    <div className="info-item">
                      <span className="label">Data/Hora Devolução:</span>
                      <span className="valor">
                        {dataHora.data} às {dataHora.hora}
                      </span>
                    </div>
                  </div>
                </div>
              );
          })}
        </div>
      </div>
    );
}

export default ListarEmprestimosDevolvidos;