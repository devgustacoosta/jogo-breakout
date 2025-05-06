class Tijolo {
    constructor(x, y, largura, altura, imgTijolo) {
        this.x = x;
        this.y = y;
        this.largura = largura;
        this.altura = altura;
        this.ativo = 1;
        this.imagem = imgTijolo;
    }

    desenhar(contexto) {
        if (this.ativo) {
            if (this.imagem && this.imagem.complete && this.imagem.naturalHeight !== 0) {
                contexto.drawImage(this.imagem, this.x, this.y, this.largura, this.altura);
            } else {
                contexto.beginPath();
                contexto.rect(this.x, this.y, this.largura, this.altura);
                contexto.fillStyle = "rgba(128, 128, 128, 0.5)";
                contexto.fill();
                contexto.closePath();
            }
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