import { limparSpan, exibirMensagem, exibirMensagemErro, fazFetch } from "../utilJs/funcoesUtil.js";
import { usuarioListarFetch } from "./listar.js";

const usuarioExcluirFetch = id => {
    if (confirm(`Confirma a exclusão do usuário de id ${id}?`)) {
        const usuario = { "id": id };
        fazFetch("../controller/usuarioExcluir.php", "DELETE", usuario, cbSucessoExcluirUsuario, cbErroExcluirUsuario)
    }
};

const cbSucessoExcluirUsuario = respostaJSON => {
    exibirMensagem("#msg", respostaJSON.msgSucesso);
    setTimeout(() => {
        limparSpan("#msg");
        usuarioListarFetch();
    }, 1500);
};

const cbErroExcluirUsuario = erro => {
    exibirMensagemErro("#msg", erro);
    setTimeout(() => {
        limparSpan("#msg");
        usuarioListarFetch();
    }, 1500);
};

export { usuarioExcluirFetch };

