<?php
// Inclui a conexão com o banco que criamos acima
include("conexao.php");

// Configura o cabeçalho para responder em formato JSON (que o JS entende perfeitamente)
header("Content-Type: application/json");

// Recebe os dados enviados pelo JavaScript (fetch)
$dadosRecebidos = json_decode(file_get_contents("php://input"), true);

if ($dadosRecebidos) {
    $nome = $dadosRecebidos['nome'];
    $email = $dadosRecebidos['email'];
    $tipo = $dadosRecebidos['userType'];
    
    // CRIPTOGRAFIA: Transforma a senha em uma hash segura antes de salvar no banco
    $senhaCriptografada = password_hash($dadosRecebidos['senha'], PASSWORD_DEFAULT);

    // Preparando o comando SQL de forma segura contra ataques (SQL Injection)
    $stmt = $conn->prepare("INSERT INTO usuarios (nome, email, senha, tipo_usuario) VALUES (?, ?, ?, ?)");
    $stmt->bind_param("ssss", $nome, $email, $senhaCriptografada, $tipo);

    // Executa e verifica se deu certo
    if ($stmt->execute()) {
        echo json_encode(["status" => "sucesso", "mensagem" => "Cadastro realizado com sucesso!"]);
    } else {
        // Se der erro (ex: e-mail duplicado)
        echo json_encode(["status" => "erro", "mensagem" => "Este e-mail já está cadastrado ou ocorreu um erro."]);
    }

    $stmt->close();
} else {
    echo json_encode(["status" => "erro", "mensagem" => "Nenhum dado foi recebido."]);
}

$conn->close();
?>