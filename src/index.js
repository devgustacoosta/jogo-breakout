import { imagens, score, vidas, Paginas, estado } from "./utils/constantes.js";
import Jogador from "./classes/Jogador.js";
import Bola from "./classes/Bola.js";
import Tijolos from "./classes/Tijolos.js";

const canvas = document.querySelector("canvas");
const contexto = canvas.getContext("2d");

const inputNome = document.querySelector("#nome");
const botaoJogar = document.querySelector(".inicio button");
const divInicio = document.querySelector(".inicio");

const botaoReiniciar = document.querySelector("#btn-reiniciar");
const botaoMenu = document.querySelector("#btn-menu");
const divFinal = document.querySelector(".final");
const resultado = document.querySelector(".resultado");
const painelRanking = document.querySelector(".ranking");

let ranking = JSON.parse(localStorage.getItem('ranking')) || [];

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

function iniciarJogo (){
    const nome = inputNome.value.trim();

    if (nome.length === 0) {
        alert("Por favor, insira seu nome.");
        return;
    }

    reiniciarJogo();
    score.nome = nome;
    estado.paginaAtual = Paginas.JOGANDO;

    divInicio.style.display = "none";
    canvas.style.display = "block";
}

botaoJogar.addEventListener("click",iniciarJogo);
divInicio.addEventListener("keydown", (tecla) => {
    if(tecla.key === 'Enter' || tecla.key ==='Space' || tecla.key ===' '){
        iniciarJogo();
    }
});

botaoReiniciar.addEventListener("click", () => {
    reiniciarJogo();
});

botaoMenu.addEventListener("click", () => {
    estado.paginaAtual = Paginas.INICIAL;
});

function atualizarTela() {
    if (estado.paginaAtual === Paginas.INICIAL) {
        inputNome.focus();
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
        telaFinal();
    }
}

function telaFinal() {
    const indice = ranking.findIndex(item => item.nome === score.nome);

    if (indice >= 0) {
        if (score.pontuacao > ranking[indice].pontos) {
            ranking[indice].pontos = score.pontuacao;
        }
    } else {
        ranking.push({ nome: score.nome, pontos: score.pontuacao });
    }

    ranking.sort((a, b) => b.pontos - a.pontos);
    ranking = ranking.slice(0, 5);
    localStorage.setItem('ranking', JSON.stringify(ranking));

    resultado.textContent = `${score.resultado}`;
    let html = "<h3>Ranking</h3>";
    for (let i = 0; i < ranking.length; i++) {
        html += `<p>${i + 1}. ${ranking[i].nome} - ${ranking[i].pontos} pontos</p>`;
    }
    painelRanking.innerHTML = html;
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
    }

    atualizarTela();
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

const icones = {
    menu: {
        x: canvas.width - 70,
        y: 8,
        width: 30,
        height: 30
    },
    restart: {
        x: canvas.width - 35,
        y: 8,
        width: 30,
        height: 30
    }
};


function desenharIcones() {
    if (imgMenu.complete) {
        contexto.filter = "brightness(0) invert(1)";
        contexto.drawImage(imgMenu, icones.menu.x, icones.menu.y, icones.menu.width, icones.menu.height);
        contexto.filter = "none";
    }

    if (imgRestart.complete) {
        contexto.filter = "brightness(0) invert(1)";
        contexto.drawImage(imgRestart, icones.restart.x, icones.restart.y, icones.restart.width, icones.restart.height);
        contexto.filter = "none";
    }
}

canvas.addEventListener("click", (event) => {
    const rect = canvas.getBoundingClientRect();
    const mouseX = event.clientX - rect.left;
    const mouseY = event.clientY - rect.top;

    if (clicouDentro(mouseX, mouseY, icones.menu)) {
        estado.paginaAtual = Paginas.INICIAL;
        atualizarTela();
    }

    if (clicouDentro(mouseX, mouseY, icones.restart)) {
        reiniciarJogo();
    }
});

function clicouDentro(x, y, icone) {
    return (
        x >= icone.x &&
        x <= icone.x + icone.width &&
        y >= icone.y &&
        y <= icone.y + icone.height
    );
}

function reiniciarJogo() {
    score.pontuacao = 0;
    score.resultado = "";

    vidas.quantidade = 3;

    jogador.posicao.x = canvas.width / 2 - jogador.width / 2;
    jogador.posicao.y = canvas.height - jogador.height;

    bola.reiniciar(canvas.width / 2, canvas.height - 30);

    tijolos.criarTijolos();
    tijolos.ativos = tijolos.qtdeBlocos;

    estado.paginaAtual = Paginas.JOGANDO;
    atualizarTela();
}


loop();