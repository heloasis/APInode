// Importa o model de clientes
const model = require("../models/clienteModel");

/* =====================================================
   LISTAR CLIENTES
===================================================== */
exports.index = async (req, res) => {
  const clientes = await model.listar();

  res.render("clientes/index", {
    clientes,
    clienteEditar: null,
  });
};

/* =====================================================
   SALVAR NOVO CLIENTE
===================================================== */
exports.salvar = async (req, res) => {
  await model.salvar({
    nome: req.body.nome.toUpperCase(),
    descricao: req.body.descricao,
  });

  res.redirect("/clientes");
};

/* =====================================================
   FORM EDITAR
===================================================== */
exports.formEditar = async (req, res) => {
  const clientes = await model.listar();

  const clienteEditar = await model.buscarPorId(req.params.id);

  res.render("clientes/index", {
    clientes,
    clienteEditar,
  });
};

/* =====================================================
   EDITAR
===================================================== */
exports.editar = async (req, res) => {
  await model.editar(req.params.id, {
    nome: req.body.nome.toUpperCase(),
    descricao: req.body.descricao,
  });

  res.redirect("/clientes");
};

/* =====================================================
   EXCLUIR - sem fk
===================================================== */
exports.excluir = async (req, res) => {
  await model.excluir(req.params.id);

  res.redirect("/clientes");
};

/* =====================================================
   API - LISTAR CLIENTES EM JSON
===================================================== */
exports.api = async (req, res) => {
  try {
    const clientes = await model.listar();

    res.json(clientes);
  } catch (erro) {
    console.error(erro);

    res.status(500).json({
      erro: "Erro ao buscar clientes",
    });
  }
};
