const listaFrases = [
    "Dia da Família na Caterpillar", // Título da Foto 1
    "Mãe e eu pequeno na casa da vó", // Título da Foto 2
    "Descansando no sofá da casa da vó", // Título da Foto 3
];

const listaImagens = [
    "/img/1.jpeg", // Foto 1
    "/img/2.jpeg", // Foto 2
    "/img/3.jpeg"  // Foto 3
];

const listaMensagensCarinhosas = [
    "Obrigado por sempre fazer de tudo para me ver sorrir. Esse dia foi incrível!",
    "Lembrar de como você me protegia quando eu era pequeno me enche de paz. Te amo infinito!",
    "Não existe lugar mais seguro e confortável no mundo do que perto de você.",
    "Cada momento com você é uma memória preciosa que guardo no meu coração.",
    "Obrigado pelos conselhos, pela paciência e por ser a melhor mãe que eu poderia pedir."
];

const frase = document.getElementById('frase');
const mensagemCarinhosa = document.getElementById('mensagem-carinhosa');
const imagem = document.getElementById('imagem');
const musica = document.getElementById('musica-fundo');

let indiceAtual = -1; // Esse índice único vai amarrar a foto com a descrição dela
let indiceMensagemAtual = -1; // Índice solto apenas para as mensagens carinhosas
let musicaJaComecou = false;

function sortearDiferente(tamanhoLista, indiceAnterior) {
    let novoSorteio;
    do {
        novoSorteio = Math.floor(Math.random() * tamanhoLista);
    } while (novoSorteio === indiceAnterior && tamanhoLista > 1);
    return novoSorteio;
}

function atualizarConteudo() {
    // 1. Sorteia um índice para a imagem e a frase (assim elas ficam sempre juntas)
    indiceAtual = sortearDiferente(listaImagens.length, indiceAtual);
    
    // 2. Sorteia outro índice separado para a mensagem carinhosa extra
    indiceMensagemAtual = sortearDiferente(listaMensagensCarinhosas.length, indiceMensagemAtual);

    // Usa o mesmo "indiceAtual" para manter a foto e o título conectados
    frase.textContent = listaFrases[indiceAtual];
    imagem.src = listaImagens[indiceAtual];
    
    // Mostra a mensagem carinhosa aleatória
    mensagemCarinhosa.textContent = `"${listaMensagensCarinhosas[indiceMensagemAtual]}"`;

    // Anima a foto e o texto juntos
    imagem.classList.remove('animar-conteudo');
    mensagemCarinhosa.classList.remove('animar-conteudo');
    void imagem.offsetWidth; 
    imagem.classList.add('animar-conteudo');
    mensagemCarinhosa.classList.add('animar-conteudo');
}

// Carrega o primeiro conteúdo
atualizarConteudo();

function proximaFoto(event) {
    // Toca a música no primeiro clique
    if (!musicaJaComecou && musica) {
        musica.volume = 0.5; // Deixa o volume em 50%
        musica.play().catch(e => console.log("Aguardando interação para tocar áudio."));
        musicaJaComecou = true;
    }

    atualizarConteudo();
    
    // Efeito de emojis explodindo
    for(let i = 0; i < 6; i++) {
        setTimeout(() => {
            criarCoracao(event.clientX, event.clientY);
        }, i * 70); 
    }
}

function criarCoracao(x, y) {
    const coracao = document.createElement('div');
    const emojis = ['❤️', '💖', '💕', '🌸', '✨', '👩‍👦']; 
    coracao.textContent = emojis[Math.floor(Math.random() * emojis.length)];
    coracao.classList.add('coracao');
    
    const espalhamentoX = (Math.random() - 0.5) * 100;
    const espalhamentoY = (Math.random() - 0.5) * 100;
    
    coracao.style.left = (x + espalhamentoX) + 'px';
    coracao.style.top = (y + espalhamentoY) + 'px';
    coracao.style.fontSize = (Math.random() * 1.5 + 1.2) + 'rem';
    
    document.body.appendChild(coracao);

    setTimeout(() => {
        coracao.remove();
    }, 1500);
}