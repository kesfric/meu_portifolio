# Portfólio da Ester

Next.js 16 + TypeScript + Tailwind CSS 4 + Motion (o novo nome do Framer Motion).
Feito a partir do esboço no iPad (ver `public/sketch.png`).

Tudo abaixo está em passos pequenos. Cada passo diz **onde** fazer.

---

## 1. Rodar no seu computador

**Onde:** Terminal (ou o terminal do VS Code), dentro da pasta `ester-portfolio`.

Precisa ter o Node.js 20 ou mais novo (`node -v` mostra a versão).

```bash
npm install      # baixa as bibliotecas (só na primeira vez)
npm run dev      # liga o site em modo de desenvolvimento
```

Abra http://localhost:3000. Toda vez que você salvar um arquivo, a página atualiza sozinha.

---

## 2. Preencher o que falta

**Onde:** VS Code. Use `Cmd+Shift+F` e busque por `CONFIRM` para achar todos os pontos.

| O quê | Arquivo |
|---|---|
| E-mail e LinkedIn | `src/content/site.ts` |
| Sua foto | salve como `public/ester.jpg` e mude `photo: null` para `photo: "/ester.jpg"` em `src/content/site.ts` |
| Currículo | salve o PDF como `public/resume.pdf` |
| Projetos (textos, links, stack) | `src/content/projects.ts` |
| Experiências (datas, bullets) | `src/content/experience.ts` |
| Habilidades | `src/content/skills.ts` |
| Botões, títulos, mensagens | `src/content/ui.ts` |

Todo texto tem versão `en` e `pt`. Se mudar um, mude o outro.

> Os textos dos projetos são rascunhos meus. Reescreva os "what I learned" com as suas palavras: é o que vão perguntar em entrevista.

---

## 3. Fazer o formulário de contato enviar e-mail (opcional)

Sem isso, o formulário avisa a pessoa para te escrever direto no seu e-mail.

1. **Onde:** resend.com. Crie uma conta e gere uma API key.
2. **Onde:** pasta do projeto. Copie `.env.example` para um arquivo novo chamado `.env.local` e preencha `RESEND_API_KEY` e `CONTACT_TO_EMAIL` (o e-mail da sua conta Resend).
3. **Onde:** Terminal. Pare o `npm run dev` (`Ctrl+C`) e rode de novo, para ele ler o `.env.local`.

O `.env.local` nunca vai para o GitHub (está no `.gitignore`).

---

## 4. Publicar na Vercel

1. **Onde:** GitHub (github.com/kesfric). Crie um repositório e suba a pasta (sem `node_modules`).
2. **Onde:** vercel.com → Add New → Project → importe o repositório. A Vercel detecta Next.js sozinha.
3. **Onde:** Vercel → seu projeto → Settings → Environment Variables. Adicione `NEXT_PUBLIC_SITE_URL` (a URL final do site) e, se fez o passo 3, as duas chaves do Resend.
4. Faça um novo deploy para as variáveis valerem.

---

## 5. Escrever mais palavras com a sua letra

O "ester", o "hi!, oi!" e o "projects" são a sua letra, recortada do esboço. Os outros títulos (about, experience…) usam uma fonte parecida até você trocar.

1. **Onde:** iPad. Escreva a palavra (ex.: "about") com caneta preta grossa, tire print e recorte só a palavra.
2. **Onde:** Terminal, na pasta do projeto:
   ```bash
   pip install pillow numpy scipy potracer
   python3 scripts/trace_handwriting.py caminho/about.png about
   ```
3. **Onde:** `src/content/handwriting.ts`. Cole o bloco que o script imprimiu.
4. **Onde:** o componente da seção (ex.: `src/components/about.tsx`). No `<SectionTitle>`, passe `glyphs={{ en: about }}`. O título de projetos em `src/components/projects.tsx` mostra como fazer.

---

## 6. Antes de publicar

**Onde:** Terminal.

```bash
npm run typecheck   # confere os tipos
npm run build       # monta a versão de produção; se der erro, aparece aqui
npm run start       # roda essa versão em http://localhost:3000
```

**Onde:** Chrome → botão direito → Inspecionar → aba Lighthouse → Analyze. Rode em modo mobile e desktop.

---

## Mapa dos arquivos

```
src/
  app/
    layout.tsx               fontes, SEO, script do modo escuro
    page.tsx                 a home (ordem das seções)
    projects/[slug]/page.tsx uma página por projeto
    api/contact/route.ts     recebe o formulário e envia pelo Resend
    opengraph-image.tsx      imagem que aparece quando alguém compartilha o link
    sitemap.ts, robots.ts    para o Google
    globals.css              cores, marca-texto, botões
  components/
    hero.tsx                 primeira tela dentro da moldura
    sketch-frame.tsx         a moldura torta que se desenha
    handwriting.tsx          desenha a sua letra
    projects.tsx             filtros, cards e o card que vira estudo de caso
    case-study.tsx           o layout do estudo de caso
    about.tsx, experience.tsx, skills.tsx, contact.tsx
    site-header.tsx          logo, menu, EN/PT, modo escuro
    providers.tsx            idioma + movimento reduzido
  content/                   TODO o texto do site mora aqui
  lib/blobs.ts               os formatos dos cards, tirados do esboço
scripts/trace_handwriting.py transforma foto da sua letra em SVG
```
