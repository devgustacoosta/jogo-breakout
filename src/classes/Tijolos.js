import Tijolo from "./Tijolo.js";

class Tijolos {
    constructor(canvasWidth) {
        this.colunas = parseInt((innerWidth / 1.5) / 100);
        this.linhas = 4;
        this.altura = 20;
        this.espacamento = 15;
        this.largura = (canvasWidth - (this.colunas - 1) * this.espacamento) / this.colunas;
        this.offsetTop = 60;
        this.offsetLeft = (canvasWidth - (this.colunas * this.largura + (this.colunas - 1) * this.espacamento)) / 2;
        this.grade = [];
        this.qtdeBlocos = this.colunas * this.linhas;
        this.criarTijolos();
    }

    criarTijolos() {
        for (let c = 0; c < this.colunas; c++) {
            this.grade[c] = [];
            for (let l = 0; l < this.linhas; l++) {
                const x = c * (this.largura + this.espacamento) + this.offsetLeft;
                const y = l * (this.altura + (this.espacamento - 5)) + this.offsetTop;
                this.grade[c][l] = new Tijolo(x, y, this.largura, this.altura);
            }
        }
    }

    desenharTodos(contexto) {
        for (let coluna of this.grade) {
            for (let tijolo of coluna) {
                tijolo.desenhar(contexto);
            }
        }
    }

    verificarColisao(bola) {
        for (let coluna of this.grade) {
            for (let tijolo of coluna) {
                if (tijolo.colideCom(bola)) {
                    bola.dy = -bola.dy;
                    tijolo.ativo = 0;
                }
            }
        }
    }
}

export default Tijolos;