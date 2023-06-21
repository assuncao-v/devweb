import { exibirMensagem, exibirMensagemErro, limparSpan, fazFetch } from "../utilJs/funcoesUtil.js";
import { usuarioListarFetch } from "./listar.js";

const $formAlterar = document.querySelector("#form-alterar");
$formAlterar.addEventListener("submit", event => {
    event.preventDefault();
    usuarioAlterarFetch();
    $("#modal-formulario-alterar").modal("hide");
});

const usuarioAlterarFetch = () => {
    const usuario = {
        "id": $formAlterar.querySelector("#id").value,
        "nome": $formAlterar.querySelector("#nome").value
    };
    fazFetch("../controller/usuarioAlterar.php", "PUT", usuario, cbSucessoAlterarUsuario, cbErroAlterarUsuario);
};

const $btnCancelar = document.querySelector("#cancelar");
$btnCancelar.addEventListener("click", () => {
    if (confirm("Deseja cancelar a alteração?"))
        window.location.href = "../view/usuarios.html";
});

const cbSucessoAlterarUsuario = respostaJSON => {
    exibirMensagem("#msg", respostaJSON.msgSucesso);
    setTimeout(() => {
        limparSpan("#msg");
        usuarioListarFetch();
    }, 1500);
};

const cbErroAlterarUsuario = erro => {
    exibirMensagemErro("#msg", erro);
    setTimeout(() => {
        limparSpan("#msg");
    }, 1500);
};