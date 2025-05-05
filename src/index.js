import { imagens, score, vidas, Paginas, estado } from "./utils/constantes.js";
import Jogador from "./classes/Jogador.js";
import Bola from "./classes/Bola.js";
import Tijolos from "./classes/Tijolos.js";

const canvas = document.querySelector("canvas");
const contexto = canvas.getContext("2d");

const inputNome = document.querySelector("#nome");
const botaoJogar = document.querySelector(".inicio button");
const divInicio = document.querySelector(".inicio");

const botaoReiniciar = document.querySelector(".final button");
const divFinal = document.querySelector(".final");
const resultado = document.querySelector(".resultado");


canvas.tabIndex = 0;
canvas.focus();
canvas.width = innerWidth / 1.5;
canvas.height = innerHeight / 1.3;

const jogador = new Jogador(canvas.width, canvas.height);
const bola = new Bola(canvas.width / 2, canvas.height - 30, canvas);
const tijolos = new Tijolos(canvas.width);

const imgMenu = new Image();
imgMenu.src = imagens.home;

const imgRestart = new Image();
imgRestart.src = imagens.restart;

const imgVidas = new Image();
imgVidas.src = imagens.vida;

estado.paginaAtual = Paginas.INICIAL;

const keys = {
    left: false,
    right: false,
}

botaoJogar.addEventListener("click", () => {
    const nome = inputNome.value.trim();

    if (nome.length === 0) {
        alert("Por favor, insira seu nome.");
        return;
    }

    score.nome = nome;
    estado.paginaAtual = Paginas.JOGANDO;

    divInicio.style.display = "none";
    canvas.style.display = "block";
});

if (estado.paginaAtual === Paginas.INICIAL) {
    divInicio.style.display = "flex";
    canvas.style.display = "none";
    divFinal.style.display = "none";
} else if (estado.paginaAtual === Paginas.JOGANDO) {
    divInicio.style.display = "none";
    canvas.style.display = "block";
    divFinal.style.display = "none";
} else if (estado.paginaAtual === Paginas.FINAL) {
    divInicio.style.display = "none";
    canvas.style.display = "none";
    divFinal.style.display = "flex";
}

addEventListener("keydown", (event) => {
    const key = event.key.toLowerCase();
    if (key === "a" || key === "arrowleft") keys.left = true;
    if (key === "d" || key === "arrowright") keys.right = true;
});

addEventListener("keyup", (event) => {
    const key = event.key.toLowerCase();
    if (key === "a" || key === "arrowleft") keys.left = false;
    if (key === "d" || key === "arrowright") keys.right = false;
});

function loop() {
    contexto.clearRect(0, 0, canvas.width, canvas.height);

    if (estado.paginaAtual === Paginas.JOGANDO) {
        desenharMenu();
        desenharIcones();
        jogar()
    } else if (estado.paginaAtual === Paginas.DERROTA) {
        desenharMenu();
        desenharIcones();
    } else if (estado.paginaAtual === Paginas.VITORIA) {
        desenharMenu();
        desenharIcones();
    }
    requestAnimationFrame(loop);
}

function jogar() {
    if (keys.left && jogador.posicao.x >= 0) jogador.moveLeft();
    if (keys.right && jogador.posicao.x <= canvas.width - jogador.width) jogador.moveRight();

    bola.atualizar(jogador);
    bola.desenhar(contexto);
    jogador.desenhar(contexto);
    tijolos.desenharTodos(contexto);
    tijolos.verificarColisao(bola);
    desenharIcones();
    desenharMenu();
}

function desenharMenu() {
    contexto.fillStyle = "white";
    contexto.font = "20px Arial";
    contexto.fillText(`Score: ${score.pontuacao}`, 0, 30);
    for (let i = 0; i < vidas.quantidade; i++) {
        contexto.filter = "brightness(0) invert(1)";
        contexto.drawImage(imgVidas, 100 + i * 35, 8, 30, 30);
        contexto.filter = "none";
    }
}

function desenharIcones() {
    const iconY = 8;
    const iconWidth = 30;
    const iconHeight = 30;

    if (imgMenu.complete) {
        contexto.filter = "brightness(0) invert(1)";
        contexto.drawImage(imgMenu, canvas.width - 70, iconY, iconWidth, iconHeight);
        contexto.filter = "none";
    }

    if (imgRestart.complete) {
        contexto.filter = "brightness(0) invert(1)";
        contexto.drawImage(imgRestart, canvas.width - 35, iconY, iconWidth, iconHeight);
        contexto.filter = "none";
    }
}

loop();