(function () {
  "use strict";

  var root = document.documentElement;

  function lerArmazenado(chave) {
    try { return localStorage.getItem(chave); } catch (e) { return null; }
  }
  function gravarArmazenado(chave, valor) {
    try { localStorage.setItem(chave, valor); } catch (e) { }
  }

  var toast = document.getElementById("toast");
  var toastTimer;
  function mostrarToast(mensagem) {
    if (!toast) return;
    toast.textContent = mensagem;
    toast.classList.add("show");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(function () { toast.classList.remove("show"); }, 2400);
  }

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
    menu.addEventListener("click", function (e) {
      if (e.target.closest("a")) fecharMenu();
    });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape") fecharMenu();
    });
  }

  var revelaveis = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window) {
    var observador = new IntersectionObserver(function (entradas) {
      entradas.forEach(function (entrada) {
        if (entrada.isIntersecting) {
          entrada.target.classList.add("in");
          observador.unobserve(entrada.target);
        }
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -40px 0px" });
    revelaveis.forEach(function (el) { observador.observe(el); });
  } else {
    revelaveis.forEach(function (el) { el.classList.add("in"); });
  }

  var botoesFiltro = document.querySelectorAll(".filters .chip");
  var cartoes = document.querySelectorAll("#lista-projetos .proj");

  function filtrar(categoria) {
    cartoes.forEach(function (cartao) {
      var categorias = (cartao.getAttribute("data-cat") || "").split(" ");
      var visivel = categoria === "todos" || categorias.indexOf(categoria) !== -1;

      if (visivel) {
        cartao.hidden = false;
        void cartao.offsetWidth;
        cartao.classList.remove("is-out");
      } else {
        cartao.classList.add("is-out");
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

  var botaoEmail = document.getElementById("copiar-email");

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

  var ano = document.getElementById("ano");
  if (ano) ano.textContent = new Date().getFullYear();
})();
