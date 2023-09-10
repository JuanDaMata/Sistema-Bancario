const { Router } = require('express');
const clientes = require('./controladores/clientes');
const rotas = Router();

rotas.get('/contas?senha_banco=Cubos123Bank', clientes.listarContasBancarias);
rotas.post('/contas', clientes.novaConta);
rotas.put('/contas/:numeroConta/usuario', clientes.atualizarDadosDeUsuario);
rotas.delete('/contas/:numeroConta', clientes.excluirConta);
rotas.post('/transacoes/depositar', clientes.fazerDeposito);
rotas.post('/transacoes/sacar', clientes.sacarDinheiro);
rotas.post('/transacoes/transferir', clientes.fazerTransferencias);
rotas.get('/contas/saldo?numero_conta=123&senha=123', clientes.mostrarSaldo);
rotas.get('/contas/extrato?numero_conta=123&senha=123', clientes.consultarExtrato);

module.exports = rotas;