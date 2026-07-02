// Exemplo de como o Node.js se conecta ao seu MySQL (Não mude seu JS atual ainda!)
const mysql = require('mysql2');

const conexao = mysql.createConnection({
    host: 'localhost',
    user: 'root',          // Seu usuário do MySQL
    password: 'sua_senha', // Sua senha do MySQL
    database: 'mente_organizada'
});

conexao.connect((erro) => {
    if (erro) {
        console.error('Erro ao conectar ao banco:', erro);
        return;
    }
    console.log('Conectado ao MySQL com sucesso!');
});
