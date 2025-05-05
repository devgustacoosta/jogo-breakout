import Jogador from "./classes/Jogador.js";
import Bola from "./classes/Bola.js";
import Tijolos from "./classes/Tijolos.js";

const canvas = document.querySelector("canvas");
const contexto = canvas.getContext("2d");

canvas.tabIndex = 0;
canvas.focus();
canvas.width = innerWidth / 1.5;
canvas.height = innerHeight / 1.5;

const jogador = new Jogador(canvas.width, canvas.height);
const bola = new Bola(canvas.width / 2, canvas.height - 30, canvas);
const tijolos = new Tijolos(canvas.width);

const keys = {
    left: false,
    right: false,
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

    jogar()
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
}

loop();