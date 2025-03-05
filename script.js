const canvas = document.getElementById('game');
const ctx = canvas.getContext('2d');

class Entidade{
    constructor(x,y, largura, altura){
        this.x = x
        this.y = y
        this.largura = largura
        this.altura = altura
    }   
    desenhar = function(cor){
        ctx.fillStyle = cor
        ctx.fillRect(this.x, this.y, this.largura, this.altura)
    }
    atualizar = function(){
        console.log("Função de atualizar caso seja preciso")
    }
}