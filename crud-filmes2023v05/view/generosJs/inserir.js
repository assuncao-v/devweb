//Recupéra o forumário de inserir o gênero e adciona um ouvidor de eventos 
const $formInserir = document.querySelector('#form-inserir')
$formInserir.addEventListener('submit', event => {
    event.preventDefault();
    generoInserirFetch();
    $("#modal-formulario-inserir").modal("hide");
});

const generoInserirFetch = () => {
    let genero = {
        "descricao": $formInserir.querySelector('#descricao').value,
    };
    let configMetodo = {
        method: "POST",
        body: JSON.stringify(genero),
        headers: { "Content-Type": "application/json;charset=UTF-8" }
    };
    //fetch enviando o genero a ser inserido
    fetch("../controller/generoInserir.php", configMetodo)
        .then(resposta => {
            if (resposta.ok === false) {
                let msg = `${resposta.status} - ${resposta.statusText}`;
                throw new Error(msg);
            }
            else
                return resposta.json();
        })
        .then(respostaJSON => {
            if (respostaJSON.erro === false)
                cbSucessoInserirGenero(respostaJSON);
            else
                throw new Error(respostaJSON.msgErro);
        })
        .catch(erro => {
            cbErroInserirGenero(erro);
        });
}
//Função para limpar os spans de mensagens
const limparSpans = () => {
    document.querySelector("#msgErro").textContent = "";
    document.querySelector("#msgSucesso").textContent = "";
}

//Função de callback que basicamente realiza a atualização da página após a inserção.
const cbSucessoInserirGenero = respostaJSON => {
    document.querySelector('#msgSucesso').textContent = respostaJSON.msgSucesso;
    setTimeout(function () {
        limparSpans();
        generoListarFetch();
    }, 1500);
}

const cbErroInserirGenero = erro => {
    document.querySelector('#msgErro').textContent = erro;
    setTimeout(function () {
        limparSpans();
        generoListarFetch();
    }, 1500);
};
