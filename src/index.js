const express = require('express');
const app = express();

function somarDigitos(quantidadeDigitos, cpf) {

    let soma = 0;

    for (let i = 1; i <= quantidadeDigitos; i++) {
        soma = soma + parseInt(cpf.substring(i - 1, i)) * ((quantidadeDigitos + 2) - i);
    }

    return soma;
}

function verificarResto(soma, cpf, quantidadeDigitos) {

    let resto = (soma * 10) % 11;
    let verificado = true;

    if ((resto == 10) || (resto == 11)) {
        resto = 0;
    }

    if (resto != parseInt(cpf.substring(quantidadeDigitos, quantidadeDigitos + 1))) {
        verificado = false;
    }

    return verificado;
}

function validarCpf(cpf) {

    if (cpf == '00000000000' || cpf.length != 11) {
        return false;
    }

    let vericado = true;

    vericado = verificarResto(somarDigitos(9, cpf), cpf, 9);
    vericado = verificarResto(somarDigitos(10, cpf), cpf, 10);

    return vericado;
}

app.get('/validar/:cpf/', function (req, res) {

    const cpf = req.params.cpf;
    
    if (validarCpf(cpf)){
        res.json({ "valido": true });
    } else{
        res.json({ "valido": false });
    }
})

app.listen(3000, function () {
    console.log("Server is running on url http://localhost:3000");
})