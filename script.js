/// === LÓGICA DA TELA DE LOGIN ===
    const loginForm = document.getElementById('loginForm');
    
    if (loginForm) { // Só roda este código se o formulário de login existir na página
        const messageDiv = document.getElementById('message');

        loginForm.addEventListener('submit', (event) => {
            event.preventDefault(); 

            const email = document.getElementById('email').value.trim();
            const password = document.getElementById('password').value;
            const userType = document.querySelector('input[name="userType"]:checked').value;

            messageDiv.className = 'message';
            messageDiv.textContent = '';

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


    // === LÓGICA DA TELA DE CADASTRO ===
    const cadastroForm = document.getElementById('cadastroForm');
    
    if (cadastroForm) { // Só roda este código se o formulário de cadastro existir na página
        const messageCadastroDiv = document.getElementById('messageCadastro');

        cadastroForm.addEventListener('submit', (event) => {
            event.preventDefault();

            const nome = document.getElementById('nome').value.trim();
            const email = document.getElementById('emailCadastro').value.trim();
            const password = document.getElementById('passwordCadastro').value;
            const confirmPassword = document.getElementById('confirmPassword').value;
            const userType = document.querySelector('input[name="userTypeCadastro"]:checked').value;

            messageCadastroDiv.className = 'message';
            messageCadastroDiv.textContent = '';

            // Validação: Verificar se as senhas são iguais
            if (password !== confirmPassword) {
                showMessage(messageCadastroDiv, 'As senhas não coincidem!', 'error');
                return;
            }

            // Simulação de Salvamento
            console.log('Enviando para o Banco de Dados:', { nome, email, userType });
            showMessage(messageCadastroDiv, 'Cadastro realizado com sucesso! Redirecionando...', 'success');

            // Retorna para a tela de login para o usuário acessar
            setTimeout(() => {
                window.location.href = 'index.html';
            }, 2000);
        });
    }

    // Função auxiliar para mostrar as mensagens na tela
    function showMessage(targetElement, text, type) {
        targetElement.textContent = text;
        targetElement.classList.add(type);
    };



        /** * No futuro, aqui faremos a conexão com o banco de dados.
         * Se o login for um sucesso, redirecionaremos para a página interna:
         * * if (userType === 'aluno') {
         * window.location.href = 'painel-aluno.html';
         * } else {
         * window.lodocument.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('loginForm');
    const messageDiv = document.getElementById('message');

    loginForm.addEventListener('submit', (event) => {
        event.preventDefault(); 

        const email = document.getElementById('email').value.trim();
        const password = document.getElementById('password').value;
        const userType = document.querySelector('input[name="userType"]:checked').value;

        messageDiv.className = 'message';
        messageDiv.textContent = '';

        if (!email || !password) {
            showMessage('Por favor, preencha todos os campos.', 'error');
            return;
        }

        // Simula o sucesso no login
        showMessage(`Bem-vindo! Entrando como ${userType.toUpperCase()}...`, 'success');

        // Redireciona para o painel após 1.5 segundos (1500 milissegundos)
        setTimeout(() => {
            window.location.href = 'dashboard.html';
        }, 1500);
    });

    function showMessage(text, type) {
        messageDiv.textContent = text;
        messageDiv.classList.add(type);
    }
});

cation.href = 'painel-responsavel.html';
         * }
         */
   