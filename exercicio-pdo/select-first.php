<?php
    require_once 'conexao.php';
    $sql = "SELECT * FROM produto ORDER BY id LIMIT 1";
    try {
        $resultMatrix = $conexao->query($sql);
        $firstProductMatrix = $resultMatrix->fetch(PDO::FETCH_ASSOC);
        echo "<h3>UTILIZANDO MATRIZ ASSOCIATIVA PARA FAZER A CONSULTA</h3><hr>";
        foreach($firstProductMatrix as $key => $value){
            echo "{$key} : {$value}<br/>";
        }
        echo "<hr>";  
    }catch (PDOException $e) {
        echo "Houve um erro ao selecionar todos os campos no banco de dados".$e->getMessage();
    }
    try {
        $resultObject = $conexao->query($sql);
        $firstProductObject = $resultObject->fetch(PDO::FETCH_OBJ);
        echo "<h3>UTILIZANDO OBJETO PARA FAZER A CONSULTA</h3><hr>";
        echo("ID: {$firstProductObject->id}<br/>
        Descrição: {$firstProductObject->descricao}<br/>
        Preço: {$firstProductObject->preco}<br/>
        Estoque: {$firstProductObject->estoque}<br/>");
        echo "<hr>";
    } catch (PDOException $e) {
        echo "Houve um erro ao selecionar todos os campos no banco de dados".$e->getMessage();
    }   
?>