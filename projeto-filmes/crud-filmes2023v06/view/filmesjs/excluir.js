const filmeExcluirFetch = id => {
    if (confirm(`Confirma a exclusão do filme de id ${id}?`)) {
        let filme = { "id": id };
        let configMetodo = {
            method: "DELETE",
            body: JSON.stringify(filme), //texto JSON serializado
            headers: {
                "Content-Type": "application/json;charset=UTF-8"
            }
        };
        //fetch enviando o id do filme a ser excluído
        fetch("../controller/filmeExcluir.php", configMetodo)
            .then(resposta => {
                if (resposta.ok === false) {
                    let msg = `${resposta.status} - ${resposta.statusText}`;
                    throw new Error(msg);
                } else
                    return resposta.json();
            })
            .then(respostaJSON => {
                if (respostaJSON.erro === false)
                    cbSucessoExcluirFilme(respostaJSON);
                else
                    throw new Error(respostaJSON.msgErro);
            })
            .catch(erro => {
                cbErroExcluirFilme(erro)
            });
    }
}
//Função que poderiam ser de callbacks
const cbSucessoExcluirFilme = respostaJSON => {
    document.querySelector('#msgSucesso').textContent = respostaJSON.msgSucesso;
    //Em seguida, limpará os spans e recarregará a tabela
    setTimeout(function () {
        limparSpans();
        filmeListarFetch();
    }, 1500);
}

const cbErroExcluirFilme = erro => {
    document.querySelector('#msgErro').textContent = erro;
    //Em seguida, limpará os spans
    setTimeout(function () {
        limparSpans();
    }, 1500);
}