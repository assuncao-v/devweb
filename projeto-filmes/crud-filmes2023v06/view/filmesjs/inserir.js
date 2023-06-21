//Controlando o modal de inserir com jquery
$("#btn-abrir-jquery-inserir").click(function () {
    //A função abaixo injeta os gêneros no modal do inserir-filme 
    filmeListarGeneroInserirFetch();
    $("#modal-formulario-inserir").modal({ backdrop: "static" });
    $("#modal-formulario-inserir").modal("show");
});

const $formInserir = document.querySelector("#form-inserir");
$formInserir.addEventListener("submit", event => {
    event.preventDefault();
    filmeInserirFetch();
    $("#modal-formulario-inserir").modal("hide");
})

const filmeListarGeneroInserirFetch = () => {
    fetch("../controller/generoListar.php")
        .then(resposta => {
            if (resposta.ok === false) {
                let msg = `${resposta.status} - ${resposta.statusText}`;
                throw new Error(msg);
            } else
                return resposta.json();
        })
        .then(respostaJSON => {
            if (respostaJSON.erro === false)
                cbSucessoListarGeneroInserir(respostaJSON);
            else
                throw new Error(respostaJSON.msgErro);
        })
        .catch(erro => {
            cbErroListarGeneroInserir(erro);
        });
}
//callback de listarGenero p/ inserir
const cbSucessoListarGeneroInserir = respostaJSON => {
    montarSelect(respostaJSON.dados);
}

const cbErroListarGeneroInserir = erro => {
    document.querySelector("#msgErro").textContent = erro;
}

//Monta o combo de gêneros
function montarSelect(dados) {
    //Limpa o select antigo
    document.querySelector("#cmbGeneros").innerHTML = "";
    //Preenche o select com os gêneros recebidos pelo filmeListarGeneroInserirFetch
    for (const i in dados) {
        let genero = dados[i];
        let $opt = document.createElement('option');
        $opt.value = genero.id;
        $opt.textContent = genero.descricao;
        document.querySelector('#cmbGeneros').appendChild($opt);
    }
}

const filmeInserirFetch = () => {
    //Montagem do objeto filme recuperando os elementos do DOM
    let filme = {
        "titulo": document.querySelector("#titulo").value,
        "avaliacao": parseFloat(document.querySelector("#avaliacao").value),
        "genero_id": parseInt(document.querySelector("#cmbGeneros").value),
    };
    let configMetodo = {
        method: "POST",
        body: JSON.stringify(filme),
        headers: { "Content-Type": "application/json;charset=UTF-8" }
    };
    fetch("../controller/filmeInserir.php", configMetodo)
        .then(resposta => {
            if (resposta.ok == false) {
                let msg = `${resposta.status} + ${resposta.statusText}`;
                throw new Error(msg);
            }
            else
                return resposta.json();
        })
        .then(respostaJSON => {
            if (respostaJSON.erro == false) {
                cbSucessoInserirFilme(respostaJSON);
            }
            else
                throw new Error(respostaJSON.msgErro);
        })
        .catch(erro => {
            cbErroInserirFilme(erro);
        })
}

const cbSucessoInserirFilme = respostaJSON => {
    document.querySelector("#msgSucesso").textContent = respostaJSON.msgSucesso;
    setTimeout(function () {
        limparSpans();
        filmeListarFetch();
    }, 1500);
};

const cbErroInserirFilme = erro => {
    document.querySelector("#msgErro").textContent = erro;
    setTimeout(function () {
        limparSpans();
    }, 2000);
};
