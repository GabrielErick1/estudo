<!DOCTYPE html>
<html lang="pt-br">
<head>
    <meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Jogo de Adivinhação</title>
<style>
body {
    font-family: Arial, sans-serif;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100vh;
    margin: 0;
    background-color: #f0f0f0;
}
#game {
    text-align: center;
    background-color: #fff;
    padding: 20px;
    border-radius: 10px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}
input {
    padding: 10px;
    font-size: 16px;
    margin-top: 10px;
    width: 200px;
    text-align: center;
}
button {
    margin-top: 10px;
    padding: 10px 20px;
    border: none;
    background-color: #007bff;
    color: white;
    font-size: 16px;
    cursor: pointer;
    border-radius: 5px;
}
</style>
</head>
<body>
<div id="game">
    <h1>Adivinhe o Número!</h1>
<p>Pense em um número entre 1 e 100.</p>
<input type="text" id="feedbackInput" placeholder="Digite 'Muito Alto', 'Muito Baixo' ou 'Correto'">
<button onclick="playGame()">Começar!</button>
    <p id="message"></p>
    </div>

    <script>
    let min = 1;
let max = 100;
let guess;

function playGame() {
    guess = Math.floor((min + max) / 2);
    document.getElementById('message').innerText = `Meu palpite é ${guess}.`;
    let feedbackInput = document.getElementById('feedbackInput');
    feedbackInput.style.display = 'inline-block';
    feedbackInput.focus();

    feedbackInput.addEventListener('change', function() {
        let feedback = feedbackInput.value.trim().toLowerCase();
        if (feedback === 'muito alto') {
            max = guess - 1;
        } else if (feedback === 'muito baixo') {
            min = guess + 1;
        } else if (feedback === 'correto') {
            alert('Eu acertei!');
            feedbackInput.style.display = 'none';
            document.getElementById('message').innerText = 'Jogo finalizado. Obrigado por jogar!';
            return;
        }
        feedbackInput.value = '';
        playGame();
    });
}
</script>
</body>
</html>
<!DOCTYPE html>
<html lang="pt-br">
<head>
    <meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Jogo de Adivinhação</title>
<style>
body {
    font-family: Arial, sans-serif;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100vh;
    margin: 0;
    background-color: #f0f0f0;
}
#game {
    text-align: center;
    background-color: #fff;
    padding: 20px;
    border-radius: 10px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}
input {
    padding: 10px;
    font-size: 16px;
    margin-top: 10px;
    width: 200px;
    text-align: center;
}
button {
    margin-top: 10px;
    padding: 10px 20px;
    border: none;
    background-color: #007bff;
    color: white;
    font-size: 16px;
    cursor: pointer;
    border-radius: 5px;
}
</style>
</head>
<body>
<div id="game">
    <h1>Adivinhe o Número!</h1>
<p>Pense em um número entre 1 e 100.</p>
<input type="text" id="feedbackInput" placeholder="Digite 'Muito Alto', 'Muito Baixo' ou 'Correto'">
<button onclick="playGame()">Começar!</button>
    <p id="message"></p>
    </div>

    <script>
    let min = 1;
let max = 100;
let guess;

function playGame() {
    guess = Math.floor((min + max) / 2);
    document.getElementById('message').innerText = `Meu palpite é ${guess}.`;
    let feedbackInput = document.getElementById('feedbackInput');
    feedbackInput.style.display = 'inline-block';
    feedbackInput.focus();

    feedbackInput.addEventListener('change', function() {
        let feedback = feedbackInput.value.trim().toLowerCase();
        if (feedback === 'muito alto') {
            max = guess - 1;
        } else if (feedback === 'muito baixo') {
            min = guess + 1;
        } else if (feedback === 'correto') {
            alert('Eu acertei!');
            feedbackInput.style.display = 'none';
            document.getElementById('message').innerText = 'Jogo finalizado. Obrigado por jogar!';
            return;
        }
        feedbackInput.value = '';
        playGame();
    });
}
</script>
</body>
</html>
<!DOCTYPE html>
<html lang="pt-br">
<head>
    <meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Jogo de Adivinhação</title>
