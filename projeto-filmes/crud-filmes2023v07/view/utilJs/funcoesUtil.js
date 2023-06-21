function limparSpan(idElemento) {
    document.querySelector(idElemento).textContent = "";
}

function exibirMensagem(elemento, msg) {
    document.querySelector(elemento).classList.remove('msgErro');
    document.querySelector(elemento).classList.add('msgSucesso');
    document.querySelector(elemento).textContent = msg;
}

function exibirMensagemErro(elemento, msg) {
    document.querySelector(elemento).classList.remove('msgSucesso');
    document.querySelector(elemento).classList.add('msgErro');
    document.querySelector(elemento).textContent = msg;
}

const paginaLogin = "../view/index.html";

function fazFetch(url, metodo, objetoLiteral, cbSucesso, cbErro) {
    let configMetodo = null;
    if (metodo == "GET") {
        configMetodo = {
            headers: { "Content-Type": "application/json;charset=UTF-8" }
        };
    } else {
        configMetodo = {
            method: metodo
            , body: JSON.stringify(objetoLiteral)
            , headers: { "Content-Type": "application/json;charset=UTF-8" }
        };
    }
    fetch(url, configMetodo)
        .then(resposta => {
            if (!resposta.ok) {
                if (resposta.status === 401)
                    window.location.href = paginaLogin;
                let msg = `${resposta.status} - ${resposta.statusText}`;
                throw new Error(msg);
            }
            return resposta.json();
        })
        .then(respostaJSON => {
            if (!respostaJSON.erro)
                cbSucesso(respostaJSON);
            else
                cbErro(respostaJSON.msgErro);
        })
        .catch(erro => {
            cbErro(erro);
        });
}

const obterValorDaColunaId = link => {
    let coluna = link.parentNode;//Adquire o td.
    let linha = coluna.parentNode;//Adquire o tr.
    let id = linha.firstChild;//Adquire o campo id o qual é o primeiro elemento do tr.
    return parseInt(id.textContent);
}

export { limparSpan, exibirMensagem, exibirMensagemErro, fazFetch, obterValorDaColunaId };