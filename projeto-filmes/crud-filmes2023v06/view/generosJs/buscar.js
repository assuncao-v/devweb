//Ao carregar a página
/*window.onload = function(){
    //Pegue o parâmetro id contido na query string da url
    let qs = window.location.search.replace('?','');
    let parametrosBuscar = qs.split('=');
    let id = parametrosBuscar[1];
    generoBuscarFetch(id);   
}*/

const generoBuscarFetch = id => {
    //fetch enviando o id do genero a ser recuperado
    fetch(`../controller/generoBuscar.php?id=${id}`)
        .then(resposta => {
            if (resposta.ok === false) {
                let msg = `${resposta.status} - ${resposta.statusText}`;
                throw new Error(msg);
            }
            else
                return resposta.json();
        })
        .then(respostaJSON => {
            if (respostaJSON.erro === false) {
                cbSucessoBuscarGenero(respostaJSON);
                document.querySelector('#msgSucesso').textContent = respostaJSON.msgSucesso;
                setTimeout(function () {
                    document.querySelector('#msgSucesso').textContent = "";
                }, 1500);
            } else
                throw new Error(respostaJSON.erro)
        })
        .catch(erro => {
            cbErroBuscarGenero(erro)
        });
}
//Função de callback
const cbSucessoBuscarGenero = respostaJSON => {
    $("#modal-formulario-alterar").modal({ backdrop: "static" });
    $("#modal-formulario-alterar").modal("show");
    let formAlterar = document.querySelector("#form-alterar")

    let genero = respostaJSON.dados;
    //Preencha os inputs com os dados trazidos
    formAlterar.querySelector('#id').value = genero.id;
    formAlterar.querySelector('#descricao').value = genero.descricao;
}

const cbErroBuscarGenero = erro => {
    document.querySelector('#msgErro').textContent = erro;
    setTimeout(function () {
        limparSpans();
        generoListarFetch();
    }, 1500);
}



