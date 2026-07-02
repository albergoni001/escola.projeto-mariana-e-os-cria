<?php
// Configurações do seu banco de dados
$host = "localhost";
$usuario = "root"; // Padrão do MySQL na maioria dos ambientes locais
$senha = "";       // Se o seu MySQL tiver senha, coloque-a aqui dentro das aspas
$banco = "mente_organizada";

// Criando a conexão
$conn = new mysqli($host, $usuario, $senha, $banco);

// Verificando se houve algum erro
if ($conn->connect_error) {
    die("Falha na conexão com o banco de dados: " . $conn->connect_error);
}

// Define o padrão de acentuação para não quebrar o português (ç, á, é...)
$conn->set_charset("utf8mb4");
?>
