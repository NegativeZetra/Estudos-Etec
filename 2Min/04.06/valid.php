<?php
$logindigit = $_POST['logindigit']; 
$senhadigit = $_POST["senhadigit"];
$admcadastro = "Fabricio";
$admsenha = "12345678";
$usercadastro = "Pedro";
$senhauser = "87654321";

session_start();
$_SESSION['logindigit'] = $logindigit;
$_SESSION['senhadigit'] = $senhadigit;                

if ($logindigit === $admcadastro && $senhadigit === $admsenha) {
    echo '<meta http-equiv="refresh" content="0;url=admin.html">';
    include "teste";

}elseif ($logindigit === $usercadastro && $senhadigit === $senhauser) {
    echo '<meta http-equiv="refresh" content="0;url=user.html">';
    
}{
    echo "Falha no Login"; 
}
?>