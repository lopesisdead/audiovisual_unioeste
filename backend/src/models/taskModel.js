import { EntityTask } from "./entityModel.js";
import { openDB } from "../db/config.js";

export class TaskCollection extends EntityTask {
  constructor(id, title, status, date) {
    super(id, title, status, date);
    this.tasks = [];
    this.db = null;
  }

  async openDatabase() {
    try {
      if (this.db === null) {
        this.db = await openDB();
      }
    } catch (error) {
      console.log(error);
    }
  }

  async chargeTasks() {
    try {
      await this.openDatabase();
      this.tasks = await this.db.all("SELECT * FROM tasks");
    } catch (error) {
      console.log(error);
    }
  }

  async findTaskById(id) {
    try {
      await this.openDatabase();
      return await this.db.get("SELECT * FROM tasks WHERE id = ?", [id]);
    } catch (error) {
      console.log("Erro ao buscar task");
      console.log(error);
    }
  }

  async getTask(req, res) {
    try {
      await this.chargeTasks();
      if (this.tasks.length === 0) {
        res.status(404).send("Não há tarefas cadastradas");
      } else {
        res.status(200).send(this.tasks);
      }
    } catch (error) {
      console.log(error);
      res.status(500).send("Erro ao buscar tarefas");
    }
  }

  async getTaskById(req, res, id) {
    try {
      const task = await this.findTaskById(id);
      if (task) {
        res.status(200).send(task);
      } else {
        res.status(404).send("Tarefa não encontrada");
      }
    } catch (error) {
      console.log(error);
      res.status(500).send("Erro ao buscar tarefa");
    }
  }

  async createTask(req, res, task) {
    try {
      await this.openDatabase();
      await this.db.run(
        "INSERT INTO tasks (id, title, status, date) VALUES (?,?,?,?)",
        [task.id, task.title, task.status, task.date]
      );
      res.status(201).send(task);
    } catch (error) {
      console.log(error);
      res.status(500).send("Erro ao criar tarefa");
    }
  }

  async updateTask(req, res, id,task) {
    try {
      if (task) {
        await this.openDatabase();
        await this.db.run(
          "UPDATE tasks SET title = ?, status = ?, date = ? WHERE id = ?",
          [task.title, task.status, task.date, id]
        );
        res.status(200).send(task);
      } else {
        res.status(404).send("Tarefa não encontrada");
      }
    } catch (error) {
      console.log(error);
      res.status(500).send("Erro ao atualizar tarefa");
    }
  }

  async deleteTask(req, res, id) {
    try {
      const task = await this.findTaskById(id);
      if (task) {
        await this.db.run("DELETE FROM tasks WHERE id = ?", [id]);
        res.status(200).send("Tarefa excluída com sucesso");
      } else {
        res.status(404).send("Tarefa não encontrada");
      }
    } catch (error) {
      console.log(error);
      res.status(500).send("Erro ao excluir tarefa");
    }
  }
}
