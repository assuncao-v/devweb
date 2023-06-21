<?php
require_once("../model/autenticar.php");
require_once("../model/conexao.php");
$resposta["erro"] = false;
$resposta["dados"] = null;
$resposta["msgErro"] = "";
$resposta["msgSucesso"] = "";
if ($autenticado) {
    try {
        $sql = "SELECT id, nome, login FROM usuarios ORDER BY nome";
        $stmt = $conexao->prepare($sql);
        $stmt->execute();
        $resposta["dados"] = $stmt->fetchAll(PDO::FETCH_ASSOC);
        $resposta["msgSucesso"] = "Usuários listados com sucesso!";
    } catch (PDOException $e) {
        $resposta["erro"] = true;
        $resposta["msgErro"] = "Erro ao listar os usuários. " . $e->getMessage();
    } finally {
        echo json_encode($resposta);
        die();
    }
}
