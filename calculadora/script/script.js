let armazenamentoDados = [];
let acumu = 10;

const Insert = (e) => {
    armazenamentoDados.push(e);
    document.getElementById("total").innerHTML = armazenamentoDados.join('');
};

const Result = () => {
    let resultado = parseFloat(armazenamentoDados[0]);
    let operador = null;

    for (let i = 1; i < armazenamentoDados.length; i += 2) {
        if (armazenamentoDados[i] === 'x' || armazenamentoDados[i] === '-' || armazenamentoDados[i] === '+' || armazenamentoDados[i] === '/') {
             operador = armazenamentoDados[i];
        }

        const proximoNumero = parseFloat(armazenamentoDados[i + 1]);
        switch (operador) {
            case '+':
                resultado += proximoNumero;
                break;
            case '-':
                resultado -= proximoNumero;
                break;
            case 'x':
                resultado *= proximoNumero;
                break;
            case '/':
                resultado /= proximoNumero;
                break;
        }
    }

    document.getElementById("total").innerHTML = resultado;
};

function CleanCurrentEntry() {
    armazenamentoDados.pop();
    document.getElementById("total").innerHTML = armazenamentoDados.join('');
}

function CleanAll() {
    armazenamentoDados = [];
    document.getElementById("total").innerHTML = null;
}