<?php
    $conexao = null;
    try{
        $conexao = new PDO("mysql:host=localhost;dbname=empresa", "root", "");
        $conexao->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    }
    catch(PDOException $e){
        echo "Houve um erro ao conectar com o banco de dados<br/>".$e->getMessage();
    }
?>