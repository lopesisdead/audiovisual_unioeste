import axios from "axios";

const API_BASE_URL = "http://localhost:3000";

export const apiEmprestimos = axios.create({
  baseURL: `${API_BASE_URL}/emprestimos`,
  withCredentials: true, // Habilita envio e recebimento de cookies
});

export const apiSalas = axios.create({
  baseURL: `${API_BASE_URL}/salas`,
  withCredentials: true, // Habilita envio e recebimento de cookies
});

export const apiCursos = axios.create({
  baseURL: `${API_BASE_URL}/cursos`,
  withCredentials: true, // Habilita envio e recebimento de cookies
});

export const apiFuncionarios = axios.create({
  baseURL: `${API_BASE_URL}/funcionarios`,
  withCredentials: true, // Habilita envio e recebimento de cookies
});