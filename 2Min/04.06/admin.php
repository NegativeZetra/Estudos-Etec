<?php
session_start();
$logindigit = $_SESSION['logindigit'];
$senhadigit = $_SESSION['senhadigit'];                      

echo "Seja bem vindo usuário " .$logindigit. ", sua senha é " .$senhadigit;
