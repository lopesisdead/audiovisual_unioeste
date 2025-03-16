import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { EntityFuncionario } from "./entityModel.js";
import db from "../db/config.js"; // Importando a conexão MySQL
import dotenv from "dotenv";

dotenv.config();

const SECRET_KEY = process.env.SECRET_KEY;


export class FuncionarioCollection {
  constructor() {
    this.funcionarios = [];
  }

  async getFuncionarios(req, res) {
    try {
      const query = `
        SELECT * 
        FROM FUNCIONARIOS
        ORDER BY nome_funcionario ASC
      `;
      
      const [rows] = await db.query(query);

      if (rows.length === 0) {
        return res.status(404).send("Nenhum funcionário encontrado");
      }
      
      res.status(200).json(rows);
      
    } catch (error) {
      console.error("Erro ao buscar funcionários:", error);
      res.status(500).send("Erro interno ao buscar funcionários");
    }
  }
  

  async createFuncionario(req, res, funcionario) {
    try {
      const saltRounds = 10;
      const hashedPassword = await bcrypt.hash(funcionario.senha_funcionario, saltRounds);

      const query = `
        INSERT INTO FUNCIONARIOS (email_funcionario, senha_funcionario, nome_funcionario, celular_funcionario) 
        VALUES (?, ?, ?, ?)
      `;
      const values = [
        funcionario.email_funcionario,
        hashedPassword,
        funcionario.nome_funcionario,
        funcionario.celular_funcionario
      ];

      if (!funcionario.email_funcionario) {
        return res.status(400).send("Campo e-mail não foi preenchido!");
      }

      if (!funcionario.senha_funcionario || !hashedPassword) {
        return res.status(400).send("Campo senha não foi preenchido!");
      }

      if (!funcionario.nome_funcionario) {
        return res.status(400).send("Campo nome não foi preenchido!");
      }

      if (!funcionario.celular_funcionario) {
        return res.status(400).send("Campo celular não foi preenchido!");
      }

      await db.query(query, values);
      res.status(201).send("Funcionário registrado com sucesso!");
    } catch (error) {
      console.error("Erro ao criar funcionário:", error);
      res.status(500).send("Erro ao criar funcionário");
    }
  }

  async loginFuncionario(req, res) {
    try {
      const { email_funcionario, senha_funcionario } = req.body;
      if (!email_funcionario || !senha_funcionario) {
        return res.status(400).json({ message: "E-mail e senha são obrigatórios!" });
      }

      const [rows] = await db.query("SELECT * FROM FUNCIONARIOS WHERE email_funcionario = ?", [email_funcionario]);
      if (rows.length === 0) {
        return res.status(404).json({ message: "Funcionário não encontrado!" });
      }

      const funcionario = rows[0];
      const senhaValida = await bcrypt.compare(senha_funcionario, funcionario.senha_funcionario);
      if (!senhaValida) {
        return res.status(401).json({ message: "Credenciais inválidas!" });
      }

      // Gerar token JWT
      const token = jwt.sign(
        { id: funcionario.id_funcionario, email: funcionario.email_funcionario },
        SECRET_KEY,
        { expiresIn: "8h" }
      );

      // **Definir o cookie corretamente**
      res.cookie("token", token, {
        httpOnly: true,
        secure: false, // Mude para true se estiver em produção (HTTPS)
        sameSite: "Lax", // Configuração recomendada para segurança
        maxAge: 8 * 60 * 60 * 1000, // 8 horas
      });

      res.status(200).json({ message: "Login bem-sucedido!", token });
    } catch (error) {
      console.error("Erro ao realizar login:", error);
      res.status(500).json({ message: "Erro ao realizar login" });
    }
  }

  async logoutFuncionario(req, res) {
    res.clearCookie("token");
    res.status(200).json({ message: "Logout bem-sucedido!" });
  }

  verifyToken(req, res, next) {
    const token = req.cookies.token;
    if (!token) {
      return res.status(403).json({ message: "Token necessário!" });
    }

    jwt.verify(token, SECRET_KEY, (err, decoded) => {
      if (err) {
        return res.status(401).json({ message: "Token inválido!" });
      }
      req.user = decoded;
      next();
    });
  }
}

export default new FuncionarioCollection();