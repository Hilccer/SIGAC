const express = require("express");
const sqlite3 = require("sqlite3").verbose();
const bcrypt = require("bcrypt");
const path = require("path");

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

const db = new sqlite3.Database("./sigac.db", (err) => {
  if (err) {
    console.error("Erro ao conectar no banco:", err.message);
  } else {
    console.log("Banco conectado com sucesso.");
  }
});

db.run(`
  CREATE TABLE IF NOT EXISTS usuarios (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nome TEXT NOT NULL,
    email TEXT NOT NULL UNIQUE,
    curso_periodo TEXT NOT NULL,
    senha TEXT NOT NULL
  )
`);

app.post("/api/cadastro", async (req, res) => {
  const { nome, email, curso_periodo, senha, confirmarSenha } = req.body;

  if (!nome || !email || !curso_periodo || !senha || !confirmarSenha) {
    return res.status(400).json({ mensagem: "Preencha todos os campos." });
  }

  if (senha !== confirmarSenha) {
    return res.status(400).json({ mensagem: "As senhas não coincidem." });
  }

  try {
    const senhaHash = await bcrypt.hash(senha, 10);

    db.run(
      `INSERT INTO usuarios (nome, email, curso_periodo, senha) VALUES (?, ?, ?, ?)`,
      [nome, email, curso_periodo, senhaHash],
      function (err) {
        if (err) {
          if (err.message.includes("UNIQUE")) {
            return res.status(400).json({ mensagem: "Este email já está cadastrado." });
          }

          return res.status(500).json({ mensagem: "Erro ao cadastrar usuário." });
        }

        res.status(201).json({ mensagem: "Cadastro realizado com sucesso." });
      }
    );
  } catch (error) {
    res.status(500).json({ mensagem: "Erro interno no servidor." });
  }
});

app.post("/api/login", (req, res) => {
  const { email, senha } = req.body;

  if (!email || !senha) {
    return res.status(400).json({ mensagem: "Preencha email e senha." });
  }

  db.get(`SELECT * FROM usuarios WHERE email = ?`, [email], async (err, usuario) => {
    if (err) {
      return res.status(500).json({ mensagem: "Erro ao buscar usuário." });
    }

    if (!usuario) {
      return res.status(401).json({ mensagem: "Email ou senha inválidos." });
    }

    const senhaValida = await bcrypt.compare(senha, usuario.senha);

    if (!senhaValida) {
      return res.status(401).json({ mensagem: "Email ou senha inválidos." });
    }

    res.json({
      mensagem: "Login realizado com sucesso.",
      usuario: {
        id: usuario.id,
        nome: usuario.nome,
        email: usuario.email,
        curso_periodo: usuario.curso_periodo
      }
    });
  });
});

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});