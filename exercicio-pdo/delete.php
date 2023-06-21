<?php
    require_once 'conexao.php';
    $sql = "DELETE FROM produto WHERE estoque=91";
    try {
        $result = $conexao->exec($sql);
        echo "Foi deletado {$result} linha";
    } catch (PDOException $e) {
        echo "Houve um erro ao deletar um campo no banco de dados<br/>".$e->getMessage();
    }

?>