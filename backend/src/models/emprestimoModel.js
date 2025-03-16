import { EntityEmprestimo } from "./entityModel.js";
import db from "../db/config.js"; // Importando a conexão MySQL

export class EmprestimoCollection {
  async createEmprestimo(req, res, emprestimo) {
      try {
        const query = `
                INSERT INTO EMPRESTIMOS (id_funcionario, id_sala, id_curso, nome_requisitante, email_requisitante, notebook_emprestimo, hdmi_emprestimo, som_emprestimo)
                VALUES (?, ?, ?, ?, ?, ?, ?, ?)
            `;    
        const values = [
            emprestimo.id_funcionario,
            emprestimo.id_sala,
            emprestimo.id_curso,
            emprestimo.nome_requisitante,
            emprestimo.email_requisitante,
            emprestimo.notebook_emprestimo,
            emprestimo.hdmi_emprestimo,
            emprestimo.som_emprestimo
          ];

          const [result] = await db.query(query, values);

        if (result.affectedRows > 0) {
            return res.status(201).send("Empréstimo registrado com sucesso!");
        } else {
            return res.status(500).send("Erro ao inserir empréstimo no banco.");
        }
    } catch (error) {
        console.error("Erro ao criar empréstimo:", error);
        return res.status(500).send("Erro ao criar empréstimo.");
    }
  }

  async getEmprestimos(req, res) {
      try {
          const [rows] = await db.query("SELECT * FROM EMPRESTIMOS");
          res.status(200).json(rows);
      } catch (error) {
          console.error("Erro ao buscar empréstimos:", error);
          res.status(500).send("Erro ao buscar empréstimos");
      }
  }

  async getEmprestimoByID(req, res, id) {
      try {
          const [rows] = await db.query("SELECT * FROM EMPRESTIMOS WHERE id_emprestimo = ?", [id]);
          if (rows.length > 0) {
              res.status(200).json(rows[0]);
          } else {
              res.status(404).send("Empréstimo não encontrado");
          }
      } catch (error) {
          console.error("Erro ao buscar empréstimo:", error);
          res.status(500).send("Erro ao buscar empréstimo");
      }
  }

  async updateEmprestimo(req, res, id) {
    try {
        const query = `
            UPDATE EMPRESTIMOS
            SET status_devolucao = 1,
                datahora_devolucao = NOW()
            WHERE id_emprestimo = ?
        `;
        
        const [result] = await db.query(query, [id]);

        if (result.affectedRows > 0) {
            res.status(200).send("Empréstimo atualizado e data de devolução registrada!");
        } else {
            res.status(404).send("Empréstimo não encontrado");
        }
    } catch (error) {
        console.error("Erro ao atualizar empréstimo:", error);
        res.status(500).send("Erro ao atualizar empréstimo");
    }
}


  async deleteEmprestimo(req, res, id) {
      try {
          const [result] = await db.query("DELETE FROM EMPRESTIMOS WHERE id_emprestimo = ?", [id]);
          if (result.affectedRows > 0) {
              res.status(200).send("Empréstimo excluído com sucesso");
          } else {
              res.status(404).send("Empréstimo não encontrado");
          }
      } catch (error) {
          console.error("Erro ao excluir empréstimo:", error);
          res.status(500).send("Erro ao excluir empréstimo");
      }
  }
}

export default new EmprestimoCollection();