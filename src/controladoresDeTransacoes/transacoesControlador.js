let bancodedados = require('../bancodedados');

const realizarDeposito = (req, res) => {
    let { numero_conta, valor } = req.body;

        if (!numero_conta || !valor) {
            return res.status(400).json({ mensagem: 'O número da conta e o valor são obrigatórios!'})
        }

    let contaVerificada = bancodedados.contas.find((conta) => {
           return Number(conta.numero) === Number(numero_conta);
    });

        if (!contaVerificada) {
             return res.status(400).json({ mensagem: 'A conta informada não existe' })
        }
        
        if (valor <= 0) {
             return res.status(400).json({ mensagem: 'Não é possível realizar o depósito do valor informado'})
        }

    contaVerificada.saldo += Number(valor);
    

    let deposito = {
        data: new Date(),
        numero_conta,
        valor
    }

    bancodedados.depositos.push(deposito)
    
    return res.status(204).json();
};

const sacarDinheiro = (req, res) => {
    let { numero_conta, valor, senha } = req.body
        
        if (!numero_conta || !valor || !senha) {
             return res.status(400).json({ mensagem: 'O número da conta, o valor e a senha são obrigatórios!'})
        }
    
    let contaVerificada = bancodedados.contas.find((conta) => {
          return Number(conta.numero) === Number(numero_conta);
    });

        if (!contaVerificada) {
             return res.status(400).json({ mensagem: 'A conta informada não existe' })
        } 

    let senhaVerificada = Number(contaVerificada.usuario.senha) === Number(senha);
   
       if (!senhaVerificada) {
        return res.status(400).json({ mensagem: 'A senha informada é inválida' })
       }
    
    let saldoVerificado = bancodedados.contas.some((conta) => {
        return Number(conta.saldo) >= Number(valor)
    });

       if (!saldoVerificado) {
             return res.status(403).json({ mensagem: 'Não é possível realizar saque, pois o valor informado é maior que seu saldo' });
       }
    
    contaVerificada.saldo -= Number(valor);


    let saque = {
        data: new Date(),
        numero_conta,
        valor
    }

    bancodedados.saques.push(saque)
    
    return res.status(204).json();
};

const fazerTransferencias = (req, res) => {
    let { numero_conta_origem, numero_conta_destino, valor, senha} = req.body

    if (!numero_conta_origem || !numero_conta_destino || !valor || !senha ) {
            return res.status(400).json({ mensagem: 'o numero da conta de origem, o numero da conta de destino, o valor e a senha são obrigatórios!' })
    }
    let contaDeOrigem = bancodedados.contas.find((conta) => {
        return Number(conta.numero) === Number(numero_conta_origem);
    });
        
    if (!contaDeOrigem) {
        return res.status(400).json({ mensagem: 'Conta de origem ou conta de destino informadas não existe!' })
    }
    
    let contaDeDestino = bancodedados.contas.find((conta) => {
        return Number(conta.numero) === Number(numero_conta_destino);
    });

    if (!contaDeDestino) {
        return res.status(400).json({ mensagem: 'Conta de origem ou conta de destino informadas não existe!' })
    }

    let senhaVerificada = contaDeOrigem.usuario.senha === senha;
       
    if (!senhaVerificada) {
        return res.status(400).json({ mensagem: 'A senha informada é inválida' })
    }
    
    let saldoVerificado = contaDeOrigem.saldo > valor;
    
    if (!saldoVerificado) {
        return res.status(403).json({ mensagem: 'Não é possível realizar a transferência, pois o valor informado é maior que seu saldo' });
    }

    contaDeOrigem.saldo -= valor;
    contaDeDestino.saldo += valor;
 
    let transfencia = {
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