window.onload = () => {
    usuarioListarFetch();
    // Definição de escutador do evento "clique" no botão para retornar para o home.
    document.querySelector("#btn-home").addEventListener("click", () => {
        window.location.href = "index.html";
    });
};

const corpoTabela = document.querySelector("tbody")

const usuarioListarFetch = () => {
    corpoTabela.innerHTML = "";
    fetch("../controller/usuarioListar.php")
        .then(resposta => {
            if (!resposta.ok) {
                let msg = `${resposta.status} - ${resposta.statusText}`;
                throw new Error(msg);
            }
            return resposta.json();
        })
        .then(respostaJSON => {
            if (!respostaJSON.erro)
                cbSucessoListarUsuario(respostaJSON.dados);
            else
                throw new Error(respostaJSON.msgErro);
        })
        .catch(erro => {
            cbErroListarUsuario(erro);
        })
};

const limparSpans = () => {
    document.querySelector("#msgSucesso").textContent = "";
    document.querySelector("#msgErro").textContent = "";
}

const cbSucessoListarUsuario = dados => {
    montarTabela(dados);
};

const cbErroListarUsuario = erro => {
    document.querySelector("#msgErro").textContent = erro;
    setTimeout(() => {
        window.location.href = "usuario.html";
    }, 5000);
};

const montarTabela = dados => {
    for (const i in dados) {
        let usuario = dados[i];
        let tr = document.createElement("tr");
        criarTdePendurar(tr, usuario.id, false);
        criarTdePendurar(tr, usuario.nome, false);
        criarTdePendurar(tr, usuario.login, false);
        criarTdePendurar(tr, usuario.senha, false);
        let links = "<a href=#>[Editar]</a><a href=#>[Excluir]</a>";
        criarTdePendurar(tr, links, true);
        corpoTabela.appendChild(tr);
    }
};

//Definindo um escutador do evento de clique para o corpo da tabela.
corpoTabela.addEventListener("click", e => {
    if (e.target.nodeName == "A") {
        let link = e.target;
        let usuarioId = obterValorDaColunaId(link);
        if (usuarioId > 0 && link.textContent == "[Excluir]")
            usuarioExcluirFetch(usuarioId);//Essa função está presente no arquivo excluir.js o qual está guardado no diretório usuarioJs
        if (usuarioId > 0 && link.textContent == "[Editar]")
            usuarioAlterarFetch(usuarioId); //Essa função está presente no arquivo alterar.js o qual está guardado no diretório usuarioJs
    }
})

const obterValorDaColunaId = link => {
    if (link.textContent == "[Excluir]" || link.textContent == "[Editar]") {
        let coluna = link.parentNode;
        let linha = coluna.parentNode;
        let id = linha.firstChild.textContent;
        return id;
    }
    return null;
}

const criarTdePendurar = (noPai, noFilho, ehHTML) => {
    const td = document.createElement("td");
    ehHTML ? td.innerHTML = noFilho : td.textContent = noFilho;
    noPai.appendChild(td);
};
