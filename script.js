document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('loginForm');
    const cadastroForm = document.getElementById('cadastroForm');

    function showMessage(targetElement, text, type) {
        if (!targetElement) return;
        targetElement.textContent = text;
        targetElement.className = `message ${type}`;
    }

    if (loginForm) {
        const messageDiv = document.getElementById('message');

        loginForm.addEventListener('submit', (event) => {
            event.preventDefault();

            const email = document.getElementById('email')?.value.trim() ?? '';
            const password = document.getElementById('password')?.value ?? '';
            const userType = document.querySelector('input[name="userType"]:checked')?.value ?? 'aluno';

            if (!email || !password) {
                showMessage(messageDiv, 'Por favor, preencha todos os campos.', 'error');
                return;
            }

            showMessage(messageDiv, `Bem-vindo! Entrando como ${userType.toUpperCase()}...`, 'success');

            setTimeout(() => {
                window.location.href = 'dashboard.html';
            }, 1500);
        });
    }

    if (cadastroForm) {
        const messageCadastroDiv = document.getElementById('messageCadastro');

        cadastroForm.addEventListener('submit', (event) => {
            event.preventDefault();

            const nome = document.getElementById('nome')?.value.trim() ?? '';
            const email = document.getElementById('emailCadastro')?.value.trim() ?? '';
            const password = document.getElementById('passwordCadastro')?.value ?? '';
            const confirmPassword = document.getElementById('confirmPassword')?.value ?? '';
            const userType = document.querySelector('input[name="userTypeCadastro"]:checked')?.value ?? 'aluno';

            if (!nome || !email || !password || !confirmPassword) {
                showMessage(messageCadastroDiv, 'Por favor, preencha todos os campos.', 'error');
                return;
            }

            if (password !== confirmPassword) {
                showMessage(messageCadastroDiv, 'As senhas não coincidem!', 'error');
                return;
            }

            fetch('cadastro.php', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    nome,
                    email,
                    senha: password,
                    userType
                })
            })
            .then((response) => response.json())
            .then((data) => {
                if (data.status === 'sucesso') {
                    showMessage(messageCadastroDiv, data.mensagem || 'Cadastro realizado com sucesso!', 'success');
                    setTimeout(() => {
                        window.location.href = 'index.html';
                    }, 2000);
                } else {
                    showMessage(messageCadastroDiv, data.mensagem || 'Erro ao cadastrar. Tente novamente.', 'error');
                }
            })
            .catch((error) => {
                console.error('Erro na requisição:', error);
                showMessage(messageCadastroDiv, 'Erro ao conectar com o servidor.', 'error');
            });
        });
    }
});
   