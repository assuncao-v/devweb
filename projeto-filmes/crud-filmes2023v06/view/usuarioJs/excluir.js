async function usuarioExcluirFetch(id) {
    if (confirm(`Confirma exclusão do usuário de id ${id}?`)) {
        let usuario = { "id": id }
        const configMethod = {
            method: "DELETE",
            body: JSON.stringify(usuario),
            headers: { "Content-Type": "application/json;charset=UTF-8" }
        }
        const resposta = await fetch('../controller/usuarioExcluir.php', configMethod);
        if (!resposta.ok) {
            let msg = `${resposta.status} - ${resposta.statusText}`
            cbErroExcluirUsuario(msg);
            return;
        }
        const dados = await resposta.json();
        if (!dados.erro) {
            cbErroExcluirUsuario(dados.msgErro);
            return;
        }
        cbSucessoExcluirUsuario(dados.msgSucesso);
    }
};

const cbErroExcluirUsuario = msgErro => {
    document.querySelector("#msgErro").textContent = msgErro;
    setTimeout(() => {
        limparSpans();
        usuarioListarFetch();
    }, 5000);
};

const cbSucessoExcluirUsuario = msgSucesso => {
    document.querySelector("#msgSucesso").textContent = msgSucesso;
    setTimeout(() => {
        limparSpans();
        usuarioListarFetch();
    }, 5000);
}

