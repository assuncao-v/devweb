<?php
    $high = 1.85;
    $age = 16;
    
    echo "Idade: </br>".$age."<Altura: ".$high."<br>"; 
    $age= 20;
    print "Idade: {$age} </br> Altura: {$high}";
    echo "<br>";
?> 

<?php
    $num = 10;

    settype($num, "bool");
    echo $num."</br>";

    if (is_bool($num)) {
        echo "É verdadeiro";
    } else {
        echo "É falso";
    }
    
    $number = 14;
    $numeral = 16;
    echo "</br";
    intdiv($number,$numeral);

    settype($num,"array");
    echo "</br";
    var_dump($num);
?>
