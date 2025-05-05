class Jogador {
    constructor(canvasWidth, canvasHeight) {
        this.width = 133;
        this.height = 29;
        this.velocidade = 20;
        this.posicao = {
            x: canvasWidth / 2 - this.width / 2,
            y: canvasHeight - this.height,
        }
    }

    moveLeft() {
        this.posicao.x -= this.velocidade;
    }

    moveRight() {
        this.posicao.x += this.velocidade;
    }

    desenhar(contexto) {
        contexto.fillStyle = "red";
        contexto.fillRect(this.posicao.x, this.posicao.y, this.width, this.height);
    }
}

export default Jogador;