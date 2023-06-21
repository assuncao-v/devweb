import { exibirMensagemErro, limparSpan, fazFetch } from "../utilJs/funcoesUtil.js";

const usuarioBuscarFetch = id => {
    fazFetch(`../controller/usuarioBuscar.php?id=${id}`, "GET", null, cbSucessoBuscarUsuario, cbErroBuscarUsuario);
};

const cbSucessoBuscarUsuario = respostaJSON => {
    $("#modal-formulario-alterar").modal({ backdrop: "static" });
    $("#modal-formulario-alterar").modal("show");
    const $formAlterar = document.querySelector("#form-alterar");
    const usuarios = respostaJSON.dados;
    $formAlterar.querySelector("#id").value = usuarios.id;
    $formAlterar.querySelector("#nome").value = usuarios.nome;
};

const cbErroBuscarUsuario = erro => {
    exibirMensagemErro("#msg", erro);
    setTimeout(() => {
        limparSpan("#msg");
    }, 1500);
};

export { usuarioBuscarFetch };