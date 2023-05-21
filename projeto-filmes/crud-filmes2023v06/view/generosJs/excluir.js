const generoExcluirFetch = id => {
    if (confirm(`Confirma a exclusão do genero de id ${id}?`)) {
        let genero = { "id": id };
        let configMetodo = {
            method: "DELETE",
            body: JSON.stringify(genero),
            headers: { "Content-Type": "application/json;charset=UTF-8" }
        };
        //fetch enviando o id do genero a ser excluído
        fetch("../controller/generoExcluir.php", configMetodo)
            .then(resposta => {
                if (resposta.ok === false) {
                    let msg = `${resposta.status} - ${resposta.statusText}`;
                    throw new Error(msg);
                } else
                    return resposta.json();
            })
            .then(respostaJSON => {
                if (respostaJSON.erro === false)
                    cbSucessoExcluirGenero(respostaJSON);
                else
                    throw new Error(respostaJSON.msgErro);
            })
            .catch(erro => {
                cbErroExcluirGenero(erro);
            })
    }
}

const cbErroExcluirGenero = erro => {
    document.querySelector('#msgErro').textContent = erro;
    setTimeout(function () {
        //As funções limparSpans e generoListarFetch seriam callbacks dos arquivos inserir.js e listar.js?
        limparSpans();
        generoListarFetch();
    }, 1500);
};
//Função de callback
function cbSucessoExcluirGenero(respostaJSON) {
    document.querySelector('#msgSucesso').textContent = respostaJSON.msgSucesso;
    setTimeout(function () {
        limparSpans();
        generoListarFetch();
    }, 1500);
}
