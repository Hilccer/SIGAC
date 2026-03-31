const cadastroForm = document.getElementById("cadastroForm");
const loginForm = document.getElementById("loginForm");

if (cadastroForm) {
  cadastroForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    const dados = {
      nome: document.getElementById("nome").value,
      email: document.getElementById("email").value,
      curso_periodo: document.getElementById("curso_periodo").value,
      senha: document.getElementById("senha").value,
      confirmarSenha: document.getElementById("confirmarSenha").value
    };

    const msg = document.getElementById("cadastroMsg");

    try {
      const resposta = await fetch("/api/cadastro", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(dados)
      });

      const resultado = await resposta.json();
      msg.textContent = resultado.mensagem;

      if (resposta.ok) {
        cadastroForm.reset();
        setTimeout(() => {
          window.location.href = "login.html";
        }, 1200);
      }
    } catch (error) {
      msg.textContent = "Erro ao conectar com o servidor.";
    }
  });
}

if (loginForm) {
  loginForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    const dados = {
      email: document.getElementById("loginEmail").value,
      senha: document.getElementById("loginSenha").value
    };

    const msg = document.getElementById("loginMsg");

    try {
      const resposta = await fetch("/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(dados)
      });

      const resultado = await resposta.json();
      msg.textContent = resultado.mensagem;

      if (resposta.ok) {
        setTimeout(() => {
          alert(`Bem-vindo, ${resultado.usuario.nome}!`);
          window.location.href = "index.html";
        }, 800);
      }
    } catch (error) {
      msg.textContent = "Erro ao conectar com o servidor.";
    }
  });
}