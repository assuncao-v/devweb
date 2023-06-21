<?php
    require_once 'conexao.php';
    $sql = "SELECT * FROM produto";
    try {
        $result = $conexao->query($sql);
        $products = $result->fetchAll(PDO::FETCH_ASSOC);
        echo "<h3>UTILIZANDO MATRIZ ASSOCIATIVA PARA FAZER A CONSULTA</h3>";
        echo "<hr>";
        foreach($products as $product){
            foreach($product as $key => $value){
                echo "{$key}: {$value}<br>";
            }
            echo "<hr>";
        }
    } catch (PDOException $e) {
        echo "Houve um erro ao selecionar todos os campos no banco de dados".$e->getMessage();
    }
    try {
        $resultObject = $conexao->query($sql);
        $productsObject = $resultObject->fetchAll(PDO::FETCH_OBJ);
        echo "<h3>UTILIZANDO OBJETO PARA FAZER A CONSULTA</h3>";
        echo "<hr>";
        for ($i=0;  $i < count($productsObject); $i++) { 
            echo "ID: {$productsObject[$i]->id}<br/>
            Descrição: {$productsObject[$i]->descricao}<br/> 
            Preço: {$productsObject[$i]->preco}<br>
            Estoque: {$productsObject[$i]->estoque}<br>";
            echo "<hr>";
        }
    } catch (PDOException $e) {
        echo "Houve um erro ao selecionar todos os campos no banco de dados".$e->getMessage();
    }

?>