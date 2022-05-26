const wordContainer = document.getElementById('wordContainer');
const startButton = document.getElementById('startButton');
const ingresarButton = document.getElementById('ingresarButton');
const usedLettersElements = document.getElementById('usedLetters');
const mensajeFinal = document.getElementById('mensajeFinal');
const areaOculta = document.getElementById('ocultado');
const ingresarNuevaPalabra = document.getElementById('botonOcultado');
const palabraNueva = document.getElementById('textOcultado');
const volverInicio = document.getElementById('volverInicio');

let canvas = document.getElementById('canvas');
let ctx = canvas.getContext('2d');
ctx.canvas.width = 0;
ctx.canvas.height = 0;

const bodyParts = [
    [8,3,3,3],
    [9,6,1,4],
    [7,7,2,1],
    [10,7,2,1],
    [8,10,1,2],
    [10,10,1,2]
];

let selectedWord;
let usedLetters;
let mistakes;
let hits;

const addLetter = letter => {
    const letterElement = document.createElement('span');
    letterElement.innerHTML = letter.toUpperCase();
    usedLettersElements.appendChild(letterElement);
}

const addBodyPart = bodyPart => {
    ctx.fillStyle = 'white';
    ctx.fillRect(...bodyPart);
}

const wrongLetter = () => {
    addBodyPart(bodyParts[mistakes]);
    mistakes++;
    if(mistakes == bodyParts.length) endGame();
}

const endGame = () => {
    document.removeEventListener('keydown', letterEvent);
    startButton.style.display = 'block';
    if(hits < selectedWord.length){
        mensajeFinal.innerHTML = 'Lo siento, perdiste...';
        mensajeFinal.style.display = 'block';
        startButton.style.display = 'block';
    }else{
        mensajeFinal.innerHTML = 'Felicidades, ganaste!!!';
        mensajeFinal.style.display = 'block';
        startButton.style.display = 'block';
    }
}

const correctLetter = letter => {
    const {children} = wordContainer;
    for(let i = 0; i < children.length; i++) {
        if(children[i].innerHTML === letter) {
            children[i].classList.toggle('hidden');
            hits++;
        }
    }
    if(hits === selectedWord.length) endGame();
}

const letterInput = letter => {
    if(selectedWord.includes(letter)){
        correctLetter(letter);
    } else{
        wrongLetter();
    }
    addLetter(letter);
    usedLetters.push(letter);
}

const letterEvent = event => {
    let newLetter = event.key.toUpperCase();
    if(newLetter.match(/^[a-zñ]$/i) && !usedLetters.includes(newLetter)) {
        letterInput(newLetter);
    }
}

const dibujarPalabra = () => {
    selectedWord.forEach(letter => {
        const letterElement = document.createElement('span');
        letterElement.innerHTML = letter.toUpperCase();
        letterElement.classList.add('letter');
        letterElement.classList.add('hidden');
        wordContainer.appendChild(letterElement);
    });
}

const seleccionarPalabraRandom = () => {
    let word = words[Math.floor((Math.random() * words.length))].toUpperCase();
    selectedWord = word.split('');
}

const dibujarAhorcado = () => {
    ctx.canvas.width = 300;
    ctx.canvas.height = 300;
    ctx.scale(20,20);
    ctx.clearRect(0,0, canvas.width, canvas.height);
    ctx.fillStyle = 'black';
    ctx.fillRect(4, 14, 7, 1);
    ctx.fillRect(5, 0, 1, 14);
    ctx.fillRect(6, 0, 4, 1);
    ctx.fillRect(9, 1, 1, 2);
}

const startGame = () => {
    usedLetters = [];
    mistakes = 0;
    hits = 0;
    wordContainer.innerHTML = '';
    usedLettersElements.innerHTML = '';
    startButton.style.display = 'none';
    ingresarButton.style.display = 'none';
    mensajeFinal.innerHTML = '';
    dibujarAhorcado();
    seleccionarPalabraRandom();
    dibujarPalabra();
    document.addEventListener('keydown', letterEvent);
}

const ingresarPalabra = () => {
    startButton.style.display = 'none';
    ingresarButton.style.display = 'none';
    areaOculta.style.display = 'flex';
}

const IngresarNewWord = () => {
    words.push(palabraNueva.value);
    event.preventDefault() ;
    console.log(words);
    alert('Palabra agregada con exito!!');
}

const volverMenu = () => {
    event.preventDefault();
    startButton.style.display = 'block';
    ingresarButton.style.display = 'block';
    areaOculta.style.display = 'none';
}

ingresarNuevaPalabra.addEventListener('click', IngresarNewWord)
ingresarButton.addEventListener('click', ingresarPalabra);
startButton.addEventListener('click', startGame);
volverInicio.addEventListener('click', volverMenu)