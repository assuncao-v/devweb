<!DOCTYPE html>
<html lang="pt-br">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Class 07</title>
</head>
<body>
    <?php
        function my_function()
        {
            $my_arguments = func_get_args();
            var_dump($my_arguments);
            echo("<br/>");
        }
        my_function("Olá, mundo");
        my_function(5,7,25,"Rafael");
        my_function();

        echo ("<br/>");

        function soma()
        {
            $result= 0;
            $arguments= func_get_args();
            for($i=0;$i<func_num_args();$i++)
            {
                if(is_numeric($arguments[$i]))
                    $result+=$arguments[$i];
            }
            return $result;
        }        

        // Testing

        $x=20;
        $y=92;

        echo (soma($x,$y,102, "Banana"));
        
        /*Using arrays
        First way
        Declaration (key=>value)*/
        
        echo("</br>");
        $myarray = array(
            "name" => "Juca",
            "secound_name" => "Balocas",
            "age"=>45,
            1.23 => true
        );
        echo $myarray["name"]." ".$myarray["secound_name"];
        echo"</br>";
        echo $myarray["age"]."</br>";
        
        //Secound way
        $array=array("Fiat","Mercedes","Porsche","Volkswagen");
        echo $array[0]."</br>";
        echo $array[1]."</br>";
        echo $array[2]."</br>";
        echo $array[3]."</br>";

        //Using isset() and unset()
        echo "</br>";
        unset($array[0]);

        if(isset($array[0]))
            echo "It's working";
        else echo "Get some help"; 
        printf("</br>");

        array_push($array, "Chevrolet");
        
        //Using in_array() and array_push
        
        
    ?> 
    
</body>
</html>

