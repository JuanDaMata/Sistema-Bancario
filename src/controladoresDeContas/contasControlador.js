let bancodedados = require('../bancodedados');

const listarContasBancarias = (req, res) => {
    const { senha_banco } = req.query

    if (!senha_banco || senha_banco !== bancodedados.banco.senha) {
        return res.status(400).json({ mensagem: 'A senha do banco informada é inválida!' });
    };

    return res.status(200).json(bancodedados.contas);
};

const novaConta = (req, res) => {
    const { nome, cpf, data_nascimento, telefone, email, senha } = req.body;
    let numero = 1

    if (!nome || !cpf || !data_nascimento || !telefone || !email || !senha) {
        return res.status(400).json({ mensagem: 'Preencha os campos: nome, cpf, data_nascimento, telefone, email, senha. Pois são obrigatórios' });
    }

    const usuarioIgual = bancodedados.contas.find((conta) => {
        return conta.usuario.cpf === cpf || conta.usuario.email === email
    });

    if (usuarioIgual) {
        return res.status(400).json({ mensagem: 'Já existe uma conta com o cpf ou e-mail informado!' })
    };

    if (bancodedados.contas.length > 0) {
        numero = bancodedados.contas[bancodedados.contas.length - 1].numero++
    };

    const conta = {
        numero,
        saldo: 0,
        usuario: {
            ...req.body
        }
    };

    bancodedados.contas.push(conta);

    return res.status(201).json();
};

const atualizarDadosDeUsuario = (req, res) => {
    const { nome, cpf, data_nascimento, telefone, email, senha } = req.body;
    const { numeroConta } = req.params

    if (!nome || !cpf || !data_nascimento || !telefone || !email || !senha) {
        return res.status(400).json({ mensagem: 'Preencha os campos: nome, cpf, data_nascimento, telefone, email, senha. Pois são obrigatórios' });
    };

    const usuarioComMesmoCpfOuEmail = bancodedados.contas.find((conta) => {
        return Number(conta.usuario.cpf) === Number(cpf) || Number(conta.usuario.email) === Number(email)
    });

    if (usuarioComMesmoCpfOuEmail) {
        return res.status(400).json({ mensagem: 'Já existe uma conta com o cpf ou e-mail informado!' });
    };


    const numeroContaValido = bancodedados.contas.find((conta) => {
        return Number(conta.numero) === Number(numeroConta);
    });

    if (!numeroContaValido) {
        return res.status(400).json({ mensagem: 'O número da conta informado é inválido!' });
    }

    numeroContaValido.usuario = {
        ...req.body
    };

    return res.status(204).json();
};

const excluirConta = (req, res) => {
    const { numeroConta } = req.params

    const contaMesmoNumero = bancodedados.contas.find((conta) => {
        return Number(conta.numero) === Number(numeroConta)
    });

    if (!contaMesmoNumero) {
        return res.status(400).json({ mensagem: 'O número da conta informada é inválido!' });
    }

    const saldoVerificado = bancodedados.contas.find((conta) => {
        return Number(conta.saldo) === 0
    });

    if (!saldoVerificado) {
        return res.status(403).json({ mensagem: 'A conta só pode ser removida se o saldo for zero!' });
    }

    const indiceConta = bancodedados.contas.indexOf(contaMesmoNumero);

    bancodedados.contas.splice(indiceConta);

    return res.status(204).json();
};

const mostrarSaldo = (req, res) => {
    const { numero_conta, senha } = req.query

    if (!numero_conta || !senha) {
        return res.status(400).json({ mensagem: 'O número da conta e a senha são obrigatórios!' })
    }

    const contaVerificada = bancodedados.contas.find((conta) => {
        return Number(conta.numero) === Number(numero_conta);
    });

    if (!contaVerificada) {
        return res.status(400).json({ mensagem: 'O número da conta informado é inválido!' });
    }

    const senhaVerificada = contaVerificada.usuario.senha === senha;

    if (!senhaVerificada) {
        return res.status(400).json({ mensagem: 'A senha informado é inválida!' });
    }

    res.send({ saldo: contaVerificada.saldo })
};

const consultarExtrato = (req, res) => {
    const { numero_conta, senha } = req.query

    if (!numero_conta || !senha) {
        return res.status(400).json({ mensagem: 'O número da conta e a senha são obrigatórios!' })
    }

    const contaVerificada = bancodedados.contas.find((conta) => {
        return Number(conta.numero) === Number(numero_conta);
    });

    if (!contaVerificada) {
        return res.status(400).json({ mensagem: 'O número da conta informado é inválido!' });
    }

    const senhaVerificada = contaVerificada.usuario.senha === senha;

    if (!senhaVerificada) {
        return res.status(400).json({ mensagem: 'A senha da conta informado é inválida!' });
    }

    res.send({
        transferencia: bancodedados.transferencias,
        depositos: bancodedados.depositos,
        saques: bancodedados.saques
    });
};

module.exports = {
    listarContasBancarias,
    novaConta,
    atualizarDadosDeUsuario,
    excluirConta,
    mostrarSaldo,
    consultarExtrato
}