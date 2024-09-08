<?php
$resposta = $_POST['n1'];
$resposta2 = $_POST['n2'];
$resposta3 = $_POST['n3'];

session_start();
$_SESSION['n1'] = $resposta;
$_SESSION['n2'] = $resposta2;    

if ($resposta3 = '1') {
   echo "<a href='ajax_user.html' class='button'>Proximo</a>";
}

if ($resposta3 = '2') {
    echo "<a href='ajax_adm.html' class='button'>Proximo</a>";
}
if ($resposta == "ademir" && $resposta2 = "senha1") {
    echo "<a href='ajax_adm.html' class='button'>Proximo</a>";
}
else {
    echo "Login invalido";
}

?>