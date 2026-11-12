/* ==========================================================
   Portfólio de Nicolas Zampieri · script.js (JavaScript puro)
   Funcionalidades:
   1. Alternador de tema (salvo no localStorage)
   2. Menu mobile (hambúrguer)
   3. Animações de scroll com IntersectionObserver
   4. Filtro de projetos
   5. Botão "Copiar E-mail" com toast
   6. "Baixar CV" via impressão
   7. Destaque do link da seção atual no menu
   ========================================================== */
(function () {
  "use strict";

  var root = document.documentElement;

  /* ---------- Utilitário: localStorage que nunca derruba a página ---------- */
  function lerArmazenado(chave) {
    try { return localStorage.getItem(chave); } catch (e) { return null; }
  }
  function gravarArmazenado(chave, valor) {
    try { localStorage.setItem(chave, valor); } catch (e) { /* sem armazenamento: ignora */ }
  }

  /* ---------- Toast ---------- */
  var toast = document.getElementById("toast");
  var toastTimer;
  function mostrarToast(mensagem) {
    if (!toast) return;
    toast.textContent = mensagem;
    toast.classList.add("show");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(function () { toast.classList.remove("show"); }, 2400);
  }

  /* ---------- 1. Tema claro/escuro ---------- */
  var botaoTema = document.getElementById("tema");
  function aplicarTema(modo) {
    root.setAttribute("data-mode", modo);
    gravarArmazenado("tema", modo);
  }
  if (botaoTema) {
    botaoTema.addEventListener("click", function () {
      var atual = root.getAttribute("data-mode") === "light" ? "light" : "dark";
      aplicarTema(atual === "dark" ? "light" : "dark");
    });
  }

  /* ---------- 2. Menu mobile ---------- */
  var burger = document.getElementById("burger");
  var menu = document.getElementById("menu");
  function fecharMenu() {
    if (!burger || !menu) return;
    menu.classList.remove("open");
    burger.setAttribute("aria-expanded", "false");
    burger.setAttribute("aria-label", "Abrir menu");
  }
  if (burger && menu) {
    burger.addEventListener("click", function () {
      var aberto = menu.classList.toggle("open");
      burger.setAttribute("aria-expanded", String(aberto));
      burger.setAttribute("aria-label", aberto ? "Fechar menu" : "Abrir menu");
    });
    // Fecha ao escolher uma seção
    menu.addEventListener("click", function (e) {
      if (e.target.closest("a")) fecharMenu();
    });
    // Fecha com Esc
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape") fecharMenu();
    });
  }

  /* ---------- 3. Animações de scroll ---------- */
  var revelaveis = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window) {
    var observador = new IntersectionObserver(function (entradas) {
      entradas.forEach(function (entrada) {
        if (entrada.isIntersecting) {
          entrada.target.classList.add("in");
          observador.unobserve(entrada.target); // anima só uma vez
        }
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -40px 0px" });
    revelaveis.forEach(function (el) { observador.observe(el); });
  } else {
    // Navegadores sem suporte: mostra tudo
    revelaveis.forEach(function (el) { el.classList.add("in"); });
  }

  /* ---------- 4. Filtro de projetos ---------- */
  var botoesFiltro = document.querySelectorAll(".filters .chip");
  var cartoes = document.querySelectorAll("#lista-projetos .proj");

  function filtrar(categoria) {
    cartoes.forEach(function (cartao) {
      var categorias = (cartao.getAttribute("data-cat") || "").split(" ");
      var visivel = categoria === "todos" || categorias.indexOf(categoria) !== -1;

      if (visivel) {
        cartao.hidden = false;
        // força o navegador a registrar o estado oculto antes de animar a volta
        void cartao.offsetWidth;
        cartao.classList.remove("is-out");
      } else {
        cartao.classList.add("is-out");
        // depois da transição, remove do fluxo
        setTimeout(function () {
          if (cartao.classList.contains("is-out")) cartao.hidden = true;
        }, 260);
      }
    });
  }

  botoesFiltro.forEach(function (botao) {
    botao.addEventListener("click", function () {
      botoesFiltro.forEach(function (b) {
        var ativo = b === botao;
        b.classList.toggle("is-active", ativo);
        b.setAttribute("aria-pressed", String(ativo));
      });
      filtrar(botao.getAttribute("data-filter"));
    });
  });

  /* ---------- 5. Copiar e-mail ---------- */
  var botaoEmail = document.getElementById("copiar-email");

  // Plano B para ambientes em que a API de área de transferência é bloqueada
  function copiarComFallback(texto) {
    var campo = document.createElement("textarea");
    campo.value = texto;
    campo.setAttribute("readonly", "");
    campo.style.cssText = "position:fixed;top:-100px;opacity:0";
    document.body.appendChild(campo);
    campo.select();
    var ok = false;
    try { ok = document.execCommand("copy"); } catch (e) { ok = false; }
    document.body.removeChild(campo);
    return ok;
  }

  if (botaoEmail) {
    botaoEmail.addEventListener("click", function () {
      var email = botaoEmail.getAttribute("data-email");

      function sucesso() { mostrarToast("E-mail copiado!"); }
      function falha() { mostrarToast("Não foi possível copiar. E-mail: " + email); }

      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(email).then(sucesso, function () {
          copiarComFallback(email) ? sucesso() : falha();
        });
      } else {
        copiarComFallback(email) ? sucesso() : falha();
      }
    });
  }

  /* ---------- 6. Baixar CV (impressão / salvar como PDF) ---------- */
  var botaoCV = document.getElementById("baixar-cv");
  if (botaoCV) {
    botaoCV.addEventListener("click", function () {
      try {
        window.print();
      } catch (e) {
        mostrarToast("Use Ctrl+P (ou Cmd+P) e escolha Salvar como PDF.");
      }
    });
  }

  /* ---------- 7. Link da seção atual no menu ---------- */
  var links = document.querySelectorAll(".nav-links a");
  var secoes = [];
  links.forEach(function (link) {
    var alvo = document.querySelector(link.getAttribute("href"));
    if (alvo) secoes.push({ link: link, alvo: alvo });
  });
  if ("IntersectionObserver" in window && secoes.length) {
    var obsSecao = new IntersectionObserver(function (entradas) {
      entradas.forEach(function (entrada) {
        if (!entrada.isIntersecting) return;
        secoes.forEach(function (s) {
          s.link.classList.toggle("is-current", s.alvo === entrada.target);
        });
      });
    }, { rootMargin: "-45% 0px -50% 0px" });
    secoes.forEach(function (s) { obsSecao.observe(s.alvo); });
  }

  /* ---------- Ano do rodapé ---------- */
  var ano = document.getElementById("ano");
  if (ano) ano.textContent = new Date().getFullYear();
})();
