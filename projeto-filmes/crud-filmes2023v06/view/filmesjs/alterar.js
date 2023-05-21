const $formAlterar = document.querySelector("#form-alterar");
$formAlterar.addEventListener("submit", e => {
	e.preventDefault();
	filmeAlterarFetch();
	$("#modal-formulario-alterar").modal("hide");
})

const filmeAlterarFetch = () => {
	//Montando o objeto filme recuperando os elementos do DOM
	let filme = {
		"id": $formAlterar.querySelector("#id").value,
		"titulo": $formAlterar.querySelector("#titulo").value,
		"avaliacao": parseFloat($formAlterar.querySelector("#avaliacao").value),
		"genero_id": parseFloat($formAlterar.querySelector("#cmbGeneros").value)
	};
	let configMetodo = {
		method: "PUT",
		body: JSON.stringify(filme),
		headers: { "Content-Type": "application/json;charset=UTF-8" }
	};
	fetch("../controller/filmeAlterar.php", configMetodo)
		.then(resposta => {
			if (resposta.ok === false) {
				let msg = `${resposta.status} - ${resposta.statusText}`;
				throw new Error(msg);
			} else
				return resposta.json();
		})
		.then(respostaJSON => {
			if (respostaJSON.erro === false)
				cbSucessoAlterarFilme(respostaJSON);
			else
				throw new Error(respostaJSON.msgErro);
		})
		.catch(erro => {
			cbErroAlterarFilme(erro);
		});
};

const $btnCancelar = document.querySelector("#cancelar");
$btnCancelar.addEventListener("click", () => {
	if (confirm("Deseja cancelar a alteração do filme?"))
		window.location.href = "../view/filmes.html";
});

const cbSucessoAlterarFilme = respostaJSON => {
	document.querySelector("#msgSucesso").textContent = respostaJSON.msgSucesso;
	setTimeout(() => {
		window.location.href = "../view/filmes.html";
	}, 3500);
};

const cbErroAlterarFilme = erro => {
	document.querySelector("#msgErro").textContent = erro;
	setTimeout(() => {
		limparSpans();
	}, 1500);
};
