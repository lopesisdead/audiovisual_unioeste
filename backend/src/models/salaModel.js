import { EntitySala } from "./entityModel.js";
import db from "../db/config.js"; // Importando a conexão MySQL

export class SalaCollection {
  constructor() {
    this.salas = [];
  }

  async createSala(req, res, sala) {
    try {   
      const query = `
        INSERT INTO SALAS (nome_sala) 
        VALUES (?)
    ` ;
    const values = [
        sala.nome_sala
    ];
    
    await db.query(query, values);
    
      res.status(201).send(sala);
    } catch (error) {
      console.error("Erro ao criar sala:", error); // Mostra erro detalhado
      res.status(500).send("Erro ao criar sala");
    }
  }
  // Outros métodos...

  async chargeSala() {
    try {
      const [rows] = await db.query("SELECT * FROM SALAS");
      this.salas = rows;
    } catch (error) {
      console.error("Erro ao buscar salas:", error);
    }
  }

  async findSalaByID(id_sala) {
    try {
      const [rows] = await db.query("SELECT * FROM SALAS WHERE id_sala = ?", [id_sala]);
      return rows.length > 0 ? rows[0] : null;
    } catch (error) {
      console.error("Erro ao buscar sala:", error);
    }
  }

  async getSala(req, res) {
    try {
      await this.chargeSala();
      if (this.salas.length === 0) {
        res.status(404).send("Não há salas criadas!");
      } else {
        res.status(200).send(this.salas);
      }
    } catch (error) {
      console.error("Erro ao buscar salas:", error);
      res.status(500).send("Erro ao buscar salas");
    }
  }

  async getSalasByID(req, res, id_sala) {
    try {
      const sala = await this.findSalaByID(id_sala);
      if (sala) {
        res.status(200).send(sala);
      } else {
        res.status(404).send("Sala não encontrada");
      }
    } catch (error) {
      console.error("Erro ao buscar sala:", error);
      res.status(500).send("Erro ao buscar sala");
    }
  }

  async updateSala(req, res, id_sala, sala) {
    try {
      const query = `
        UPDATE SALAS 
        SET nome_sala = ?
        WHERE id_sala = ?
      `;
      const values = [
        sala.nome_sala,
        id_sala
      ];
      const [result] = await db.query(query, values);

      if (result.affectedRows > 0) {
        res.status(200).send(sala);
      } else {
        res.status(404).send("Sala não encontrada");
      }
    } catch (error) {
      console.error("Erro ao atualizar sala:", error);
      res.status(500).send("Erro ao atualizar sala");
    }
  }

  async deleteSala(req, res, id_sala) {
    try {
      const [result] = await db.query("DELETE FROM SALAS WHERE id_sala = ?", [id_sala]);

      if (result.affectedRows > 0) {
        res.status(200).send("Sala excluída com sucesso");
      } else {
        res.status(404).send("Sala não encontrada");
      }
    } catch (error) {
      console.error("Erro ao excluir sala:", error);
      res.status(500).send("Erro ao excluir sala");
    }
  }
}

export default new SalaCollection();