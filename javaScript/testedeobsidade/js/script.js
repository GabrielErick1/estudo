const nome1 = document.getElementById('digite1')
const idade1 = document.getElementById('digite2')
const peso1 = document.getElementById('digite3')
const res = document.getElementById('resposta1')
const res1 = document.getElementById('resposta')

function clicar() {
    
let aluno_academia = {
    id: 10,
    nome: `${nome1.value}`,
    altura: `${idade1.value}`,
    peso: `${peso1.value}`
};

var nome_aluno = aluno_academia.nome;
var peso_aluno = aluno_academia.peso;
var altura_aluno = aluno_academia.altura;

var imc_aluno = (peso_aluno / (altura_aluno * altura_aluno)).toFixed(2); // formatrando peso
res.innerHTML = "O IMC do "+ nome_aluno +" é de: " + imc_aluno;

if ( imc_aluno < 18.5 ) {
    res1.innerHTML = "Tome cuidado " + nome_aluno + " você está abaixo do peso";
} else if( imc_aluno >= 18.5 && imc_aluno <= 24.99) {
    res1.innerHTML = "Muito bem " + nome_aluno + " você está com o peso normal";
} else {
    res1.innerHTML = "Tome Muito cuidado " + nome_aluno + "você está acima do peso";
}

}