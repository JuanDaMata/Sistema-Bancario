let bancodedados = require('../bancodedados');

const realizarDeposito = (req, res) => {
    const { numero_conta, valor } = req.body;

    if (!numero_conta || !valor) {
        return res.status(400).json({ mensagem: 'O número da conta e o valor são obrigatórios!' })
    }

    const contaVerificada = bancodedados.contas.find((conta) => {
        return Number(conta.numero) === Number(numero_conta);
    });

    if (!contaVerificada) {
        return res.status(400).json({ mensagem: 'A conta informada não existe' })
    }

    if (valor <= 0) {
        return res.status(400).json({ mensagem: 'Não é possível realizar o depósito do valor informado' })
    }

    contaVerificada.saldo += Number(valor);


    const deposito = {
        data: new Date(),
        numero_conta,
        valor
    };

    bancodedados.depositos.push(deposito)

    return res.status(204).json();
};

const sacarDinheiro = (req, res) => {
    const { numero_conta, valor, senha } = req.body

    if (!numero_conta || !valor || !senha) {
        return res.status(400).json({ mensagem: 'O número da conta, o valor e a senha são obrigatórios!' })
    }

    const contaVerificada = bancodedados.contas.find((conta) => {
        return Number(conta.numero) === Number(numero_conta);
    });

    if (!contaVerificada) {
        return res.status(400).json({ mensagem: 'A conta informada não existe' })
    }

    const senhaVerificada = contaVerificada.usuario.senha === senha;

    if (!senhaVerificada) {
        return res.status(400).json({ mensagem: 'A senha informada é inválida' })
    }

    const saldoVerificado = bancodedados.contas.some((conta) => {
        return Number(conta.saldo) >= Number(valor)
    });

    if (!saldoVerificado) {
        return res.status(403).json({ mensagem: 'Não é possível realizar saque, pois o valor informado é maior que seu saldo' });
    }

    contaVerificada.saldo -= Number(valor);


    const saque = {
        data: new Date(),
        numero_conta,
        valor
    }

    bancodedados.saques.push(saque)

    return res.status(204).json();
};

const fazerTransferencias = (req, res) => {
    const { numero_conta_origem, numero_conta_destino, valor, senha } = req.body

    if (!numero_conta_origem || !numero_conta_destino || !valor || !senha) {
        return res.status(400).json({ mensagem: 'o numero da conta de origem, o numero da conta de destino, o valor e a senha são obrigatórios!' })
    }

    const contaDeOrigem = bancodedados.contas.find((conta) => {
        return Number(conta.numero) === Number(numero_conta_origem);
    });

    if (!contaDeOrigem) {
        return res.status(400).json({ mensagem: 'Conta de origem ou conta de destino informadas não existe!' })
    }

    const contaDeDestino = bancodedados.contas.find((conta) => {
        return Number(conta.numero) === Number(numero_conta_destino);
    });

    if (!contaDeDestino) {
        return res.status(400).json({ mensagem: 'Conta de origem ou conta de destino informadas não existe!' })
    }

    const senhaVerificada = contaDeOrigem.usuario.senha === senha;

    if (!senhaVerificada) {
        return res.status(400).json({ mensagem: 'A senha informada é inválida' })
    }

    const saldoVerificado = contaDeOrigem.saldo > valor;

    if (!saldoVerificado) {
        return res.status(403).json({ mensagem: 'Não é possível realizar a transferência, pois o valor informado é maior que seu saldo' });
    }

    contaDeOrigem.saldo -= valor;
    contaDeDestino.saldo += valor;

    const transfencia = {
        data: new Date(),
        numero_conta_origem,
        numero_conta_destino,
        valor
    };

    bancodedados.transferencias.push(transfencia);

    return res.status(204).json();
};


module.exports = {
    sacarDinheiro,
    fazerTransferencias,
    realizarDeposito
}