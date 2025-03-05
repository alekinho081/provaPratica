const canvas = document.getElementById('game');
const ctx = canvas.getContext('2d');
let gameover = false

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

document.addEventListener("click", (e) => {
    if(gameover==true){
        location.reload()
    }
})



class Entidade {
    #gravidade
    #pontuacao
    constructor(x, y, largura, altura, cor) {
        this.x = x
        this.y = y
        this.largura = largura
        this.altura = altura
        this.cor = cor
        this.#gravidade = 3
        this.#pontuacao = 0
    }
    desenhar = function () {
        ctx.fillStyle = this.cor
        ctx.fillRect(this.x, this.y, this.largura, this.altura);
    }
    getGravidade = function () {
        return this.#gravidade
    }
    
}

class Personagem extends Entidade {
    #velocidadeX
    constructor(x, y, largura, altura, cor) {
        super(x, y, largura, altura, cor)
        this.#velocidadeX = 5
        this.andando = false
        this.direcao = 0
    }
    getvelocidadeX = function () {
        return this.#velocidadeX
    }

    andar() {
        if (this.andando && !gameover) {
            this.x += this.#velocidadeX * this.direcao;
        }
    }
    verificaColisao = function () {
        if (this.x >= canvas.width - this.largura) {
            this.x = canvas.width - this.largura
        } else if (this.x <= 0) {
            this.x = 0
        }
    }
}

class Bola extends Entidade {
    constructor(x, y, largura, altura, cor) {
        super(x, y, altura, largura, cor)
        this.caindo = true
        this.direcao = false
    }
    Caindo = function () {
        this.andandoHorizontal()
        if (this.caindo) {
            let i = this.getGravidade()
            this.y += i
        } else {
            let i = this.getGravidade() * -1
            this.y += i
        }
    }
    andandoHorizontal = function () {
        if(!this.direcao){
            let i = this.getGravidade()
            this.x += i
        }else {
            let i = this.getGravidade() * -1
            this.x += i
        }
    }

    verificaColisao = function () {
        if (this.x <= personagem.x + personagem.largura &&
            this.x + this.largura >= personagem.x &&
            this.y <= personagem.y + personagem.altura &&
            this.y + this.altura >= personagem.y
        ) {
            this.caindo = false
        }

        if (this.x >= canvas.width - this.largura) {
            this.direcao = true
        } else if (this.x <= 0) {
            this.direcao = false
        }else if(this.y <= 0){
            this.caindo = true
        }else if(this.y >= canvas.height - this.largura){
            gameover = true
        }
    }
}

class Quadrado extends Entidade{
    constructor(x, y, largura, altura, cor) {
        super(x, y, altura, largura, cor)
    }

    verificaColisao = function (){
        if (bola.x <= this.x + this.largura &&
            bola.x + bola.largura >= this.x &&
            bola.y <= this.y + this.altura &&
            bola.y + bola.altura >= this.y
        ) {
            this.x = 100000000000000
            if(!bola.caindo){
                bola.caindo = !bola.caindo
            }else{
                bola.caindo = !bola.caindo
            }
        }
    }

}


function gameOver(){
    if(gameover){
        ctx.fillStyle='red'
        ctx.fillRect((canvas.width/2)-150,(canvas.height/2)-50,310,80)
        ctx.fillStyle='black'
        ctx.font='50px Arial'
        ctx.fillText("Game Over", (canvas.width/2)-120,(canvas.height/2))
    }
}

let personagem = new Personagem(canvas.width - 240, canvas.height - 50, 75, 25, 'blue')
let bola = new Bola(canvas.width - 210, canvas.height - 350, 10, 10, 'white')
let quad = new Quadrado(canvas.width - 210, 200, 20, 30, 'green')

let quadrados = []
for (let i = 0; i < 10; i++) {
    let x = 5 + i * 40;
    let y = 200
    let largura = 10
    let altura = 30
    let cor = 'green'

    quadrados.push(new Quadrado(x, y, largura, altura, cor))
}

function loop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    personagem.desenhar()
    personagem.andar()
    personagem.verificaColisao()
    bola.desenhar()
    bola.Caindo()
    bola.verificaColisao()
    quadrados.forEach(quad => {
        quad.desenhar()
        quad.verificaColisao()
    });
    gameOver()


    requestAnimationFrame(loop)
}

loop()