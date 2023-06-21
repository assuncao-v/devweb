<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta http-equiv="X-UA-Compatible" content="IE=edge">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Trabalho de PHP</title>
</head>
<body>
    <?php
        echo 'Nome: ', $_POST['nome'], '</br></br>';
        echo 'Sobrenome: ', $_POST['sobrenome'], '</br></br>';
        echo 'Processador: ', $_POST['processador'], '</br></br>';
        echo 'Memória RAM: ', $_POST['ram'], '</br></br>';
        echo 'Placa Mãe: ', $_POST['placaMae'], '</br></br>';
        echo 'Placa de Vídeo:', $_POST['placaVideo'], '</br></br>';
        echo 'Dinheiro Gasto: ', $_POST['dinheiro'], '</br></br>';
    ?>
</body>
</html>