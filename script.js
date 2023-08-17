let seuVotoPara = document.querySelector('.d-1-1 span'); // cria uma variavel 'seuVotoPara' com a seleção do elemento no HTML com a tag span dentro da classe 'd-1-1'
let cargo = document.querySelector('.d-1-2 span'); // cria uma variavel 'cargo' com a seleção do elemento no HTML com a tag span dentro da classe 'd-1-2'
let descricao = document.querySelector('.d-1-4'); // cria uma variavel 'descricao' com a seleção do elemento no HTML com a classe 'd-1-4'
let aviso = document.querySelector('.d-2'); // cria uma variavel 'aviso' com a seleção do elemento no HTML com a classe 'd-2'
let lateral = document.querySelector('.d-1-right'); // cria uma variavel 'lateral' com a seleção do elemento no HTML com a classe 'd-1-right'
let numeros = document.querySelector('.d-1-3'); // cria uma variavel 'numeros' com a seleção do elemento no HTML com a classe 'd-1-3'

let etapaAtual = 0; // define uma variavel para a etapa da votação atual com o valor inicial de 0
let numero = ''; // define uma variavel número que irá receber os números da votação com o valor inicial vazio
let votoBranco = false; // define uma variavel votoBranco para verificar se o voto será em branco ou não, com um boolean inicialmente setado como false
let votos = []; // define uma variavel votos que irá armazenar os votos confirmados com um array inicialmente vazio


function comecarEtapa() { // cria a função de inicialização das etapas da votação
    let etapa = etapas[etapaAtual]; // define a variavel etapa com o valor etapaAtual(0) de etapas(puxando o objeto do arquivo etapas.js), que se refere ao item vereador

    let numeroHtml = ''; // define a variavel numeroHtml com o valor inicial vazio
    numero = ''; // atribui o valor vazio a variavel número novamente
    votoBranco = false; // atribui o valor false a variavel votoBranco novamente

    for(let i=0;i<etapa.numeros;i++){ // cria um lanço de repetição que começa em 0, e repete até o número da propriedade números da variavel etapa que tem o valor etapaAtual do objeto etapas(5 sendo etapaAtual = 0, 2 sendo etapaAtual = 1)
        if(i === 0) { // se i for igual a 0 
            numeroHtml += '<div class="numero pisca"></div>'; // é adicionado a variavel numeroHtml uma div com a classe numero pisca
        } else { // se i não for igual a 0
            numeroHtml += '<div class="numero"></div>'; // é adicionado a variavel numeroHtml uma div com a classe numero
        }
    }

    seuVotoPara.style.display = 'none'; // seleciona os elementos Html da variavel seuVotoPara e altera o seu style display para 'none'
    cargo.innerHTML = etapa.titulo; // seleciona os elementos Html da variavel cargo e insere em seu Html a propriedade titulo da variavel etapa que se consiste no objeto etapas na posição da etapaAtual(na 1etapa(0) o titulo será VEREADOR, na 2etapa(1) o titulo será PREFEITO)
    descricao.innerHTML = ''; // seleciona os elementos Html da variavel descricao e insere em seu Html um vazio
    aviso.style.display = 'none'; // seleciona os elementos Html da variavel aviso e altera o seu style display para 'none'
    lateral.innerHTML = ''; // seleciona os elementos Html da variavel lateral e insere em seu Html um vazio
    numeros.innerHTML = numeroHtml; // seleciona os elementos Html da variavel numeros e insere em seu Html a variavel numeroHtml

} // termina a função de inicialização das etapas da votação

function atualizaInterface() { // cria a função que atualiza a interface
    let etapa = etapas[etapaAtual]; // define a variavel etapa com o valor de etapaAtual(0) de etapas(VEREADOR)
    let candidato = etapa.candidatos.filter((item)=>{ // define a variavel candidato com uma função de filtro aonde percorre os itens do array candidatos na etapa(valor de etapaAtual em etapas.js) e ao percorrer pede a seguinte verificação
        if(item.numero === numero) { // se a propriedade numero do item filtrado for igual a variavel numero, o item inteiro será armazenado na variavel candidato
            return true; // se a condição for verdade, irá retornar true, ou seja, o item inteiro será armazenado na variavel candidato
        } else { // se a propriedade numero do item filtrado NÂO for igual a variavel numero, o item NÂO será armazenado na variavel candidato
            return false; // se a condição for falsa, irá retornar false, ou seja, o item NÂO será armazenado na variavel candidato
        }
    }); // finaliza a verificação da variavel numero com o numero dos candidatos da etapa atual
    if(candidato.length > 0) { // se candidato.length for maior que 0, ou seja, se a variavel candidato tiver algum item inserido dentro de si
        candidato = candidato[0]; // atribui à variavel candidato, as propriedades do primeiro item (0) que passou na filtragem de candidato
        seuVotoPara.style.display = 'block'; // seleciona os elementos Html da variavel seuVotoPara e altera seu style display para block
        aviso.style.display = 'block'; // seleciona os elementos Html da variavel aviso e altera seu style display para block
        descricao.innerHTML = `Nome: ${candidato.nome}<br/>Partido: ${candidato.partido}`; // seleciona os elementos Html da variavel descricao e insere em seu html o template string com "Nome: propriedade nome do candidato escolhido <br/> Partido: propriedade partido do candidato escolhido"

        let fotosHtml = ''; // define a variavel fotosHtml com um valor vazio
        for(let i in candidato.fotos) { // faz um laço de repetição referente a quantidade de items presente na propriedade fotos de candidato
            if(candidato.fotos[i].small) { // verifica se a propriedade small existe no objeto fotos do candidato , caso a condição for verdadeira:
            fotosHtml += `<div class="d-1-image small"><img src="images/${candidato.fotos[i].url}" alt=""/>${candidato.fotos[i].legenda}</div>`; // é incrementado ao fotosHtml o template string com a classe small 
        } else { // caso a condição for fala:
            fotosHtml += `<div class="d-1-image"><img src="images/${candidato.fotos[i].url}" alt=""/>${candidato.fotos[i].legenda}</div>`; // é incrementado ao fotosHtml o template string sem a classe small
        }
    }
        lateral.innerHTML = fotosHtml; // seleciona os elementos Html da variavel lateral e insere em seu Html a variavel fotosHtml
    } else { // se candidato.length NÂO FOR MAIOR QUE 0, ou seja, se NÂO houver nenhum item inserido na variavel candidato
        seuVotoPara.style.display = 'block'; // seleciona os elementos Html da variavel seuVotoPara e altera seu style display para 'block'
        aviso.style.display = 'block'; // seleciona os elementos Html da variavel aviso e altera seu style display para 'block'
        descricao.innerHTML = '<div class="aviso--grande pisca">VOTO NULO </div>'; // seleciona os elementos Html da variavel descricao e insere em seu Html o template string
    }
} // termina a função de atualização da interface

