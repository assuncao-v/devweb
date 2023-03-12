<?php
    require_once "conexao.php";

    try {
        for($i=1; $i<=2; $i++){
            $sql = "UPDATE produto SET estoque = estoque * {$i}/2 WHERE id = {$i}";
            $result = $conexao->exec($sql);
            echo "Foram inseridas {$result} linhas(s)<br>";
        }        
    } catch (PDOException $e) {
        echo "Houve um erro na atualização dos valores<br>ERRO: ".$e->getMessage();
    }
?>