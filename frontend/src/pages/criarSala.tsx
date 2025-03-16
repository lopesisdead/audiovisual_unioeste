import { useState, useEffect } from 'react';
import { apiSalas } from '../utils/api';
import '../App.css';
import logoUnioeste from '../images/logo_unioeste.png';

interface Sala {
    id_sala?: number;
    nome_sala: string;
}

function CriarSala() {
    const [salas, setSalas] = useState<Sala[]>([]);
    const [form, setForm] = useState<Sala>({
        nome_sala: '',
    });

    useEffect(() => {
        apiSalas.get('/').then(response => {
            setSalas(response.data);
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
            const response = await apiSalas.post('/', form);
            setSalas([...salas, response.data]);
            setForm({
                nome_sala: '',
            });
        } catch (error) {
            console.error('Erro ao cadastrar sala:', error);
        }
    };

    return (
        <div className="App">
            <div className="container">
                <div className="cabecalho">
                    <img src={logoUnioeste} alt="Logo" className="logo" />
                    <h1 className="MainText">Cadastro de Salas</h1>
                </div>
                
                <div className="form-container">
                    <form onSubmit={handleSubmit} className="form">
                        <div className="input-group">
                            <input 
                                type="text" 
                                name="nome_sala" 
                                placeholder="Nome da sala" 
                                value={form.nome_sala} 
                                onChange={handleChange} 
                                required 
                                className="input-field"
                            />
                        </div>
                        <button type="submit" className="submit-button">
                            Cadastrar Sala
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default CriarSala;