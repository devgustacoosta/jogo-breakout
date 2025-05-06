import { imagens } from "../utils/constantes.js";

class Jogador {
    constructor(canvasWidth, canvasHeight) {
        this.width = 140;
        this.height = 20;
        this.velocidade = 15;
        this.posicao = {
            x: canvasWidth / 2 - this.width / 2,
            y: canvasHeight - this.height,
        }

        this.imagem = new Image();
        this.imagem.src = imagens.base;
    }

    moveLeft() {
        this.posicao.x -= this.velocidade;
    }

    moveRight() {
        this.posicao.x += this.velocidade;
    }

    desenhar(contexto) {
        if (this.imagem.complete) {
            contexto.drawImage(
                this.imagem,
                this.posicao.x,
                this.posicao.y,
                this.width,
                this.height
            );
        } else {
            contexto.fillStyle = "red";
            contexto.fillRect(this.posicao.x, this.posicao.y, this.width, this.height);
        }
    }
}

export default Jogador;