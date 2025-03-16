export class EntityEmprestimo {
  constructor(id_emprestimo, id_funcionario, id_sala, id_curso, nome_requisitante, email_requisitante, notebook_emprestimo, hdmi_emprestimo, som_emprestimo) {
      this.id_emprestimo = id_emprestimo; // PK. pode ser null; BD vai incrementar automaticamente
      this.id_funcionario = id_funcionario; // relacionado ao funcionário que fez o empréstimo
      this.id_sala = id_sala; // relacionado à chave emprestada
      this.id_curso = id_curso; // relacionado ao curso do requisitante
      this.nome_requisitante = nome_requisitante;
      this.email_requisitante = email_requisitante;
      this.notebook_emprestimo = notebook_emprestimo;
      this.hdmi_emprestimo = hdmi_emprestimo;
      this.som_emprestimo = som_emprestimo;
      this.status_devolucao = 0; // valor padrão
      this.datahora_emprestimo = new Date().toISOString().slice(0, 19).replace('T', ' '); // Formatação da data/hora
  }
}

export class EntitySala {
  constructor(id_sala, nome_sala) {
      this.id_sala = id_sala;
      this.nome_sala = nome_sala;
  }
}

export class EntityCurso {
  constructor(id_curso, nome_curso) {
      this.id_curso = id_curso;
      this.nome_curso = nome_curso;
  }
}

export class EntityFuncionario {
  constructor(id_funcionario, email_funcionario, senha_funcionario, nome_funcionario, celular_funcionario) {
      this.id_funcionario = id_funcionario;
      this.id_role_funcionario = 2;
      this.email_funcionario = email_funcionario;
      this.senha_funcionario = senha_funcionario;
      this.nome_funcionario = nome_funcionario;
      this.celular_funcionario = celular_funcionario;
  }
}