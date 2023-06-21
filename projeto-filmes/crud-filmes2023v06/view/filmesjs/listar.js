//Quando a página for carregada:
window.onload = () => {
    //Vai ser executado a função adquirirá os filmes:
    filmeListarFetch();
    //Já carrega os gêneros no modal através de outra requisição assíncrona
    //Vai ser importante isso para quando utilizarmos o inserir um novo gênero.
    //filmeListarGeneroInserirFetch();
}
$corpoTabela = document.querySelector("tbody");
const filmeListarFetch = () => {
    $corpoTabela.innerHTML = "";
    fetch("../controller/filmeListar.php")
        .then(resposta => {
            if (resposta.ok == false) {
                let msg = `${resposta.status} - ${resposta.statusText}`;
                throw new Error(msg);
            } else
                return resposta.json();
        })
        .then(respostaJSON => {
            if (respostaJSON.erro == false)
                cbSucessoListarFilme(respostaJSON);
            else
                throw new Error(respostaJSON.msgErro);
        })
        .catch(erro => {
            cbErroListarFilme(erro);
        })
}
//Funções que poderiam ser de callback?
const cbSucessoListarFilme = respostaJSON => {
    montarTabela(respostaJSON.dados);
}

const cbErroListarFilme = erro => {
    document.querySelector("#msgErro").textContent = erro;
}

const montarTabela = dados => {
    for (const i in dados) {
        let filme = dados[i];
        const $tr = document.createElement("tr");
        criarTDePendurar($tr, filme.id, false);
        criarTDePendurar($tr, filme.titulo, false);
        criarTDePendurar($tr, filme.avaliacao, false);
        criarTDePendurar($tr, filme.genero_descricao, false);
        let links = `<a href="#">[Editar]</a><a href="#">[Excluir]<a>`;
        criarTDePendurar($tr, links, true);
        $corpoTabela.appendChild($tr);
    }
}

const criarTDePendurar = (noPai, informacao, ehHTML) => {
    let $td = document.createElement("td");
    ehHTML ? $td.innerHTML = informacao : $td.textContent = informacao;
    noPai.appendChild($td);
}
//O criação desse ouvidor de eventos serve para conferir se o usuário apertou nos elementos âncoras da tabela.
$corpoTabela.addEventListener('click', event => {
    //A primeira verificão determina se o elemento é uma âncaro
    if (event.target.tagName === "A") {
        let link = event.target;
        //A função abaixo adquire o valor do id do filme por uma navegaçãopelo DOM
        let filmeID = obterValorDaColunaID(link);
        if (filmeID > 0 && link.textContent === "[Excluir]")
            filmeExcluirFetch(filmeID);
        if (filmeID > 0 && link.textContent === "[Editar]")
            filmeBuscarFetch(filmeID);
    }
});

const obterValorDaColunaID = link => {
    let coluna = link.parentNode;
    let linha = coluna.parentNode;
    let idText = linha.firstChild;
    return parseInt(idText.textContent);
}
//Função para limpar as mensagens de erro e sucesso
const limparSpans = () => {
    document.querySelector("#msgErro").textContent = "";
    document.querySelector("#msgSucesso").textContent = "";
}