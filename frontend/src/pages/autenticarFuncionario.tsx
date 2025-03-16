import { useState } from 'react';
import { apiFuncionarios } from '../utils/api';
import '../App.css';
import logoUnioeste from '../images/logo_unioeste.png';
import { useNavigate } from 'react-router-dom';

function AutenticarFuncionario() {

    const navigate = useNavigate();
  
    const [form, setForm] = useState({
        email_funcionario: '',
        senha_funcionario: '',
    });
    const [mensagem, setMensagem] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await apiFuncionarios.post('/login', form);
            alert('Login bem-sucedido!');
            navigate("/criar-emprestimo");
        } catch (error) {
            setMensagem('Erro ao fazer login. Verifique suas credenciais.');
            console.error('Erro ao fazer login:', error);
        }
    };

    return (
        <div className="App">
            <div className="container">
                <div className="cabecalho">
                    <img src={logoUnioeste} alt="Logo" className="logo" />
                    <h1 className="MainText">Acesso do Funcionário</h1>
                </div>
                
                <div className="form-container">
                    <form onSubmit={handleSubmit} className="form">
                        <div className="input-group">
                            <input 
                                type="email" 
                                name="email_funcionario" 
                                placeholder="E-mail institucional" 
                                value={form.email_funcionario} 
                                onChange={handleChange} 
                                required 
                                className="input-field"
                            />
                        </div>
                        
                        <div className="input-group">
                            <input 
                                type="password" 
                                name="senha_funcionario" 
                                placeholder="Senha" 
                                value={form.senha_funcionario} 
                                onChange={handleChange} 
                                required 
                                className="input-field"
                            />
                        </div>

                        <button type="submit" className="submit-button">
                            Acessar Sistema
                        </button>

                        {mensagem && <p className="mensagem-erro">{mensagem}</p>}
                    </form>
                </div>
            </div>
        </div>
    );
}

export default AutenticarFuncionario;