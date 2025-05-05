class Tijolo {
    constructor(x, y, largura, altura) {
        this.x = x;
        this.y = y;
        this.largura = largura;
        this.altura = altura;
        this.ativo = 1;
    }

    desenhar(contexto) {
        if (this.ativo) {
            contexto.beginPath();
            contexto.rect(this.x, this.y, this.largura, this.altura);
            contexto.fillStyle = "green";
            contexto.fill();
            contexto.closePath();
        }
    }

    colideCom(bola) {
        const dentroHorizontalmente =
            bola.x + bola.radius > this.x && bola.x - bola.radius < this.x + this.largura;

        const dentroVerticalmente =
            bola.y + bola.radius > this.y && bola.y - bola.radius < this.y + this.altura;

        return this.ativo && dentroHorizontalmente && dentroVerticalmente;
    }

}

export default Tijolo;