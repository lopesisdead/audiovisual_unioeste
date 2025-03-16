import { EntityCurso } from "./entityModel.js";
import db from "../db/config.js"; // Importando a conexão MySQL

export class CursoCollection {
  constructor() {
    this.cursos = [];
  }

  async createCurso(req, res, curso) {
    try {   
      const query = `
        INSERT INTO CURSOS (nome_curso) 
        VALUES (?)
    ` ;
    const values = [
        curso.nome_curso
    ];
    
    await db.query(query, values);
    
      res.status(201).send(curso);
    } catch (error) {
      console.error("Erro ao criar curso:", error); // Mostra erro detalhado
      res.status(500).send("Erro ao criar curso");
    }
  }
  // Outros métodos...

  async chargeCurso() {
    try {
      const [rows] = await db.query("SELECT * FROM CURSOS");
      this.cursos = rows;
    } catch (error) {
      console.error("Erro ao buscar cursos:", error);
    }
  }

  async findCursoByID(id_curso) {
    try {
      const [rows] = await db.query("SELECT * FROM CURSOS WHERE id_curso = ?", [id_curso]);
      return rows.length > 0 ? rows[0] : null;
    } catch (error) {
      console.error("Erro ao buscar curso:", error);
    }
  }

  async getCurso(req, res) {
    try {
      await this.chargeCurso();
      if (this.cursos.length === 0) {
        res.status(404).send("Não há cursos criadas!");
      } else {
        res.status(200).send(this.cursos);
      }
    } catch (error) {
      console.error("Erro ao buscar cursos:", error);
      res.status(500).send("Erro ao buscar cursos");
    }
  }

  async getCursosByID(req, res, id_curso) {
    try {
      const curso = await this.findCursoByID(id_curso);
      if (curso) {
        res.status(200).send(curso);
      } else {
        res.status(404).send("Curso não encontrado");
      }
    } catch (error) {
      console.error("Erro ao buscar curso:", error);
      res.status(500).send("Erro ao buscar curso");
    }
  }

  async updateCurso(req, res, id_curso, curso) {
    try {
      const query = `
        UPDATE CURSOS 
        SET nome_curso = ?
        WHERE id_curso = ?
      `;
      const values = [
        curso.nome_curso,
        id_curso
      ];
      const [result] = await db.query(query, values);

      if (result.affectedRows > 0) {
        res.status(200).send(curso);
      } else {
        res.status(404).send("Curso não encontrado");
      }
    } catch (error) {
      console.error("Erro ao atualizar curso:", error);
      res.status(500).send("Erro ao atualizar curso");
    }
  }

  async deleteCurso(req, res, id_curso) {
    try {
      const [result] = await db.query("DELETE FROM CURSOS WHERE id_curso = ?", [id_curso]);

      if (result.affectedRows > 0) {
        res.status(200).send("Curso excluído com sucesso");
      } else {
        res.status(404).send("Curso não encontrado");
      }
    } catch (error) {
      console.error("Erro ao excluir curso:", error);
      res.status(500).send("Erro ao excluir curso");
    }
  }
}

export default new CursoCollection();