const canvas = document.getElementById('game');
const ctx = canvas.getContext('2d');

addEventListener('keydown', (e) => {
    if (e.key === 'd') {
        personagem.andando = true;
        personagem.direcao = 1;
    } else if (e.key === 'a') {
        personagem.andando = true;
        personagem.direcao = -1;
    }
});

addEventListener('keyup', (e) => {
    if (e.key === 'd' || e.key === 'a') {
        personagem.andando = false;
    }
});



class Entidade{
    #gravidade
    constructor(x,y, largura, altura, cor){
        this.x = x
        this.y = y
        this.largura = largura
        this.altura = altura
        this.cor = cor
        this.#gravidade = 3
    }   
    desenhar = function(){
        ctx.fillStyle = this.cor
        ctx.fillRect(this.x, this.y, this.largura, this.altura);
    }
    getGravidade = function (){
        return this.#gravidade
    }
}

class Personagem extends Entidade{
    #velocidadeX
    constructor(x, y, largura, altura, cor){
        super(x, y, largura, altura, cor)
        this.#velocidadeX = 5
        this.andando = false
        this.direcao = 0
    }
    getvelocidadeX = function(){
        return this.#velocidadeX
    }

    andar() {
        if (this.andando) {
            this.x += this.#velocidadeX * this.direcao;
        }
    }
    verificaColisao = function(){
        if(this.x >= canvas.width-this.largura){
            this.x =canvas.width-this.largura
        }else if(this.x <= 0){
            this.x = 0
        }
    }
}

class Bola extends Entidade{
    constructor(x,y,largura,altura,cor){
        super(x,y,altura,largura,cor)
        this.caindo = true
        this.subindo = false
    }
    Caindo = function(){
        if(this.caindo){
            let i = this.getGravidade()
            this.y += i
        }else {
            let i = this.getGravidade() * -1
            this.y += i
        }
    }
    verificaColisao = function(){
        if(this.x <= personagem.x + personagem.largura &&
            this.x + this.largura >= personagem.x &&
            this.y <= personagem.y + personagem.altura &&
            this.y + this.altura >= personagem.y
        ){
            this.caindo = false
        }
    }

}

let personagem = new Personagem(canvas.width-240, canvas.height-50, 75, 25,'blue')
let bola = new Bola(canvas.width-210, canvas.height-350, 10,10,'white')
function loop(){
    ctx.clearRect(0,0,canvas.width,canvas.height)
    personagem.desenhar()
    personagem.andar()
    personagem.verificaColisao()
    bola.desenhar()
    bola.Caindo()
    bola.verificaColisao()
    

    requestAnimationFrame(loop)
}
    
loop()