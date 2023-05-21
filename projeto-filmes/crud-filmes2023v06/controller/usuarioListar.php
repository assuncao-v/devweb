<?php
require_once("../model/conexao.php");
$resposta["erro"] = false;
$resposta["msgSucesso"] = "";
$resposta["msgErro"] = "";
$resposta["dados"] = null;
try {
    $sql = "SELECT * FROM `usuario` ORDER BY login";
    $stmt = $conexao->prepare($sql);
    $stmt->execute();
    $resposta["dados"] = $stmt->fetchAll(PDO::FETCH_ASSOC);
    $resposta["msgSucesso"] = "Filmes listados com sucesso";
} catch (PDOException $error) {
    $resposta["erro"] = true;
    $resposta["msgErro"] = "Erro ao listar os usuários do BD - {$error->getMessage()}";
} finally {
    echo json_encode($resposta);
    die();
}
