<?php
// Configurações do seu banco de dados local ou hospedagem
$host = "localhost";
$dbname = "mente_organizada";
$username = "root"; // Altere se o seu usuário for diferente
$password = "";     // Altere se o seu banco tiver senha

try {
    $pdo = new PDO("mysql:host=$host;dbname=$dbname;charset=utf8", $username, $password);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch (PDOException $e) {
    echo json_encode(["status" => "erro", "mensagem" => "Falha na conexão: " . $e->getMessage()]);
    exit;
}

// Recebe os dados enviados pelo JavaScript (formato JSON)
$input = json_decode(file_get_contents("php://input"), true);

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    
    // --- PARTE NOVA: AÇÃO DE LOGIN ---
    if (isset($input['acao']) && $input['acao'] === 'login') {
        $user = $input['usuario'] ?? '';
        $pass = $input['senha'] ?? '';

        $sql = "SELECT usuario, senha FROM usuarios WHERE usuario = :usuario";
        $stmt = $pdo->prepare($sql);
        $stmt->execute(['usuario' => $user]);
        $resultado = $stmt->fetch(PDO::FETCH_ASSOC);

        if ($resultado && $pass === $resultado['senha']) {
            echo json_encode(["status" => "sucesso", "aluno_id" => $resultado['usuario']]);
        } else {
            echo json_encode(["status" => "erro", "mensagem" => "Usuário ou senha inválidos!"]);
        }
        exit;
    }

    // --- SEU CÓDIGO ATUAL: AÇÃO DE SALVAR DIAS ---
    $aluno_id = $input['aluno_id'] ?? 'aluno_demonstracao';
    $dias = isset($input['dias']) ? implode(',', $input['dias']) : '';

    $sql = "INSERT INTO progresso_estudos (aluno_id, dias_estudados) 
            VALUES (:aluno_id, :dias) 
            ON DUPLICATE KEY UPDATE dias_estudados = :dias";
    
    $stmt = $pdo->prepare($sql);
    $stmt->execute(['aluno_id' => $aluno_id, 'dias' => $dias]);

    echo json_encode(["status" => "sucesso", "mensagem" => "Dados salvos com sucesso!"]);
    exit;

} else if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    
    // --- SEU CÓDIGO ATUAL: AÇÃO DE CARREGAR DIAS ---
    $aluno_id = $_GET['aluno_id'] ?? 'aluno_demonstracao';

    $sql = "SELECT dias_estudados FROM progresso_estudos WHERE aluno_id = :aluno_id";
    $stmt = $pdo->prepare($sql);
    $stmt->execute(['aluno_id' => $aluno_id]);
    $resultado = $stmt->fetch(PDO::FETCH_ASSOC);

    if ($resultado) {
        $diasArray = $resultado['dias_estudados'] !== '' ? explode(',', $resultado['dias_estudados']) : [];
        echo json_encode(["status" => "sucesso", "dias" => $diasArray]);
    } else {
        echo json_encode(["status" => "sucesso", "dias" => []]);
    }
    exit;
}
?>
