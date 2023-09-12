const { Router } = require('express');
const contasUsuarios = require('./controladoresDeContas/contasControlador');
const transacoesUsuarios = require('./controladoresDeTransacoes/transacoesControlador');

const rotas = Router()

rotas.get('/contas', contasUsuarios.listarContasBancarias);
rotas.post('/contas', contasUsuarios.novaConta);
rotas.put('/contas/:numeroConta/usuario', contasUsuarios.atualizarDadosDeUsuario);
rotas.delete('/contas/:numeroConta', contasUsuarios.excluirConta);
rotas.post('/transacoes/depositar', transacoesUsuarios.realizarDeposito);
rotas.post('/transacoes/sacar', transacoesUsuarios.sacarDinheiro);
rotas.post('/transacoes/transferir', transacoesUsuarios.fazerTransferencias);
rotas.get('/contas/saldo', contasUsuarios.mostrarSaldo);
rotas.get('/contas/extrato', contasUsuarios.consultarExtrato);

module.exports = rotas;