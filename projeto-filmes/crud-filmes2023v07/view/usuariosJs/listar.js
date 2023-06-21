import { exibirMensagemErro, fazFetch, obterValorDaColunaId } from "../utilJs/funcoesUtil.js";
import { usuarioExcluirFetch } from "./excluir.js";
import { usuarioBuscarFetch } from "./buscar.js"
//Utilizando a importação dos arquivos JS nos próprios scripts possibilita a liberdade da desordem na listagem deles no HTML, além da melhora da leitura deles.

$("#btn-novo-jquery").click(function () {
    $("#modal-formulario-inserir").modal({ backdrop: "static" });
    $("#modal-formulario-inserir").modal("show");
});

$("#btn-fechar-jquery").click(function () {
    $("#modal-formulario-inserir").modal({ backdrop: "static" });
    $("#modal-formulario-inserir").modal("hide");
});

$("#btn-fechar-jquery-alterar").click(function () {
    $("#modal-formulario-alterar").modal({ backdrop: "static" });
    $("#modal-formulario-alterar").modal("hide");
});

$("#btn-home-jquery").click(function () {
    window.location.href = "index.html";
})

window.onload = () => {
    usuarioListarFetch();
}

const $corpoTabela = document.querySelector("tbody");
const usuarioListarFetch = () => {
    $corpoTabela.innerHTML = "";
    fazFetch("../controller/usuarioListar.php", "GET", null, cbSucessoListarUsuario, cbErroListarUsuario);
}

const cbSucessoListarUsuario = respostaJSON => {
    montarTabela(respostaJSON.dados);
};

const cbErroListarUsuario = erro => {
    exibirMensagemErro("#msg", erro);
};

const montarTabela = dados => {
    for (const i in dados) {
        const obj = dados[i];
        const $tr = document.createElement("tr");
        //Pendura os atributos.
        criarTDePendurar($tr, obj.id, false);
        criarTDePendurar($tr, obj.nome, false);
        criarTDePendurar($tr, obj.login, false);
        //Criando os links de operações editar e excluir.
        const links = `<a href='#'>[Editar]</a><a href='#'>[Excluir]</a>`;
        criarTDePendurar($tr, links, true);
        $corpoTabela.appendChild($tr);
    }
};

$corpoTabela.addEventListener("click", event => {
    if (event.target.tagName === "A") {
        let link = event.target;
        let objId = obterValorDaColunaId(link);
        if (objId > 0 && link.textContent === "[Excluir]")
            usuarioExcluirFetch(objId);
        if (objId > 0 && link.textContent === "[Editar]")
            usuarioBuscarFetch(objId);
    }
})

const criarTDePendurar = (noPai, informacao, ehHTML) => {
    let $td = document.createElement("td");
    ehHTML ? $td.innerHTML = informacao : $td.textContent = informacao;
    noPai.appendChild($td);
};

export { usuarioListarFetch };