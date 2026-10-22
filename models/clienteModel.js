// MODEL UTILIZANDO FIREBASE REALTIME DATABASE

const db = require("../config/firebase");

const ref = db.ref("clientes");

/* =====================================================
   LISTAR
===================================================== */
async function listar() {
    const registros = await ref.once("value");
    const dados = registros.val();

    if (!dados) return [];

    return Object.keys(dados).map(id => ({
        id,
        nome: dados[id].nome,
        descricao: dados[id].descricao

    }));
}

/* =====================================================
   SALVAR
===================================================== */
async function salvar(cliente) {
    const novaRef = ref.push();

    await novaRef.set({
        nome: cliente.nome,
        descricao: cliente.descricao
    });
}

/* =====================================================
   BUSCAR POR ID
===================================================== */
async function buscarPorId(id) {
    const registros = await ref.child(id).once("value");

    if (!registros.exists()) return null;

    return {
        id,
        ...registros.val()
    };
}

/* =====================================================
   EDITAR
===================================================== */
async function editar(id, novoCliente) {
    await ref.child(id).update({
        nome: novoCliente.nome,
        descricao: novoCliente.descricao
    });
}

/* =====================================================
   EXCLUIR
===================================================== */
async function excluir(id) {
    await ref.child(id).remove();
}

/* =====================================================
   EXPORTAÇÃO
===================================================== */
module.exports = {
    listar,
    salvar,
    buscarPorId,
    editar,
    excluir
};
