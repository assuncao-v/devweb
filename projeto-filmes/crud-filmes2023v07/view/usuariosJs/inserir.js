import { limparSpan, exibirMensagem, exibirMensagemErro, fazFetch } from "../utilJs/funcoesUtil.js";
import { usuarioListarFetch } from "./listar.js";

const $formInserir = document.querySelector("#form-inserir");
$formInserir.addEventListener("submit", event => {
    event.preventDefault();
    usuarioInserirFetch();
    $("#modal-formulario-inserir").modal("hide");
});

const usuarioInserirFetch = () => {
    const usuario = {
        "nome": $formInserir.querySelector("#nome").value,
        "login": $formInserir.querySelector("#login").value,
        "senha": $formInserir.querySelector("#senha").value
    };
    fazFetch("../controller/usuarioInserir.php", "POST", usuario, cbSucessoInserirUsuario, cbErroInserirUsuario);
};

const cbSucessoInserirUsuario = respostaJSON => {
    exibirMensagem("#msg", respostaJSON.msgSucesso);
    setTimeout(() => {
        limparSpan("#msg");
        usuarioListarFetch();
    }, 1500);
};

const cbErroInserirUsuario = erro => {
    exibirMensagemErro("#msg", erro);
    setTimeout(() => {
        limparSpan("#msg");
    }, 1500);
};




