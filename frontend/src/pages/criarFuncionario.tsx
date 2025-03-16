import { useState } from 'react';
import { apiFuncionarios } from '../utils/api';
import '../App.css';
import logoUnioeste from '../images/logo_unioeste.png';

function gerarSenhaAleatoria(tamanho = 10) {
  const caracteres = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*';
  let senha = '';
  for (let i = 0; i < tamanho; i++) {
    senha += caracteres.charAt(Math.floor(Math.random() * caracteres.length));
  }
  return senha;
}

function CriarFuncionario() {
  const [form, setForm] = useState({
    email_funcionario: '',
    nome_funcionario: '',
    celular_funcionario: '',
  });
  const [senhaGerada, setSenhaGerada] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const senha = gerarSenhaAleatoria();
    setSenhaGerada(senha);

    try {
      await apiFuncionarios.post('/', { ...form, senha_funcionario: senha });
      alert('Funcionário cadastrado com sucesso!');
    } catch (error) {
      console.error('Erro ao cadastrar funcionário:', error);
    }
  };

  return (
    <div className="App">
      <div className="container">
        <div className="cabecalho">
          <img src={logoUnioeste} alt="Logo" className="logo" />
          <h1 className="MainText">Cadastro de Funcionários</h1>
        </div>

        <div className="form-container">
          <form onSubmit={handleSubmit} className="form">
            <div className="input-group">
              <input
                type="text"
                name="nome_funcionario"
                placeholder="Nome completo"
                value={form.nome_funcionario}
                onChange={handleChange}
                required
                className="input-field"
              />
            </div>

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
                type="text"
                name="celular_funcionario"
                placeholder="Número de celular"
                value={form.celular_funcionario}
                onChange={handleChange}
                required
                className="input-field"
              />
            </div>

            <button type="submit" className="submit-button">
              Cadastrar Funcionário
            </button>
          </form>

          {senhaGerada && (
            <div className="senha-info">
              <p>Senha gerada:</p>
              <div className="senha-gerada">{senhaGerada}</div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default CriarFuncionario;