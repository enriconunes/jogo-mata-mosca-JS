
// OBTER TAMAHO DA TELA
var height = window.innerHeight;
var width = window.innerWidth;

// Funcao chamada em '<body onresize="ajustaTamanhoTela()">'
function ajustaTamanhoTela(){
    height = window.innerHeight;
    width = window.innerWidth;
}
// console.log(height, width)

// DEFINIR O CRONOMETRO E A FUNCAO DE PARAGEM (VITORIA)
var tempo = 30;
document.getElementById('cronometro').innerHTML = tempo

var cronometro = setInterval(function(){
        tempo -= 1
        document.getElementById('cronometro').innerHTML = tempo
        if(tempo < 0){
            // Quando chega ao fim, redireciona para a pag 'vitoria.html' e pausa o intervalo automatico das funçoes abaixo
            window.location.href = './vitoria.html'
            clearInterval(cronometro)
            clearInterval(criaMosca)
        }
}, 1000)

var contador = 0;
// CRIAR POSIÇÕES ALEATÓRIAS e POSICIONAR A MOSCA
function definePosicaoRandom(){

    // remover SE existir (remove a mosca para inserir outra)
    // se a funcao 'remove()' for chamada, entao 'mosca' nao vai existir, portanto, a condicao deste 'if' será falsa e o contador nao será incrementado
    if(document.getElementById('mosca')){
        document.getElementById('mosca').remove()

        // contagem de pontos perdidos
        contador++;
        console.log(contador)
        if(contador === 1){
            document.getElementById('v1').src = "../imagens/coracao_vazio.png"
        }
        if (contador === 2) {
            document.getElementById('v2').src = "../imagens/coracao_vazio.png"
        }
        if (contador === 3) {
            document.getElementById('v3').src = "../imagens/coracao_vazio.png"
        }
        if (contador > 3){
            window.location.href = './fim_de_jogo.html'
            clearInterval(criaMosca)
        }
    }

    // Determina valores aleatorios entre 0 e tamanho da tela - 90px
    var positionY = Math.floor((Math.random() * height)) - 90
    var positionX = Math.floor((Math.random() * width)) - 90

    positionX = positionX < 0 ? 0 : positionX
    positionY = positionY < 0 ? 0 : positionY

    //criar elemento html
    var mosca = document.createElement('img')
    mosca.src = '../imagens/mosca.png'
    mosca.className = tamanhoRandom() + " " + ladoRandom()
    mosca.style.left = positionX + 'px'
    mosca.style.top = positionY + 'px'
    mosca.style.position = 'absolute'
    document.body.appendChild(mosca)
    mosca.id = 'mosca'
    mosca.onclick = function(){
        this.remove()
    }
    
}
// console.log(positionX, positionY)


// DETERMINAR CLASSES DE TAMANHO E LADO ALEATORIOS

function tamanhoRandom(){
    var classe = Math.floor(Math.random() * 3) //valores entre 0 e 2
    
    switch(classe){
        case 0:
            return 'mosca-1'
        case 1:
            return 'mosca-2'
        case 2:
            return 'mosca-3'
    }
}

function ladoRandom() {
    var classe = Math.floor(Math.random() * 2) //valores entre 0 e 1

    switch (classe) {
        case 0:
            return 'lado-a'
        case 1:
            return 'lado-b'
    }
}

// Ao selecionar o nivel na pagina inicial, a pagina é redirecionada para a pagina do jogo, entretanto, com o nivel descrito na url. Portanto, com o window.location.search, conseguimos recuperar o valor passado a partir da '?' (search) da pagina atual (pagina do jogo)
// Recuperar o nivel pela url passada pelo inicio do jogo
var nivel = window.location.search
nivel = nivel.replace('?', '') //remocao da interrogaçao 

var criaMoscaTempo = 1700

if (nivel === 'nivel-1') {
    criaMoscaTempo = 1700
}
if (nivel === 'nivel-2') {
    criaMoscaTempo = 1200
}
if (nivel === 'nivel-3') {
    criaMoscaTempo = 950
}

// POSICIONAR E REMOVER A MOSCA AUTOMATICAMENTE
// Executar a funcao principal
var criaMosca = setInterval(function(){
    definePosicaoRandom()
}, criaMoscaTempo)


//Voltar ao inicio/reiniciar
function retornar(){
    window.location.href = '../index.html'
}
