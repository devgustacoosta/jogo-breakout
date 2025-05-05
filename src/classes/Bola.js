class Bola {
    constructor(x, y, canvas) {
        this.x = x;
        this.y = y;
        this.dx = 4;
        this.dy = -4;
        this.radius = 20;
        this.canvas = canvas;
    }

    atualizar(jogador) {
        if (this.x + this.dx > this.canvas.width - this.radius || this.x + this.dx < this.radius) {
            this.dx = -this.dx;
        }
    
        if (this.y + this.dy < this.radius) {
            this.dy = -this.dy;
        }
    
        else if (this.y + this.dy > this.canvas.height - this.radius) {
            const colideComJogador =
                this.x + this.radius > jogador.posicao.x &&
                this.x - this.radius < jogador.posicao.x + jogador.width;
    
            if (colideComJogador) {
                this.dy = -this.dy;
            } else {
                window.location.reload();
            }
        }
    
        this.x += this.dx;
        this.y += this.dy;
    }
    
    desenhar(contexto) {
        contexto.beginPath();
        contexto.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        contexto.fillStyle = 'blue';
        contexto.fill();
        contexto.closePath();
    };

    reiniciar(x, y) {
        this.x = x;
        this.y = y;
        this.dx = 4;
        this.dy = -4;
    }
}



export default Bola;