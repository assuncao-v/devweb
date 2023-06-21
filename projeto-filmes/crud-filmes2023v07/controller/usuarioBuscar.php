<?php
require_once("../model/autenticar.php");
require_once("../model/conexao.php");
$id = (isset($_GET["id"]) and $_GET["id"] != null) ? $_GET["id"] : null;
$resposta["erro"] = false;
$resposta["msgErro"] = "";
$resposta["msgSucesso"] = "";
$resposta["dados"] = null;
if ($id != null and $autenticado) {
    try {
        $sql = "SELECT id, nome FROM usuarios WHERE id = ?";
        $stmt = $conexao->prepare($sql);
        $stmt->bindParam(1, $id);
        $stmt->execute();
        $result = $stmt->fetchAll(PDO::FETCH_ASSOC);
        $resposta["dados"] = $result[0];
        $resposta["msgSucesso"] = "Usuário de id $id retornado com sucesso!";
    } catch (PDOException $e) {
        $resposta["erro"] = true;
        $resposta["msgErro"] = "Erro ao retornar usuário de id $id. {$e->getMessage()}";
    } finally {
        echo json_encode($resposta);
        die();
    }
}
