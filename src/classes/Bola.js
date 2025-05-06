import { vidas, Paginas, estado, score, imagens } from "../utils/constantes.js";

class Bola {
    constructor(x, y, canvas) {
        this.x = x;
        this.y = y;
        this.dx = 4;
        this.dy = -4;
        this.radius = 20;
        this.canvas = canvas;
        this.imagem = new Image();
        this.imagem.src = imagens.bola;
    }

    atualizar(jogador) {
        if (this.x + this.dx > this.canvas.width - this.radius || this.x + this.dx < this.radius) {
            this.dx = -this.dx;
        }

        if (this.y + this.dy < this.radius) {
            this.dy = -this.dy;
        } else if (this.y + this.dy > this.canvas.height - this.radius) {
            const colideComJogador =
                this.x + this.radius > jogador.posicao.x &&
                this.x - this.radius < jogador.posicao.x + jogador.width;

            if (colideComJogador) {
                this.dy = -this.dy;
            } else {
                vidas.quantidade -= 1;
                if (vidas.quantidade > 0) {
                    this.reiniciar(this.canvas.width / 2, this.canvas.height - 30);
                } else {
                    score.resultado = "Você perdeu!"
                    estado.paginaAtual = Paginas.FINAL;
                }
            }
        }

        this.x += this.dx;
        this.y += this.dy;
    }

    desenhar(contexto) {
        if (this.imagem.complete) {
            contexto.drawImage(
                this.imagem,
                this.x - this.radius,
                this.y - this.radius,
                this.radius * 2,
                this.radius * 2
            );
        } else {
            this.imagem.onload = () => {
                contexto.drawImage(
                    this.imagem,
                    this.x - this.radius,
                    this.y - this.radius,
                    this.radius * 2,
                    this.radius * 2
                );
            };
        }
    };

    reiniciar(x, y) {
        this.x = x;
        this.y = y;
        this.dx = 4;
        this.dy = -4;
    }
}

export default Bola;