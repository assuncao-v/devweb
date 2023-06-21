<?php
require_once("../model/autenticar.php");
require_once("../model/conexao.php");
$usuarioAlterar = file_get_contents("php://input");
$usuarioMatriz = json_decode($usuarioAlterar, true);
$id = (isset($usuarioMatriz["id"]) and $usuarioMatriz["id"] != null) ? $usuarioMatriz["id"] : null;
$nome = (isset($usuarioMatriz["nome"]) and $usuarioMatriz["nome"] != null) ? $usuarioMatriz["nome"] : "";
$resposta["erro"] = false;
$resposta["msgErro"] = "";
$resposta["msgSucesso"] = "";
$resposta["dados"] = null;
if ($id != null and $nome != "") {
    try {
        $sql = "UPDATE usuarios SET nome=? WHERE id = ?";
        $stmt = $conexao->prepare($sql);
        $stmt->bindParam(1, $nome);
        $stmt->bindParam(2, $id);
        $stmt->execute();
        $resposta["msgSucesso"] = "{$stmt->rowCount()} usuário alterado com sucesso! O id do usuário alterado foi $id";
    } catch (PDOException $e) {
        $resposta["erro"] = true;
        $resposta["msgErro"] = "Erro: Não foi possível efetuar a alteração no BD. {$e->getMessage()}";
    } finally {
        echo json_encode($resposta);
        die();
    }
}
