<?php
    require_once "conexao.php";
    //Definindo a matriz associativa
    $produtos = array(
        array('descricao' => "Espinafre", "preco"=>5.99, "estoque"=> 20),
        array('descricao' => "Tomate", "preco"=>8.99 ,"estoque"=> 50 ),
        array('descricao' => "Banana Prata", "preco"=>5.50  ,"estoque"=> 25),
        array('descricao' => "Maça Gala", "preco"=>10.75  ,"estoque"=> 21),
        array('descricao' => "Uva Sem Caroço", "preco"=> 7.29 ,"estoque"=> 10),
        array('descricao' => "Alface Romana", "preco"=> 4.89 ,"estoque"=> 25),
        array('descricao' => "Abóbora Seca", "preco"=>8.90  ,"estoque"=> 9 ),
        array('descricao' => "Laranja Lima", "preco"=>6.95  ,"estoque"=> 89 ),
        array('descricao' => "Pitaya", "preco"=> 29.90  ,"estoque"=> 30),
        array('descricao' => "Cáqui", "preco"=> 4.90 ,"estoque"=> 91),
    );
    /*try{
        foreach($produtos as $produto){
            $sql = "INSERT INTO produto(descricao,preco,estoque) VALUES('{$produto['descricao']}',{$produto['preco']}, {$produto['estoque']})";
            $result = $conexao->exec($sql);
            echo "Foram inseridas {$result} linhas(s)<br>";
        }
    }
    catch(PDOException $e){
        echo "Houve um erro ao conectar com o banco de dados<br/>".$e->getMessage();
    }*/
?>