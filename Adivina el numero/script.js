// 1. Generar el número aleatorio
let randomNumber = Math.floor(Math.random() * 100) + 1;

// 2. Referencias a los elementos del DOM
const guesses = document.querySelector('.guesses');
const lastResult = document.querySelector('.lastResult');
const lowOrHi = document.querySelector('.lowOrHi');
const guessSubmit = document.querySelector('#guessSubmit');
const guessField = document.querySelector('#guessField');
const resetButton = document.querySelector('#resetButton');

let guessCount = 1;

function checkGuess() {
    const userGuess = Number(guessField.value);

    // Mostrar números probados anteriormente
    if (guessCount === 1) {
        guesses.textContent = 'Intentos anteriores: ';
    }
    guesses.textContent += userGuess + ' ';

    // Lógica principal
    if (userGuess === randomNumber) {
        lastResult.textContent = '¡Felicidades! ¡Adivinaste el número!';
        lastResult.className = 'lastResult success';
        lowOrHi.textContent = '';
        setGameOver();
    } else if (guessCount === 10) {
        lastResult.textContent = '!!!FIN DEL JUEGO!!! Se acabaron los intentos.';
        lastResult.className = 'lastResult error';
        lowOrHi.textContent = `El número era ${randomNumber}`;
        setGameOver();
    } else {
        lastResult.textContent = '¡Incorrecto!';
        lastResult.className = 'lastResult error';
        
        if (userGuess < randomNumber) {
            lowOrHi.textContent = '¡El número es más grande!';
        } else if (userGuess > randomNumber) {
            lowOrHi.textContent = '¡El número es más pequeño!';
        }
    }

    guessCount++;
    guessField.value = '';
    guessField.focus();
}

// Escuchar el click o la tecla Enter
guessSubmit.addEventListener('click', checkGuess);

function setGameOver() {
    guessField.disabled = true;
    guessSubmit.disabled = true;
    resetButton.style.display = 'inline-block';
    resetButton.addEventListener('click', resetGame);
}

function resetGame() {
    guessCount = 1;
    const resetParas = document.querySelectorAll('.resultParas p');
    for (const resetPara of resetParas) {
        resetPara.textContent = '';
        resetPara.className = '';
    }

    resetButton.style.display = 'none';
    guessField.disabled = false;
    guessSubmit.disabled = false;
    guessField.value = '';
    guessField.focus();
    
    randomNumber = Math.floor(Math.random() * 100) + 1;
}