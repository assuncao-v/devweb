<?php
require_once("../model/conexao.php");
$usuario = file_get_contents("php://input");
$usuarioMatriz = json_decode($usuario, true);
$id = (isset($usuarioMatriz["id"]) && $usuarioMatriz["id"] != null) ? $usuarioMatriz["id"] : null;
$resposta["erro"] = false;
$resposta["msgSucesso"] = "";
$resposta["msgErro"] = "";
$resposta["dados"] = null;
if ($id != null) {
    try {
        $sql = "DELETE FROM `usuario` WHERE id = ?";
        $stmt = $conexao->prepare($sql);
        $stmt->bindParam(1, $id);
        $stmt->execute();
        $resposta["msgSucesso"] = "Usuário de id $id excluído com sucesso";
    } catch (PDOException $error) {
        $resposta["erro"] = true;
        $resposta["msgErro"] = "Erro ao excluir o usuário. {$e->getMessage()}";
    } finally {
        echo json_encode($resposta);
        die();
    }
}
