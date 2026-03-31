# SIGAC

Pensando no projeto como uma pequena máquina, cada arquivo cuida de uma peça diferente dela.

`package.json` é a ficha técnica do projeto. Ele diz o nome do sistema, a versão e, principalmente, quais bibliotecas precisam ser instaladas. Nesse caso, o `express` cria o servidor, o `sqlite3` cuida do banco de dados e o `bcrypt` protege as senhas.

`server.js` é o coração do sistema. Ele liga o servidor, conecta no banco e define o que acontece quando alguém tenta cadastrar ou fazer login. Também cria a tabela `usuarios` caso ela ainda não exista. Quando chega um cadastro, ele verifica os dados, confere se as senhas batem, criptografa a senha e salva no banco. Quando chega um login, ele procura o usuário pelo email e compara a senha digitada com a senha criptografada salva.

A pasta `public` guarda a parte visual do sistema, aquilo que aparece para quem usa.

`index.html` é a tela inicial. Ela mostra o nome da marca, `Sigac`, e logo abaixo as opções de ir para cadastro ou login.

`cadastro.html` é a página onde a pessoa cria a conta. Ela só monta a estrutura visual do formulário: nome, email, curso e período, senha e confirmação de senha.

`login.html` é a página de entrada. Ela mostra os campos de email e senha para a pessoa entrar no sistema.

`style.css` cuida da aparência. Ele define cor de fundo, tamanho da caixa branca, formato dos botões, estilo dos campos e posição dos elementos. Em outras palavras, ele é o pintor da casa.

`script.js` faz a parte dinâmica no navegador. Ele escuta quando o formulário é enviado. No cadastro, pega os dados digitados e manda para o servidor pela rota `/api/cadastro`. No login, pega email e senha e manda para `/api/login`. Depois recebe a resposta do servidor e mostra a mensagem certa na tela.

O banco `sigac.db` é onde os dados ficam guardados. Nele, cada usuário cadastrado é salvo com nome, email, curso/período e senha criptografada.

Resumo rápido do fluxo:

na tela → a pessoa preenche o formulário
`script.js` → envia os dados
`server.js` → processa e fala com o banco
banco → salva ou consulta os dados
`server.js` → devolve a resposta
`script.js` → mostra a mensagem na tela

Também existe uma divisão importante:

frontend: `index.html`, `cadastro.html`, `login.html`, `style.css`, `script.js`
backend: `server.js`
banco: `sigac.db`

