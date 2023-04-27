window.onload = () => {
    generoListarFetch();
};
const $corpoTabela = document.querySelector('tbody');
//Um fetch usa o método GET por default. Por isso não precisamos explicitar
const generoListarFetch = () => {
    $corpoTabela.innerHTML = ``;
    fetch("../controller/generoListar.php")
        .then(resposta => {
            if (resposta.ok === false) {
                let msg = `${resposta.status} - ${resposta.statusText}`;
                // Lança um objeto msg do tipo Error que será capturado pelo .catch
                throw new Error(msg);
            } else
                return resposta.json();
        })
        .then(respostaJSON => {
            if (respostaJSON.erro === false)
                cbSucessoListarGenero(respostaJSON);
            else
                // Lança um objeto com o conteúdo do respostaJSON.msgErro do tipo Error que será capturado pelo .catch
                throw new Error(respostaJSON.msgErro)
        })
        .catch(erro => {
            cbErroListarGenero(erro);
        })
};
//Função de callback
const cbSucessoListarGenero = respostaJSON => {
    montarTabela(respostaJSON.dados);
};

const cbErroListarGenero = erro => {
    document.querySelector('#msgErro').textContent = erro;
};

//Esta função cria as linhas da tabela com os dados (gereros) recebidos da CONTROLLER
const montarTabela = dados => {
    for (const i in dados) {
        let genero = dados[i];
        console.log(genero);
        const $tr = document.createElement('tr');
        //Para cada atributo faça:
        criarTDePendurar($tr, genero.id, false);
        criarTDePendurar($tr, genero.descricao, false);
        // let links = `<a href=generoFormBuscar.html?id="${genero.id}">[Editar]</a> <a href=#>[Excluir]</a>`;
        let links = `<a href="#">[Editar]</a><a href="#">[Excluir]</a>`
        criarTDePendurar($tr, links, true);
        //Pendura a linha criada a cada iteração no tbody da tabela
        $corpoTabela.appendChild($tr);
    }//Fim do for in
}//Fim da função

//Lógica de exclusão de um gênero. A função excluirGenero está em generosjs/excluir.js
$corpoTabela.addEventListener('click', event => {
    if (event.target.tagName === 'A') {
        let link = event.target;
        let generoId = obterValorDaColunaId(link);
        if (generoId > 0 && link.textContent == "[Excluir]")
            //A função abaixo está no generoJs/excluir.js
            generoExcluirFetch(generoId);
        else
            if (generoId > 0 && link.textContent == "[Editar]")
                //A função abaixo está no generoJS/buscar.js
                generoBuscarFetch(generoId);
    }
});

function obterValorDaColunaId(link) {
    if (link.textContent === "[Excluir]" || link.textContent === "[Editar]") {
        //parentNode = nó pai
        let coluna = link.parentNode;
        let linha = coluna.parentNode;
        //firstChild = primeiro filho
        let idText = linha.firstChild;
        return parseInt(idText.textContent);
    }
    return null;
}

function criarTDePendurar(noPai, informacao, ehHtml) {
    let td = document.createElement('td');
    ehHtml ? td.innerHTML = informacao : td.textContent = informacao;
    noPai.appendChild(td);
}
