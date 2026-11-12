<a id="top"></a>

<div align="center">

# Nicolas Zampieri · Currículo

**Site de currículo de Nicolas Delecrode Zampieri, desenvolvedor backend em Python e Java.**

<a href="https://ndelecrodev.github.io/curriculum_website/"><img src="https://img.shields.io/badge/acessar-ndelecrodev.github.io-1f6feb?style=for-the-badge" alt="Acessar o site"></a>

[![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=flat-square&logo=html5&logoColor=white)](https://developer.mozilla.org/docs/Web/HTML)
[![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=flat-square&logo=css3&logoColor=white)](https://developer.mozilla.org/docs/Web/CSS)
[![JavaScript](https://img.shields.io/badge/JavaScript-vanilla-F7DF1E?style=flat-square&logo=javascript&logoColor=black)](https://developer.mozilla.org/docs/Web/JavaScript)
[![GitHub Pages](https://img.shields.io/badge/GitHub_Pages-222222?style=flat-square&logo=githubpages&logoColor=white)](https://pages.github.com/)
[![Sem build](https://img.shields.io/badge/build-nenhum-success?style=flat-square)](#como-rodar-localmente)

[![Último commit](https://img.shields.io/github/last-commit/ndelecrodev/curriculum_website?style=flat-square&label=%C3%BAltimo%20commit)](https://github.com/ndelecrodev/curriculum_website/commits/main)
[![Tamanho](https://img.shields.io/github/repo-size/ndelecrodev/curriculum_website?style=flat-square&label=tamanho)](https://github.com/ndelecrodev/curriculum_website)

[Seções](#seções-do-site) ·
[Destaques](#destaques-técnicos) ·
[Rodar localmente](#como-rodar-localmente) ·
[Estrutura](#estrutura-de-pastas) ·
[Publicação](#publicação-github-pages)

</div>

---

## Sumário

- [Sobre](#sobre)
- [Seções do site](#seções-do-site)
- [Destaques técnicos](#destaques-técnicos)
- [Como rodar localmente](#como-rodar-localmente)
- [Estrutura de pastas](#estrutura-de-pastas)
- [Publicação (GitHub Pages)](#publicação-github-pages)
- [Personalização](#personalização)
- [Autor](#autor)

## Sobre

Este repositório reúne o site público do meu currículo: uma página única que apresenta quem sou, as tecnologias que uso, a experiência, os projetos e a formação.

É um site estático em **HTML, CSS e JavaScript puros**. Não há etapa de build, framework ou dependência para instalar. A única chamada externa são as fontes **Inter** e **JetBrains Mono**, carregadas do Google Fonts.

Site publicado em **<https://ndelecrodev.github.io/curriculum_website/>**.

<p align="right"><a href="#top">voltar ao topo</a></p>

## Seções do site

| Seção | Conteúdo |
|---|---|
| **Apresentação** | Nome, foco profissional, links (GitHub, LinkedIn, e-mail) e ficha com local, linguagens, frameworks e stack |
| **Sobre** | Resumo da atuação em backend e integração de sistemas |
| **Habilidades** | Linguagens, frameworks, banco de dados, ferramentas e trabalho em equipe, com ícones |
| **Experiência** | Quimia (ExpoTech 2026) e Task Time Sync |
| **Projetos** | Cinco projetos com filtro por categoria: Python, Java, Front-End e Integrações |
| **Formação** | Ensino Médio e cursos de Python, HTML e CSS e GitHub Foundations |
| **Contato** | Botão para copiar o e-mail e links para GitHub e LinkedIn |

<p align="right"><a href="#top">voltar ao topo</a></p>

## Destaques técnicos

| Recurso | Onde |
|---|---|
| **Tema escuro e claro** com botão de alternância. A escolha fica salva no navegador e é aplicada antes da primeira pintura, sem piscar | `index.html`, `script.js` |
| **Idioma PT/EN** com botão na barra de navegação. A escolha fica salva no navegador e também vale `?lang=en` ou `?lang=pt` na URL | `i18n.js`, `script.js` |
| **Filtro de projetos** por categoria, com botões que informam o estado (`aria-pressed`) | `script.js` |
| **Botão "Copiar E-mail"** com aviso na tela e plano B para navegadores que bloqueiam a área de transferência | `script.js` |
| **Botão "Baixar CV"** que abre a impressão, e o CSS de impressão monta o currículo em papel ou PDF | `script.js`, `style.css` |
| **Layout responsivo** com menu hambúrguer no celular | `style.css` |
| **Acessibilidade**: link para pular ao conteúdo, rótulos `aria-*`, foco visível e respeito ao `prefers-reduced-motion` | todo o site |
| **Animação de entrada** das seções ao rolar a página, com fallback para navegadores sem suporte | `script.js` |
| **Caminhos relativos** em todos os arquivos, o que faz o site funcionar em subpasta do GitHub Pages | todo o site |

<p align="right"><a href="#top">voltar ao topo</a></p>

## Como rodar localmente

Sirva a pasta do repositório com qualquer servidor estático:

<table>
<tr><th>Python</th><th>Node.js</th><th>VS Code</th></tr>
<tr>
<td>

```bash
python -m http.server 8000
```

</td>
<td>

```bash
npx serve .
```

</td>
<td>

Extensão **Live Server**, com a pasta do repositório aberta

</td>
</tr>
</table>

Depois abra <http://localhost:8000> (ou o endereço que o servidor mostrar). Como o site é estático, também funciona abrindo o `index.html` direto no navegador.

<p align="right"><a href="#top">voltar ao topo</a></p>

## Estrutura de pastas

```
.
├── index.html        Estrutura e conteúdo da página
├── favicon.svg       Ícone da aba do navegador
├── apple-touch-icon.png  Ícone para iOS
├── style.css         Visual: temas, layout responsivo e impressão
├── script.js         Comportamento: tema, menu, filtro, copiar e-mail
├── i18n.js           Textos em português e inglês
├── assets/
│   └── icons/        Ícones SVG das tecnologias
└── README.md
```

<p align="right"><a href="#top">voltar ao topo</a></p>

## Publicação (GitHub Pages)

O site é publicado direto da branch `main`, pasta raiz (`/`), sem workflow.

1. Em *Settings → Pages → Build and deployment → Source*, escolher **Deploy from a branch**.
2. Selecionar a branch **main** e a pasta **/ (root)**.
3. Salvar e aguardar o deploy. O endereço fica em `https://ndelecrodev.github.io/curriculum_website/`.

> [!NOTE]
> Todos os caminhos de `style.css`, `script.js` e `assets/icons/` são relativos e sem barra inicial. Isso é necessário porque o site fica em uma subpasta (`/curriculum_website/`) do domínio `github.io`.

<p align="right"><a href="#top">voltar ao topo</a></p>

## Personalização

- **Textos e links:** edite o `index.html`. Cada seção tem um comentário no início.
- **Cores e espaçamentos:** ficam como variáveis CSS no começo do `style.css`.
- **Ícones:** coloque o SVG em `assets/icons/` e referencie com caminho relativo, por exemplo `assets/icons/python.svg`.

<p align="right"><a href="#top">voltar ao topo</a></p>

## Autor

**Nicolas Delecrode Zampieri**, São Paulo, SP.

[![GitHub](https://img.shields.io/badge/GitHub-ndelecrodev-181717?style=flat-square&logo=github&logoColor=white)](https://github.com/ndelecrodev)

<p align="right"><a href="#top">voltar ao topo</a></p>
