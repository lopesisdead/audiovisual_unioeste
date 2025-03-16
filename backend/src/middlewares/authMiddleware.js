import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const SECRET_KEY = process.env.SECRET_KEY || "chave_secreta"; // Certifique-se de definir no .env

export const verifyToken = (req, res, next) => {
  const token = req.cookies.token; // Pegando o token do cookie

  if (!token) {
    return res.status(403).json({ message: "Acesso negado! Token não fornecido." });
  }

  jwt.verify(token, SECRET_KEY, (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: "Token inválido ou expirado." });
    }

    req.user = decoded; // Armazena os dados do usuário no request
    next();
  });
};