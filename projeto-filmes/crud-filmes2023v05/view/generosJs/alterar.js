//Recupera o form-alterar e adiciona um ouvidor de eventos.
const $formAlterar = document.querySelector("#form-alterar");
$formAlterar.addEventListener('submit', event => {
    event.preventDefault();
    generoAlterarFetch()
    $("#modal-formulario-alterar").modal("hide");
});
const generoAlterarFetch = () => {
    let genero = {
        "id": $formAlterar.querySelector('#id').value,
        "descricao": $formAlterar.querySelector('#descricao').value
    };
    let configMetodo = {
        method: "PUT",
        body: JSON.stringify(genero),
        headers: { "Content-Type": "application/json;charset=UTF-8" }
    };
    //fetch enviando o genero a ser alterado
    fetch("../controller/generoAlterar.php", configMetodo)
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
                cbSucessoAlterarGenero(respostaJSON);
            else
                throw new Error(respostaJSON.msgErro);
        })
        .catch(erro => {
            cbErroAlterarGenero(erro);
        });
};
//Recupera o botão cancelar
const $btnCancelar = document.querySelector('#cancelar');
$btnCancelar.addEventListener('click', () => {
    if (confirm('Deseja mesmo cancelar a alteração?'))
        window.location.href = "../view/generos.html";
})

//Função de callback
const cbSucessoAlterarGenero = respostaJSON => {
    document.querySelector('#msgSucesso').textContent = respostaJSON.msgSucesso;
    setTimeout(function () {
        limparSpans();
        generoListarFetch();
    }, 1500);
};

const cbErroAlterarGenero = erro => {
    document.querySelector('#msgErro').textContent = erro;
    setTimeout(function () {
        limparSpans();
        generoListarFetch();
    }, 1500)
};