document.addEventListener('DOMContentLoaded', () => {
    document.querySelector('form').addEventListener('submit', async function(event) {
        event.preventDefault(); // Evita o comportamento padrão do formulário

        // Obtém os valores do formulário
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;

        // Dados da requisição
        const data = new URLSearchParams({
            grant_type: 'password',
            username: username,
            password: password
        });

        try {
            // Fazendo a requisição POST para o endpoint de login da API
            const response = await fetch('http://localhost:8080/oauth2/token', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'Authorization': 'Basic ' + btoa('myclientid:myclientsecret') // Use seu client_id e client_secret aqui
                },
                body: data.toString()
            });

            // Verifica se a resposta é OK (status 200-299)
            if (!response.ok) {
                throw new Error('Erro na requisição: ' + response.status);
            }

            // Converte a resposta para JSON
            const result = await response.json();

            // Armazena o token (por exemplo, no localStorage)
            localStorage.setItem('access_token', result.access_token);

            // Redireciona ou notifica o usuário
            alert('Login bem-sucedido!');
            //window.location.href = '/home'; // Redirecione para uma página de sucesso

        } catch (error) {
            console.error('Erro:', error.message);
            alert('Erro ao fazer login. Verifique suas credenciais.');
        }
    });
});
