//Recuperação do elemento form-alterar
const formAlterarFilme = document.querySelector("#form-alterar");
//Lógica para fechar o modal de alterar os filmes com o jquery
$("#btn-fechar-jquery-alterar").click(function () {
	$("#modal-formulario-alterar").modal({ backdrop: "static" });
	$("#modal-formulario-alterar").modal("hide");
});

const filmeBuscarFetch = id => {
	//O fetch envia o id do filme o qual será recuperado
	fetch(`../controller/filmeBuscar.php?id=${id}`)
		.then(resposta => {
			if (resposta.ok === false) {
				let msg = `${resposta.status} - ${resposta.statusText}`;
				throw new Error(msg);
			}
			else
				return resposta.json();
		})
		.then(respostaJSON => {
			if (respostaJSON.erro == false)
				cbSucessoBuscarFilme(respostaJSON);
			else
				throw new Error(respostaJSON.msgErro);
			return respostaJSON.dados.genero_id;
		})
		.then(idGeneroAtual => {
			buscarEposicionarGenero(idGeneroAtual);
		})
		.catch(erro => {
			cbErroBuscarFilme(erro);
		})
};

const cbSucessoBuscarFilme = respostaJSON => {
	$("#modal-formulario-alterar").modal({ backdrop: "static" });
	$("#modal-formulario-alterar").modal("show");
	let filme = respostaJSON.dados;
	//Preencha os inputs com os dados trazidos 
	formAlterarFilme.querySelector("#id").value = filme.id;
	formAlterarFilme.querySelector("#titulo").value = filme.titulo;
	formAlterarFilme.querySelector("#avaliacao").value = filme.avaliacao;
};

const cbErroBuscarFilme = erro => {
	document.querySelector("#msgErro").textContent = erro;
};

const buscarEposicionarGenero = idGeneroAtual => {
	fetch("../controller/generoListar.php")
		.then(resposta => {
			if (resposta.ok === false) {
				let msg = `${resposta.status} - ${resposta.statusText}`;
				throw new Error(msg);
			} else
				return resposta.json();
		})
		.then(respostaJSON => {
			if (respostaJSON.erro === false) {
				cbSucessoListarGeneroBuscar(respostaJSON, idGeneroAtual);
				document.querySelector("#msgSucesso").textContent = respostaJSON.msgSucesso;
				setTimeout(() => {
					document.querySelector("#msgSucesso").textContent = "";
				}, 2500);
			} else
				throw new Error(respostaJSON.msgErro);
		})
		.catch(erro => {
			cbErroListarGeneroBuscar(erro);
		})
};

const cbSucessoListarGeneroBuscar = (respostaJSON, idGeneroAtual) => {
	console.log("id", idGeneroAtual);
	let generos = respostaJSON.dados;
	if (generos != null)
		montarSelectGeneros(generos, idGeneroAtual);
};

const cbErroListarGeneroBuscar = erro => {
	document.querySelector("#msgErro").textContent = erro;
};

const montarSelectGeneros = (generos, idGeneroAtual) => {
	formAlterarFilme.querySelector("#cmbGeneros").innerHTML = "";
	for (const i in generos) {
		let genero = generos[i];
		let $opt = document.createElement("option");
		$opt.value = genero.id;
		if (genero.id == idGeneroAtual)
			$opt.setAttribute("selected", "selected");
		$opt.textContent = genero.descricao;
		formAlterarFilme.querySelector("#cmbGeneros").appendChild($opt);
	}
};

