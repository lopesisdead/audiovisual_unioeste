import { useState, useEffect } from 'react';
import { apiCursos } from '../utils/api';
import '../App.css';
import logoUnioeste from '../images/logo_unioeste.png';

interface Curso {
    id_curso?: number;
    nome_curso: string;
}

function CriarCurso() {
    const [cursos, setCursos] = useState<Curso[]>([]);
    const [form, setForm] = useState<Curso>({
        nome_curso: '',
    });

    useEffect(() => {
        apiCursos.get('/').then(response => {
            setCursos(response.data);
        });
    }, []);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value, type, checked } = e.target;
        setForm(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value,
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const response = await apiCursos.post('/', form);
            setCursos([...cursos, response.data]);
            setForm({
                nome_curso: '',
            });
        } catch (error) {
            console.error('Erro ao cadastrar curso:', error);
        }
    };

    return (
        <div className="App">
            <div className="container">
                <div className="cabecalho">
                    <img src={logoUnioeste} alt="Logo" className="logo" />
                    <h1 className="MainText">Cadastro de Cursos</h1>
                </div>
                
                <div className="form-container">
                    <form onSubmit={handleSubmit} className="form">
                        <div className="input-group">
                            <input 
                                type="text" 
                                name="nome_curso" 
                                placeholder="Nome do curso" 
                                value={form.nome_curso} 
                                onChange={handleChange} 
                                required 
                                className="input-field"
                            />
                        </div>
                        <button type="submit" className="submit-button">
                            Cadastrar Curso
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default CriarCurso;