function clicou(n) { // cria a função que verifica o clique na tecla da urna
    let elNumero = document.querySelector('.numero.pisca'); // cria uma variavel que seleciona o elemento Html com a classe numero e com a classe pisca
    if(elNumero !== null) { // verifica se a variavel é diferente de nulo, se a condição for verdadeira, ou seja, tiver a classe numero e a classe pisca
        elNumero.innerHTML = n; // seleciona os elementos Html da variavel ElNumero e insere em seu Html a variavel n (tecla que for apertada na urna)
        numero = `${numero}${n}`; // define a variavel numero com o template string da variavel numero e da variavel n(tecla que foi apertada na urna)

        elNumero.classList.remove('pisca'); // seleciona os elementos Html da variavel ElNumero e abre sua lista de classes e remove a classe pisca
        if(elNumero.nextElementSibling !== null) { // verifica se existe algum elemento depois do elemento Html da variavel ElNumero, se existir:
            elNumero.nextElementSibling.classList.add('pisca'); // seleciona os elementos Html da variavel ElNumero e no elemento próximo ao da variavel, abre sua lista de classes e adiciona a classe pisca
        } else { // se não existir nenhum elemento depois do elemento Html da variavel ElNumero
            atualizaInterface(); // executa a função de atualizar a interface
        }
    }
} // termina a função clicou

function branco() { // cria a função que verifica voto em branco
    if(numero === ''){ // verifica se a variavel numero está vazia
        votoBranco = true; // altera a variavel votoBranco inicialmente false para true
        seuVotoPara.style.display = 'block'; // seleciona os elementos Html da variavel seuVotoPara e altera seu style display para block
        aviso.style.display = 'block'; // seleciona os elementos Html da variavel aviso e altera seu style display para block
        numeros.innerHTML = ''; // seleciona os elementos Html da variavel numeros e insere em seu Html um vazio
        descricao.innerHTML = '<div class="aviso--grande pisca">VOTO EM BRANCO </div>'; // seleciona os elementos Html da variavel descricao e insere em seu Html o template string
    } else { // caso a variavel numero não esteja vazia
        alert('Para votar em BRANCO, não pode ter digitado nenhum número!'); // é enviado um alert com a mensagem atribuida
    }
} // termina a função que verifica voto em branco

function corrige() { // cria a função corrige
    comecarEtapa(); // executa a função comecarEtapa
} // termina a função corrige

function confirma() { // cria a função confirmar 
    let etapa = etapas[etapaAtual]; // define a variavel etapa com o valor de etapaAtual(0) de etapas(VEREADOR)

    let votoConfirmado = false; // define a variavel votoConfirmado como false

    if(votoBranco === true) { // verifica se a variavel votoBranco esta como true, caso seja verdadeiro:
        votoConfirmado = true; // define a variavel votoConfirmado como true
        votos.push({ // da um push na array votos
            etapa: etapas[etapaAtual].titulo, // define a variavel etapa com o valor da propriedade titulo da etapaAtual de etapas
            voto: 'branco' // define a variavel voto como 'branco'
        })
    } else if(numero.length === etapa.numeros) { // caso a verificação de votoBranco como true seja falsa, verifica se a quantidade de items no número é igual a quantidade de items da propriedade números de etapa(verifica se é Vereador ou Prefeito)
        votoConfirmado = true; // define a variavel votoConfirmado como true
        votos.push({ // da um push na array votos
            etapa: etapas[etapaAtual].titulo, // define a variavel etapa com o valor da propriedade titulo da etapaAtual de etapas
            voto: numero // define a variavel voto como a variavel numero
    })
}
    if(votoConfirmado) { // verifica se votoConfirmado é true, caso seja verdadeiro:
        etapaAtual++; // é incrementado um número na EtapaAtual, ou seja, vai para a próxima etapa, de 0 para 1
        if(etapas[etapaAtual] !== undefined){ // verifica se etapaAtual(número da etapa) de etapas é diferente de undefined, ou seja, caso ainda tenha etapas para percorrer, executa o seguinte código:
            comecarEtapa(); // executa a função comecarEtapa
        } else{ // caso a etapaAtual(número da etaoa) de etapas é igual undefined, ou seja, não tem mais etapas para percorrer, executa o seguinte código:
        document.querySelector('.tela').innerHTML = '<div class="aviso--gigante pisca">FIM</div>'; // seleciona o elemento do Html com a classe 'tela' e insere em seu html o template string
        console.log(votos); // exibe no console a variavel votos
        }
    }
} // termina a função confirmar

comecarEtapa(); // executa a função começar etapa