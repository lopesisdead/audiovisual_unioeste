import { useState, useEffect } from 'react';
import { apiFuncionarios, apiEmprestimos, apiSalas, apiCursos } from '../utils/api';
import '../App.css';
import logoUnioeste from '../images/logo_unioeste.png';
import { useNavigate } from 'react-router-dom';


interface Emprestimo {
    id_emprestimo?: number;
    id_funcionario: number;
    id_sala: number;
    id_curso: number;
    nome_requisitante: string;
    email_requisitante: string;
    notebook_emprestimo: boolean;
    hdmi_emprestimo: boolean;
    som_emprestimo: boolean;
}

interface Sala {
    id_sala: number;
    nome_sala: string;
}

interface Curso {
    id_curso: number;
    nome_curso: string;
}

function CriarEmprestimo() {

    const navigate = useNavigate();

    const [emprestimos, setEmprestimos] = useState<Emprestimo[]>([]);
    const [salas, setSalas] = useState<Sala[]>([]);
    const [cursos, setCursos] = useState<Curso[]>([]);
    const [form, setForm] = useState<Emprestimo>({
        id_funcionario: 0, // Ajuste para o ID do funcionário logado
        id_sala: 0,
        id_curso: 0,
        nome_requisitante: '',
        email_requisitante: '',
        notebook_emprestimo: false,
        hdmi_emprestimo: false,
        som_emprestimo: false,
    });

    useEffect(() => {
        apiEmprestimos.get('/').then(response => setEmprestimos(response.data));

        apiFuncionarios.get("/usuario-logado").then(response => {
            setForm(prev => ({ ...prev, id_funcionario: response.data.id_funcionario }));
        })
        .catch(error => console.error("Erro ao buscar usuário logado:", error));

        apiSalas.get('/').then(response => {
          setSalas(response.data);
      });
  
      apiCursos.get('/').then(response => {
          setCursos(response.data);
      });
    }, []);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value, type, checked } = e.target;
    
        setForm(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : (name === "id_sala" || name === "id_curso" ? Number(value) : value),
        }));
    };    

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const response = await apiEmprestimos.post('/', form);
            setEmprestimos([...emprestimos, response.data]);
            setForm({
                id_funcionario: 0,
                id_sala: 0,
                id_curso: 0,
                nome_requisitante: '',
                email_requisitante: '',
                notebook_emprestimo: false,
                hdmi_emprestimo: false,
                som_emprestimo: false,
            });

            navigate("/listar-emprestimos");

        } catch (error) {
            console.error('Erro ao cadastrar empréstimo:', error);
        }
    };

    return (
        <div className="App">
            <div className="container">
                <div className="cabecalho">
                    <img src={logoUnioeste} alt="Logo" className="logo" />
                    <h1 className="MainText">Cadastro de Empréstimos</h1>
                </div>
                
                <div className="form-container form-emprestimo">
                    <form onSubmit={handleSubmit} className="form">
                        <div className="input-group">
                            <input 
                                type="text" 
                                name="nome_requisitante" 
                                placeholder="Nome Sobrenome" 
                                value={form.nome_requisitante} 
                                onChange={handleChange} 
                                required 
                                className="input-field"
                            />
                        </div>

                        <div className="input-group">
                            <input 
                                type="text" 
                                name="email_requisitante" 
                                placeholder="nome.sobrenome@unioeste.br" 
                                value={form.email_requisitante} 
                                onChange={handleChange} 
                                required 
                                className="input-field"
                            />
                        </div>

                        <div className="input-group">
                            <select 
                                name="id_sala" 
                                value={form.id_sala} 
                                onChange={handleChange} 
                                required 
                                className="input-field"
                            >
                                <option value="">Selecione uma Sala</option>
                                {salas.map(sala => (
                                    <option key={sala.id_sala} value={sala.id_sala}>
                                        {sala.nome_sala}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div className="input-group">
                            <select 
                                name="id_curso" 
                                value={form.id_curso} 
                                onChange={handleChange} 
                                required 
                                className="input-field"
                            >
                                <option value="">Selecione um Curso</option>
                                {cursos.map(curso => (
                                    <option key={curso.id_curso} value={curso.id_curso}>
                                        {curso.nome_curso}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div className="checkbox-group-emprestimo">
                            <label>
                                <input 
                                    type="checkbox" 
                                    name="notebook_emprestimo" 
                                    checked={form.notebook_emprestimo} 
                                    onChange={handleChange} 
                                />
                                Notebook
                            </label>
                            <label>
                                <input 
                                    type="checkbox" 
                                    name="hdmi_emprestimo" 
                                    checked={form.hdmi_emprestimo} 
                                    onChange={handleChange} 
                                />
                                Cabo HDMI
                            </label>
                            <label>
                                <input 
                                    type="checkbox" 
                                    name="som_emprestimo" 
                                    checked={form.som_emprestimo} 
                                    onChange={handleChange} 
                                />
                                Sistema de Som
                            </label>
                        </div>

                        <button type="submit" className="submit-button">
                            Registrar Empréstimo
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default CriarEmprestimo;