<style>
body {
    font-family: Arial, sans-serif;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100vh;
    margin: 0;
    background-color: #f0f0f0;
}
#game {
    text-align: center;
    background-color: #fff;
    padding: 20px;
    border-radius: 10px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}
input {
    padding: 10px;
    font-size: 16px;
    margin-top: 10px;
    width: 200px;
    text-align: center;
}
button {
    margin-top: 10px;
    padding: 10px 20px;
    border: none;
    background-color: #007bff;
    color: white;
    font-size: 16px;
    cursor: pointer;
    border-radius: 5px;
}
</style>
</head>
<body>
<div id="game">
    <h1>Adivinhe o Número!</h1>
<p>Pense em um número entre 1 e 100.</p>
<input type="text" id="feedbackInput" placeholder="Digite 'Muito Alto', 'Muito Baixo' ou 'Correto'">
<button onclick="playGame()">Começar!</button>
    <p id="message"></p>
    </div>

    <script>
    let min = 1;
let max = 100;
let guess;

function playGame() {
    guess = Math.floor((min + max) / 2);
    document.getElementById('message').innerText = `Meu palpite é ${guess}.`;
    let feedbackInput = document.getElementById('feedbackInput');
    feedbackInput.style.display = 'inline-block';
    feedbackInput.focus();

    feedbackInput.addEventListener('change', function() {
        let feedback = feedbackInput.value.trim().toLowerCase();
        if (feedback === 'muito alto') {
            max = guess - 1;
        } else if (feedback === 'muito baixo') {
            min = guess + 1;
        } else if (feedback === 'correto') {
            alert('Eu acertei!');
            feedbackInput.style.display = 'none';
            document.getElementById('message').innerText = 'Jogo finalizado. Obrigado por jogar!';
            return;
        }
        feedbackInput.value = '';
        playGame();
    });
}
</script>
</body>
</html>
<!DOCTYPE html>
<html lang="pt-br">
<head>
    <meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Jogo de Adivinhação</title>
<style>
body {
    font-family: Arial, sans-serif;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100vh;
    margin: 0;
    background-color: #f0f0f0;
}
#game {
    text-align: center;
    background-color: #fff;
    padding: 20px;
    border-radius: 10px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}
input {
    padding: 10px;
    font-size: 16px;
    margin-top: 10px;
    width: 200px;
    text-align: center;
}
button {
    margin-top: 10px;
    padding: 10px 20px;
    border: none;
    background-color: #007bff;
    color: white;
    font-size: 16px;
    cursor: pointer;
    border-radius: 5px;
}
</style>
</head>
<body>
<div id="game">
    <h1>Adivinhe o Número!</h1>
<p>Pense em um número entre 1 e 100.</p>
<input type="text" id="feedbackInput" placeholder="Digite 'Muito Alto', 'Muito Baixo' ou 'Correto'">
<button onclick="playGame()">Começar!</button>
    <p id="message"></p>
    </div>

    <script>
    let min = 1;
let max = 100;
let guess;

function playGame() {
    guess = Math.floor((min + max) / 2);
    document.getElementById('message').innerText = `Meu palpite é ${guess}.`;
    let feedbackInput = document.getElementById('feedbackInput');
    feedbackInput.style.display = 'inline-block';
    feedbackInput.focus();

    feedbackInput.addEventListener('change', function() {
        let feedback = feedbackInput.value.trim().toLowerCase();
        if (feedback === 'muito alto') {
            max = guess - 1;
        } else if (feedback === 'muito baixo') {
            min = guess + 1;
        } else if (feedback === 'correto') {
            alert('Eu acertei!');
            feedbackInput.style.display = 'none';
            document.getElementById('message').innerText = 'Jogo finalizado. Obrigado por jogar!';
            return;
        }
        feedbackInput.value = '';
        playGame();
    });
}
</script>
</body>
</html>
