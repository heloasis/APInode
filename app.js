
const express = require("express");
const path = require("path");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Configuração EJS
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// Rotas de clientes
const clienteRoutes = require("./routes/clienteRoutes");
app.use("/clientes", clienteRoutes);

// Página inicial
app.get("/", (req, res) => {
  res.render("index", {
    titulo: "Página Inicial",
  });
});

// Rota para verificar se o servidor está funcionando
app.get("/status", (req, res) => {
  res.status(200).json({
    status: "ok",
    mensagem: "API funcionando corretamente",
  });
});

// Tratamento de rotas inexistentes
app.use((req, res) => {
  res.status(404).json({
    erro: "Rota não encontrada",
    caminho: req.originalUrl,
  });
});

// Tratamento de erros
app.use((err, req, res, next) => {
  console.error("Erro no servidor:", err);

  res.status(500).json({
    erro: "Erro interno no servidor",
  });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});