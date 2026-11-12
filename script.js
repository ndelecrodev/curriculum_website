(function () {
  "use strict";

  var root = document.documentElement;

  function lerArmazenado(chave) {
    try { return localStorage.getItem(chave); } catch (e) { return null; }
  }
  function gravarArmazenado(chave, valor) {
    try { localStorage.setItem(chave, valor); } catch (e) { }
  }

  var dicionarios = window.I18N || {};
  var idiomaAtual = "pt";
  var metaDescricao = document.querySelector('meta[name="description"]');
  var botoesIdioma = document.querySelectorAll("[data-lang]");

  function t(chave, vars) {
    var dic = dicionarios[idiomaAtual] || {};
    var texto = dic[chave];
    if (texto === undefined) texto = (dicionarios.pt || {})[chave];
    if (texto === undefined) return chave;
    if (vars) {
      Object.keys(vars).forEach(function (k) {
        texto = texto.split("{" + k + "}").join(vars[k]);
      });
    }
    return texto;
  }

  function idiomaValido(valor) {
    return valor === "pt" || valor === "en" ? valor : null;
  }

  function idiomaInicial() {
    var daUrl = null;
    try { daUrl = idiomaValido(new URLSearchParams(window.location.search).get("lang")); } catch (e) { }
    if (daUrl) return daUrl;
    var salvo = idiomaValido(lerArmazenado("lang"));
    if (salvo) return salvo;
    var nav = (navigator.language || "").toLowerCase();
    return nav.indexOf("en") === 0 ? "en" : "pt";
  }

  function rotuloMenu() {
    if (!burger) return;
    burger.setAttribute("aria-label", t(burger.getAttribute("aria-expanded") === "true" ? "menu.close" : "menu.open"));
  }

  function definirTexto(el, texto) {
    if (texto.indexOf("`") === -1) {
      el.textContent = texto;
      return;
    }
    el.textContent = "";
    texto.split("`").forEach(function (parte, i) {
      if (!parte) return;
      if (i % 2) {
        var code = document.createElement("code");
        code.textContent = parte;
        el.appendChild(code);
      } else {
        el.appendChild(document.createTextNode(parte));
      }
    });
  }

  function aplicarIdioma(lang, gravar) {
    if (!idiomaValido(lang) || !dicionarios[lang]) lang = "pt";
    idiomaAtual = lang;
    root.setAttribute("lang", lang === "en" ? "en" : "pt-BR");

    document.querySelectorAll("[data-i18n]").forEach(function (el) {
      definirTexto(el, t(el.getAttribute("data-i18n")));
    });
    document.querySelectorAll("[data-i18n-attr]").forEach(function (el) {
      el.getAttribute("data-i18n-attr").split(",").forEach(function (par) {
        var i = par.indexOf(":");
        if (i > 0) el.setAttribute(par.slice(0, i).trim(), t(par.slice(i + 1).trim()));
      });
    });

    document.title = t(root.getAttribute("data-title-key") || "meta.title");
    if (metaDescricao) metaDescricao.setAttribute("content", t(root.getAttribute("data-desc-key") || "meta.description"));
    rotuloMenu();

    botoesIdioma.forEach(function (b) {
      var ativo = b.getAttribute("data-lang") === lang;
      b.classList.toggle("is-active", ativo);
      b.setAttribute("aria-pressed", String(ativo));
    });

    if (gravar) gravarArmazenado("lang", lang);
  }

  var burger = document.getElementById("burger");
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

  var menu = document.getElementById("menu");
  function fecharMenu() {
    if (!burger || !menu) return;
    menu.classList.remove("open");
    burger.setAttribute("aria-expanded", "false");
    rotuloMenu();
  }
  if (burger && menu) {
    burger.addEventListener("click", function () {
      var aberto = menu.classList.toggle("open");
      burger.setAttribute("aria-expanded", String(aberto));
      rotuloMenu();
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

      function sucesso() { mostrarToast(t("toast.copied")); }
      function falha() { mostrarToast(t("toast.fail", { email: email })); }

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
        mostrarToast(t("toast.print"));
      }
    });
  }

  var links = document.querySelectorAll(".nav-links a");
  var secoes = [];
  links.forEach(function (link) {
    var destino = link.getAttribute("href");
    var alvo = destino.charAt(0) === "#" ? document.querySelector(destino) : null;
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

  botoesIdioma.forEach(function (botao) {
    botao.addEventListener("click", function () {
      aplicarIdioma(botao.getAttribute("data-lang"), true);
    });
  });

  aplicarIdioma(idiomaInicial(), false);

  var ano = document.getElementById("ano");
  if (ano) ano.textContent = new Date().getFullYear();
})();
